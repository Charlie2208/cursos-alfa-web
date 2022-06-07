<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h1>Lista de Cursos</h1>
      </v-col>
    </v-row>
    <v-row wrap justify-space-around>
      <v-flex v-for="(curso, i) in cursos" :key="i">
        <v-card width="200">
           <v-img
            height="200px"
            :src="curso.src"
          >
          </v-img>
          <v-card-text>
            {{ curso.nombre }}
          </v-card-text>
        </v-card>
      </v-flex>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "HelloWorld",
  data() {
    return {
      curso: {
        nombre: "",
        costo: "",
        cupos: "",
        descripcion: "",
        fecha: "",
        src: "",
      },
    };
  },
  methods: {
    ...mapActions(["get_cursos"]),
  },
  computed: {
    ...mapState(["cursos"]),
  },
  created() {
    this.get_cursos();
  },
};
</script>