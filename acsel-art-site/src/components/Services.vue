<template>
  <section id="services" class="py-5 bg-dark text-white">
    <div class="container">
      <h2 class="text-center mb-5 fw-bold">Услуги</h2>

      <div class="row g-4">
        <div
          class="col-md-6 col-lg-4"
          v-for="(service, index) in services"
          :key="index"
        >
          <div class="service-card p-4 h-100 text-center border border-secondary rounded shadow">
            <i class="bi bi-brush fs-1 mb-3"></i>
            <h5 class="fw-bold mb-2">{{ service.title }}</h5>
            <p class="text-light small mb-0">{{ service.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const services = [
  {
    title: 'Роспись интерьеров',
    description: 'Художественное оформление стен, потолков, ниш, комнат и залов.',
  },
  {
    title: 'Роспись предметов интерьера',
    description: 'Оформление мебели, дверей, зеркал, перегородок и других элементов.',
  },
  {
    title: 'Роспись фасадов',
    description: 'Яркие, стойкие изображения на наружных стенах зданий.',
  },
  {
    title: 'Роспись торговых площадей',
    description: 'Оформление витрин, залов, кафе, баров, магазинов и студий.',
  },
  {
    title: 'Экстерьерная роспись',
    description: 'Уличные объекты, гаражи, заборы, стены и любые внешние поверхности.',
  },
  {
    title: 'Покраска стен и фасадов',
    description: 'Профессиональная подготовка и окрашивание поверхностей.',
  },
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
</style>
