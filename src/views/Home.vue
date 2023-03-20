<template>
  <h1>
    <VueWriter :array="['안녕~']" :iterations="1" :type-speed="150" class="first"/>
    <VueWriter :array="['난 오늘 널 안내해줄']" :iterations="1" :start="900" :type-speed="150"/>
    <VueWriter :array="['★본듀꼰듀★']" :iterations="1" :start="2800" :type-speed="300" style="margin-bottom: 30px"/>
    <VueWriter :array="['내가 친절한 편이지만']" :iterations="1" :start="5000" :type-speed="150"/>
    <VueWriter :array="['그냥 안내해주면 재미없겠지?']" :iterations="1" :start="7000" :type-speed="150"/>
    <VueWriter :array="['널 한 번 테스트해볼거야']" :iterations="1" :start="10000" :type-speed="150"/>
    <VueWriter :array="['마음의 준비가 됐으면']" :iterations="1" :start="12500" :type-speed="150" style="margin-bottom: 30px"/>
    <VueWriter :array="['가보자고~']" :iterations="1" :start="15000" :type-speed="150"/>
  </h1>

  <b-button pill variant="outline-secondary" @:click="this.$router.push('/quiz')">시작</b-button>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      answer: '',
    }
  },
  methods: {

  }
}
</script>
<style scoped>
h1 {
  margin-top: 30%;
  margin-bottom: 10%;
}
.is-typed span.cursor {
  display: inline-block;
  width: 3px;
  background-color: black;
  animation: blink 1s infinite;
}
</style>