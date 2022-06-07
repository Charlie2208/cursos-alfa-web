import Vue from 'vue'
import Vuex from 'vuex'
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc } from '@firebase/firestore';
import { db } from '../firebase';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cursos: []
  },
  mutations: {
    GET_CURSOS(state, payload) {
      state.cursos = payload;
    },
  },
  actions: {
    async get_cursos({ commit }) {
      try {
        const q = query(
          collection(db, "cursos"),
        );
        onSnapshot(q, (querySnapshot) => {
          const cursos = [];
          querySnapshot.forEach((doc) => {
            cursos.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          commit("GET_CURSOS", cursos);
        });
      } catch (error) {
        console.log(error);
      }
    },
    async add_curso({ commit }, curso) {
      try {
        await addDoc(collection(db, "cursos",), {
          nombre: curso.nombre,
          costo: curso.costo,
          cupos: curso.cupos,
          descripcion: curso.descripcion,
          fecha: curso.fecha,
          src: curso.src,
        });
      } catch (error) {
        console.log(error)
      }
    },
    async delete_curso({ commit }, id) {
      try {
        const docRef = doc(db, "cursos", id)
        await deleteDoc(docRef)
      } catch (error) {
        console.log(error)
      }

    },
    async update_curso({ commit }, curso) {
      try {
        const docRef = doc(db, "cursos", curso.id);
        await updateDoc(docRef, {
          nombre: curso.nombre,
          costo: curso.costo,
          cupos: curso.cupos,
          descripcion: curso.descripcion,
          fecha: curso.fecha,
          src: curso.src,
        });
      } catch (error) {
        console.log(error);
      }
    }
  },
})
