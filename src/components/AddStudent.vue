<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="firstname"
            :rules="nameRules"
            :counter="10"
            label="İsim"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="lastname"
            :rules="nameRules"
            :counter="10"
            label="Soyisim"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="numara"
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
    </v-container>
  </v-form>
</template>

<script>
import { required, between } from "vuelidate/lib/validators";
export default {
  data: () => ({
    valid: true,
    firstname: "",
    lastname: "",
    numara: "",
    midterm: "",
    final: "",
    basari_notu: "",
    harf_notu: "",
    puanRules: [
      (v) =>
        (0 <= v && v <= 100) || "puanın 0 ve 100 arasında olması gerekiyor",
    ],
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => v.length <= 10 || "Name must be less than 10 characters",
    ],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
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
