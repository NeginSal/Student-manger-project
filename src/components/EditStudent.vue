<template>
  <div>
    <v-flex sm8 offset-sm2>
      <v-card>
        <v-toolbar dark>
          <v-toolbar-title>Edit Student</v-toolbar-title>
        </v-toolbar>
        <v-container class="text-xs-center">
          <v-progress-circular
            v-if="!isLoaded"
            :size="70"
            :width="7"
            color="purple"
            indeterminate
          ></v-progress-circular>
        </v-container>
        <v-form v-if="isLoaded">
          <v-container>
            <v-layout>
              <v-flex xs12 md4>
                <v-text-field
                  v-model="findStudent($route.params.id).firstName"
                  label="first Name"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="findStudent($route.params.id).lastName"
                  label="last Name"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <v-btn @click="submit">submit</v-btn>
        </v-form>
      </v-card>
    </v-flex>
    <br />
    <Students />
  </div>
</template>

<script>
import axios from "axios";
import Students from "./Students";
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    // student() {
    //   return this.$store.getters.findStudent(this.$route.params.id);
    // },
    ...mapGetters(['isLoaded','findStudent'])
  },
  methods: {
    async submit() {
      const firstName =this.findStudent(this.$route.params.id).firstName;
       const lasttName =this.findStudent(this.$route.params.id).lastName;

      this.$store.dispatch('editStudent',{id:this.$route.params.id,names:{firstName,lasttName}})

    }
  },
  components: {
    Students,
  },
};
</script>