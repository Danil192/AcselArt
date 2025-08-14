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
    { src: '/images/works/fasads/5.jpg', title: 'Фасад', year: 2030 },
    { src: '/images/works/3DCinema/7.jpg', title: '3D Cinema', year: 2030 },
    { src: '/images/works/FotBox/1.jpg', title: 'Fit Box', year: 2030 },
    { src: '/images/works/InterestedProjects/12.jpg', title: 'Интересный проект', year: 2030 },
    { src: '/images/works/StranaChudes/23.jpg', title: 'Страна Чудес', year: 2030 },
    { src: '/images/works/Vegas/4.jpg', title: 'Vegas', year: 2030 },
    { src: '/images/works/RoyalCoffe/1.jpg', title: 'Royal Coffe', year: 2030 },
    { src: '/images/works/StartUp/2.jpg', title: 'Start Up', year: 2030 },
    { src: '/images/works/StranaChudes/13.jpg', title: 'Страна Чудес', year: 2030 },
    { src: '/images/works/LegoNindjago/4.jpg', title: 'Lego Nindjago', year: 2030 },
    { src: '/images/works/Likerka/7.jpg', title: 'Likerka', year: 2030 },
    { src: '/images/works/Flame, Acsel, Chet/12.jpg', title: 'Acsel, Flame, Chet', year: 2030 },
  ],
  [
    { src: '/images/works/Flame, Acsel, Chet/1.jpg', title: 'Acsel, Flame, Chet', year: 2030 },
    { src: '/images/works/fasads/8.jpg', title: 'Фасад', year: 2030 },
    { src: '/images/works/ClimateControl/1.jpg', title: 'Climate Control', year: 2030 },
    { src: '/images/works/FotBox/4.jpg', title: 'Fit Box', year: 2030 },
    { src: '/images/works/InterestedProjects/4.jpg', title: 'Интересный проект', year: 2030 },
    { src: '/images/works/noPainNoGain/4.jpg', title: 'NO PAIN NO GAIN', year: 2030 },
    { src: '/images/works/fasads/19.jpg', title: 'Фасад', year: 2030 },
    { src: '/images/works/StartUp/2.jpg', title: 'Start Up', year: 2030 },
    { src: '/images/works/StranaChudes/21.jpg', title: 'Страна Чудес', year: 2030 },
    { src: '/images/works/Sushi/2.jpg', title: 'Суши-бар нк."Школа"', year: 2030 },
    { src: '/images/works/thisNashDay/10.jpg', title: 'Фестиваль "Это наши дни"', year: 2030 },
    { src: '/images/works/Vegas/6.jpg', title: 'Vegas', year: 2030 },
  ]
]

const projects = [
  {
    name: '3D Cinema',
    images: [
      { src: '/images/works/3DCinema/1.jpg', alt: '1' },
      { src: '/images/works/3DCinema/2.jpg', alt: '2' },
      { src: '/images/works/3DCinema/3.jpg', alt: '3' },
      { src: '/images/works/3DCinema/4.jpg', alt: '4' },
      { src: '/images/works/3DCinema/5.jpg', alt: '5' },
      { src: '/images/works/3DCinema/6.jpg', alt: '6' },
      { src: '/images/works/3DCinema/7.jpg', alt: '7' },
      { src: '/images/works/3DCinema/8.jpg', alt: '8' },
      { src: '/images/works/3DCinema/9.jpg', alt: '9' },
      { src: '/images/works/3DCinema/10.jpg', alt: '10' },
      { src: '/images/works/3DCinema/11.jpg', alt: '11' },
      { src: '/images/works/3DCinema/12.jpg', alt: '12' },
      { src: '/images/works/3DCinema/13.jpg', alt: '13' },
    ],
  },
  {
    name: 'Climate Control',
    images: [
      { src: '/images/works/ClimateControl/1.jpg', alt: '1' },
      { src: '/images/works/ClimateControl/2.jpg', alt: '2' },
      { src: '/images/works/ClimateControl/3.jpg', alt: '3' },
      { src: '/images/works/ClimateControl/4.jpg', alt: '4' },
    ],
  },
    {
    name: 'Фасады',
    images: [
      { src: '/images/works/fasads/1.jpg', alt: '1' },
      { src: '/images/works/fasads/2.jpg', alt: '2' },
      { src: '/images/works/fasads/3.jpg', alt: '3' },
      { src: '/images/works/fasads/4.jpg', alt: '4' },
      { src: '/images/works/fasads/5.jpg', alt: '5' },
      { src: '/images/works/fasads/6.jpg', alt: '6' },
      { src: '/images/works/fasads/7.jpg', alt: '7' },
      { src: '/images/works/fasads/8.jpg', alt: '8' },
      { src: '/images/works/fasads/9.jpg', alt: '9' },
      { src: '/images/works/fasads/10.jpg', alt: '10' },
      { src: '/images/works/fasads/11.jpg', alt: '11' },
      { src: '/images/works/fasads/12.jpg', alt: '12' },
      { src: '/images/works/fasads/13.jpg', alt: '13' },
      { src: '/images/works/fasads/14.jpg', alt: '1' },
      { src: '/images/works/fasads/15.jpg', alt: '2' },
      { src: '/images/works/fasads/16.jpg', alt: '3' },
      { src: '/images/works/fasads/17.jpg', alt: '4' },
      { src: '/images/works/fasads/18.jpg', alt: '5' },
      { src: '/images/works/fasads/19.jpg', alt: '6' },
      { src: '/images/works/fasads/20.jpg', alt: '7' },
      { src: '/images/works/fasads/21.jpg', alt: '8' },
      { src: '/images/works/fasads/22.jpg', alt: '9' },
      { src: '/images/works/fasads/23.jpg', alt: '10' },
      { src: '/images/works/fasads/24.jpg', alt: '11' },
      { src: '/images/works/fasads/25.jpg', alt: '12' },
    ],
  },
      {
    name: 'Acsel13, Flame, Chet41',
    images: [
      { src: '/images/works/Flame, Acsel, Chet/1.jpg', alt: '1' },
      { src: '/images/works/Flame, Acsel, Chet/2.jpg', alt: '2' },
      { src: '/images/works/Flame, Acsel, Chet/3.jpg', alt: '3' },
      { src: '/images/works/Flame, Acsel, Chet/4.jpg', alt: '4' },
      { src: '/images/works/Flame, Acsel, Chet/5.jpg', alt: '5' },
      { src: '/images/works/Flame, Acsel, Chet/6.jpg', alt: '6' },
      { src: '/images/works/Flame, Acsel, Chet/7.jpg', alt: '7' },
      { src: '/images/works/Flame, Acsel, Chet/8.jpg', alt: '8' },
      { src: '/images/works/Flame, Acsel, Chet/9.jpg', alt: '9' },
      { src: '/images/works/Flame, Acsel, Chet/10.jpg', alt: '10' },
      { src: '/images/works/Flame, Acsel, Chet/11.jpg', alt: '11' },
      { src: '/images/works/Flame, Acsel, Chet/12.jpg', alt: '12' },
      { src: '/images/works/Flame, Acsel, Chet/13.jpg', alt: '13' },
      { src: '/images/works/Flame, Acsel, Chet/14.jpg', alt: '1' },
      { src: '/images/works/Flame, Acsel, Chet/15.jpg', alt: '2' },
      { src: '/images/works/Flame, Acsel, Chet/16.jpg', alt: '3' },
      { src: '/images/works/Flame, Acsel, Chet/17.jpg', alt: '4' },
      { src: '/images/works/Flame, Acsel, Chet/18.jpg', alt: '5' },
    ],
  },
        {
    name: 'Зал для занятий КроссФитом "Fit Box"',
    images: [
      { src: '/images/works/FotBox/1.jpg', alt: '1' },
      { src: '/images/works/FotBox/2.jpg', alt: '2' },
      { src: '/images/works/FotBox/3.jpg', alt: '3' },
      { src: '/images/works/FotBox/4.jpg', alt: '4' },
      { src: '/images/works/FotBox/5.jpg', alt: '5' },
      { src: '/images/works/FotBox/6.jpg', alt: '6' },
      { src: '/images/works/FotBox/7.jpg', alt: '7' },
      { src: '/images/works/FotBox/8.jpg', alt: '8' },
    ],
  },
          {
    name: 'Интересные проекты',
    images: [
      { src: '/images/works/InterestedProjects/1.jpg', alt: '1' },
      { src: '/images/works/InterestedProjects/2.jpg', alt: '2' },
      { src: '/images/works/InterestedProjects/3.jpg', alt: '3' },
      { src: '/images/works/InterestedProjects/4.jpg', alt: '4' },
      { src: '/images/works/InterestedProjects/5.jpg', alt: '5' },
      { src: '/images/works/InterestedProjects/6.jpg', alt: '6' },
      { src: '/images/works/InterestedProjects/7.jpg', alt: '7' },
      { src: '/images/works/InterestedProjects/8.jpg', alt: '8' },
      { src: '/images/works/InterestedProjects/9.jpg', alt: '9' },
      { src: '/images/works/InterestedProjects/10.jpg', alt: '10' },
      { src: '/images/works/InterestedProjects/11.jpg', alt: '11' },
      { src: '/images/works/InterestedProjects/12.jpg', alt: '12' },
      { src: '/images/works/InterestedProjects/13.jpg', alt: '13' },
      { src: '/images/works/InterestedProjects/14.jpg', alt: '1' },
      { src: '/images/works/InterestedProjects/15.jpg', alt: '2' },
      { src: '/images/works/InterestedProjects/16.jpg', alt: '3' },
      { src: '/images/works/InterestedProjects/17.jpg', alt: '4' },
      { src: '/images/works/InterestedProjects/18.jpg', alt: '5' },
      { src: '/images/works/InterestedProjects/19.jpg', alt: '6' },
      { src: '/images/works/InterestedProjects/20.jpg', alt: '7' },
      { src: '/images/works/InterestedProjects/21.jpg', alt: '8' },
      { src: '/images/works/InterestedProjects/22.jpg', alt: '9' },
      { src: '/images/works/InterestedProjects/23.jpg', alt: '10' },
    ],
  },
            {
    name: 'Оформление детской в стиле "Lego Ninjago"',
    images: [
      { src: '/images/works/LegoNindjago/1.jpg', alt: '1' },
      { src: '/images/works/LegoNindjago/2.jpg', alt: '2' },
      { src: '/images/works/LegoNindjago/3.jpg', alt: '3' },
      { src: '/images/works/LegoNindjago/4.jpg', alt: '4' },
      { src: '/images/works/LegoNindjago/5.jpg', alt: '5' },
      { src: '/images/works/LegoNindjago/6.jpg', alt: '6' },
      { src: '/images/works/LegoNindjago/7.jpg', alt: '7' },
      { src: '/images/works/LegoNindjago/8.jpg', alt: '8' },
    ],
  },
              {
    name: 'ТРК LikerkaPlaza',
    images: [
      { src: '/images/works/Likerka/1.jpg', alt: '1' },
      { src: '/images/works/Likerka/2.jpg', alt: '2' },
      { src: '/images/works/Likerka/3.jpg', alt: '3' },
      { src: '/images/works/Likerka/4.jpg', alt: '4' },
      { src: '/images/works/Likerka/5.jpg', alt: '5' },
      { src: '/images/works/Likerka/6.jpg', alt: '6' },
      { src: '/images/works/Likerka/7.jpg', alt: '7' },
      { src: '/images/works/Likerka/8.jpg', alt: '8' },
      { src: '/images/works/Likerka/9.jpg', alt: '9' },
    ],
  },
                {
    name: 'NO PAIN NO GAIN',
    images: [
      { src: '/images/works/noPainNoGain/1.jpg', alt: '1' },
      { src: '/images/works/noPainNoGain/2.jpg', alt: '2' },
      { src: '/images/works/noPainNoGain/3.jpg', alt: '3' },
      { src: '/images/works/noPainNoGain/4.jpg', alt: '4' },
      { src: '/images/works/noPainNoGain/5.jpg', alt: '5' },
      { src: '/images/works/noPainNoGain/6.jpg', alt: '6' },
      { src: '/images/works/noPainNoGain/7.jpg', alt: '7' },
      { src: '/images/works/noPainNoGain/8.jpg', alt: '8' },
    ],
  },
                  {
    name: 'Royal Coffe',
    images: [
      { src: '/images/works/RoyalCoffe/1.jpg', alt: '1' },
      { src: '/images/works/RoyalCoffe/2.jpg', alt: '2' },
      { src: '/images/works/RoyalCoffe/3.jpg', alt: '3' },
      { src: '/images/works/RoyalCoffe/4.jpg', alt: '4' },
      { src: '/images/works/RoyalCoffe/5.jpg', alt: '5' },
    ],
  },
                    {
    name: 'Start Up',
    images: [
      { src: '/images/works/StartUp/1.jpg', alt: '1' },
      { src: '/images/works/StartUp/2.jpg', alt: '2' },
      { src: '/images/works/StartUp/3.jpg', alt: '3' },
    ],
  },
            {
    name: 'Страна Чудес',
    images: [
      { src: '/images/works/StranaChudes/1.jpg', alt: '1' },
      { src: '/images/works/StranaChudes/2.jpg', alt: '2' },
      { src: '/images/works/StranaChudes/3.jpg', alt: '3' },
      { src: '/images/works/StranaChudes/4.jpg', alt: '4' },
      { src: '/images/works/StranaChudes/5.jpg', alt: '5' },
      { src: '/images/works/StranaChudes/6.jpg', alt: '6' },
      { src: '/images/works/StranaChudes/7.jpg', alt: '7' },
      { src: '/images/works/StranaChudes/8.jpg', alt: '8' },
      { src: '/images/works/StranaChudes/9.jpg', alt: '9' },
      { src: '/images/works/StranaChudes/10.jpg', alt: '10' },
      { src: '/images/works/StranaChudes/11.jpg', alt: '11' },
      { src: '/images/works/StranaChudes/12.jpg', alt: '12' },
      { src: '/images/works/StranaChudes/13.jpg', alt: '13' },
      { src: '/images/works/StranaChudes/14.jpg', alt: '1' },
      { src: '/images/works/StranaChudes/15.jpg', alt: '2' },
      { src: '/images/works/StranaChudes/16.jpg', alt: '3' },
      { src: '/images/works/StranaChudes/17.jpg', alt: '4' },
      { src: '/images/works/StranaChudes/18.jpg', alt: '5' },
      { src: '/images/works/StranaChudes/19.jpg', alt: '6' },
      { src: '/images/works/StranaChudes/20.jpg', alt: '7' },
      { src: '/images/works/StranaChudes/21.jpg', alt: '8' },
      { src: '/images/works/StranaChudes/22.jpg', alt: '9' },
      { src: '/images/works/StranaChudes/23.jpg', alt: '10' },
      { src: '/images/works/StranaChudes/24.jpg', alt: '10' },
    ],
  },
              {
    name: 'Мотивы Японии на входе в суши-бар нк."Школа"',
    images: [
      { src: '/images/works/Sushi/1.jpg', alt: '1' },
      { src: '/images/works/Sushi/2.jpg', alt: '2' },
      { src: '/images/works/Sushi/3.jpg', alt: '3' },
    ],
  },
              {
    name: 'День молодежи. Фестиваль "Это наш день"',
    images: [
      { src: '/images/works/thisNashDay/1.jpg', alt: '1' },
      { src: '/images/works/thisNashDay/2.jpg', alt: '2' },
      { src: '/images/works/thisNashDay/3.jpg', alt: '3' },
      { src: '/images/works/thisNashDay/4.jpg', alt: '4' },
      { src: '/images/works/thisNashDay/5.jpg', alt: '5' },
      { src: '/images/works/thisNashDay/6.jpg', alt: '6' },
      { src: '/images/works/thisNashDay/7.jpg', alt: '7' },
      { src: '/images/works/thisNashDay/8.jpg', alt: '8' },
      { src: '/images/works/thisNashDay/9.jpg', alt: '9' },
      { src: '/images/works/thisNashDay/10.jpg', alt: '10' },
      { src: '/images/works/thisNashDay/11.jpg', alt: '11' },
      { src: '/images/works/thisNashDay/12.jpg', alt: '12' },
      { src: '/images/works/thisNashDay/13.jpg', alt: '13' },
      { src: '/images/works/thisNashDay/14.jpg', alt: '1' },
      { src: '/images/works/thisNashDay/15.jpg', alt: '2' },
      { src: '/images/works/thisNashDay/16.jpg', alt: '3' },
    ],
  },
                {
    name: 'Развлекательный комплекс "Vegas"',
    images: [
      { src: '/images/works/Vegas/1.jpg', alt: '1' },
      { src: '/images/works/Vegas/2.jpg', alt: '2' },
      { src: '/images/works/Vegas/3.jpg', alt: '3' },
      { src: '/images/works/Vegas/4.jpg', alt: '4' },
      { src: '/images/works/Vegas/5.jpg', alt: '5' },
      { src: '/images/works/Vegas/6.jpg', alt: '6' },
      { src: '/images/works/Vegas/7.jpg', alt: '7' },
      { src: '/images/works/Vegas/8.jpg', alt: '8' },
      { src: '/images/works/Vegas/9.jpg', alt: '9' },

    ],
  },
                  {
    name: 'Mechanic Bar',
    images: [
      { src: '/images/works/MechanicBar/1.jpg', alt: '1' },
      { src: '/images/works/MechanicBar/2.jpg', alt: '2' },
      { src: '/images/works/MechanicBar/3.jpg', alt: '3' },
      { src: '/images/works/MechanicBar/4.jpg', alt: '4' },
      { src: '/images/works/MechanicBar/5.jpg', alt: '5' },
      { src: '/images/works/MechanicBar/6.jpg', alt: '6' },
      { src: '/images/works/MechanicBar/7.jpg', alt: '7' },
      { src: '/images/works/MechanicBar/8.jpg', alt: '8' },
      { src: '/images/works/MechanicBar/9.jpg', alt: '9' },
      { src: '/images/works/MechanicBar/10.jpg', alt: '10' },
      { src: '/images/works/MechanicBar/11.jpg', alt: '11' },
    ],
  }
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
