import { defineStore } from "pinia";
import firebase from "../firebase";

export const createUserStore = defineStore("createUserStore", {
  actions: {
    async createUserSaveProfile(payload) {
      try {
        const userAuth = await firebase
          .auth()
          .createUserWithEmailAndPassword(payload.emailtext, payload.password);
        // var user = {
        //     name: "Raja",
        //     phone: "779797329",
        //     address: "474 Mercer Drive",
        //     uid: userAuth.uid,
        //     email: userAuth.email
        // }

        payload.userUid = userAuth.user.uid;

        firebase
          .firestore()
          .collection("profile")
          .add(payload)
          .then(() => {});
      } catch (error) {
        console.log(error.message);
      }

      // function createUserProfile(payload) {
      //   console.log("Test Here");
      //   console.log(payload.userUid);
      //   firebase
      //     .firestore()
      //     .collection("profile")
      //     .add(payload)
      //     .then(() => {
      //       var userCredentials = {
      //         email: payload.emailtext,
      //         password: payload.password,
      //       };
      //       console.log("Test Here");
      //       console.log(
      //         userAuthStore().createNewUserAccount(userCredentials)
      //       );
      //     });
      // }

      // firebase
      //   .auth()
      //   .createUserWithEmailAndPassword(payload.emailtext, payload.password)
      //   .then((response) => {
      //     console.log(response.user.uid);
      //     console.log(response);

      //     payload.userUid = response.user.uid;
      //     console.log(payload);
      //     console.log(payload.user.uid);
      //     console.log("Test Here");
      //   firebase
      //     .firestore()
      //     .collection("profile")
      //     .add(payload)
      //     .then(() => {});
      // })
      // .catch((error) => {
      //   console.log(error);
      // });

      // function createUserProfile(payload) {
      //   console.log("Test Here CReate user profile!!!!!!!!!");
      //   console.log(payload.userUid);
      //   firebase
      //     .firestore()
      //     .collection("profile")
      //     .add(payload)
      //     .then(() => {});
      // }
    },
  },
});
