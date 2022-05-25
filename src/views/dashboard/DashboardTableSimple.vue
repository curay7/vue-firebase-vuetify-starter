<template>
  <v-container fluid class="down-top-padding">
    <v-row>
      <v-col cols="12" sm="12">
        <v-card color="basil">
          <v-card-title class="text-center justify-center py-6">
            <h1 class="font-weight-bold text-h2 basil--text">Worker List</h1>
          </v-card-title>

          <v-tabs
            v-model="tab"
            background-color="transparent"
            color="basil"
            grow
          >
            <v-tab v-for="item in items" :key="item">
              {{ item }}
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-col cols="12" sm="12">
                <BaseCard heading="Table Simple - Fixed height">
                  <TableSimpleDarktheme
                    :profiles="workerTrafficEnforcer"
                    jobType="Traffic Enforcer"
                  ></TableSimpleDarktheme>
                </BaseCard>
              </v-col>
            </v-tab-item>
            <v-tab-item>
              <v-col cols="12" sm="12">
                <BaseCard heading="Table Simple - Fixed header">
                  <TableSimpleDarktheme
                    :profiles="workerElectrician"
                    jobType="Electrician"
                  ></TableSimpleDarktheme>
                </BaseCard>
              </v-col>
            </v-tab-item>
            <v-tab-item>
              <v-col cols="12" sm="12">
                <BaseCard heading="Table Simple - Dense table">
                  <TableSimpleDarktheme
                    :profiles="workerWaterDistribution"
                    jobType="Water Distribution"
                  ></TableSimpleDarktheme>
                </BaseCard>
              </v-col>
            </v-tab-item>
            <v-tab-item>
              <v-col cols="12" sm="12">
                <BaseCard heading="Table Simple - Dark theme">
                  <TableSimpleDarktheme
                    :profiles="workerTouristGuide"
                    jobType="Tourist Guide"
                  ></TableSimpleDarktheme>
                </BaseCard>
              </v-col>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>

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
      <!-- <v-col cols="12" sm="12">
        <BaseCard heading="Table Simple - Fixed height">
          <TableSimpleFixHeight></TableSimpleFixHeight>
        </BaseCard>

        <BaseCard heading="Table Simple - Fixed header">
          <TableSimpleFixHeader></TableSimpleFixHeader>
        </BaseCard>

        <BaseCard heading="Table Simple - Dense table">
          <TableSimpleDense></TableSimpleDense>
        </BaseCard>

        <BaseCard heading="Table Simple - Dark theme">
          <TableSimpleDarktheme></TableSimpleDarktheme>
        </BaseCard>
      </v-col> -->
    </v-row>
  </v-container>
</template>

<script>
import { userStore } from "../../stores/userStore";
import { mapWritableState } from "pinia";

export default {
  name: "TableSimple",

  data: () => ({
    tab: null,
    items: [
      "Electrician",
      "Traffic Enforcer",
      "Water Distribution",
      "Tourist Guide",
    ],
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  }),
  components: {
    TableSimpleDarktheme: () =>
      import(
        "@/components/vuetifyComponents/tables-simple/TableSimpleDarktheme"
      ),
  },
  computed: {
    ...mapWritableState(userStore, ["profiles"]),
    workerElectrician: function () {
      var listOfEWorker = [];
      this.profiles.forEach((profile) => {
        if (profile.jobApplied == "Electrician") {
          listOfEWorker.push(profile);
        }
      });
      return listOfEWorker;
    },
    workerTrafficEnforcer: function () {
      var listOfEWorker = [];
      this.profiles.forEach((profile) => {
        if (profile.jobApplied == "Traffic Enforcer") {
          listOfEWorker.push(profile);
        }
      });
      return listOfEWorker;
    },
    workerWaterDistribution: function () {
      var listOfEWorker = [];
      this.profiles.forEach((profile) => {
        if (profile.jobApplied == "Water Distribution") {
          listOfEWorker.push(profile);
        }
      });
      return listOfEWorker;
    },
    workerTouristGuide: function () {
      var listOfEWorker = [];
      this.profiles.forEach((profile) => {
        if (profile.jobApplied == "Tourist Guide") {
          listOfEWorker.push(profile);
        }
      });
      return listOfEWorker;
    },
  },
};
</script>
