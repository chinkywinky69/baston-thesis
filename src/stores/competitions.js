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
  where,
} from "firebase/firestore";
import { defineStore } from "pinia";
import { Dialog, Loading, Notify } from "quasar";
import { db } from "src/boot/firebase";

export const useCompetitionStore = defineStore("competitions", {
  state: () => ({
    competitions: [],
    competition: null,
  }),

  actions: {
    async create(data) {
      Loading.show();
      const dataRef = collection(db, "competitions");
      const doc = await addDoc(dataRef, {
        ...data,
        createdAt: serverTimestamp(),
      });

      this.competitions.unshift({
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
      const dataRef = doc(db, "competitions", id);
      await updateDoc(dataRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });

      const i = this.competitions.findIndex((item) => item.id === id);
      if (i > -1) {
        Object.assign(this.competitions[i], {
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
        const dataRef = doc(db, "competitions", id);
        await deleteDoc(dataRef);
        Loading.hide();

        const i = this.competitions.findIndex((item) => item.id === id);
        if (i > -1) {
          this.competitions.splice(i, 1);
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
      const dataRef = collection(db, "competitions");
      const q = query(dataRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      Loading.hide();

      this.competitions = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
    },

    async fetchAllViaTournaId(tournaId) {
      const dataRef = collection(db, "competitions");
      const q = query(
        dataRef,
        where("tournamentId", "==", tournaId),
        orderBy("createdAt", "asc")
      );
      const snapshot = await getDocs(q);

      this.competitions = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
    },

    async fetchOne(id) {
      const dataRef = doc(db, "competitions", id);
      const docSnap = await getDoc(dataRef);
      this.competition = docSnap.data();
      return true;
    },
  },
});
