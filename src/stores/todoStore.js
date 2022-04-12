import { defineStore } from "pinia";
import firebase from "../firebase";

export const useTodoStore = defineStore("useTodoStore", {
  state: () => ({
    todos: [],
  }),

  actions: {
    initialGetAllTodo() {
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
            //!This variable is the index where the todos is located and it use to modefied delete the todos in the state todos
            const index = this.todos.findIndex((x) => x.id === todo.doc.id);
            //!Snapshot Edit Todos

            if (todo.type == "modified" && index >= 0) {
              let dateModUpdate = todo.doc.data().createdAt.toDate();
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
                text: todo.doc.data().text,
                done: todo.doc.data().done,
                id: todo.doc.id,
              };
              this.todos.splice(index, 1, payload);
            }
            //!Snapshot Added Todos
            if (todo.type == "modified" && index == -1) {
              let dateModAdded = todo.doc.data().createdAt.toDate();

              var todayModAdded = dateModAdded
                .toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
                .split(" ")
                .join("-");
              this.todos.unshift({
                createdAt: todayModAdded,
                text: todo.doc.data().text,
                done: todo.doc.data().done,
                id: todo.doc.id,
              });
            }
            //!Snapshot Delete Todos
            if (todo.type == "removed") {
              this.todos.splice(index, 1);
            }
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
      firebase.firestore().collection("todos").doc(payload.id).update({
        text: payload.text,
        done: payload.done,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    },
    deleteTodo(id) {
      firebase.firestore().collection("todos").doc(id).delete();
    },
  },
});
