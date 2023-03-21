<template>
  <h1>축하행~</h1>
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
    }

  },
  data() {
    return{
      particles: [],
      colors: ["#eb6383","#fa9191","#ffe9c5","#b4f2e1"]
    }
  },
  mounted() {
    this.pop();
    window.setTimeout(this.render, 700);
    // window.addEventListener('click', this.pop);
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