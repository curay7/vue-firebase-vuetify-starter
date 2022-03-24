<template>
  <v-container
    ><h1>Home</h1>
    {{ profiles }}
  </v-container>
</template>

<script>
// import Profile from "../service/profile";
// import { getFirestore, collection, getDocs } from "firebase/firestore";
// import "firebase/database";

// const db = getFirestore();
// const colRef = collection(db, "profiles");
import firebase from "../../firebase";

export default {
  name: "DashboardTest",

  data: () => ({
    profiles: [],
    errors: [],
    ref: firebase.firestore().collection("profile"),
  }),
  methods: {
    // onDataChange(users) {
    //   let _user = [];
    //   users.forEach((user) => {
    //     let id = user.id;
    //     let data = user.data();
    //     _user.push({
    //       id: id,
    //       age: data.age,
    //     });
    //   });
    //   this.profiles = _user;
    // },
  },
  async created() {
    this.ref.onSnapshot((querySnapshot) => {
      console.log("Snapshot");
      console.log(querySnapshot);
      this.profiles = [];
      querySnapshot.forEach((doc) => {
        this.profiles.push({
          key: doc.id,
          name: doc.data().name,
          age: doc.data().age,
        });
      });
    });
    // Profile.getAll.orderBy("name").onSnapshot(this.onDataChange);
    // getDocs(colRef).then((snapshot) => {
    //   console.log(snapshot);
    // });
    // db.collection("profiles")
    //   .get()
    //   .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       this.profile.push({
    //         age: doc.data().age,
    //         name: doc.data().name,
    //       });
    //     });
    //   });
    console.log(this.profile);
    console.log("started");
  },
};
</script>
