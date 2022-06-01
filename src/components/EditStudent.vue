<template>
  <div v-if="$store.getters.isLoaded">
    <v-flex sm8 offset-sm2>
      <v-card>
        <v-toolbar dark>
          <v-toolbar-title>Edit Student</v-toolbar-title>
        </v-toolbar>
        <v-form>
          <v-container>
            <v-layout>
              <v-flex xs12 md4>
                <v-text-field v-model="firstName" label="first Name" required></v-text-field>
                <v-text-field v-model="lastName" label="last Name" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <v-btn @click="submit">submit</v-btn>
        </v-form>
      </v-card>
    </v-flex>
    <br>
    <Students/>
  </div>
</template>

<script>
import axios from "axios";
import Students from "./Students";

export default {
  data() {
    return {
      student: ""
    };
  },
   created() {
      this.student = this.$store.getters.findStudent(this.$route.params.id);
  },
  methods: {
    async submit() {
      axios.put(`http://localhost:3000/students/${this.$route.params.id}`, { firstName: this.student.firstName, lastName:this.student.lastName });
    }
  },
  components: {
      Students
  }
};
</script>