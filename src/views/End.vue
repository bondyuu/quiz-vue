<template>
  <div>
    <h1>
      <VueWriter :array="['축하해! 모든 단어를 찾았구나']" :iterations="1" :type-speed="150"/>
      <VueWriter :array="['네가 수집한 단어를 조합해볼까?']" :iterations="1" :start="2600" :type-speed="150"/>
      <VueWriter :array="['송']" :iterations="1" :start="5400" :type-speed="150"/>
      <VueWriter :array="['파대']" :iterations="1" :start="5800" :type-speed="200"/>
      <VueWriter :array="['로']" :iterations="1" :start="6600" :type-speed="200"/>
      <VueWriter :array="['37길']" :iterations="1" :start="7000" :type-speed="200"/>
      <VueWriter :array="['88']" :iterations="1" :start="8200" :type-speed="200"/>
      <VueWriter :array="['4층']" :iterations="1" :start="9000" :type-speed="200"/>
    </h1>
    <h1 v-if="isShow" style="font-weight: bold;color: red">송파대로 37길 88, 4층!</h1>
    <h1>
      <VueWriter :array="['여기가 바로 다음 단계로 가는 길이야']" :iterations="1" :start="11000" :type-speed="150"/>
      <VueWriter :array="['비용 걱정은 말고 ★택시★를 타고']" :iterations="1" :start="14000" :type-speed="150"/>
      <VueWriter :array="['어서 나를 만나러 와줘']" :iterations="1" :start="16800" :type-speed="150" style="margin-bottom: 20px;"/>
      <VueWriter :array="['비상상황이 생기면']" :iterations="1" :start="19000" :type-speed="150"/>
      <VueWriter :array="['이 링크를 준 번호로 문자해보라구']" :iterations="1" :start="21000" :type-speed="150" style="margin-bottom: 20px;"/>
      <VueWriter :array="['얼른 만나 ~']" :iterations="1" :start="23800" :type-speed="150"/>
    </h1>
  </div>
</template>

<script>
export default {
  name: "End",
  methods: {
    pop () {
      this.particles = [];
      for (let i = 0; i < 150; i++) {
        const p = document.createElement('particule');
        p.x = window.innerWidth * 0.5;
        p.y = window.innerHeight + (Math.random() * window.innerHeight * 0.3);
        p.vel = {
          x: (Math.random() - 0.5) * 10,
          y: Math.random() * -20 - 15
        };
        p.mass = Math.random() * 0.2 + 0.8;
        this.particles.push(p);
        p.style.transform = `translate(${p.x}px, ${p.y}px)`;
        const size = Math.random() * 15 + 5;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.background = this.colors[Math.floor(Math.random()*this.colors.length)];
        document.body.appendChild(p);
      }
    },
    render () {
      for (let i = this.particles.length - 1; i--; i > -1) {
        const p = this.particles[i];
        p.style.transform = `translate3d(${p.x}px, ${p.y}px, 1px)`;

        p.x += p.vel.x;
        p.y += p.vel.y;

        p.vel.y += (0.5 * p.mass);
        if (p.y > (window.innerHeight * 2)) {
          p.remove();
          this.particles.splice(i, 1);
        }
      }
      requestAnimationFrame(this.render);
    },
    show() {
      this.isShow = true;
    }
  },
  data() {
    return{
      particles: [],
      colors: ["#eb6383","#fa9191","#ffe9c5","#b4f2e1"],
      isShow: false
    }
  },
  mounted() {
    this.pop();
    window.setTimeout(this.render, 700);
    window.setTimeout(this.show, 9700);
  },
}
</script>

<style>
body {
  display: grid;
  place-items: center;
  height: 100vh;
  overflow: hidden;
}
.char, .word {
  display: inline-block;
}
.splitting .char {
  animation: slide-in 1s cubic-bezier(0.17, 0.84, 0.4, 1.49) both;
  animation-delay: calc(30ms * var(--char-index));
}
[data-word="♬"] .char {
  display: inline;
}

@keyframes slide-in {
  0% {
    transform: scale(2) rotate(60deg);
    opacity: 0;
  }
}
@keyframes bump-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
}
particule {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  box-shadow: 1px 1px 4px #eb6383;
}

</style>