<template>
  <v-app>
    <!-- <v-card class=" overflow-hidden" height="150"> -->
      <v-app-bar color="deep-purple" dark app>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

        <v-toolbar-title>Cursos AlfaWeb</v-toolbar-title>
        <v-spacer></v-spacer>

        <span v-if="user !== null" class="mr-2">{{this.user.email}}</span>
        <v-btn color="deep-purple" @click="cerrarSesion" v-if="user">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list nav dense>
          <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
          >
            <v-list-item v-if="user">
              <v-btn to="/">
                <v-icon>mdi-home</v-icon>
              </v-btn>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>

            <v-list-item v-if="!user">
              <v-btn to="/login">
                <v-icon>mdi-account</v-icon>
              </v-btn>
              <v-list-item-title>Login</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="!user">
              <v-btn to="/register">
                <v-icon>mdi-account-plus</v-icon>
              </v-btn>
              <v-list-item-title>Registrate</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="user">
              <v-btn to="/administracion">
                <v-icon>mdi-bank-plus</v-icon>
              </v-btn>
              <v-list-item-title>Administración</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    <!-- </v-card> -->
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";

export default {
  name: "App",

  data: () => ({
    drawer: false,
    group: null,
    user: null,
  }),
  created() {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      this.user = user;
    });
  },
  methods: {
    async cerrarSesion() {
      await signOut(auth);
      this.$router.push("/login")
    },
  },
};
</script>