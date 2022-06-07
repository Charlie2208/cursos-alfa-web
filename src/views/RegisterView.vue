<template>
  <div>
        <v-row justify="center">
        <v-col cols="8" md="8">
            <h1 class="h-1">Registrar Usuario</h1>
            <v-form ref="formRegister" v-model="valid" lazy-validation>
            <v-text-field
                v-model="user.email"
                :rules="emailRules"
                label="E-mail"
                required
            ></v-text-field>

            <v-text-field
                v-model="user.password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="passwordRules"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="password"
                counter
                @click:append="show1 = !show1"
            ></v-text-field>

            <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="registrarUser"
            >
                Registrar
            </v-btn>

            <v-btn color="error" class="mr-4" @click="reset"> Limpiar Formulario </v-btn>

            <v-btn color="warning" @click="reset">
                Limpiar Validación
            </v-btn>
            </v-form>
        </v-col>
        </v-row>
  </div>
</template>

<script>
import { auth } from "@/firebase";
import { createUserWithEmailAndPassword } from "@firebase/auth";

export default {
  data() {
    return {
      valid: false,
      user: {
        email: "",
        password: "",
      },
      show1: false,
      emailRules: [
        (v) => (v && !!v.trim()) || "Escribe algo, no espacios!",
        (v) => !!v || "No existe",
        (v) =>
          /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(v) ||
          "Formato de email incorrecto",
      ],
      passwordRules: [
        (v) => !!v || "No existe",
        (v) => (v && v.length > 5) || "Email sobre 6 carácteres",
      ],
    };
  },
  methods: {
    async registrarUser() {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.user.email,
          this.user.password
        );
        this.$router.push({ name: 'login' })
        console.log(userCredential);
      } catch (error) {
        console.log(error);
      }
    },
    reset() {
      console.log("reset...");
      this.$refs.formRegister.reset();
    },
  },
};
</script>