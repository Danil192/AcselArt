<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const overlayVisible = ref(false)
const textVisible = ref(false)
const scrollY = ref(0)

onMounted(() => {
  setTimeout(() => {
    overlayVisible.value = true
    setTimeout(() => {
      textVisible.value = true
    }, 500)
  }, 1000)

  // Обработчик прокрутки для параллакса
  const handleScroll = () => {
    scrollY.value = window.scrollY
  }
  window.addEventListener('scroll', handleScroll)

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
})
</script>

<template>
  <div class="hero-section position-relative">
    <!-- Фон с параллаксом -->
    <img
      src="/images/Hello.jpg"
      alt="Фон"
      class="hero-bg"
      :style="{ transform: `translateY(${scrollY * 0.3}px)` }"
    />

    <!-- затемнение -->
    <div
      class="overlay"
      :class="{ 'overlay-visible': overlayVisible }"
    ></div>

    <!-- текст сверху -->
    <div
      class="hero-content text-white text-center"
      :class="{ 'text-visible': textVisible }"
    >
      <h1 class="display-4 fw-bold">ACSEL ART — граффити-студия в Чите</h1>
      <p class="lead">Вдохнём жизнь в ваши стены</p>
      <div class="mt-4">
        <a href="#works" class="btn btn-outline-light me-3">Посмотреть работы</a>
        <a href="#calculator" class="btn btn-primary">Рассчитать стоимость</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-section {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 110%; /* чуть выше, чтобы при движении не было пустот */
  object-fit: cover;
  z-index: 1;
  transition: transform 0.1s linear;
}

/* overlay с анимацией */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 1s ease;
  z-index: 2;
}
.overlay-visible {
  opacity: 1;
}

/* текст с анимацией */
.hero-content {
  position: relative;
  z-index: 3;
  top: 50%;
  transform: translateY(-50%);
  padding: 0 20px;
  opacity: 0;
  transition: opacity 1s ease;
}
.text-visible {
  opacity: 1;
}
</style>
