import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        students: []
    },
    getters: {
        students: state => state.students.map(s => ({ ...s, fullName: s.firstName + ' ' + s.lastName })),
        findStudent: state => id => state.students.find(s => s.id == id),
        isLoaded: state => !!state.students
    },
    mutations: {
        setStudents(state, students) {
            state.students = students;
        },
        addStudents(state, student) {
            state.students.push(student);
        }
    },
    action:{
        async getStudents(context){
          let students = (await axios.get('http://localhost:3000/students')).data;
          context.commit('setStudents',students)
        }
    }
})