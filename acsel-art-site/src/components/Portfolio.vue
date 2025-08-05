<template>
  <section id="works" class="py-5 bg-dark text-white">
    <div class="container">
      <h1 class="text-center mb-5 fw-bold">Наши работы</h1>

      <div v-for="(row, index) in rows" :key="index" class="mb-4">
        <div
          class="d-flex slider-row"
          :class="index % 2 === 0 ? 'slide-left' : 'slide-right'" 
        >
          <div
            v-for="(item, idx) in [...row, ...row]" 
            :key="idx"
            class="text-center"
          >
            <img :src="item.src" class="rounded shadow" width="250" height="180" />
            <div class="mt-2 small text-light">{{ item.title }} • {{ item.year }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const rows = [
  [
    { src: '/images/works/example_work.jpg', title: 'Текст', year: 2020 },
    { src: '/images/works/example_work2.jpg', title: 'Текст', year: 2020 },
    { src: '/images/works/example_work.jpg', title: 'Текст', year: 2020 },
    { src: '/images/works/example_work2.jpg', title: 'Текст', year: 2020 },
    { src: '/images/works/example_work.jpg', title: 'Текст', year: 2020 },
    { src: '/images/works/example_work2.jpg', title: 'Текст', year: 2020 },
    { src: '/images/works/example_work.jpg', title: 'Текст', year: 2020 },
    { src: '/images/works/example_work2.jpg', title: 'Текст', year: 2020 },
    { src: '/images/works/example_work.jpg', title: 'Текст', year: 2020 },
    { src: '/images/works/example_work2.jpg', title: 'Текст', year: 2020 },
    { src: '/images/works/example_work.jpg', title: 'Текст', year: 2020 },
    { src: '/images/works/example_work2.jpg', title: 'Текст', year: 2020 },
  ],
  [
    { src: '/images/works/example_work.jpg', title: 'Текст', year: 2020 },
    { src: '/images/works/example_work2.jpg', title: 'Текст', year: 2020 },
    { src: '/images/works/example_work.jpg', title: 'Текст', year: 2020 },
    { src: '/images/works/example_work2.jpg', title: 'Текст', year: 2020 },
    { src: '/images/works/example_work.jpg', title: 'Текст', year: 2020 },
    { src: '/images/works/example_work2.jpg', title: 'Текст', year: 2020 },
    { src: '/images/works/example_work.jpg', title: 'Текст', year: 2020 },
    { src: '/images/works/example_work2.jpg', title: 'Текст', year: 2020 },
    { src: '/images/works/example_work.jpg', title: 'Текст', year: 2020 },
    { src: '/images/works/example_work2.jpg', title: 'Текст', year: 2020 },
    { src: '/images/works/example_work.jpg', title: 'Текст', year: 2020 },
    { src: '/images/works/example_work2.jpg', title: 'Текст', year: 2020 },
  ]
]
</script>

<style scoped>
.slider-row {
  display: flex;
  gap: 1rem;
  min-width: max-content;
  animation: infiniteScroll 60s linear infinite;
  will-change: transform;
}

.slider-row:hover {
  animation-play-state: paused;
}

.slider-row > div {
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.slider-row > div:hover {
  transform: scale(1.15);
  z-index: 2;
}

.slide-right {
  animation-direction: reverse;
}

@keyframes infiniteScroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

img {
  object-fit: cover;
  object-position: center;
  transition: transform 0.3s ease;
}
</style>
