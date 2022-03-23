<template>
  <v-app id="inspire">
    <DashboardHeader v-model="expandOnHover"></DashboardHeader>
    <DashboardSidebar :expand-on-hover.sync="expandOnHover"></DashboardSidebar>
    <v-content>
      <v-container class="fill-height" fluid>
        <router-view />
      </v-container>
    </v-content>

    <!-- <DashboardFooter></DashboardFooter> -->
  </v-app>
</template>

<script>
import DashboardHeader from "./header/DashboardHeader";
import DashboardSidebar from "./sidebar/DashboardSidebar";
//import DashboardFooter from "./footer/DashboardFooter";
import { mapState, mapMutations } from "vuex";
export default {
  name: "DashboardLayout",

  components: {
    DashboardHeader,
    DashboardSidebar,
    //    DashboardFooter,
  },

  props: {
    source: String,
  },
  data: () => ({
    expandOnHover: false,
  }),
  computed: {
    ...mapState(["Customizer_drawer"]),
  },

  methods: {
    ...mapMutations({
      setCustomizerDrawer: "SET_CUSTOMIZER_DRAWER",
    }),
  },
};
</script>
