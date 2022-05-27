<template>
  <v-navigation-drawer
    v-model="Sidebar_drawer"
    :dark="SidebarColor !== 'white'"
    mobile-break-point="960"
    clipped
    :right="$vuetify.rtl"
    mini-variant-width="70"
    :expand-on-hover="expandOnHover"
    app
    id="main-sidebar"
  >
    <v-list dense nav>
      <!---USer Area -->
      <v-list-item two-line class="px-0">
        <v-list-item-avatar>
          <img src="https://i.ibb.co/pP2Kpg8/profile-Picture.jpg" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Fedil Ayuban</v-list-item-title>
          <v-list-item-subtitle class="caption">Admin</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <!---USer Area -->
      <!---Sidebar Items -->
      <v-list-item
        v-for="item in items"
        :key="item.title"
        :to="item.to"
        :active-class="`success white--text`"
        link
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link @click="logout">
        <v-list-item-icon>
          <v-icon> mdi-logout</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Log Out</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <!---Sidebar Items -->
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";
import { useTodoStore } from "../../stores/todoStore";
import { userStore } from "../../stores/userStore";
import firebase from "../../firebase";

export default {
  name: "DashboardSidebar",
  props: {
    expandOnHover: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    items: [
      {
        title: "Dashboard",
        icon: "mdi-view-dashboard",
        to: "/dashboard/home",
      },
      {
        title: "Department",
        icon: "mdi-table-column-width",
        to: "/pages/tables-simple",
      },

      {
        title: "Apply Person",
        icon: "mdi-account-plus",
        to: "/pages/createuser",
      },
      {
        title: "Profile",
        icon: "mdi-account-circle",
        to: "/pages/profile",
      },

      // {
      //   title: "Alerts",
      //   icon: "mdi-alert",
      //   to: "/pages/alerts",
      // },

      // {
      //   title: "Icons",
      //   icon: "mdi-emoticon",
      //   to: "/pages/icons",
      // },
    ],
  }),
  computed: {
    ...mapState(["SidebarColor", "SidebarBg"]),
    Sidebar_drawer: {
      get() {
        return this.$store.state.Sidebar_drawer;
      },
      set(val) {
        this.$store.commit("SET_SIDEBAR_DRAWER", val);
      },
    },
  },
  watch: {
    "$vuetify.breakpoint.smAndDown"(val) {
      this.$emit("update:expandOnHover", !val);
    },
  },

  methods: {
    async logout() {
      this.$swal
        .fire({
          title: "Are you sure?",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Log Out",
        })
        .then((result) => {
          if (result.isConfirmed) {
            firebase
              .auth()
              .signOut()
              .then(() => {
                useTodoStore().todos = [];
                userStore().profiles = [];
                this.$router.replace({
                  name: "login",
                });
              })
              .catch(() => {
                alert("error");
              });
          }
        });
    },
  },
};
</script>
<style lang="scss">
#main-sidebar {
  box-shadow: 1px 0 20px rgba(0, 0, 0, 0.08);
  -webkit-box-shadow: 1px 0 20px rgba(0, 0, 0, 0.08);
  .v-navigation-drawer__border {
    display: none;
  }
  .v-list {
    padding: 8px 15px;
  }
  .v-list-item {
    &__icon--text,
    &__icon:first-child {
      justify-content: center;
      text-align: center;
      width: 20px;
    }
  }
}
</style>
