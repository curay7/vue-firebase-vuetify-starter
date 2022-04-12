<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-card-text class="mt-12">
        <h3 class="text-center">Login in to Your Account</h3>
        <h4 class="text-center grey--text">
          Log in to your account so you can continue builiding
          <br />and editing your onboarding flows
        </h4>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                label="Email"
                outlined
                dense
                color="blue"
                v-model="user.email"
                autocomplete="false"
                :rules="emailRules"
                class="mt-16"
              />
              <v-text-field
                label="Password"
                outlined
                dense
                color="blue"
                v-model="user.password"
                autocomplete="false"
                :rules="passwordRules"
                type="password"
              />
              <v-row>
                <v-col cols="12" sm="5">
                  <span class="caption blue--text">Forgot password</span>
                </v-col>
              </v-row>
              <v-btn color="blue" dark block tile class="mr-4" @click="validate"
                >Log in</v-btn
              >

              <h4 class="text-center grey--text mt-4 mb-3">Or Log in using</h4>
              <div
                class="d-flex justify-space-between align-center mx-10 mb-16"
              >
                <v-btn
                  depressed
                  outlined
                  color="grey"
                  icon
                  x-large
                  @click="loginWithGoogle"
                >
                  <v-icon color="red">fab fa-google</v-icon>
                </v-btn>
                <v-btn depressed outlined color="grey" icon x-large>
                  <v-icon color="blue">fab fa-facebook-f</v-icon>
                </v-btn>
                <v-btn depressed outlined color="grey" icon x-large>
                  <v-icon color="light-blue lighten-3">fab fa-twitter</v-icon>
                </v-btn>
              </div>
            </v-form>
          </v-col>
        </v-row>
      </v-card-text>
    </v-col>

    <v-col cols="12" md="6" class="blue rounded-bl-xl">
      <div style="text-align: center; padding: 180px 0">
        <v-card-text class="white--text">
          <h2 class="text-center">Don't Have an Account Yet?</h2>
          <h4 class="text-center">
            Let's get you all set up so you can start creating your your
            first<br />
            onboarding experience
          </h4>
        </v-card-text>
        <div class="text-center">
          <v-btn tile outlined dark to="/register">SIGN UP</v-btn>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from "pinia";
import { userAuthStore } from "../../stores/authStore";

export default {
  data: () => ({
    step: 1,
    user: {
      email: "",
      password: "",
    },
    valid: false,

    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
    passwordRules: [
      (v) => !!v || "Passowrd is required",
      (v) => (v && v.length >= 6) || "Password must be less than 10 characters",
    ],
    alert: false,
  }),
  methods: {
    async validate() {
      var valid = await this.$refs.form.validate();
      if (valid) {
        let payload = {
          email: this.user.email,
          password: this.user.password,
        };
        this.signInUser(payload)
          .then(() => {
            const Toast = this.$swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 2000,
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
            console.log("Find error");
            console.log(e);
            if (e == "auth/user-not-found") {
              this.$swal.fire({
                icon: "error",
                title: "Invalid Credential",
                text: "Please enter a correct email and password. ",
              });
            }
            if (e == "auth/wrong-password") {
              this.$swal.fire({
                icon: "info",
                title: "Password was incorrect",
                text: "Please enter a correct password. ",
              });
            }
          });
      }
    },

    loginWithGoogle() {
      this.loginGoogle()
        .then(() => {
          const Toast = this.$swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
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
          console.log(e);
          this.$swal.fire({
            icon: "error",
            title: "Invalid Credential",
            text: "Please enter valid Credential. ",
          });
        });
    },

    ...mapActions(userAuthStore, ["loginGoogle", "signInUser"]),
  },
  // computed: mapState({
  //   loginLoading: (state) => state.loadings.login,
  // }),
};
</script>
<style scoped>
.v-application .rounded-bl-xl {
  border-bottom-left-radius: 270px !important;
}
.v-application .rounded-br-xl {
  border-bottom-right-radius: 270px !important;
}
</style>
