<template>
  <section id="request" class="bg-dark text-white py-5">
    <div class="container">
      <h2 class="text-center fw-bold mb-4">Оставьте вашу заявку</h2>
      <p class="text-center mb-5">и с вами свяжутся</p>

      <!-- Навигация по шагам -->
      <div class="d-flex justify-content-center mb-4 step-nav">
        <button
          v-for="n in 3"
          :key="n"
          @click="currentStep = n"
          :class="['step-btn', currentStep === n ? 'active' : '']"
        >
          ШАГ {{ n }}
        </button>
      </div>

      <!-- Содержимое шагов -->
      <div class="bg-secondary p-4 rounded">
        <div v-if="currentStep === 1">
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
        </div>

        <div v-else-if="currentStep === 2">
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
          <div class="mb-3">
            <label class="form-label">Состояние покрытия</label>
            <input class="form-control" v-model="form.surface" placeholder="Штукатурка, плитка, бетон..." />
          </div>
        </div>

        <div v-else-if="currentStep === 3">
          <div class="mb-3">
            <label class="form-label">Дедлайн / Сроки</label>
            <input class="form-control" v-model="form.deadline" />
          </div>
          <div class="mb-3">
            <label class="form-label">Тема рисунка / Идея</label>
            <textarea class="form-control" v-model="form.idea" rows="3" />
          </div>
          <div class="mb-3">
            <label class="form-label">Фото стены (если есть)</label>
            <input type="file" class="form-control" />
          </div>
        </div>

        <div class="text-center mt-4">
          <button class="btn btn-light" @click="submitForm">Отправить заявку</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const currentStep = ref(1)

const form = ref({
  fullName: '',
  phone: '',
  messenger: '',
  city: '',
  purpose: '',
  size: '',
  material: '',
  surface: '',
  deadline: '',
  idea: '',
})

function submitForm() {
  alert('Форма отправлена. Пока без логики :)')
}
</script>

<style scoped>
.step-btn {
  background: #555;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  margin: 0 0.3rem;
  border-radius: 999px;
  cursor: pointer;
}
.step-btn.active {
  background: white;
  color: black;
}
</style>
