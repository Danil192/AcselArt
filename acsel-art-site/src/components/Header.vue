<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm">
    <div class="container-fluid">
      <!-- ЛОГОТИП -->
      <a class="navbar-brand fw-bold" href="#">ACSEL ART</a>

      <!-- БУРГЕР -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- НАВИГАЦИЯ -->
      <div class="collapse navbar-collapse" id="navbarContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item"><a class="nav-link" href="#hero">Главная</a></li>
          <li class="nav-item"><a class="nav-link" href="#about">О студии</a></li>
          <li class="nav-item"><a class="nav-link" href="#works">Наши работы</a></li>
          <li class="nav-item"><a class="nav-link" href="#services">Услуги</a></li>
          <li class="nav-item"><a class="nav-link" href="#materials">Материалы</a></li>
          <li class="nav-item"><a class="nav-link" href="#calculator">Расчёт стоимости</a></li>
          <li class="nav-item"><a class="nav-link" href="#contacts">Контакты</a></li>
        </ul>

        <!-- КНОПКА + СОЦСЕТИ -->
        <div class="d-flex align-items-center gap-2">
          <a href="#calculator" class="btn btn-outline-light btn-sm">Заказать роспись</a>
          <a href="https://vk.com/yourgroup" target="_blank" class="text-white fs-5"><i class="bi bi-vk"></i></a>
          <a href="https://instagram.com/yourprofile" target="_blank" class="text-white fs-5"><i class="bi bi-instagram"></i></a>
          <a href="https://t.me/yourchannel" target="_blank" class="text-white fs-5"><i class="bi bi-telegram"></i></a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
</script>

<style scoped>
.navbar-nav .nav-link {
  font-weight: 500;
}

.navbar-brand {
  letter-spacing: 1px;
}
</style>
