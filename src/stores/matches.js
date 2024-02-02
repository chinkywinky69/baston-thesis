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
  where,
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

export const useMatchStore = defineStore("matches", {
  state: () => ({
    matches: [],
    match: null,
  }),

  getters: {
    getLabananMatches: (state) => {
      return state.matches.filter((item) => item.matchType == "Labanan");
    },
    getAnyoMatches: (state) => {
      return state.matches.filter((item) => item.matchType == "Anyo");
    },
  },

  actions: {
    async create(data) {
      Loading.show();
      const dataRef = collection(db, "matches");
      const doc = await addDoc(dataRef, {
        ...data,
        createdAt: serverTimestamp(),
      });

      this.matches.unshift({
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
      Loading.show();
      const dataRef = doc(db, "matches", id);
      await updateDoc(dataRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });

      const i = this.matches.findIndex((item) => item.id === id);
      if (i > -1) {
        Object.assign(this.matches[i], {
          ...data,
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
        const dataRef = doc(db, "matches", id);
        await deleteDoc(dataRef);
        Loading.hide();

        const i = this.matches.findIndex((item) => item.id === id);
        if (i > -1) {
          this.matches.splice(i, 1);
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
      const dataRef = collection(db, "matches");
      const q = query(dataRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      Loading.hide();

      this.matches = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
    },

    async fetchAllViaTournaId(tournaId) {
      Loading.show();
      const dataRef = collection(db, "matches");
      const q = query(
        dataRef,
        where("tournaId", "==", tournaId),
        orderBy("no", "asc")
      );
      const snapshot = await getDocs(q);
      Loading.hide();

      this.matches = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
    },

    async fetchOne(id) {
      const dataRef = doc(db, "matches", id);
      const docSnap = await getDoc(dataRef);
      this.match = docSnap.data();
      return true;
    },
  },
});
