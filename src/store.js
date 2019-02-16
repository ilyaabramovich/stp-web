import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    difficulties: [
      { id: 1, name: "Уровень 1" },
      { id: 2, name: "Уровень 2" },
      { id: 3, name: "Уровень 3" }
    ]
  }
});
