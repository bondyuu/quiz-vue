<template>
  <div class="black-bg" v-if="isShow === true" @click="close($event)">
    <div class="white-bg">
      <div class="info-help">
        <h4 v-for="(h, index) in questions[idx].help" :key="index">{{ h }}</h4>
      </div>
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
    <h3 v-for="(q, index) in questions[idx].question" :key="index">
      <span v-if="q === '사랑하는 그대에게...'"><strong>{{ q }}</strong></span>
      <span v-else> {{ q }}</span>
    </h3>
    <b-form-input v-model="ans" placeholder="Answer" ref="cursor" style="width: 80%;margin-left: 10%;"></b-form-input>
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
          question: ['본격적으로 문제를 풀기전,',
                     '네가 앞으로 일어날 모든 일에',
                     '마주할 준비되어 있는지 간단히',
                     '확인해보려고 해.',
                     '2023년 올해 너에게 있을',
                     '가장 크고 기쁜 행사는 몇 월 며칠일까?',
                     '*MMDD'],
          answer: '1007',
          help: ['이럴 수가.. 이걸 모른다고?',
                 '아바니 호텔 가는 날이 언제야?'],
          msg: ['훌륭한데?',
            ['자 이제 본격적으로 몸을 움직여볼까?','고든램지버거를 지나쳐서 직진해봐!','4']
          ],
          err: ['엥? 틀렸어...', '']
        },
        {
          question: ['고든램지버거를 지나서 걸어가다보면',
                     '네잎클로버가 있는 매장 안에는',
                     '움직이지 않는 사람들이 있어',
                     '파란후드티를 입고있는 사람은 몇 명일까?', '*한글로 답을 적어봐 (띄어쓰기 없음)'],
          answer: '한명',
          help: ['고든램지 버거집 바로 옆 매장인건가?',
                 '앗, 아무래도 도로를 걸어가는',
                 '뒷모습의 남자 같은데'],
          msg: ['지금까지는 쉽지?',
            ['계속 가던 길을 가볼까?','걸어가던 방향으로 직진해봐','37']
          ],
          err: ['엥? 틀렸어...', '']
        },
        {
          question: ['저 멀리 도토리숲이 보여!',
                     '도토리숲 입구 옆쪽에',
                     '해와 구름이 가득한 집이 보이는 것 같은데...',
                     '아무래도 보통 사람의 집은 아닌 것 같아.',
                     '누구의 집인지 한 번 한글로 맞혀볼까?'],
          answer: '키키',
          help: ['빗자루를 타고 다니는',
            '사람의 집인 것 같은데...',
            '한글로는 두 글자로 적혀!'],
          msg: ['똑똑.. 아무도 없구나..',
            ['그렇다면 도토리숲 바로 앞에 있는','에스컬레이터를 타고 1층으로 올라가보자','송']
          ],
          err: ['엥? 틀렸어...', '']
        },
        {
          question: ['도토리 숲 앞의 에스컬레이터를 타고',
            '1층으로 올라왔더니 배가 슬슬 고픈걸?',
            '엇?',
            '저기 누가 먹다 남은 사과가 벽에 붙어있어.',
            '그나저나 이 편지는 뭐지?',
            '"',
            '사랑하는 그대에게...',
            '사과 앞에서 바라보면',
            '두 개의 간판에 숨겨둔 각각의 단어가 있단다',
            '"',
            '두 단어? 아무래도 영어 단어 같아',
            '*띄어쓰기 없는 소문자'],
          answer: 'dearlove',
          help: ['흠.. 간판을 직역 해보자면..',
            '달리에게, 조는 사랑해?'],
          msg: ['좋았어',
            ['계속 진행해보자','','88']
          ],
          err: ['엥? 틀렸어...', '']
        },
        {
          question: ['배가 정말 고픈걸?',
            '그러고보니 사과매장 옆의 mac  앞에',
            '식당과 카페 정보관이 있네!',
            '정보관 바로 앞에 있는 에스컬레이터를 한 번 타고 바로 갈 수 있는 식당으로 가야겠다.',
            '*한글로 답을 적어봐 (띄어쓰기 없음)'],
          answer: '브루클린더버거조인트',
          help: ['아무래도 이 에스컬레이터,',
            '다른 에스컬레이터와 다른 것 같아.',
            '한 번에 두 개의 층을 올라가는 것 같은데?'],
          msg: ['대단한데?',
            ['에스컬레이터를 타고 식당 앞으로 가볼까?','','파대']
          ],
          err: ['엥? 틀렸어...', '']
        },
        {
          question: ['브루클린더버거조인트 매장 앞까지 와봤지만',
            '여기도 사람이 많아서 밥은 못 먹겠어',
            '응? 오른쪽을 보니 매장 공사 중 같은데...',
            '공사만 하는게 아니라',
            '파란 불꽃놀이도 하고있네?',
            '불꽃이 총 몇 개인지 세어볼까?',
            '*한글로 답을 적어봐 (띄어쓰기 없음)'],
          answer: '다섯개',
          help: [''],
          msg: ['얼마 남지 않은 것 같아!',
            ['조금만 더 힘내보자.','챔피언 매장 앞 2층으로 내려가는 에스컬레이터를 타볼까?','층']
          ],
          err: ['엥? 틀렸어...', '']
        },
        {
          question: ['목도 마른데,',
            '2층으로 내려가서 물이나 마셔야겠어.',
            '챔피언 매장 앞 에스컬레이터를 타고 내려와서',
            '앞의 왼쪽을 보면 정수기가 있어.',
            '그 쪽으로 걸어가볼까?',
            '응? 이건 무슨 번호지?',
            '*48345#',
            '*언제나 그랬듯 띄어쓰기는 없어'],
          answer: '이새상을새롭게',
          help: ['물 마시려고 온 것뿐인데,',
            '이 롯데 광고 간판에',
            '온 시선을 강탈하는 것 같아'],
          msg: ['거의 다 왔어!',
            ['바로 앞에 있는 에스컬레이터를 타고','다시 1층으로 내려가보자.','로']
          ],
          err: ['엥? 틀렸어...', '']
        },
        {
          question: ['1층으로 내려가자마자 보이는 인포메이션 기계가 있네.',
            '이제 슬슬 떠나야하니 주차안내를 눌러볼까?',
            '이제 아래의 조건으로 네 자리 숫자를 만들어봐',
            '조건 : 주차장 입구는 짝수 번호를 사용하고, 주차장 출구는 두 개이상인 경우 큰 숫자만 사용한다. 입구와 출구를 더해보자',
            '1. A는 면세점 쇼핑을 하고 천호역에서 엄마를 만날 예정이다.',
            '2. B는 쇼핑몰에서 선물을 사고 강남역을 가야 한다.',
            '3. C는 아쿠아리움 구경을 갔다가 올림픽대로를 타고 하남을 갈 예정이다.',
            '4. D는 콘서틑 관람 후 잠실역에서 친구를 픽업하기로 했다.'],
          answer: '3788',
          help: ['각가의 조건에 맞춰',
            '주차장 입구 + 출구 숫자 4개를 만들어봐'],
          msg: ['대단한데? 모든 문제를 다 풀었어',
            ['이제 다음 단계로 넘어갈 수 있어.','','길']
          ],
          err: ['엥? 틀렸어...', '']
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
          // swal(this.questions[this.idx].msg[0], this.questions[this.idx].msg[1],"success");
          swal({
            title: this.questions[this.idx].msg[0],
            text: this.questions[this.idx].msg[1][0] +'\n'+ this.questions[this.idx].msg[1][1] + '\n\n수집단어 : ' + this.questions[this.idx].msg[1][2],
            icon: "success"
          });
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
          swal({
            title: this.questions[this.idx].msg[0],
            text: this.questions[this.idx].msg[1][0] +'\n'+ this.questions[this.idx].msg[1][1] + '\n\n수집단어 : ' + this.questions[this.idx].msg[1][2],
            icon: "success"
            })
            .then(() => {
              this.$router.push("/end");
            });
        } else {
          swal(this.questions[this.idx].err[0], this.questions[this.idx].err[1],"error");
        }
      }
    }
  }
}
</script>
<!-- 4 37 송 88 파대 층 로 길 -->
<style>
.progress-wrapper {
  padding-top: 50px;
  margin-left: 15%;
  width: 70%;
}
.wrapper {
  width: 90%;
  margin-left: 5%;
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
  margin-left: 2%;
  width: 96%; background: white;
  height: 35%;
  border-radius: 8px;
  padding: 20px;
}
.info-help {
  margin-top: 7%;
  margin-bottom: 17%;
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
  margin-bottom: 20%;
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
.swal-text {
  text-align: center;
}
input:focus {outline: none;}
</style>