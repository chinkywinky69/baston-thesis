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
import { Dialog, Loading, Notify, date } from "quasar";
import { db } from "src/boot/firebase";

export const useCompetitionStore = defineStore("competitions", {
  state: () => ({
    competitions: [],
    competition: null,
  }),

  getters: {
    getCompetitionsToday: (state) => {
      const today = date.formatDate(new Date(), "YYYY-MM-DD");
      return state.competitions.filter((match) => {
        if (match.updatedAt) {
          const matchDate = date.formatDate(
            match.updatedAt.toDate(),
            "YYYY-MM-DD"
          );
          return today === matchDate;
        }
        return false;
      });
    },

    getCompetitionsAgo: (state) => {
      const today = date.formatDate(new Date(), "YYYY-MM-DD");
      return state.competitions.filter((match) => {
        if (match.updatedAt) {
          const matchDate = date.formatDate(
            match.updatedAt.toDate(),
            "YYYY-MM-DD"
          );
          return today !== matchDate;
        }
        return false;
      });
    },
  },

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

      if (this.competition && this.competition.id == id) {
        Object.assign(this.competition, {
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

    async updateScore(id, teamId, score, judgesScores) {
      Loading.show();
      const dataRef = doc(db, "competitions", id);
      const averageKey = `${teamId}.averageScore`;
      const judgesKey = `${teamId}.judgesScores`;
      await updateDoc(dataRef, {
        [averageKey]: score,
        [judgesKey]: judgesScores,
        updatedAt: serverTimestamp(),
      });

      if (this.competition && this.competition.id == id) {
        this.competition[teamId] = this.competition[teamId] ?? {};
        this.competition[teamId].averageScore = score;
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

    async updateViolations(id, teamId, violations) {
      Loading.show();
      const dataRef = doc(db, "competitions", id);
      const fieldKey = `${teamId}.violations`;
      await updateDoc(dataRef, {
        [fieldKey]: violations,
        updatedAt: serverTimestamp(),
      });

      if (this.competition && this.competition.id == id) {
        this.competition[teamId] = this.competition[teamId] ?? {};
        Object.assign(this.competition[teamId], {
          violations: violations,
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
      this.competition = { ...docSnap.data(), id: id };
      return true;
    },
  },
});
