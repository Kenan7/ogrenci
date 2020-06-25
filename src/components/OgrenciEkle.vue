<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="isim"
            :rules="n1Rules"
            label="İsim"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="soyisim"
            :rules="n2Rules"
            label="Soyisim"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="onumara"
            :rules="n3Rules"
            label="Öğrenci numarası"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="midterm"
            label="Vize notu"
            required
            @change="calculate"
            :rules="puanRules"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="final"
            label="Final notu"
            required
            @change="calculate"
            :rules="puanRules"
          ></v-text-field>
        </v-col>

        <v-row justify="center">
          <v-col cols="12" md="3">
            <v-text-field
              v-model="basari_notu"
              label="Başarı notu"
              required
              readonly
              >{{ basari_notu }}</v-text-field
            >
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="harf_notu"
              label="Harf notu"
              required
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
      </v-row>
      <v-row justify="center" align="center">
        <v-col cols="12" md="2"
          ><v-btn dark @click="this.ogrenciEkle">Ekle</v-btn></v-col
        >
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import db from "@/firebaseInit";
import { required, between } from "vuelidate/lib/validators";
export default {
  data: () => ({
    valid: true,
    isim: "",
    soyisim: "",
    onumara: "",
    midterm: "",
    final: "",
    basari_notu: "",
    harf_notu: "",
    puanRules: [
      (v) =>
        (0 <= v && v <= 100) || "Puanın 0 ve 100 arasında olması gerekiyor",
    ],
    n1Rules: [(v) => !!v || "İsim yazman gerekiyor"],
    n2Rules: [(v) => !!v || "Soyisim yazman gerekiyor"],
    n3Rules: [(v) => !!v || "Öğrenci numarasını yazman gerekiyor"],
  }),

  watch: {
    // midterm: function() {
    //   this.calculate();
    // },
    // final: function() {
    //   this.calculate();
    // },
  },
  computed: {
    // harf_notu() {
    //   if (this.basari_notu >= 0 && this.basari_notu <= 24) {
    //     return "D";
    //   }
    //   if (this.basari_notu >= 25 && this.basari_notu <= 49) {
    //     return "C";
    //   }
    //   if (this.basari_notu >= 50 && this.basari_notu <= 74) {
    //     return "B";
    //   }
    //   if (this.basari_notu >= 75 && this.basari_notu <= 100) {
    //     return "A";
    //   }
    //   return "F";
    // },
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    calculate: function() {
      if (this.valid) {
        this.basari_notu = this.midterm * 0.4 + this.final * 0.6;
        if (this.basari_notu >= 0 && this.basari_notu <= 24) {
          return (this.harf_notu = "D");
        }
        if (this.basari_notu >= 25 && this.basari_notu <= 49) {
          return (this.harf_notu = "C");
        }
        if (this.basari_notu >= 50 && this.basari_notu <= 74) {
          return (this.harf_notu = "B");
        }
        if (this.basari_notu >= 75 && this.basari_notu <= 100) {
          return (this.harf_notu = "A");
        }
        return (this.harf_notu = "F");
      }
    },

    ogrenciEkle: function() {
      db.collection("ogrenci")
        .doc(this.onumara)
        .set({
          isim: this.isim,
          soyisim: this.soyisim,
          onumara: this.onumara,
          vize: this.midterm,
          final: this.final,
          basari_notu: this.basari_notu,
          harf_notu: this.harf_notu,
        })
        .then(this.$router.push("/"));
    },
  },

  validations: {
    midterm: {
      required,
      minLength: between(0, 100),
    },
    final: {
      required,
      minLength: between(0, 100),
    },
  },
};
</script>
