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
  increment,
} from "firebase/firestore";
import { defineStore } from "pinia";
import { Dialog, Loading, Notify, date } from "quasar";
import { db } from "src/boot/firebase";
import { useTeamStore } from "./teams";

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

    getMatchesToday: (state) => {
      const today = date.formatDate(new Date(), "YYYY-MM-DD");
      return state.matches.filter((match) => {
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

    getMatchesAgo: (state) => {
      const today = date.formatDate(new Date(), "YYYY-MM-DD");
      return state.matches.filter((match) => {
        if (match.updatedAt) {
          const matchDate = date.formatDate(
            match.updatedAt.toDate(),
            "YYYY-MM-DD"
          );
          return today !== matchDate && match.winner;
        }
        return false;
      });
    },
  },

  actions: {
    async setMatchToNull() {
      this.match = null;
      return true;
    },
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

    async update(id, data, mode) {
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

      if (this.match && this.match.id == id) {
        if (typeof data.currentRound === "object") data.currentRound = "";
        Object.assign(this.match, {
          ...data,
          updatedAt: Timestamp.now(),
        });
      }

      if (mode && mode == "statReset") {
        this.fetchOne(id);
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

    async updateStat(id, stat, playerNo, val) {
      console.log({
        stat: stat,
        playerNo: playerNo,
        val: val,
      });

      if (!this.match[playerNo].hasOwnProperty(stat))
        this.match[playerNo][stat] = 0;
      else if (val == -1) this.match[playerNo][stat]--;
      if (val == 1) this.match[playerNo][stat]++;

      const dataRef = doc(db, "matches", id);
      const fieldKey = `${playerNo}.${stat}`;
      await updateDoc(dataRef, {
        [fieldKey]: increment(val),
        updatedAt: serverTimestamp(),
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
      const dataRef = collection(db, "matches");
      const q = query(
        dataRef,
        where("tournaId", "==", tournaId),
        orderBy("no", "asc")
      );
      const snapshot = await getDocs(q);

      this.matches = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const match = { ...doc.data(), id: doc.id };
          const teamId1 = match.player1.teamId;
          const teamData1 = await useTeamStore().fetchOne(teamId1);
          match.player1.team = teamData1;

          const teamId2 = match.player2.teamId;
          const teamData2 = await useTeamStore().fetchOne(teamId2);
          match.player2.team = teamData2;

          return match;
        })
      );
    },

    async fetchOne(id) {
      const dataRef = doc(db, "matches", id);
      const docSnap = await getDoc(dataRef);
      this.match = { ...docSnap.data(), id: id };
      return true;
    },
  },
});
