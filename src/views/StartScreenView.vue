<script setup lang="ts">
import { RouterLink } from 'vue-router';

import logo from '../assets/logo_2.png'
import splashNastya from '/public/story/characters/nastya.png'
import splashDraco from '/public/story/characters/draco_masked.png'
import splashYura from '/public/story/characters/yura_masked.png'

</script>

<template>
  <div class="container">
    <img id="logo" :src="logo">
    <img class="splash splash-nastya" :src="splashNastya">
    <img class="splash splash-draco" :src="splashDraco">
    <img class="splash splash-yura" :src="splashYura">
    <div>
      <RouterLink to="/story">
        <div class="btn btn-primary btn-start centered">ИГРАТЬ</div>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
#logo {
  width: 100%;
  margin-top: 20%;
}

.splash {
  width: 100vw;
  bottom: 0;
  position: absolute;
}

.splash-nastya {
  z-index: 102;
  left: 0vw;
}

.splash-draco {
  z-index: 101;
  width: 75vw;
  left: -20vw;
}

.splash-yura {
  z-index: 100;
  width: 75vw;
  right: -20vw;
}


.container {
  height: 100vh;
  background: rgb(2, 0, 36);
  background: linear-gradient(125deg, rgba(2, 0, 36, 1) 0%, rgba(112, 80, 129, 1) 100%);
}

h1 {
  text-align: center;
  padding-top: 5rem;
}

.btn-start {
  z-index: 110;
  bottom: 5rem;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);

  font-size: 2rem;
  padding: 1rem 2rem;
}

#logo,
.splash {
  opacity: 0;
  animation: fadeIn 1s ease forwards;
}

.splash {
  animation-delay: 0.5s;
}

.splash-nastya {
  animation-delay: 1s;
}

.btn-start {
  animation-delay: 2s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>