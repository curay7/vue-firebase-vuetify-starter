<template>
  <v-container fluid class="down-top-padding">
    <v-container class="pa-4" fluid="fluid" grid-list-md="grid-list-md">
      <v-layout wrap="wrap">
        <v-flex xs12="xs12">
          <h1 class="display-1 mb-1">Dashboard</h1>
        </v-flex>
        <v-flex xs12="xs12" md6="md6">
          <v-layout wrap="wrap">
            <v-flex v-for="stat in stats" :key="stat.number" xs6="xs6">
              <v-card class="text-xs-center" height="100%">
                <v-card-text>
                  <div class="display-1 mb-2">{{ stat.number }}</div>
                  {{ stat.label }}
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex md6="md6">
          <v-card>
            <v-card-text class="pa-5">
              <h3
                class="title blue-grey--text text--darken-2 font-weight-regular"
              >
                Our Visitors
              </h3>
              <h6 class="subtitle-2 font-weight-light">
                Different Devices Used to Visit
              </h6>
              <div class="pb-6">
                <v-sparkline
                  :fill="fill"
                  height="145px"
                  :gradient="gradient"
                  :line-width="width"
                  :padding="padding"
                  :smooth="radius || false"
                  :value="value"
                  auto-draw
                ></v-sparkline>
              </div>
              <div
                class="d-flex align-center justify-center border-top pt-4 pb-2"
              >
                <div class="d-flex align-center px-3">
                  <span class="info--text">
                    <span class="overline">
                      <i class="mdi mdi-brightness-1 mr-2"></i>
                    </span>
                    <span class="font-weight-regular">Mobile</span>
                  </span>
                </div>
                <div class="d-flex align-center px-3">
                  <span class="deep-purple--text text--lighten-1">
                    <span class="overline">
                      <i class="mdi mdi-brightness-1 mr-2"></i>
                    </span>
                    <span class="font-weight-regular">Desktop</span>
                  </span>
                </div>
                <div class="d-flex align-center px-3">
                  <span class="success--text">
                    <span class="overline">
                      <i class="mdi mdi-brightness-1 mr-2"></i>
                    </span>
                    <span class="font-weight-regular">Tablet</span>
                  </span>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12="xs12">
          <v-card>
            <v-card-title
              >Workers
              <v-spacer></v-spacer>
              <v-text-field
                v-model="userSearch"
                append-icon="mdi-magnify"
                label="Search"
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="userTableHeaders"
              :items="profiles"
              :search="userSearch"
            >
              <template v-slot:item="{ item }">
                <tr>
                  <td>
                    <v-list-item link @click="selectWorker(item)">
                      {{ item.userName }}
                    </v-list-item>
                  </td>

                  <td>{{ item.jobApplied }}</td>
                  <td>
                    <v-btn color="black" icon text x-large>
                      <v-icon dark>mdi-dots-vertical</v-icon></v-btn
                    >
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-row>
      <v-col cols="12" lg="6">
        <FirstPageTodo />
      </v-col>
      <v-col cols="12" lg="6">
        <v-card class="position-relative profile-card mb-7">
          <v-card-text class="pa-5">
            <div class="text-center">
              <img
                src="https://randomuser.me/api/portraits/men/81.jpg"
                alt="user"
                class="rounded-circle"
                width="100"
              />
              <h2 class="font-weight-regular">Angela Dominic</h2>
              <h6 class="op-5 font-weight-regular">Web Designer & Developer</h6>
              <v-btn
                color="deep-purple accent-2"
                x-large
                class="text-capitalize white--text mt-7"
                rounded
                >Follow</v-btn
              >
              <v-row class="mt-6">
                <v-col cols="4">
                  <h3
                    class="mb-0 font-weight-light blue-grey--text text--darken-2"
                  >
                    1099
                  </h3>
                  <small class="blue-grey--text text--darken-2">Articles</small>
                </v-col>
                <v-col cols="4">
                  <h3
                    class="mb-0 font-weight-light blue-grey--text text--darken-2"
                  >
                    23,469
                  </h3>
                  <small class="blue-grey--text text--darken-2"
                    >Followers</small
                  >
                </v-col>
                <v-col cols="4">
                  <h3
                    class="mb-0 font-weight-light blue-grey--text text--darken-2"
                  >
                    6035
                  </h3>
                  <small class="blue-grey--text text--darken-2"
                    >Following</small
                  >
                </v-col>
              </v-row>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- <v-col cols="12" lg="8">
        <v-card>
          <v-card-text class="pa-5">
            <div class="d-sm-flex align-center">
              <div>
                <h3
                  class="title blue-grey--text text--darken-2 font-weight-regular"
                >
                  Sales Overview
                </h3>
                <h6 class="subtitle-2 font-weight-light">
                  Ample Admin Vs Pixel Admin
                </h6>
              </div>
              <div class="ml-auto">
                <div class="d-flex align-center">
                  <div class="d-flex align-center px-2">
                    <span class="success--text">
                      <span class="overline">
                        <i class="mdi mdi-brightness-1 mr-2"></i>
                      </span>
                      <span class="font-weight-regular">Ample</span>
                    </span>
                  </div>
                  <div class="d-flex align-center px-2">
                    <span class="info--text">
                      <span class="overline">
                        <i class="mdi mdi-brightness-1 mr-2"></i>
                      </span>
                      <span class="font-weight-regular">Pixel</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-9">
              <v-sparkline
                type="bar"
                :fill="fill2"
                height="80px"
                :gradient="gradient2"
                :line-width="width2"
                :padding="padding2"
                :smooth="radius2 || false"
                :value="value2"
                auto-draw
              ></v-sparkline>
            </div>
          </v-card-text>
        </v-card>
      </v-col> -->

      <!-- <v-col cols="12" lg="8">
        <v-card>
          <v-card-text class="pa-5">
            <h3
              class="title blue-grey--text text--darken-2 font-weight-regular mb-4"
            >
              Activity Timeline
            </h3>
            <v-timeline>
              <v-timeline-item v-for="n in 4" :key="n" large>
                <template v-slot:icon>
                  <v-avatar>
                    <img src="http://i.pravatar.cc/64" />
                  </v-avatar>
                </template>
                <template v-slot:opposite>
                  <span>Tus eu perfecto</span>
                </template>
                <v-card class="elevation-2">
                  <v-card-title class="headline">Lorem ipsum</v-card-title>
                  <v-card-text
                    >Lorem ipsum dolor sit amet, no nam oblique veritus. Commune
                    scaevola imperdiet nec ut, sed euismod convenire principes
                    at. Est et nobis iisque percipit, an vim zril disputando
                    voluptatibus, vix an salutandi sententiae.</v-card-text
                  >
                </v-card>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col> -->
    </v-row>
    <v-dialog
      v-model="dialogSelectWorker"
      max-width="80%"
      transition="dialog-bottom-transition"
    >
      <ProfileInfo :profiles="profileSelect" />
    </v-dialog>
  </v-container>
</template>

<script>
import FirstPageTodo from "./FirstPageTodo.vue";
import ProfileInfo from "./ProfileInfo.vue";
import { userStore } from "../../../stores/userStore";
import { mapWritableState } from "pinia";

export default {
  name: "FirstPage",
  components: {
    FirstPageTodo,
    ProfileInfo,
  },
  data: () => ({
    fill: true,
    gradient: gradients[4],
    gradients,
    padding: 8,
    radius: 50,
    value: [0, 2, 5, 9, 5, 10, 3, 5, 1, 8, 2, 9, 0],
    width: 1,
    fill2: true,
    gradient2: gradients2[4],
    gradients2,
    radius2: 0,
    padding2: 0,
    value2: [1, 2, 5, 9, 5, 10, 3, 5, 1, 8, 2, 9, 4],
    width2: 4,

    selected: [2],
    items,

    //Table User
    drawer: true,
    mainMenu: {
      dashboard: "Dashboard",
      people: "Leads",
      business: "Companies",
      business_center: "Deals",
      file_copy: "Invoices",
      settings: "Settings",
    },
    stats,
    userTableHeaders,
    userSearch: "",

    //Dialog
    profileSelect: [],
    dialogSelectWorker: false,
  }),
  computed: {
    ...mapWritableState(userStore, ["profiles"]),
  },
  methods: {
    clickToggleDrawer() {
      this.drawer = !this.drawer;
    },
    clickDeleteTask(task) {
      const i = this.tasks.indexOf(task);
      this.tasks.splice(i, 1);
    },
    selectWorker(worker) {
      this.dialogSelectWorker = true;
      this.profileSelect = worker;
    },
  },
};

const gradients = [
  ["#6c757d"],
  ["#6c757d"],
  ["#6c757d", "#6c757d", "#6c757d"],
  ["#21c1d6", "21c1d6"],
  ["#21c1d6", "#21c1d6", "#21c1d6"],
  ["#21c1d6", "#21c1d6", "#21c1d6"],
];
const gradients2 = [
  ["#1e88e5"],
  ["#1e88e5"],
  ["#1e88e5", "#1e88e5", "#1e88e5"],
  ["#1e88e5", "#1e88e5"],
  ["#1e88e5", "#1e88e5", "#1e88e5"],
  ["#1e88e5", "#1e88e5", "#1e88e5"],
];

const items = [
  {
    action: "15 min",
    headline: "Brunch this weekend?",
    title: "Ali Connors",
    subtitle:
      "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
  },
  {
    action: "2 hr",
    headline: "Summer BBQ",
    title: "me, Scrott, Jennifer",
    subtitle: "Wish I could come, but I'm out of town this weekend.",
  },
  {
    action: "6 hr",
    headline: "Oui oui",
    title: "Sandra Adams",
    subtitle: "Do you have Paris recommendations? Have you ever been?",
  },
  {
    action: "12 hr",
    headline: "Birthday gift",
    title: "Trevor Hansen",
    subtitle: "Have any ideas about what we should get Heidi for her birthday?",
  },
  {
    action: "18hr",
    headline: "Recipe to try",
    title: "Britta Holt",
    subtitle: "We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
  },
];
const stats = [
  {
    number: "42",
    label: "New leads this week",
  },
  {
    number: "₱8,312",
    label: "Revenue this week",
  },
  {
    number: "233",
    label: "New leads this month",
  },
  {
    number: "₱24,748",
    label: "Revenue this month",
  },
  {
    number: "₱24,748",
    label: "Revenue this month",
  },
  {
    number: "₱24,748",
    label: "Revenue this month",
  },
];

const userTableHeaders = [
  {
    text: "Name",
    value: "userName",
  },
  {
    text: "Working",
    value: "jobApplied",
  },
  {
    text: "Email",
    value: "emailtext",
  },
];
</script>
