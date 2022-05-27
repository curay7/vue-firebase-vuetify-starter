<template>
  <v-container class="white">
    <v-img height="200px" src="https://i.ibb.co/3fBTGYZ/alicia.jpg"> </v-img>
    <v-row justify="center">
      <v-col
        align-self="start"
        class="d-flex justify-center align-center pa-0"
        cols="12"
      >
        <v-avatar class="profile avatar-center-heigth" color="grey" size="164">
          <v-img src="https://randomuser.me/api/portraits/men/81.jpg"></v-img>
        </v-avatar>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center py-0" cols="12">
        <v-list-item color="#0000" class="profile-text-name">
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              George Ayban
            </v-list-item-title>
            <v-list-item-subtitle>Mayor</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3" class="text-center">
        <v-list-item-content class="sutitles">
          <v-list-item-title class="text-h5 mb-1"> 550 </v-list-item-title>
          <v-list-item-subtitle>Trabalhos</v-list-item-subtitle>
        </v-list-item-content>
      </v-col>
      <v-col cols="3" class="text-center">
        <v-list-item-content class="sutitles">
          <v-list-item-title class="text-h5 mb-1"> 1002 </v-list-item-title>
          <v-list-item-subtitle>Curtidas</v-list-item-subtitle>
        </v-list-item-content>
      </v-col>
      <v-col cols="3" class="text-center">
        <v-list-item-content class="sutitles">
          <v-list-item-title class="text-h5 mb-1"> 10 </v-list-item-title>
          <v-list-item-subtitle>Seguindo</v-list-item-subtitle>
        </v-list-item-content>
      </v-col>
      <v-col cols="3" class="text-center">
        <v-list-item-content class="sutitles">
          <v-list-item-title class="text-h5 mb-1"> 10089 </v-list-item-title>
          <v-list-item-subtitle>Seguidores</v-list-item-subtitle>
        </v-list-item-content>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-end align-right pa-2" cols="6">
        <v-btn rounded color="primary" dark> Personal Information </v-btn>
      </v-col>
      <v-col class="d-flex justify-left align-left pa-2" cols="6">
        <v-btn rounded color="primary" dark> Contact </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
          <v-tab> Record Event </v-tab>
          <v-tab>Other Information</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-row class="fill-height">
              <v-col>
                <v-sheet height="64">
                  <v-toolbar flat>
                    <v-btn
                      outlined
                      class="mr-4"
                      color="grey darken-2"
                      @click="setToday"
                    >
                      Today
                    </v-btn>
                    <v-btn fab text small color="grey darken-2" @click="prev">
                      <v-icon small> mdi-chevron-left </v-icon>
                    </v-btn>
                    <v-btn fab text small color="grey darken-2" @click="next">
                      <v-icon small> mdi-chevron-right </v-icon>
                    </v-btn>
                    <v-toolbar-title v-if="$refs.calendar">
                      {{ $refs.calendar.title }}
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-menu bottom right>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          outlined
                          color="grey darken-2"
                          v-bind="attrs"
                          v-on="on"
                        >
                          <span>{{ typeToLabel[type] }}</span>
                          <v-icon right> mdi-menu-down </v-icon>
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-item @click="type = 'day'">
                          <v-list-item-title>Day</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="type = 'week'">
                          <v-list-item-title>Week</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="type = 'month'">
                          <v-list-item-title>Month</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="type = '4day'">
                          <v-list-item-title>4 days</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-toolbar>
                </v-sheet>
                <v-sheet height="600">
                  <v-calendar
                    ref="calendar"
                    v-model="focus"
                    color="primary"
                    :events="events"
                    :event-color="getEventColor"
                    :type="type"
                    @click:event="showEvent"
                    @click:more="viewDay"
                    @click:date="viewDay"
                    @change="updateRange"
                  ></v-calendar>
                  <v-menu
                    v-model="selectedOpen"
                    :close-on-content-click="false"
                    :activator="selectedElement"
                    offset-x
                  >
                    <v-card color="grey lighten-4" min-width="350px" flat>
                      <v-toolbar :color="selectedEvent.color" dark>
                        <v-btn icon>
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-toolbar-title
                          v-html="selectedEvent.name"
                        ></v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon>
                          <v-icon>mdi-heart</v-icon>
                        </v-btn>
                        <v-btn icon>
                          <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                      </v-toolbar>
                      <v-card-text>
                        <span v-html="selectedEvent.details"></span>
                      </v-card-text>
                      <v-card-actions>
                        <v-btn
                          text
                          color="secondary"
                          @click="selectedOpen = false"
                        >
                          Cancel
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-menu>
                </v-sheet>
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <v-card color="basil" flat>
              <v-card-text>Teste 2</v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      //Profile
      focus: "",
      type: "month",
      typeToLabel: {
        month: "Month",
        week: "Week",
        day: "Day",
        "4day": "4 Days",
      },
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      colors: [
        "blue",
        "indigo",
        "deep-purple",
        "cyan",
        "green",
        "orange",
        "grey darken-1",
      ],
      names: [
        "Duty",
        "Holiday",
        "PTO",
        "Meeting",
        "Event",
        "Conference",
        "Appointment",
      ],
      items: ["Record Event", "Other Information"],
      tab: null,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      //End Profile
    };
  },

  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
    onButtonClick() {
      this.isSelecting = true;
      window.addEventListener(
        "focus",
        () => {
          this.isSelecting = false;
        },
        { once: true }
      );

      this.$refs.uploader.click();
    },
    onFileChanged(e) {
      this.selectedFile = e.target.files[0];

      // do something
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        );
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    updateRange({ start, end }) {
      const events = [];

      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);
      const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = this.rnd(days, days + 20);

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0;
        const firstTimestamp = this.rnd(min.getTime(), max.getTime());
        const first = new Date(firstTimestamp - (firstTimestamp % 900000));
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
        const second = new Date(first.getTime() + secondTimestamp);

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay,
        });
      }

      this.events = events;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },
};
</script>

<style></style>
