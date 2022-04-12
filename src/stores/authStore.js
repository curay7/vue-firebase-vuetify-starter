import { defineStore } from "pinia";
import firebase from "../firebase";

export const userAuthStore = defineStore("userAuthStore", {
  state: () => ({
    users: { name: "", email: "", uid: "" },
    loadings: { login: false },
  }),

  actions: {
    createNewUserAccount(payload) {
      console.log(payload);
      return new Promise((resolve, reject) => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(payload.email, payload.password)
          .then((response) => {
            this.users.uid = response.uid;
            this.users.email = payload.email;
            this.users.name = payload.name;

            resolve();
          })
          .catch((error) => {
            reject(error.code);
          });
      });
    },
    loginGoogle() {
      var provider = new firebase.auth.GoogleAuthProvider();
      return new Promise((resolve, reject) => {
        firebase
          .auth()
          .signInWithPopup(provider)
          .then(function () {
            resolve();
          })
          .catch(function (error) {
            reject(error.code);
          });
      });
    },
    signInUser(payload) {
      return new Promise((resolve, reject) => {
        firebase
          .auth()
          .signInWithEmailAndPassword(payload.email, payload.password)
          .then((response) => {
            this.users.uid = response.uid;
            this.users.email = payload.email;
            this.users.name = payload.email;
            resolve();
          })
          .catch((error) => {
            // Handle Errors here.
            reject(error.code);
          });
      });
    },
  },
});
