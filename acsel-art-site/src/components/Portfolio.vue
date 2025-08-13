<template>
  <section id="works" class="py-5 bg-dark text-white">
    <div class="container">
      <h1 class="text-center mb-5 fw-bold">Наши работы</h1>

      <!-- ЛЕНТЫ -->
      <div v-for="(row, index) in rows" :key="'row-'+index" class="mb-4">
        <div
          class="d-flex slider-row"
          :class="index % 2 === 0 ? 'slide-left' : 'slide-right'"
        >
          <div
            v-for="(item, idx) in [...row, ...row]"
            :key="'item-'+index+'-'+idx"
            class="text-center"
          >
            <img :src="item.src" class="rounded shadow" width="250" height="180" loading="lazy" />
            <div class="mt-2 small text-light">{{ item.title }} • {{ item.year }}</div>
          </div>
        </div>
      </div>

       <!-- АККОРДЕОНЫ -->
      <div class="mt-5">
        <div class="accordion accordion-flush" id="accordionAllProjects">
          <div class="accordion-item bg-dark border-secondary">
            <h2 class="accordion-header" id="headingAll">
              <button
                class="accordion-button collapsed bg-dark text-white"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseAll"
                aria-expanded="false"
                aria-controls="collapseAll"
              >
                Все проекты
              </button>
            </h2>
            <div
              id="collapseAll"
              class="accordion-collapse collapse"
              aria-labelledby="headingAll"
              data-bs-parent="#accordionAllProjects"
            >
              <div class="accordion-body">

  
                <div class="accordion accordion-flush" id="accordionProjects">
                  <div
                    v-for="(project, pIndex) in projects"
                    :key="'project-'+pIndex"
                    class="accordion-item bg-dark border-secondary"
                  >
                    <h2 class="accordion-header" :id="'headingProject-'+pIndex">
                      <button
                        class="accordion-button collapsed bg-dark text-white"
                        type="button"
                        data-bs-toggle="collapse"
                        :data-bs-target="'#collapseProject-'+pIndex"
                        aria-expanded="false"
                        :aria-controls="'collapseProject-'+pIndex"
                      >
                        {{ project.name }}
                        <span class="ms-2 small text-secondary">• {{ project.images.length }} фото</span>
                      </button>
                    </h2>
                    <div
                      class="accordion-collapse collapse"
                      :id="'collapseProject-'+pIndex"
                      :aria-labelledby="'headingProject-'+pIndex"
                      data-bs-parent="#accordionProjects"
                    >
                      <div class="accordion-body">
                        <!-- Сетка изображений проекта -->
                        <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
                          <div
                            v-for="(img, iIndex) in project.images"
                            :key="'img-'+pIndex+'-'+iIndex"
                            class="col"
                          >
                            <div
                              class="portfolio-card rounded shadow-sm overflow-hidden"
                              role="button"
                              @click="openLightbox(project.images, iIndex)"
                            >
                              <img
                                :src="img.src"
                                :alt="img.alt || project.name"
                                class="w-100 h-100 object-cover portfolio-img"
                                loading="lazy"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> 
                </div> 

              </div>
            </div>
          </div>
        </div> 
      </div>
    </div>


    <transition name="fade-zoom">
      <div
        v-if="lightboxOpen"
        class="lightbox"
        @click.self="closeLightbox"
      >
        <button class="btn-close btn-close-white lightbox-close" @click="closeLightbox" aria-label="Закрыть"></button>

        <button v-if="lightboxImages.length > 1" class="lightbox-nav prev" @click.stop="prevImage" aria-label="Предыдущее">‹</button>

        <img
          v-if="currentImage"
          :src="currentImage.src"
          :alt="currentImage.alt || 'Фото проекта'"
          class="lightbox-img"
        />

        <button v-if="lightboxImages.length > 1" class="lightbox-nav next" @click.stop="nextImage" aria-label="Следующее">›</button>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

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

const projects = [
  {
    name: 'Проект 1: Фасад кофейни',
    images: [
      { src: '/images/works/example_work3.jpg', alt: 'Фасад 1' },
      { src: '/images/works/example_work4.jpg', alt: 'Фасад 2' },
      { src: '/images/works/example_work3.jpg', alt: 'Фасад 3' },
      { src: '/images/works/example_work4.jpg', alt: 'Фасад 4' },
    ],
  },
  {
    name: 'Проект 2: Детская студия',
    images: [
      { src: '/images/works/example_work3.jpg', alt: 'Интерьер 1' },
      { src: '/images/works/example_work4.jpg', alt: 'Интерьер 2' },
      { src: '/images/works/example_work3.jpg', alt: 'Интерьер 3' },
      { src: '/images/works/example_work4.jpg', alt: 'Интерьер 4' },
      { src: '/images/works/example_work3.jpg', alt: 'Интерьер 5' },
    ],
  },
    {
    name: 'Проект 3: Текст',
    images: [
      { src: '/images/works/example_work3.jpg', alt: 'Фасад 1' },
      { src: '/images/works/example_work4.jpg', alt: 'Фасад 2' },
      { src: '/images/works/example_work3.jpg', alt: 'Фасад 3' },
      { src: '/images/works/example_work4.jpg', alt: 'Фасад 4' },
    ],
  },
]


const lightboxOpen = ref(false)
const lightboxImages = ref([])
const lightboxIndex = ref(0)

const currentImage = computed(() => lightboxImages.value[lightboxIndex.value] || null)

function openLightbox(images, index) {
  lightboxImages.value = images
  lightboxIndex.value = index
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden' // убираем скролл страницы
}

function closeLightbox() {
  lightboxOpen.value = false
  document.body.style.overflow = ''
}

function prevImage() {
  if (!lightboxImages.value.length) return
  lightboxIndex.value = (lightboxIndex.value - 1 + lightboxImages.value.length) % lightboxImages.value.length
}

function nextImage() {
  if (!lightboxImages.value.length) return
  lightboxIndex.value = (lightboxIndex.value + 1) % lightboxImages.value.length
}


function handleKey(e) {
  if (!lightboxOpen.value) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowLeft') prevImage()
  if (e.key === 'ArrowRight') nextImage()
}

onMounted(() => window.addEventListener('keydown', handleKey))
onUnmounted(() => window.removeEventListener('keydown', handleKey))
</script>

<style scoped>

.slider-row {
  display: flex;
  gap: 1rem;
  min-width: max-content;
  animation: infiniteScroll 60s linear infinite;
  will-change: transform;
}
.slider-row:hover { animation-play-state: paused; }
.slider-row > div { flex-shrink: 0; transition: transform 0.3s ease; }
.slider-row > div:hover { transform: scale(1.15); z-index: 2; }
.slide-right { animation-direction: reverse; }
@keyframes infiniteScroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
img { object-fit: cover; object-position: center; transition: transform 0.3s ease; }

.portfolio-card {
  aspect-ratio: 4 / 3;
  background: #111;
  cursor: zoom-in;
}
.portfolio-img {
  transition: transform 0.25s ease;
}
.portfolio-card:hover .portfolio-img {
  transform: scale(1.1); /* +10% при ховере */
}
.object-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.accordion-button {
  cursor: pointer; /* рука при наведении */
  font-weight: 600;
  border-bottom: 1px solid rgba(255,255,255,.1);
}
.accordion-button::after {
  filter: invert(1) opacity(0.8); /* делаем стрелку белой */
  transform: scale(1.2);          /* чуть крупнее */
}
.accordion-button:not(.collapsed) {
  color: #fff;
  background-color: #1d1f21bd;
  box-shadow: none;
}
.accordion-button:focus {
  box-shadow: none;
  border-color: rgba(255,255,255,.15);
}
.accordion-body { background-color: #121314aa; }
.accordion-item { border-color: rgba(255,255,255,.1); }

.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.92);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1080; /* поверх навбара */
  padding: 4vh 4vw;
}
.lightbox-img {
  max-width: 92vw;
  max-height: 92vh;
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0,0,0,.6);
  user-select: none;
}
.lightbox-close {
  position: absolute;
  top: 16px;
  right: 16px;
  filter: invert(1);
  opacity: .9;
}
.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: rgba(255,255,255,.12);
  color: #fff;
  font-size: 2rem;
  line-height: 1;
  width: 44px;
  height: 56px;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
}
.lightbox-nav:hover { background: rgba(255,255,255,.18); }
.lightbox-nav.prev { left: 16px; }
.lightbox-nav.next { right: 16px; }

.fade-zoom-enter-active,
.fade-zoom-leave-active {
  transition: opacity .25s ease, transform .25s ease;
}
.fade-zoom-enter-from,
.fade-zoom-leave-to {
  opacity: 0;
  transform: scale(.98);
}
</style>
