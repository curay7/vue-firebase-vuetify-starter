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
        <v-data-table
          :headers="headers"
          :items="todos"
          class="elevation-1"
          show-select
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-menu top :offset-x="offset">
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item>
                  <v-btn text tile icon @click="editItem(item)">
                    <v-icon small class="mr-2"> mdi-pencil </v-icon></v-btn
                  >
                </v-list-item>
                <v-list-item>
                  <v-btn text tile icon @click="deleteItem(item)">
                    <v-icon small class="mr-2"> mdi-delete </v-icon></v-btn
                  >
                </v-list-item>
              </v-list>
            </v-menu>
          </template>

          <template v-slot:top>
            <v-toolbar flat>
              <v-dialog v-model="dialog" max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="text-h5">Edit</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.text"
                            label="Dessert name"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.done"
                            label="Calories"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5"
                    >Are you sure you want to delete this item?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                      >OK</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
        </v-data-table>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapWritableState, mapActions } from "pinia";
import { useTodoStore } from "../../../stores/todoStore";
import firebase from "firebase";
export default {
  data() {
    return {
      //!table variable
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {
        text: "",
        done: 0,
      },
      headers: [
        {
          align: "start",
          sortable: false,
          value: "text",
        },
        { text: "done", value: "done", align: "right" },
        { text: "createdAt", value: "createdAt", align: "right" },
        { text: "Actions", value: "actions" },
      ],
      task: null,

      selected: [],
      singleSelect: false,
      offset: true,
    };
  },
  methods: {
    //!table methods
    async editItem(item) {
      this.editedIndex = this.todos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.todos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      let id = this.todos[this.editedIndex].id;
      this.deleteTodo(id);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        this.updateTodo(this.editedItem);
      } else {
        this.todos.push(this.editedItem);
      }
      this.close();
    },

    //!Firebase methods
    create() {
      let inpuTask = {
        done: false,
        text: this.task,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      };
      this.createTodo(inpuTask);

      this.task = null;
    },
    async updateTodo(todo) {
      let passTodo = await {
        id: todo.id,
        text: todo.text,
        done: todo.done,
        updateAt: firebase.firestore.FieldValue.serverTimestamp(),
      };
      this.todoUpdate(passTodo);
    },
    ...mapActions(useTodoStore, [
      "initialGetAllTodo",
      "createTodo",
      "updateTodo",
      "deleteTodo",
    ]),
  },
  computed: {
    progress() {
      return (this.completedTasks / this.todos.length) * 100;
    },
    remainingTasks() {
      return this.todos.length - this.completedTasks;
    },
    completedTasks() {
      return this.todos.filter((task) => {
        task.done;
      }).length;
    },
    ...mapWritableState(useTodoStore, ["todos"]),
  },

  mounted() {
    console.log("Test Mounted Bug in the first Load");
    this.initialGetAllTodo();
  },
};
</script>

<style></style>
