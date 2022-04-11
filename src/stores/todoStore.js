import { defineStore } from "pinia";
import firebase from "../firebase";

export const useTodoStore = defineStore("useTodoStore", {
  state: () => ({
    todos: [],
  }),

  actions: {
    async initialGetAllTodo() {
      return new Promise((resolve) => {
        firebase
          .firestore()
          .collection("todos")
          .orderBy("createdAt", "desc")
          .onSnapshot((res) => {
            let querySnapshot = res.docChanges();
            querySnapshot.forEach((todo) => {
              console.log(todo.type);
              if (todo.type == "added" && todo.doc.data().createdAt != null) {
                let date = todo.doc.data().createdAt.toDate();

                var today = date
                  .toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                  .split(" ")
                  .join("-");

                this.todos.push({
                  createdAt: today,
                  text: todo.doc.data().text,
                  done: todo.doc.data().done,
                  id: todo.doc.id,
                });
              }

              if (
                todo.type === "modified" &&
                this.todos.shift.id != todo.doc.data().id
              ) {
                let dateMod = todo.doc.data().createdAt.toDate();

                var todayMod = dateMod
                  .toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                  .split(" ")
                  .join("-");

                this.todos.unshift({
                  createdAt: todayMod,
                  text: todo.doc.data().text,
                  done: todo.doc.data().done,
                  id: todo.doc.id,
                });
              }
            });

            resolve();
          });
      });
    },
    createTodo(payload) {
      return new Promise((resolve) => {
        firebase
          .firestore()
          .collection("todos")
          .add(payload)
          .then(() => {
            // let dateMod = payload.createdAt.toDate();

            // var todayMod = dateMod
            //   .toLocaleDateString("en-GB", {
            //     day: "numeric",
            //     month: "short",
            //     year: "numeric",
            //   })
            //   .split(" ")
            //   .join("-");
            //payload.createdAt = todayMod;
            // console.log(payload.createdAt);
            // this.todos.unshift(payload);
            resolve();
          });
      });
    },
    updateTodo(payload) {
      firebase.firestore().collection("todos").doc(payload.id).update({
        text: payload.text,
        done: payload.done,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    },
  },
});
