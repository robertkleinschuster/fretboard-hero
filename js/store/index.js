import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

const game = {
  state: () => ({
    points: 0,
    errors: 0,
    currentTargenNote: {
      note: {
        name: "",
        id: null
      },
      details: {
        idOnInstrument: null
      }
    },
    selectedNote: {
      note: {
        name: "",
        id: null
      },
      details: {
        idOnInstrument: null
      }
    }
  }),
  mutations: {
    incrementPoints (state) {
      state.points++
    },
    incrementErrors (state) {
      state.errors++
    },
    reset (state) {
      state.points = 0;
      state.errors = 0;
      state.currentTargenNote = {
        note: {
          name: "",
            id: null
        },
        details: {
          idOnInstrument: null
        }
      };
      state.selectedNote =  {
        note: {
          name: "",
            id: null
        },
        details: {
          idOnInstrument: null
        }
      };
    }
  },
  actions: {

  },
  getters: {

  }
}

export default new Vuex.Store( {
  modules: {
    game
  }
});
