<template>
  <div class="black-bg" v-if="isShow === true" @click="close($event)">
    <div class="white-bg">
      <h4 class="info-help">{{ questions[idx].help }}</h4>
      <div style="margin-bottom: 20px;">
        <a v-if="!openAnswer" @click="showAnswer">지인짜 모르겠다고?! 그럼 눌러봐</a>
        <div v-if="openAnswer">{{ questions[idx].answer}}</div>
      </div>
      <button class="close">닫기</button>
    </div>
  </div>

  <div class="container">
    <div class="progress">
      <div class="percent"></div>
    </div>
    <div class="steps">
      <div v-for="(q, index) in questions" :class="index===0 ? 'step selected' : 'step'" :id="index" :key="index"></div>
    </div>
  </div>
  <div class="wrapper">
    <h3 v-for="(q, index) in questions[idx].question" :key="index">{{ q }}</h3>
    <b-form-input v-model="ans" placeholder="Answer" ref="cursor"></b-form-input>
    <BIconQuestionCircle class="icon-q" @click="handleToggle"/>
    <b-button pill variant="outline-secondary" @click="check" style="margin-left: 25px">확인</b-button>
  </div>
</template>

<script>
import { BIconQuestionCircle } from 'bootstrap-icons-vue';
import swal from 'sweetalert'
export default {
  name: "Quiz",
  components: {
    BIconQuestionCircle,
  },
  // mounted() {
  //   this.startCursor();
  // },
  data() {
    return {
      isShow: false,
      openAnswer: false,
      idx: 0,
      ans: '',
      questions: [
        {
          question: ['처음은 쉽게 가보자', '네 이름은 뭐지?'],
          answer: '신하현',
          help: '이름은 알고있지..?',
          msg: ['처음은 쉽지?', '이제 점점 더 어려워질거야'],
          err: ['엥? 틀렸어...', '이름도 모르는거야!!??']
        },
        {
          question: ['두번째 문제!', '네 고향은 어디야?'],
          answer: '부산',
          help: '한 때는 제 2의 수도였던...',
          msg: ['역시~ 부산아이가~', '참고로 난 서울 사람이야'],
          err: ['이건 좀...', '서울 사람 다됐다 이거지..?']
        },
        {
          question: ['마지막이야', '내가 누구였지?'],
          answer: '본듀꼰듀',
          help: 'ㅂㄷㄲㄷ',
          msg: ['날 잊지 않았구나 ㅠ^ㅠ', '얼른 와~'],
          err: ['내가 분명 말했는데 ㅡㅡ^', '대충 읽었구나;;']
        },
      ],
      bar: 0
    }
  },
  methods: {
    // startCursor() {
    //   this.$refs.cursor.focus();
    // },
    showAnswer() {
      this.openAnswer = !this.openAnswer;
    },
    close(event) {
      if (event.target.classList.contains('black-bg') || event.target.classList.contains('close')) {
        this.isShow = false;
      } else if (event.target.classList.contains('white-bg')) {
        this.isShow = true;
      }
    },
    handleToggle() {
      this.isShow = !this.isShow;
    },
    check() {
      if (this.idx < this.questions.length - 1) {
        if (this.ans === this.questions[this.idx].answer) {
          swal(this.questions[this.idx].msg[0], this.questions[this.idx].msg[1],"success");
          this.bar += 100 / this.questions.length;
          let p = 100 / (this.questions.length - (this.idx+1));
          console.log(p);
          document.getElementsByClassName('percent')[0].style.width = `${p}%`;
          document.getElementById(this.idx).classList.add('completed');
          document.getElementById(this.idx+1).classList.add('selected');
          this.idx += 1;
          this.ans = '';
          this.openAnswer = false;
        } else {
          swal(this.questions[this.idx].err[0], this.questions[this.idx].err[1],"error");
        }
      } else {
        if (this.ans === this.questions[this.idx].answer) {
          swal(this.questions[this.idx].msg[0], this.questions[this.idx].msg[1],"success");
          this.$router.push("/end");
        } else {
          swal(this.questions[this.idx].err[0], this.questions[this.idx].err[1],"error");
        }
      }
    }
  }
}
</script>

<style scoped>
.progress-wrapper {
  padding-top: 50px;
  margin-left: 15%;
  width: 70%;
}
.wrapper {
  width: 60%;
  margin-left: 20%;
  /*margin-top: 50%;*/
}
.form-control {
  margin-top: 30px;
  margin-bottom: 20px;
}
.icon-q {
  top: 100px;
  width: 2em;
  height: 2em;
  float: right;
}
.black-bg {
  width: 100%; height:100%;
  background: rgba(0,0,0,0.5);
  position: fixed; padding: 20px;
  z-index: 2;
}
.white-bg {
  margin-top: 100px;
  margin-left: 10%;
  width: 80%; background: white;
  height: 30%;
  border-radius: 8px;
  padding: 20px;
}
.info-help {
  margin-top: 10%;
  margin-bottom: 15%;
}
.close {
  cursor: pointer;
  border: none;
  background: #6667AB;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  padding: 5px 15px;
}
.close:hover {
  color: white;
  font-weight: bold;
  transform: scale(1.1);
  transition: all 0.5s;
}
.container {
  /*position: absolute;*/
  margin-bottom: 30%;
  padding-top: 20%;

}
.steps {
  /*top: -100px;*/
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-left: 10%;
}
.step {
  width: 25px;
  height: 25px;
  background: #fff;
  border: 3px solid #ACACA6;
  border-radius: 50%;
  transition: background 1s;
}
.step.selected {
  border: 3px solid #4B81BD;
}
.step.completed {
  border: 3px solid #4B81BD;
  background: #4B81BD;
}
.progress {
  /*top: -100px;*/
  position: absolute;
  margin-top: 9px;
  margin-left: 11%;
  width: 72%;
  height: 6px;
  /*border-bottom: 2px solid #ACACA6;*/
  z-index: -1;
}
.percent {
  margin-top: 1px;
  position: absolute;
  width: 0;
  height: 100%;
  border-bottom: 5px solid #4B81BD;
  z-index: 1;
  transition: width 1s;
}
</style>