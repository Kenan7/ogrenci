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

      <v-spacer></v-spacer>
      <v-btn dark to="/" class="mx-4">Listele</v-btn>
      <v-btn dark to="/ekle" color="green darken-5">Öğrenci Ekle</v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  }),
};
</script>
