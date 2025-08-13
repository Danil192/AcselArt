<template>
  <footer class="bg-black text-white py-4 border-top border-secondary">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-between gap-3">
        
        <!-- ЛОГОТИП -->
        <div class="flex-shrink-0">
          <img src="/images/Logo.jpg" alt="ACSEL ART" height="60" />
        </div>

        <!-- КОНТАКТЫ В ПОЛОСУ -->
        <div class="d-flex flex-wrap align-items-center justify-content-center gap-4 flex-grow-1">
          <!-- Андрей -->
          <div class="d-flex flex-column text-center">
            <a href="tel:+79144990123" class="link-light fw-semibold text-decoration-none">+7 914 499 0123</a>
            <span class="text-light-60">Андрей</span>
            <a href="mailto:andreysergeev75@mail.ru" class="link-light text-decoration-underline small">
              andreysergeev75@mail.ru
            </a>
          </div>
          <!-- Алексей -->
          <div class="d-flex flex-column text-center">
            <a href="tel:+79294843482" class="link-light fw-semibold text-decoration-none">+7 929 484 3482</a>
            <span class="text-light-60">Алексей</span>
            <a href="mailto:example@mail.ru" class="link-light text-decoration-underline small">
              example@mail.ru
            </a>
          </div>
          <!-- Григорий -->
          <div class="d-flex flex-column text-center">
            <a href="tel:+79145162191" class="link-light fw-semibold text-decoration-none">+7 914 516 2191</a>
            <span class="text-light-60">Григорий</span>
            <a href="mailto:example@mail.ru" class="link-light text-decoration-underline small">
              example@mail.ru
            </a>
          </div>
        </div>

        <!-- СОЦСЕТИ -->
        <div class="flex-shrink-0 d-flex align-items-center gap-3 fs-5">
          <a href="https://vk.com/acselart_chita" target="_blank" class="text-white social-link">
            <i class="fab fa-vk"></i>
          </a>
          <a href="https://instagram.com/yourprofile" target="_blank" class="text-white social-link">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="https://t.me/yourchannel" target="_blank" class="text-white social-link">
            <i class="fab fa-telegram-plane"></i>
          </a>
        </div>

      </div>

      <!-- НИЗ ФУТЕРА -->
      <div class="text-center mt-3 small text-light-60">
        © 2025 ACSEL ART
      </div>
    </div>
  </footer>
</template>

<style scoped>
.text-light-60 {
  color: rgba(255, 255, 255, .6);
}
a:hover,
.social-link:hover {
  opacity: 0.85;
}
</style>
