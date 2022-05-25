<template>
  <v-container fluid class="down-top-padding">
    <v-row>
      <v-col cols="12" lg="4">
        <v-card>
          <v-card-text class="text-center pa-7">
            <img
              src="https://cdn-icons-png.flaticon.com/512/64/64572.png"
              alt="user"
              width="150px"
              class="img-fluid rounded-circle shadow-sm"
            />
            <h4
              class="mt-2 title blue-grey--text text--darken-2 font-weight-regular"
            >
              {{ userName }}
            </h4>
            <h6 class="subtitle-2 font-weight-light">
              Accoubts Manager Amix corp
            </h6>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" lg="8">
        <v-card>
          <v-card-text>
            <h3
              class="title blue-grey--text text--darken-2 font-weight-regular"
            >
              Default Form
            </h3>
            <h6 class="subtitle-2 font-weight-light">
              All with vuetify element attributes
            </h6>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            <v-text-field
              v-model="userName"
              label="Default Text e.g. 'George deo'"
              filled
              background-color="transparent"
            ></v-text-field>
            <v-text-field
              type="email"
              v-model="emailtext"
              label="Email e.g. 'example@gmail.com"
              filled
              background-color="transparent"
            ></v-text-field>
            <v-text-field
              v-model="password"
              filled
              background-color="transparent"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              hint="At least 8 characters"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>
            <v-textarea
              filled
              name="input-7-4"
              rows="3"
              label="Textarea"
              value
              background-color="transparent"
            ></v-textarea>
            <div class="mt-4">
              <v-select
                :items="items"
                v-model="jobApplied"
                filled
                label="Select Jobs"
                background-color="transparent"
              ></v-select>
            </div>
            <v-btn
              class="text-capitalize mt-5 element-0"
              color="success"
              @click="createUser"
              >Submit</v-btn
            >
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { userStore } from "../../stores/userStore";
import firebase from "firebase";
export default {
  name: "DashboardCreateUser",

  data: () => ({
    userName: "",
    emailtext: "",
    password: "",
    jobApplied: "",
    disableinput: "",
    userUid: "",
    show1: false,
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      emailMatch: () => "The email and password you entered don't match",
    },
    items: [
      "Electrician",
      "Traffic Enforcer",
      "Water Distribution",
      ["Tourist Guide"],
    ],
  }),
  components: {},
  methods: {
    createUser() {
      var payload = {
        userName: this.userName,
        emailtext: this.emailtext,
        password: this.password,
        jobApplied: this.jobApplied,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        userUid: "",
      };
      userStore().createUserSaveProfile(payload);
    },
  },
};
</script>
