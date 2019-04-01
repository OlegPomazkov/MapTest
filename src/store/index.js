import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	allPoints: [],
    pointDescs: []
  },

  getters: {
  	points: (state) => {
    	return state.allPoints.map( i => Object.assign({}, i))
    },
    pointDescriptions: (state) => {
      return state.pointDescs.map( i => Object.assign({}, i))
    },
  },
  
  mutations: {
  	SET_ALL_POINTS (state, arr) {
	    state.allPoints = arr
	  },
    SET_DESCRIPTION (state, obj) {
      state.pointDescs.push(obj)
    },
  },

  actions: {
  	setAllPoints({commit}, arr) {
	    commit('SET_ALL_POINTS', arr)
	  },
    setDescription({commit}, obj) {
      commit('SET_DESCRIPTION', obj)
    },
  }
})
