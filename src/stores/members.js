import {
  Timestamp,
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import {
  uploadBytes,
  getDownloadURL,
  deleteObject,
  ref as storageRef,
} from "firebase/storage";
import { defineStore } from "pinia";
import { Dialog, Loading, Notify } from "quasar";
import { db, storage } from "src/boot/firebase";
import { useTeamStore } from "./teams";

export const useMemberStore = defineStore("members", {
  state: () => ({
    members: [],
    member: null,
    isUploadingMedCert: false,
  }),

  getters: {
    getApproved: (state) => {
      return state.members.filter((member) => member.approved);
    },
    getPending: (state) => {
      return state.members.filter(
        (member) => !member.approved && !member.rejected
      );
    },
  },

  actions: {
    async create(data, file) {
      try {
        const dataRef = collection(db, "members");
        const docRef = await addDoc(dataRef, {
          ...data,
          createdAt: serverTimestamp(),
        });

        if (file) {
          const uploadResult = await this.uploadMedcert(docRef.id, file);
          if (!uploadResult) {
            throw new Error("Failed to upload medical certificate.");
          }
        }

        const playerData = {
          ...data,
          createdAt: Timestamp.now(),
          id: docRef.id,
        };

        if (data?.teamId && data.approved) {
          const teamData = useTeamStore()?.teams.find(
            (item) => item.id == data.teamId
          );
          playerData.team = teamData;

          // add the player to team in database
          const teamRef = doc(db, "teams", data.teamId);
          await updateDoc(teamRef, {
            players: arrayUnion(playerData),
          });
        }

        this.members.unshift(playerData);

        Notify.create({
          type: "positive",
          icon: "thumb_up",
          position: "bottom-right",
          message: "Added successfully!",
        });

        return { success: true, id: docRef.id };
      } catch (error) {
        console.error("Error creating member:", error);
        Notify.create({
          type: "negative",
          icon: "report_problem",
          position: "bottom-right",
          message: "Error adding member.",
        });
        return { success: false };
      }
    },

    async update(id, data, file, mode) {
      const dataRef = doc(db, "members", id);
      await updateDoc(dataRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });

      if (file) {
        await this.uploadMedcert(id, file);
      }

      if (mode.type == "accepted") {
        // add the player to team in database
        const teamRef = doc(db, "teams", mode.teamId);
        await updateDoc(teamRef, {
          players: arrayUnion(mode.data),
        });
      }

      const playerData = {
        ...data,
        updatedAt: Timestamp.now(),
      };
      if (data?.teamId) {
        const teamData = useTeamStore()?.teams.find(
          (item) => item.id == data.teamId
        );
        data.team = teamData;

        // add the player to team in database
        const teamRef = doc(db, "teams", data.teamId);
        await updateDoc(teamRef, {
          players: arrayUnion(playerData),
        });
      }

      const i = this.members.findIndex((item) => item.id === id);
      if (i > -1) {
        Object.assign(this.members[i], playerData);
      }

      Notify.create({
        type: "positive",
        icon: "thumb_up",
        position: "bottom-right",
        message: "Updated successfully!",
      });

      return true;
    },

    async delete(member, medCertUrl) {
      Dialog.create({
        title: "Confirm",
        message: "Are you sure you want to permanently delete this data?",
        cancel: true,
      }).onOk(async () => {
        Loading.show();
        const dataRef = doc(db, "members", member.id);
        await deleteDoc(dataRef);

        if (medCertUrl) await this.deleteMedcert(medCertUrl);
        Loading.hide();

        if (member?.teamId) {
          // remove the player to team in database
          const teamRef = doc(db, "teams", member.teamId);
          await updateDoc(teamRef, {
            players: arrayRemove(member),
          });
        }

        const i = this.members.findIndex((item) => item.id === member.id);
        if (i > -1) {
          this.members.splice(i, 1);
        }

        Notify.create({
          type: "positive",
          icon: "thumb_up",
          position: "bottom-right",
          message: "Successfully deleted!",
        });
      });
    },

    async fetchAll() {
      const dataRef = collection(db, "members");
      const q = query(dataRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);

      this.members = snapshot.docs.map((doc) => {
        const memberData = { ...doc.data(), id: doc.id };
        if (memberData?.teamId) {
          const teamData = useTeamStore()?.teams.find(
            (item) => item.id == memberData.teamId
          );
          memberData.team = teamData;
        }
        return memberData;
      });
    },

    async fetchOne(id) {
      const dataRef = doc(db, "members", id);
      const docSnap = await getDoc(dataRef);
      this.member = docSnap.data();
      return true;
    },

    async updateImages(id, files) {
      try {
        Loading.show({
          message: "Saving file details...",
        });

        const imageUrls = [];
        const dataRef = doc(db, "members", id);

        for (const file of files) {
          const fileRef = storageRef(storage, `members/id/${file.name}`);
          const snapshot = await uploadBytes(fileRef, file);
          const downloadURL = await getDownloadURL(snapshot.ref);
          imageUrls.push(downloadURL);
        }

        const docSnapshot = await getDoc(dataRef);
        const existingData = docSnapshot.data() || {};
        const mergedImageUrls = [
          ...(existingData.imageUrls || []),
          ...imageUrls,
        ];

        await updateDoc(dataRef, {
          imageUrls: mergedImageUrls,
          updatedAt: serverTimestamp(),
        });

        const i = this.members.findIndex((item) => item.id === id);
        if (i > -1) {
          this.members[i].imageUrls = mergedImageUrls;
        }

        Loading.hide();
        return true;
      } catch (error) {
        console.error("Error updating images:", error);
        return false;
      }
    },

    async deleteMedcert(url) {
      const fileRef = storageRef(storage, url);
      await deleteObject(fileRef);
    },

    async uploadMedcert(id, file) {
      this.isUploadingMedCert = true;
      try {
        Loading.show({
          message: "Saving file details...",
        });

        const dataRef = doc(db, "members", id);
        const fileRef = storageRef(storage, `members/${id}/med-cert`);
        const snapshot = await uploadBytes(fileRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);

        await updateDoc(dataRef, {
          medCert: downloadURL,
        });

        const i = this.members.findIndex((item) => item.id === id);
        if (i > -1) {
          this.members[i].medCert = downloadURL;
        }
        return true;
      } catch (error) {
        console.error("Error updating images:", error);
        return false;
      } finally {
        this.isUploadingMedCert = false;
        Loading.hide();
      }
    },
  },
});
