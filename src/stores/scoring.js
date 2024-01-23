import { defineStore } from "pinia";

export const useScoringStore = defineStore("scoring", {
  state: () => ({
    isMatchDone: false,
  }),
});
