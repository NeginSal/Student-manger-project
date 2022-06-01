import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        students: []
    },
    getters: {
        students: state => state.students.map(s => ({ ...s, fullName: s.firstName + ' ' + s.lastName })),
        findStudent: state => id => state.students.find(s => s.id == id),
        isLoaded: state=> !!state.students
    }
})