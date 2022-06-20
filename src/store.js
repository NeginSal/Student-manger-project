import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";
import { convertCSS } from 'stylus';

Vue.use(Vuex);

const errorSystem = {
    state: {
        show: false,
        Text: 'Error'
    },
    mutations: {
        showError(state, message) {
            state.show = true;
            state.Text = message;
        }
    }
}

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
        },
        editStudents(state, student) {
            const index = state.students.findIndex(s => s.id == student.id);
            // state.students[index] = student;
            Vue.set(state.students, index, student)
        }
    },
    action: {
        async getStudents(context) {
            try {
                const students = (await axios.get('http://localhost:3000/students')).data;
                context.commit('setStudents', students);
            } catch (error) {
                context.commit('showError', error)

            }
        },

        async addStudents(context, { firstName, lastName }) {
            const student = (await axios.post("http://localhost:3000/students", { firstName, lastName })).data;
            context.commit('addStudents', student);
        },
        async editStudents(context, { id, names }) {
            const student = await (axios.put(`http://localhost:3000/students/${id}`, names)).data;
            context.commit('editStudents', student)
        }
    },
    modules:{
        error:errorSystem
    }
})