<template>
  <section id="services" class="py-5 bg-dark text-white">
    <div class="container">
      <h2 class="text-center mb-5 fw-bold">Услуги</h2>

      <div class="row g-4">
        <div
          class="col-md-6"
          v-for="(service, index) in services"
          :key="index"
        >
          <div class="service-card p-4 h-100 border border-secondary rounded shadow text-center">
            <i :class="service.icon + ' fs-1 mb-3 d-block'"></i>
            <h5 class="fw-bold mb-3 service-title">{{ service.title }}</h5>
            <p class="service-text">{{ service.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const services = [
  {
    title: 'Художественная роспись и граффити оформление',
    icon: 'bi bi-brush',
    description: 'Создаём уникальные художественные композиции в интерьерах, экстерьерах, на фасадах и торговых площадях.'
  },
  {
    title: 'Покраска стен и фасадов',
    icon: 'bi bi-paint-bucket',
    description: 'Профессиональная подготовка поверхностей и нанесение долговечных покрытий для свежего и стильного вида.'
  }
]
</script>

<style scoped>
.service-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
}

/* Увеличиваем заголовок */
.service-title {
  font-size: 1.5rem; /* примерно 24px */
}

/* Увеличиваем текст описания */
.service-text {
  font-size: 1.1rem; /* примерно 17-18px */
  line-height: 1.6;
}
</style>
