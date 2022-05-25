<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- TableSimpleDarktheme -->
  <!-- ----------------------------------------------------------------------------- -->
  <div>
    <v-list-item-subtitle class="text-wrap">
      <h1>{{ jobType }}</h1>
    </v-list-item-subtitle>
    <div class="mt-4">
      <v-simple-table dark>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">Calories</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="profile in profiles" :key="profile.userUid">
              <td>{{ profile.userName }}</td>
              <td>{{ profile.createdAt }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "TableSimpleDarktheme",
  props: {
    jobType: {
      type: String,
      required: true,
    },
    profiles: {
      type: Array,
      required: true,
    },
  },
  // data: () => ({
  //   desserts: [
  //     {
  //       name: "Frozen Yogurt",
  //       calories: 159,
  //     },
  //     {
  //       name: "Ice cream sandwich",
  //       calories: 237,
  //     },
  //     {
  //       name: "Eclair",
  //       calories: 262,
  //     },
  //     {
  //       name: "Cupcake",
  //       calories: 305,
  //     },
  //     {
  //       name: "Gingerbread",
  //       calories: 356,
  //     },
  //     {
  //       name: "Jelly bean",
  //       calories: 375,
  //     },
  //     {
  //       name: "Lollipop",
  //       calories: 392,
  //     },
  //     {
  //       name: "Honeycomb",
  //       calories: 408,
  //     },
  //     {
  //       name: "Donut",
  //       calories: 452,
  //     },
  //     {
  //       name: "KitKat",
  //       calories: 518,
  //     },
  //   ],
  // }),
};
</script>
