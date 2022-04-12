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
          .orderBy("createdAt")
          .onSnapshot((res) => {
            let querySnapshot = res.docChanges();
            querySnapshot.forEach((todo) => {
              if (todo.type == "added" && todo.doc.data().createdAt != null) {
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
            resolve();
          });
      });
    },
    updateTodo(payload) {
      firebase
        .firestore()
        .collection("todos")
        .doc(payload.id)
        .update({
          text: payload.text,
          done: payload.done,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          const index = this.todos.findIndex((x) => x.id === payload.id);
          console.log(index);
          console.log("Debug here");
          if (index < 0) {
            throw new Error(`Can't find todo item [${payload.id}]`);
          }

          this.todos.splice(index, 1, payload);
        });
    },
  },
});
