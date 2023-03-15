<template>
  <p class="question">{{ this.$store.state.questions.home.question }}</p>
  {{this.prob}}
  <div class="form-wrapper">
    <b-form-input v-model="answer" placeholder="Enter your name"></b-form-input>
    <b-button pill variant="outline-secondary" @click="check">button</b-button>
  </div>
</template>

<script>
// import {computed} from "vue";
export default {
  name: 'Home',
  data() {
    return {
      answer: '',
    }
  },
  methods: {
    check() {
      if (this.answer === this.$store.state.questions.home.answer) {
        alert('correct');
      } else {
        alert('not correct');
      }
    }
  }
}
</script>

<style scoped>
.form-wrapper {
  margin-left: 35%;
  margin-top: 30px;
  width: 30%;
}
.form-control {
  margin-bottom: 20px;
}
</style>