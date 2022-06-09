<template>
  <div>
    <v-container>
      <h1 class="text-center h-1">Administración</h1>
      <v-btn color="blue darken-1" dark @click="activarAddCurso"
        >Agregar Curso</v-btn
      >
    </v-container>

    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Curso</th>
            <th class="text-left">Cupos</th>
            <th class="text-left">Inscritos</th>
            <th class="text-left">Duración</th>
            <th class="text-left">Costo</th>
            <th class="text-left">Terminado</th>
            <th class="text-left">Fecha</th>
            <th class="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cursos" :key="item.id">
            <td>{{ item.nombre }}</td>
            <td>{{ item.cupos }}</td>
            <td>{{ item.inscritos }}</td>
            <td>{{ item.duracion }}</td>
            <td>{{ item.costo }}</td>
            <td>{{ item.terminado }}</td>
            <td>{{ item.fecha }}</td>
            <td class="text-center">
              <v-icon small class="mr-2" @click="activarUpdate(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(id)"> mdi-delete </v-icon>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-dialog v-model="dialogAdd">
      <v-card>
        <v-card-title class="text-h5"> Agregando Curso </v-card-title>
        <v-card-text>
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field required label="Curso" v-model="curso.nombre" />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field required label="Cupos" v-model="curso.cupos" />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    required
                    label="Inscritos"
                    v-model="curso.inscritos"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    required
                    label="Duración"
                    v-model="curso.duracion"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field required label="Costo" v-model="curso.costo" />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    required
                    label="Terminado"
                    v-model="curso.terminado"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field required label="Fecha" v-model="curso.fecha" />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field required label="Imagen" v-model="curso.src" />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    required
                    label="Descripción"
                    v-model="curso.descripcion"
                  />
                </v-col>
              </v-row>
              <v-btn
                color="green darken-2"
                class="mr-4"
                dark
                @click="addCursoForm"
                >Agregar Curso</v-btn
              >
              <v-btn color="error" class="mr-4" @click="reset">
                Limpiar Formulario
              </v-btn>

              <v-btn color="warning" @click="reset"> Limpiar Validación </v-btn>
            </v-container>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title class="text-h5"> Editar </v-card-title>
        <v-card-text>
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field required label="Curso" v-model="curso.nombre" />
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field required label="Cupos" v-model="curso.cupos" />
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    required
                    label="Inscritos"
                    v-model="curso.inscritos"
                  />
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    required
                    label="Duración"
                    v-model="curso.duracion"
                  />
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field required label="Costo" v-model="curso.costo" />
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    required
                    label="Terminado"
                    v-model="curso.terminado"
                  />
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field required label="Fecha" v-model="curso.fecha" />
                </v-col>
              </v-row>
              <v-btn block color="amber darken-2" dark @click="updateCursoForm"
                >Editar</v-btn
              >
            </v-container>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5"
          >Estas seguro de eliminar el curso?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete"
            >Cancelar</v-btn
          >
          <v-btn color="blue darken-1" text @click="deleteCursoItems(item.id)"
            >Si</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-alert dense outlined color="purple">
      Cantidad total de alumnos permitidos: 190
    </v-alert>
    <v-alert dense outlined color="blue">
      Cantidad total de alumnos inscritos: {{ alumnosInscritos }}
    </v-alert>
    <v-alert dense outlined color="orange">
      Cantidad total de cupos restantes: {{ cuposRestantes }}
    </v-alert>
    <v-alert dense outlined color="pink">
      Cantidad total de cursos terminados: {{ cursosTerminados }}
    </v-alert>
    <v-alert dense outlined color="brown">
      Cantidad total de cursos activos: {{ cursosActivos }}
    </v-alert>
    <v-alert dense outlined color="orange darken-1">
      Cantidad total de cursos: {{ totalCursos }}
    </v-alert>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      curso: {
        costo: "",
        cupos: "",
      },
      dialog: false,
      dialogAdd: false,
      dialogDelete: false,
    };
  },
  methods: {
    ...mapActions(["add_curso", "delete_curso", "update_curso", "get_cursos"]),
    activarAddCurso() {
      this.dialogAdd = true;
      this.curso = item;
    },
    addCursoForm() {
      this.add_curso({ ...this.curso });
      this.curso = {};
      this.dialogAdd = false;
    },
    deleteCursoItems(id) {
      this.delete_curso(id);
      this.dialogDelete = false;
    },
    deleteItem(id) {
      this.curso = id;
      this.dialogDelete = true;
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    activarUpdate(item) {
      this.dialog = true;
      this.curso = item;
    },
    updateCursoForm() {
      this.update_curso({ ...this.curso });
      this.curso = {};
      this.dialog = false;
    },
    reset() {
      console.log("reset...");
      this.$refs.formRegister.reset();
    },
  },
  computed: {
    ...mapState(["cursos"]),

    alumnosInscritos() {
      const totalInscritos = this.cursos.reduce(
        (acc, current) => +current.inscritos + acc,
        0
      );
      return totalInscritos;
    },
    cuposRestantes() {
      const cuposDisponibles = (190 - this.alumnosInscritos);
      return cuposDisponibles;
    },
    totalCursos() {
        return this.cursos.length;
    },
    cursosTerminados() {
        const terminados = this.cursos.filter(item => item.terminado.toUpperCase() ===
        "NO")
        console.log(terminados)
        return terminados.length
    },
    cursosActivos() {
        const terminados = this.cursos.filter(item => item.terminado.toUpperCase() ===
        "SI")
        console.log(terminados)
        return terminados.length
    }
  },

  created() {
    this.get_cursos();
  },
};
</script>