<template>
  <v-app>
    <v-app-bar app color="grey lighten-3">
      <div class="d-flex align-center">
        <v-img
          alt="Mersin Logo"
          class="shrink mr-2"
          contain
          src="@/assets/mersin.png"
          transition="scale-transition"
          width="60"
        />

        <v-toolbar-title>Mersin Üniversitesi</v-toolbar-title>
      </div>
    </v-app-bar>

    <v-content>
      <AddStudent />
    </v-content>
  </v-app>
</template>

<script>
import AddStudent from "./components/AddStudent";

export default {
  name: "App",

  components: {
    AddStudent,
  },

  data: () => ({
    //
  }),
};
</script>
