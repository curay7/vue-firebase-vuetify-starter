<template>
  <!-- 
          /**
            Todo
           */
          -->
  <v-card class="mb-7">
    <v-card-text class="pa-5">
      <h3 class="title blue-grey--text text--darken-2 font-weight-regular mb-4">
        Task
      </h3>
      <v-text-field
        v-model="task"
        label="What are you working on?"
        filled
        @keydown.enter="create"
      >
        <!-- <v-fade-transition v-slot:append> -->
        <v-fade-transition>
          <v-icon v-if="task" @click="create">add_circle</v-icon>
        </v-fade-transition>
      </v-text-field>

      <h2 class="font-weight-medium success--text text-center">
        Tasks:&nbsp;
        <v-fade-transition leave-absolute>
          <span :key="`tasks-${todos.length}`">{{ todos.length }}</span>
        </v-fade-transition>
      </h2>

      <v-divider class="mt-4"></v-divider>

      <v-row class="my-1" align="center">
        <span class="mx-4 info--text">Remaining: {{ remainingTasks }}</span>

        <v-divider vertical></v-divider>

        <span class="mx-4 success--text">Completed: {{ completedTasks }}</span>

        <v-spacer></v-spacer>

        <v-progress-circular
          :value="progress"
          class="mr-2"
        ></v-progress-circular>
      </v-row>

      <v-divider class="mb-4"></v-divider>
      <div></div>
      <v-card v-if="todos.length > 0">
        <v-slide-y-transition class="py-0" group>
          <template v-for="(todo, i) in todos">
            <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>

            <v-list-item :key="`${i}-${todo.text}`">
              <v-list-item-action>
                <v-checkbox
                  v-model="todo.done"
                  :color="(todo.done && 'grey') || 'primary'"
                >
                  <template v-slot:label>
                    <div
                      :class="
                        (todo.done && 'grey--text') ||
                        'blue-grey--text text--darken-2'
                      "
                      class="ml-4 text-truncate"
                      v-text="todo.text"
                    ></div>
                  </template>
                </v-checkbox>
              </v-list-item-action>

              <v-spacer></v-spacer>

              <v-scroll-x-transition>
                <v-icon v-if="todo.done" color="success">mdi-check</v-icon>
              </v-scroll-x-transition>
            </v-list-item>
          </template>
          <v-pagination v-model="todos" :length="todos"></v-pagination>
        </v-slide-y-transition>
      </v-card>
      <!-- <v-card v-if="todos.length > 0">
        <template>
          <v-data-table
            :headers="headers"
            :items="todos"
            :items-per-page="5"
            :single-select="false"
            sort-by="createdAt"
            class="elevation-1"
          ></v-data-table>
        </template>
      </v-card> -->
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";
import firebase from "firebase";
export default {
  data() {
    return {
      headers: [
        {
          align: "start",
          sortable: false,
          value: "text",
        },
        { text: "done", value: "done", align: "right" },
        { text: "createdAt", value: "createdAt", align: "right" },
      ],
      // tasks: this.$store.state.todos,
      task: null,
    };
  },
  methods: {
    create() {
      // this.tasks.push({
      //   done: false,
      //   text: this.task,
      // });
      this.todoSubmit({
        done: false,
        text: this.task,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      //Clear
      this.task = null;
    },
    async updateTodo(todo) {
      console.log(todo);
      let passTodo = await {
        id: todo.id,
        text: todo.text,
        done: todo.done,
        updateAt: firebase.firestore.FieldValue.serverTimestamp(),
      };
      console.log(passTodo);
      this.todoUpdate(passTodo);
    },
    ...mapActions(["todoSubmit", "todoGetAll", "todoUpdate"]),
  },
  computed: {
    progress() {
      return (this.completedTasks / this.todos.length) * 100;
    },
    remainingTasks() {
      return this.todos.length - this.completedTasks;
    },
    completedTasks() {
      return this.todos.filter((task) => task.done).length;
    },
    ...mapState(["todos"]),
    // ...mapState({
    //         newTodoLoading: state => state.loadings.newTodo,
    //         markTodosAsDoneLoading: state => state.loadings.markTodosAsDone,
    //         getAllTodosLoading: state => state.loadings.getAllTodos,
    //         deleteTodoLoading: state => state.loadings.deletingTodo,
    //         uncheckedTodos: 'uncheckedTodos',
    //         markedTodos: 'markedTodos',
    //     }),
  },
  // created() {
  //   this.todoGetAll();
  //   this.tasks = this.$store.state.todos;
  //   console.log(this.tasks);
  //   console.log("created");
  // },
  mounted() {
    console.log("mounted");
    this.$store.dispatch("todoGetAll");
  },
};
</script>

<style></style>
