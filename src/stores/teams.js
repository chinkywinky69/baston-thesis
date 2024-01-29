import {
  Timestamp,
  addDoc,
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
import { db, auth, storage } from "src/boot/firebase";

export const useTeamStore = defineStore("teams", {
  state: () => ({
    teams: [],
    team: null,
  }),

  actions: {
    async create(data) {
      Loading.show();
      const dataRef = collection(db, "teams");
      const doc = await addDoc(dataRef, {
        ...data,
        createdAt: serverTimestamp(),
      });

      this.teams.unshift({
        ...data,
        createdAt: Timestamp.now(),
        id: doc.id,
      });

      Loading.hide();

      Notify.create({
        type: "positive",
        icon: "thumb_up",
        position: "bottom-right",
        message: "Added successfully!",
      });

      return { success: true, id: doc.id };
    },

    async update(id, data) {
      const dataRef = doc(db, "teams", id);
      await updateDoc(dataRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });

      const i = this.teams.findIndex((item) => item.id === id);
      if (i > -1) {
        Object.assign(this.teams[i], {
          ...data,
          updatedAt: Timestamp.now(),
        });
      }

      Notify.create({
        type: "positive",
        icon: "thumb_up",
        position: "bottom-right",
        message: "Updated successfully!",
      });

      return true;
    },

    async setRepresentative(id, matchType, gender, player) {
      Loading.show();
      const dataRef = doc(db, "teams", id);
      // const matchTypeModified = matchType.replace(" ", "_");
      const fieldKey = `${matchType}.${gender}`;
      await updateDoc(dataRef, {
        [fieldKey]: player,
        updatedAt: serverTimestamp(),
      });

      if (this.team) {
        Object.assign(this.team, {
          [matchType]: {
            [gender]: player,
          },
          updatedAt: Timestamp.now(),
        });
      }

      const i = this.teams.findIndex((item) => item.id === id);
      if (i > -1) {
        Object.assign(this.teams[i], {
          [matchType]: {
            [gender]: player,
          },
          updatedAt: Timestamp.now(),
        });
      }
      Loading.hide();
      Notify.create({
        type: "positive",
        icon: "thumb_up",
        position: "bottom-right",
        message: "Updated successfully!",
      });

      return true;
    },

    async delete(id) {
      Dialog.create({
        title: "Confirm",
        message: "Are you sure you want to permanently delete this data?",
        cancel: true,
      }).onOk(async () => {
        Loading.show();
        const dataRef = doc(db, "teams", id);
        await deleteDoc(dataRef);
        Loading.hide();

        const i = this.teams.findIndex((item) => item.id === id);
        if (i > -1) {
          this.teams.splice(i, 1);
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
      Loading.show();
      const dataRef = collection(db, "teams");
      const q = query(dataRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      Loading.hide();

      this.teams = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
    },

    async fetchOne(id) {
      Loading.show();
      const dataRef = doc(db, "teams", id);
      const docSnap = await getDoc(dataRef);
      this.team = docSnap.data();
      Loading.hide();
      return true;
    },

    async updateImages(id, files) {
      try {
        Loading.show({
          message: "Saving file details...",
        });

        const imageUrls = [];
        const dataRef = doc(db, "teams", id);

        for (const file of files) {
          const fileRef = storageRef(storage, `teams/id/${file.name}`);
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

        const i = this.teams.findIndex((item) => item.id === id);
        if (i > -1) {
          this.teams[i].imageUrls = mergedImageUrls;
        }

        Loading.hide();
        return true;
      } catch (error) {
        console.error("Error updating images:", error);
        return false;
      }
    },

    async deleteImages(urls) {
      for (const url of urls) {
        const fileRef = storageRef(storage, url);
        await deleteObject(fileRef);
      }
    },
  },
});
