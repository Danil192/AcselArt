<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm">
    <div class="container-fluid">
      <!-- ЛОГОТИП -->
      <a class="navbar-brand fw-bold d-flex align-items-center gap-2" href="#">
        <img src="/images/CutLogo.png" alt="ACSEL ART" height="60" />
      </a>

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
        <div class="d-flex align-items-center gap-3">
          <a href="#calculator" class="btn btn-outline-light btn-sm">Заказать роспись</a>
          <a href="https://vk.com/acselart_chita" target="_blank" class="text-white fs-5">
            <i class="fab fa-vk"></i>
          </a>
          <a href="https://instagram.com/yourprofile" target="_blank" class="text-white fs-5">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="https://t.me/yourchannel" target="_blank" class="text-white fs-5">
            <i class="fab fa-telegram-plane"></i>
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
</script>

<style scoped>
body {
  padding-top: 80px; 
}
.navbar-nav .nav-link {
  font-weight: 500;
}
.navbar-brand {
  letter-spacing: 1px;
}
.navbar {
  position: relative;
}
.navbar.fixed-top {
  left: 0;
  right: 0;
  width: calc(100% - 8px); /* убрали пару пикселей под скролл */
  margin: 0 auto; /* выровнять по центру */
  box-sizing: border-box;
  z-index: 1030;
}
html {
  scrollbar-gutter: stable;
}
</style>
