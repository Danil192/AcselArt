<script setup>

</script>

<template>
  <div class="hero-section position-relative">
    <img src="/images/Hello.jpg" alt="Фон" class="hero-bg" />

    <!-- затемнение -->
    <div class="overlay"></div>

    <!-- текст сверху -->
    <div class="hero-content text-white text-center">
      <h1 class="display-4 fw-bold">ACSEL ART — граффити-студия в Чите</h1>
      <p class="lead">Вдохнём жизнь в ваши стены</p>
      <div class="mt-4">
        <a href="#works" class="btn btn-outline-light me-3">Посмотреть работы</a>
        <a href="#calculator" class="btn btn-primary">Рассчитать стоимость</a>
      </div>
    </div>
  </div>
</template>

<script setup>
// ничего не нужно пока
</script>

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
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* степень затемнения */
  z-index: 2;
}

.hero-content {
  position: relative;
  z-index: 3;
  top: 50%;
  transform: translateY(-50%);
  padding: 0 20px;
}
</style>

