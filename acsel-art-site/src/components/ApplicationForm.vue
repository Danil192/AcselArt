<template>
  <section id="request" class="bg-dark text-white py-5">
    <div class="container">
      <h2 class="text-center fw-bold mb-4">Оставьте вашу заявку</h2>
      <p class="text-center mb-5">и с вами свяжутся</p>

      <div ref="cardRef" class="bg-secondary p-4 rounded shadow-lg position-relative overflow-hidden">

        <!-- Индикатор шагов (внутри блока) -->
        <div class="d-flex justify-content-center mb-4 step-nav-inner">
          <div
            v-for="n in 3"
            :key="n"
            :class="['step-btn', currentStep === n ? 'active' : '', currentStep > n ? 'completed' : '']"
          >
            ШАГ {{ n }}
          </div>
        </div>

        <!-- Контент шагов с плавным переходом -->
        <Transition name="fade-slide" mode="out-in">
          <!-- ШАГ 1 -->
          <div v-if="currentStep === 1" key="step-1">
            <div class="mb-3">
              <label class="form-label">Ваше ФИО</label>
              <input class="form-control" v-model="form.fullName" />
            </div>
            <div class="mb-3">
              <label class="form-label">Номер телефона</label>
              <input class="form-control" v-model="form.phone" />
            </div>
            <div class="mb-3">
              <label class="form-label">Удобный мессенджер</label>
              <input class="form-control" v-model="form.messenger" placeholder="Telegram, WhatsApp..." />
            </div>
            <div class="text-end mt-4">
              <button class="btn btn-light" @click="goStep(2)">Далее</button>
            </div>
          </div>

          <!-- ШАГ 2 -->
          <div v-else-if="currentStep === 2" key="step-2">
            <div class="mb-3">
              <label class="form-label">Город</label>
              <input class="form-control" v-model="form.city" />
            </div>
            <div class="mb-3">
              <label class="form-label">Назначение объекта</label>
              <input class="form-control" v-model="form.purpose" placeholder="Дом, студия, школа и т.д." />
            </div>
            <div class="mb-3">
              <label class="form-label">Размеры стены (Ш x В в м)</label>
              <input class="form-control" v-model="form.size" />
            </div>
            <div class="mb-3">
              <label class="form-label">Материал стены</label>
              <input class="form-control" v-model="form.material" />
            </div>
            <div class="d-flex justify-content-between mt-4">
              <button class="btn btn-outline-light" @click="goStep(1)">Назад</button>
              <button class="btn btn-light" @click="goStep(3)">Далее</button>
            </div>
          </div>

          <!-- ШАГ 3 -->
          <div v-else-if="currentStep === 3" key="step-3">
            <div class="mb-3">
              <label class="form-label">Дедлайн / Сроки</label>
              <input class="form-control" v-model="form.deadline" />
            </div>
            <div class="mb-3">
              <label class="form-label">Тема рисунка / Идея</label>
              <textarea class="form-control" v-model="form.idea" rows="3" />
            </div>

            <!-- МУЛЬТИЗАГРУЗКА ФАЙЛОВ -->
            <div class="mb-2 d-flex align-items-center justify-content-between">
              <label class="form-label mb-0">Файлы (до 10 шт.)</label>
              <small class="text-light-50">{{ files.length }}/10</small>
            </div>

            <div
              class="upload-dropzone"
              :class="{ 'is-disabled': files.length >= 10 }"
              @dragover.prevent
              @dragenter.prevent
              @drop.prevent="onDrop"
            >
              <input
                ref="fileInput"
                type="file"
                class="form-control d-none"
                multiple
                :disabled="files.length >= 10"
                :accept="acceptList"
                @change="onFilesSelected"
              />
              <button
                class="btn btn-outline-light"
                type="button"
                :disabled="files.length >= 10"
                @click="$refs.fileInput.click()"
              >
                Выбрать файлы
              </button>
              <span class="ms-2 small text-light-50">или перетащите сюда</span>
              <div class="small text-light-50 mt-2">
                Поддерживается: изображения, PDF, DOC/DOCX, XLS/XLSX, PPT/PPTX, ZIP/RAR/7Z
              </div>
            </div>

            <!-- Список выбранных файлов -->
            <div v-if="files.length" class="mt-3 file-list">
              <div
                v-for="(f, idx) in files"
                :key="f.id"
                class="file-item d-flex align-items-center justify-content-between"
              >
                <div class="d-flex align-items-center gap-3">
                  <div class="file-thumb" v-if="f.previewUrl">
                    <img :src="f.previewUrl" alt="preview" />
                  </div>
                  <div class="small">
                    <div class="fw-semibold">{{ f.file.name }}</div>
                    <div class="text-light-50">{{ formatBytes(f.file.size) }}</div>
                  </div>
                </div>
                <button class="btn btn-sm btn-outline-light" @click="removeFile(idx)">Удалить</button>
              </div>
            </div>

            <div class="d-flex justify-content-between mt-4">
              <button class="btn btn-outline-light" @click="goStep(2)">Назад</button>
              <button class="btn btn-light" @click="submitForm">Отправить заявку</button>
            </div>
          </div>
        </Transition>

        <!-- Тонкая прогресс-линия снизу блока -->
        <div class="progress-underline" :style="{ width: progressWidth }"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'

const currentStep = ref(1)
const cardRef = ref(null)
const fileInput = ref(null)

/* форма */
const form = ref({
  fullName: '',
  phone: '',
  messenger: '',
  city: '',
  purpose: '',
  size: '',
  material: '',
  deadline: '',
  idea: '',
})

/* файлы */
const files = ref([]) // [{ id, file, previewUrl|null }]

const acceptList = 'image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.rar,.7z'

function isImage(file) {
  return file.type?.startsWith('image/')
}

/* добавление файлов из input */
function onFilesSelected(e) {
  const incoming = Array.from(e.target.files || [])
  addFiles(incoming)
  // очищаем input, чтобы повторный выбор того же файла срабатывал
  e.target.value = ''
}

/* добавление файлов drag&drop */
function onDrop(e) {
  const incoming = Array.from(e.dataTransfer?.files || [])
  addFiles(incoming)
}

/* общая логика добавления с лимитом и превью */
function addFiles(incoming) {
  if (!incoming.length) return

  const remaining = Math.max(0, 10 - files.value.length)
  const slice = incoming.slice(0, remaining)

  slice.forEach((file) => {
    const item = {
      id: crypto.randomUUID?.() || String(Date.now() + Math.random()),
      file,
      previewUrl: isImage(file) ? URL.createObjectURL(file) : null,
    }
    files.value.push(item)
  })
}

/* удаление файла + чистим blob url */
function removeFile(index) {
  const item = files.value[index]
  if (item?.previewUrl) URL.revokeObjectURL(item.previewUrl)
  files.value.splice(index, 1)
}

function formatBytes(bytes) {
  if (!bytes && bytes !== 0) return ''
  const sizes = ['Б', 'КБ', 'МБ', 'ГБ']
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), sizes.length - 1)
  const val = bytes / Math.pow(1024, i)
  return `${val.toFixed(val >= 10 || i === 0 ? 0 : 1)} ${sizes[i]}`
}

/** Плавный скролл к началу карточки после смены шага (удобно на мобилке) */
async function goStep(n) {
  currentStep.value = n
  // await nextTick()
  // cardRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

async function submitForm() {
  // Сборка формы с файлами
  const fd = new FormData()
  Object.entries(form.value).forEach(([k, v]) => fd.append(k, v ?? ''))
  files.value.forEach((item) => fd.append('files[]', item.file))

  // Пример отправки — замени на свой endpoint
  // try {
  //   const res = await fetch('/api/request', { method: 'POST', body: fd })
  //   if (!res.ok) throw new Error('Ошибка отправки')
  //   alert('Заявка отправлена!')
  //   // Очистка формы при успехе
  //   resetForm()
  // } catch (e) {
  //   console.error(e)
  //   alert('Не удалось отправить, попробуйте позже.')
  // }

  alert(`Форма собрана. Файлов: ${files.value.length}. (Демо-алерт вместо отправки)`)
}

function resetForm() {
  form.value = {
    fullName: '',
    phone: '',
    messenger: '',
    city: '',
    purpose: '',
    size: '',
    material: '',
    deadline: '',
    idea: '',
  }
  // чистим превью
  files.value.forEach((it) => it.previewUrl && URL.revokeObjectURL(it.previewUrl))
  files.value = []
}

/** Прогресс для нижней линии */
const progressWidth = computed(() => {
  const map = { 1: '33.33%', 2: '66.66%', 3: '100%' }
  return map[currentStep.value]
})
</script>

<style scoped>
/* Кнопки-индикаторы шагов */
.step-btn {
  background: #555;
  color: #fff;
  border-radius: 999px;
  padding: 0.55rem 1.1rem;
  min-width: 90px;
  text-align: center;
  user-select: none;
  flex: 0 0 auto; /* базовая ширина по содержимому */
  transition:
    background-color .25s ease,
    color .25s ease,
    box-shadow .25s ease,
    flex-basis .28s ease; /* плавная анимация ширины */
  box-shadow: inset 0 0 0 0 rgba(255,255,255,0);
}

.step-btn.active {
  background: #ffffff;
  color: #000;
  font-weight: 700;
  box-shadow: inset 0 0 0 2px rgba(0,0,0,.15);
  flex-basis: 120px; /* увеличиваем длину */
}

/* Обычные шаги — чуть меньше */
.step-btn:not(.active) {
  flex-basis: 90px;
}

.step-btn.completed {
  background: #28a745;
  color: #fff;
}

/* Переходы между шагами */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity .28s ease, transform .28s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Тонкая прогресс-линия по низу карточки */
.progress-underline {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 3px;
  background: linear-gradient(90deg, #fff, #ddd);
  transition: width .3s ease;
}

/* Чуть приятнее фон карточки */
.bg-secondary {
  background-color: #3e3e3e !important;
}

/* Внутренний отступ снизу, чтобы линия не прилипала визуально к контенту */
.step-nav-inner {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: .5rem;
  padding-bottom: .25rem;
  border-bottom: 1px dashed rgba(255,255,255,.15);
  margin-bottom: 1.25rem;
}

/* Зона загрузки */
.upload-dropzone {
  border: 1px dashed rgba(255,255,255,.35);
  border-radius: .5rem;
  padding: 1rem;
  text-align: center;
  background: rgba(255,255,255,.03);
  transition: border-color .2s ease, background-color .2s ease, opacity .2s ease;
}
.upload-dropzone.is-disabled {
  opacity: .5;
  pointer-events: none;
}

/* Список файлов */
.file-list {
  border-top: 1px dashed rgba(255,255,255,.15);
  padding-top: .75rem;
}
.file-item + .file-item {
  margin-top: .5rem;
}
.file-thumb {
  width: 44px;
  height: 44px;
  border-radius: .35rem;
  overflow: hidden;
  background: rgba(255,255,255,.1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.file-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Вспом. цвет */
.text-light-50 { color: rgba(255,255,255,.6); }
</style>
