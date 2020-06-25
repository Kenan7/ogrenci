<template>
  <!-- <v-card class="mx-auto" max-width="300" tile>
    <v-list shaped>
      <v-subheader>REPORTS</v-subheader>
      <v-list-item-group color="primary">
        <v-list-item v-for="ogrenci in ogrenciler" :key="ogrenci.onumara">
          <v-list-item-content>
            <v-list-item-title v-text="ogrenci.isim"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card> -->

  <v-card>
    <v-card-title>
      Öğrenciler
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Birşeyler ara..."
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="Basliklar"
      :items="ogrenciler"
      :search="search"
      :sort-by="[
        'isim',
        'soyisim',
        'onumara',
        'vize',
        'final',
        'basari_notu',
        'harf_notu',
      ]"
      class="elevation-1"
      :hide-default-footer="true"
    >
      <template v-slot:item.basari_notu="{ item }">
        <v-chip :color="getColor(item.basari_notu)" dark>{{
          item.basari_notu
        }}</v-chip>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
/* eslint-disable no-unused-vars */
import { db, TumOgrenciler } from "@/firebaseInit";
export default {
  data() {
    return {
      search: "",
      ogrenciler: [],
      Basliklar: [
        {
          text: "İsim",
          align: "center",
          value: "isim",
        },
        { text: "Soyisim", value: "soyisim", align: "center" },
        { text: "Öğrenci numarası", value: "onumara", align: "center" },
        { text: "Vize puanı", value: "vize", align: "center" },
        { text: "Final puanı", value: "final", align: "center" },
        { text: "Başarı notu", value: "basari_notu", align: "center" },
        { text: "Harf notu", value: "harf_notu", align: "center" },
      ],
    };
  },
  firestore() {},
  created() {
    // return {
    //   ogrenciler: TumOgrenciler,
    // };
    TumOgrenciler.get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const data = {
            isim: doc.data().isim,
            soyisim: doc.data().soyisim,
            onumara: doc.data().onumara,
            vize: doc.data().vize,
            final: doc.data().final,
            basari_notu: doc.data().basari_notu,
            harf_notu: doc.data().harf_notu,
          };
          this.ogrenciler.push(data);
        });
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
  },
  methods: {
    getColor(basari_notu) {
      if (basari_notu >= 0 && basari_notu <= 24) {
        return "red";
      }
      if (basari_notu >= 25 && basari_notu <= 49) {
        return "orange";
      }
      if (basari_notu >= 50 && basari_notu <= 74) {
        return "yellow darken-1";
      }
      if (basari_notu >= 75 && basari_notu <= 100) {
        return "green";
      } else return "red";
    },
  },
};
</script>
