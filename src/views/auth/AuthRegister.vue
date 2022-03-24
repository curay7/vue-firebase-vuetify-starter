<template>
  <v-row>
    <v-col cols="12" md="6" class="blue rounded-br-xl">
      <div style="text-align: center; padding: 180px 0">
        <v-card-text class="white--text">
          <h2 class="text-center">Alredy Signed up?</h2>
          <h4 class="text-center">
            Log in to your account so you can continue building and<br />
            editing your onboarding flows
          </h4>
        </v-card-text>
        <div class="text-center">
          <v-btn tile outlined dark to="/login">Log in</v-btn>
        </div>
      </div>
    </v-col>

    <v-col cols="12" md="6">
      <v-card-text class="mt-12">
        <v-container>
          <h3 class="text-center">Sign Up for an Account</h3>
          <h4 class="text-center grey--text">
            Let's get you all set up so you can start creatin your <br />
            first onboarding experiance
          </h4>
        </v-container>
        <v-row justify="center">
          <v-col cols="12" sm="8">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    label="First Name"
                    outlined
                    dense
                    color="blue"
                    autocomplete="false"
                    class="mt-4"
                    v-model="user.firstname"
                    :rules="nameRules"
                    required
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    label="Last Name"
                    outlined
                    dense
                    color="blue"
                    autocomplete="false"
                    class="mt-4"
                    v-model="user.lastname"
                    :rules="nameRules"
                    required
                  />
                </v-col>
              </v-row>
              <v-text-field
                v-model="user.email"
                :rules="emailRules"
                label="E-mail"
                required
                outlined
                dense
                color="blue"
              ></v-text-field>

              <v-text-field
                v-model="user.password"
                label="Password"
                outlined
                dense
                color="blue"
                autocomplete="false"
                type="password"
                :rules="passwordRules"
              />
              <v-text-field
                v-model="user.passwordConfirm"
                label="Confirm Password"
                :rules="confirmPasswordRules.concat(passwordConfirmationRule)"
                required
                outlined
                dense
                color="blue"
                autocomplete="false"
                type="password"
              />
              <v-row>
                <v-col cols="12" sm="7">
                  <v-checkbox
                    v-model="user.checkbox"
                    :rules="[(v) => !!v || 'You must agree to continue!']"
                    label="Do you agree?"
                    required
                  ></v-checkbox>
                </v-col>
                <v-col cols="12" sm="5">
                  <span class="caption blue--text ml-n4"
                    >Terms &Conditions</span
                  >
                </v-col>
              </v-row>
              <v-btn color="blue" dark block tile class="mr-4" @click="validate"
                >Sign up</v-btn
              >

              <h4 class="text-center grey--text mt-4 mb-3">Or Sign up using</h4>
              <div
                class="d-flex justify-space-between align-center mx-10 mb-11"
              >
                <v-btn depressed outlined color="grey">
                  <v-icon color="red">fab fa-google</v-icon>
                </v-btn>
                <v-btn depressed outlined color="grey">
                  <v-icon color="blue">fab fa-facebook-f</v-icon>
                </v-btn>
                <v-btn depressed outlined color="grey">
                  <v-icon color="light-blue lighten-3">fab fa-twitter</v-icon>
                </v-btn>
              </div>
            </v-form>
          </v-col>
        </v-row>
      </v-card-text>
    </v-col>
  </v-row>
</template>

<script>
//import firebaseApp from "firebase";
import { mapActions, mapState } from "vuex";

export default {
  data: () => ({
    valid: false,
    step: 1,
    user: {
      lastname: "",
      firstname: "",
      email: "",
      password: "",
      passwordConfirm: "",
      checkbox: false,
    },

    //Roles
    nameRules: [(v) => !!v || "Name is required"],
    passwordRules: [
      (v) => !!v || "Passowrd is required",
      (v) => (v && v.length >= 6) || "Password must be less than 10 characters",
    ],
    confirmPasswordRules: [(v) => !!v || "Password is required"],

    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
  }),

  methods: {
    async validate() {
      var valid = this.$refs.form.validate();
      if (valid) {
        console.log("strted");
        let payload = {
          email: this.user.email,
          password: this.user.password,
        };
        this.createNewUserAccount(payload)
          .then(() => {
            const Toast = this.$swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", this.$swal.stopTimer);
                toast.addEventListener("mouseleave", this.$swal.resumeTimer);
              },
            });

            Toast.fire({
              icon: "success",
              title: "Signed in successfully",
            });
            this.$router.push("/");
          })
          .catch((e) => {
            if (e == "auth/email-already-in-use") {
              this.$swal.fire({
                icon: "error",
                title: "Invalid Email",
                text: "Email is already in use",
              });
            }
            console.log(e);
          });
        // try {
        //   firebaseApp
        //     .auth()
        //     .createUserWithEmailAndPassword(this.email, this.password);
        //   const Toast = await this.$swal.mixin({
        //     toast: true,
        //     position: "top-end",
        //     showConfirmButton: false,
        //     timer: 3000,
        //     timerProgressBar: true,
        //     didOpen: (toast) => {
        //       toast.addEventListener("mouseenter", this.$swal.stopTimer);
        //       toast.addEventListener("mouseleave", this.$swal.resumeTimer);
        //     },
        //   });

        //   Toast.fire({
        //     icon: "success",
        //     title: "Signed in successfully",
        //   });
        //   this.$router.push("/");
        // } catch (e) {
        //   console.log(e);
        // }
      }
    },
    ...mapActions(["createNewUserAccount", "signInUser"]),
  },
  computed: {
    passwordConfirmationRule() {
      return () =>
        this.password === this.passwordConfirm || "Password must match";
    },
    ...mapState({
      loginLoading: (state) => state.loadings.login,
    }),
  },
};
</script>
<style scoped>
.v-application .rounded-bl-xl {
  border-bottom-left-radius: 300px !important;
}
.v-application .rounded-br-xl {
  border-bottom-right-radius: 300px !important;
}
</style>
