import { defineStore } from "pinia";
import firebase from "../firebase";

export const userStore = defineStore("userStore", {
  state: () => ({
    profiles: [],
  }),

  actions: {
    initialGetAllProfile() {
      firebase
        .firestore()
        .collection("profile")
        .orderBy("createdAt")
        .onSnapshot((res) => {
          let querySnapshot = res.docChanges();
          querySnapshot.forEach((profile) => {
            if (
              profile.type == "added" &&
              profile.doc.data().createdAt != null
            ) {
              let dateMod = profile.doc.data().createdAt.toDate();

              var todayMod = dateMod
                .toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
                .split(" ")
                .join("-");
              this.profiles.unshift({
                // userName: this.userName,
                // emailtext: this.emailtext,
                // password: this.password,
                // jobApplied: this.jobApplied,
                // createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                // updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                // userUid: "",
                id: profile.doc.id,
                userName: profile.doc.data().userName,
                emailtext: profile.doc.data().emailtext,
                jobApplied: profile.doc.data().jobApplied,
                createdAt: todayMod,
                userUid: profile.doc.data().userUid,

                // createdAt: todayMod,
                // text: profile.doc.data().text,
                // done: profile.doc.data().done,
                // id: profile.doc.id,
              });
            }
            //!This variable is the index where the profiles is located and it use to modefied delete the profiles in the state profiles
            const index = this.profiles.findIndex(
              (x) => x.id === profile.doc.id
            );
            //!Snapshot Edit profiles

            if (profile.type == "modified" && index >= 0) {
              let dateModUpdate = profile.doc.data().createdAt.toDate();
              var todayModUpdate = dateModUpdate
                .toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
                .split(" ")
                .join("-");
              let payload = {
                createdAt: todayModUpdate,
                text: profile.doc.data().text,
                done: profile.doc.data().done,
                id: profile.doc.id,
              };
              this.profiles.splice(index, 1, payload);
            }
            //!Snapshot Added profiles
            if (profile.type == "modified" && index == -1) {
              let dateModAdded = profile.doc.data().createdAt.toDate();

              var todayModAdded = dateModAdded
                .toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
                .split(" ")
                .join("-");
              this.profiles.unshift({
                id: profile.doc.id,
                userName: profile.doc.data().userName,
                emailtext: profile.doc.data().emailtext,
                jobApplied: profile.doc.data().jobApplied,
                createdAt: todayModAdded,
                userUid: profile.doc.data().userUid,

                // createdAt: todayModAdded,
                // text: profile.doc.data().text,
                // done: profile.doc.data().done,
                // id: profile.doc.id,
              });
            }
            //!Snapshot Delete profileos
            if (profile.type == "removed") {
              this.profile.splice(index, 1);
            }
          });
        });
    },

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
