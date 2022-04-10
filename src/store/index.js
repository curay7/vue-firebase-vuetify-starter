import Vue from "vue";
import Vuex from "vuex";
import firebase from "../firebase";
Vue.use(Vuex);
const DATABASE = "todo-list";

export default new Vuex.Store({
  state: {
    /**
     * User only
     */
    name: "",
    email: "",
    uid: "",

    todos: [],

    /**
     * Loading and animation
     */
    loadings: {
      login: false,
      newTodo: false,
      markTodosAsDone: false,
      getAllTodos: false,
      deletingTodo: false,
    },
    uncheckedTodos: [],
    markedTodos: [],

    /**
     * Design Config
     */
    Sidebar_drawer: null,
    Customizer_drawer: false,
    SidebarColor: "white",
    SidebarBg: "",
  },
  mutations: {
    setTodos(state, data) {
      state.todos = data;
    },
    setNewTodoLoading(state, data) {
      state.loadings.newTodo = data;
    },
    setMarkTodosAsDoneLoading(state, data) {
      state.loadings.markTodosAsDone = data;
    },
    setDeleteTodoLoading(state, data) {
      state.loadings.deletingTodo = data;
    },
    setAllTodosLoading(state, data) {
      state.loadings.getAllTodos = data;
    },
    setUserId(state, data) {
      state.uid = data;
    },
    setTodoList(state, data) {
      /**
       * The structure should be like
       * { todoId, todo, checked }
       * */
      state.markedTodos = [];
      state.uncheckedTodos = [];
      // Initially there will be no todo-list.
      if (data) {
        const todoIds = Object.keys(data);
        todoIds.forEach((todoId) => {
          if (data[todoId].checked) {
            state.markedTodos.push({
              todoId,
              ...data[todoId],
            });
          } else {
            state.uncheckedTodos.push({
              todoId,
              ...data[todoId],
            });
          }
        });
      }
    },
    beforeAuth(state) {
      state.loadings.login = true;
    },
    afterSuccessfulAuth(state, { name, email, uid }) {
      state.loadings.login = false;
      state.name = name;
      state.email = email;
      state.uid = uid;
    },
    afterErrorAuth(state) {
      state.loadings.login = false;
    },

    //Design
    SET_SIDEBAR_DRAWER(state, payload) {
      state.Sidebar_drawer = payload;
    },
    SET_CUSTOMIZER_DRAWER(state, payload) {
      state.Customizer_drawer = payload;
    },
    SET_SIDEBAR_COLOR(state, payload) {
      state.SidebarColor = payload;
    },
  },
  actions: {
    createNewUserAccount({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit("beforeAuth");
        // create new account.
        firebase
          .auth()
          .createUserWithEmailAndPassword(payload.email, payload.password)
          .then((response) => {
            commit("afterSuccessfulAuth", {
              uid: response.uid,
              ...payload,
            });
            resolve();
          })
          .catch((error) => {
            // Handle Errors here.
            commit("afterErrorAuth");
            reject(error.code);
          });
      });
    },
    signInUser({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit("beforeAuth");
        // Sign-in the user details.
        firebase
          .auth()
          .signInWithEmailAndPassword(payload.email, payload.password)
          .then((response) => {
            commit("afterSuccessfulAuth", {
              uid: response.uid,
              ...payload,
            });
            resolve();
          })
          .catch((error) => {
            // Handle Errors here.
            commit("afterErrorAuth");
            reject(error.code);
          });
      });
    },
    todoSubmit({ commit }, payload) {
      return new Promise((resolve) => {
        commit("setNewTodoLoading", true);
        firebase
          .firestore()
          .collection("todos")
          .add(payload)
          .then(() => {
            commit("setNewTodoLoading", false);
            resolve();
          });
      });
    },
    todoUpdate({ commit }, payload) {
      return new Promise((resolve) => {
        console.log("UPDATE!!!!");
        console.log(payload.id);
        commit("setNewTodoLoading", true);
        firebase
          .firestore()
          .collection("todos")
          .doc(payload.id)
          .update(payload)
          .then(() => {
            resolve;
          });
      });
    },
    // async todoGetAll({ commit }) {
    //   const todos = [];
    //   const response = await firebase
    //     .firestore()
    //     .collection("todos")
    //     .onSnapshot((querySnapshot) => {});

    //   response.forEach((todo) => {
    //     console.log(todo.id);
    //     console.log(todo.data());
    //     const todoObj = todo.data();
    //     todoObj.id = todo.id;
    //     todos.push(todoObj);
    //   });

    //   commit("setTodos", todos);
    // },
    async todoGetAll({ commit }) {
      return new Promise((resolve) => {
        commit("setAllTodosLoading", true);
        let todoList = [];
        firebase
          .firestore()
          .collection("todos")
          .orderBy("createdAt")
          .onSnapshot((res) => {
            let querySnapshot = res.docChanges();
            querySnapshot.forEach((todo) => {
              if (todo.type === "added") {
                todoList.push({
                  createdAt: todo.doc.data().createdAt,
                  text: todo.doc.data().text,
                  done: todo.doc.data().done,
                  id: todo.doc.id,
                });
              }
              // todoList.push({
              //   key: doc.id,
              //   text: doc.data().text,
              //   done: doc.data().done,
              // });
            });
            commit("setTodos", todoList);
            resolve();
          });
      });
    },
    submitTodoToFirebase({ commit, state }, payload) {
      return new Promise((resolve) => {
        commit("setNewTodoLoading", true);
        firebase
          .database()
          .ref(`${DATABASE}/${state.uid}`)
          .push(payload)
          .then(() => {
            commit("setNewTodoLoading", false);
            resolve();
          });
      });
    },
    getAllTodosForUser({ commit, state }) {
      commit("setAllTodosLoading", true);
      const todoList = firebase.database().ref(`${DATABASE}/${state.uid}`);
      todoList.on("value", (data) => {
        commit("setTodoList", data.val());
        commit("setAllTodosLoading", false);
      });
    },
    getCurrentUser({ commit }) {
      return new Promise((resolve, reject) => {
        const user = firebase.auth().currentUser;
        // if there is a logged in user.
        if (user) {
          commit("setUserId", user.uid);
          resolve();
        } else {
          reject();
        }
      });
    },
    markTodosAsDone({ commit, state }, payload) {
      commit("setMarkTodosAsDoneLoading", true);
      const updates = {};
      payload.forEach((item) => {
        updates[`/${item.todoId}/checked`] = true;
      });
      firebase
        .database()
        .ref(`${DATABASE}/${state.uid}`)
        .update(updates)
        .then(() => commit("setMarkTodosAsDoneLoading", false));
    },
    deleteTodo({ commit, state }, payload) {
      commit("setDeleteTodoLoading", true);
      const updates = {};
      updates[`/${payload.todoId}/`] = null;
      firebase
        .database()
        .ref(`${DATABASE}/${state.uid}`)
        .update(updates)
        .then(() => commit("setDeleteTodoLoading", false));
    },
  },
});

// import Vue from "vue";
// import Vuex from "vuex";

// Vue.use(Vuex);

// export default new Vuex.Store({
//   state: {
// Sidebar_drawer: null,
// Customizer_drawer: false,
// SidebarColor: "white",
// SidebarBg: "",
//   },
//   getters: {},
//   mutations: {
// SET_SIDEBAR_DRAWER(state, payload) {
//   state.Sidebar_drawer = payload;
// },
// SET_CUSTOMIZER_DRAWER(state, payload) {
//   state.Customizer_drawer = payload;
// },
// SET_SIDEBAR_COLOR(state, payload) {
//   state.SidebarColor = payload;
// },
//   },
//   actions: {},
//   modules: {},
// });
