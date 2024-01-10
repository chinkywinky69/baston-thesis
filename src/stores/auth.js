import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { defineStore } from "pinia";
import { auth } from "src/boot/firebase";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    currentUser: null,
  }),

  actions: {
    async loginWithEmail(data) {
      try {
        const cred = await signInWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );

        if (cred.user) {
          const user = cred.user;
          this.currentUser = user;
          this.router.push("/");
          return { success: true, message: "Log in successful" };
        }
      } catch (err) {
        const errCode = err.code;
        let errMessage;

        switch (errCode) {
          case "auth/invalid-email":
            errMessage = "Email is invalid";
            break;
          case "auth/user-not-found":
            errMessage = "User is not registered.";
            break;
          case "auth/wrong-password":
            errMessage = "Sorry, password is incorrect.";
            break;
        }

        return { error: true, message: errMessage };
      }
    },

    async logOut() {
      await signOut(auth);
      this.router.replace("/auth");
    },

    async handleAuthState() {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          this.currentUser = this.currentUser ?? {};
          Object.assign(this.currentUser, user);
        } else {
          this.currentUser = null;
        }
      });
    },
  },
});
