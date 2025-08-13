<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const overlayVisible = ref(false)
const textVisible = ref(false)
const parallaxY = ref(0)

onMounted(() => {
  // Плавное затемнение и появление текста
  setTimeout(() => {
    overlayVisible.value = true
    setTimeout(() => (textVisible.value = true), 500)
  }, 800)

  // Параллакс через rAF
  let ticking = false
  const factorDesktop = 0.12
  const factorMobile  = 0.06
  const isMobile = window.matchMedia('(max-width: 576px)').matches
  const k = isMobile ? factorMobile : factorDesktop

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        parallaxY.value = window.scrollY * k
        ticking = false
      })
      ticking = true
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })
})
</script>

<template>
  <section class="hero-section position-relative">
    <!-- Фон с параллаксом и небольшим масштабом, чтобы не было щелей -->
    <img
      src="/images/Hello.jpg"
      alt="Фон"
      class="hero-bg"
      :style="{ transform: `translateY(${parallaxY}px) scale(1.06)` }"
    />

    <!-- затемнение -->
    <div class="overlay" :class="{ 'overlay-visible': overlayVisible }"></div>

    <!-- текст -->
    <div class="hero-content text-white text-center" :class="{ 'text-visible': textVisible }">
      <h1 class="display-5 fw-bold">ACSEL ART — граффити-студия в Чите</h1>
      <p class="lead mb-4">Вдохнём жизнь в ваши стены</p>
      <div>
        <a href="#works" class="btn btn-outline-light me-3">Посмотреть работы</a>
        <a href="#calculator" class="btn btn-primary">Рассчитать стоимость</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  height: clamp(420px, 89vh, 800px); /* компактная адаптивная высота */
  width: 100%;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;          /* ровно по блоку */
  object-fit: cover;     /* без искажений */
  z-index: 1;
  will-change: transform;
  transition: transform 0.06s linear;
}

/* overlay */
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.5);
  opacity: 0;
  transition: opacity 1s ease;
  z-index: 2;
}
.overlay-visible { opacity: 1; }

/* контент */
.hero-content {
  position: relative;
  z-index: 3;
  top: 50%;
  transform: translateY(-50%);
  padding: 0 16px;
  opacity: 0;
  transition: opacity 1s ease;
}
.text-visible { opacity: 1; }

/* Чуть меньше заголовок на совсем мелких экранах */
@media (max-width: 576px) {
  .hero-content .display-5 { font-size: 1.9rem; }
}

/* Уважение к настройкам пользователя */
@media (prefers-reduced-motion: reduce) {
  .hero-bg { transition: none; transform: none !important; }
  .overlay, .hero-content { transition: none; }
}
</style>
