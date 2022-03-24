import firebase from "../firebase";

class Todo {
  getAll() {
    let todos = [];
    firebase.collection("todos").onSnapshot((querySnapshot) => {
      console.log("Snapshot");
      console.log(querySnapshot);
      todos = [];
      querySnapshot.forEach((doc) => {
        todos.push({
          key: doc.id,
          name: doc.data().name,
          age: doc.data().age,
        });
      });
    });
    console.log(todos);
  }

  //   create(tutorial) {
  //     return db.add(tutorial);
  //   }

  //   update(id, value) {
  //     return db.doc(id).update(value);
  //   }

  //   delete(id) {
  //     return db.doc(id).delete();
  //   }
}

export default new Todo();
