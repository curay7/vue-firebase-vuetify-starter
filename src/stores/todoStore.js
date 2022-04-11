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

              if (todo.type === "modified") {
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
  },
});
