<template>
  <section id="about" class="py-5 text-white bg-dark">
    <div class="container">
      <!-- Заголовок -->
      <h1 class="text-center mb-4 fw-bold">О студии</h1>

      <!-- Описание -->
      <div class="row mb-5">
        <div class="col-lg-10 mx-auto">
          <p class="lead text-center">
            Творческая студия <strong>ACSEL ART</strong> — коллектив, который профессионально занимается предоставлением
            услуг художественного оформления в городе Чита на протяжении 10 лет.
          </p>
          <p class="text-center">
            Мы способны воплотить любую художественную идею, вдохнуть новую жизнь и энергию в заданное пространство,
            создать оригинальный образ, неповторимую атмосферу, которая будет производить впечатление, удивлять, воодушевлять.
          </p>
          <p class="text-center">
            Мы ищем новые возможности показать себя и создать что-то прекрасное для Вас, Ваших клиентов, бизнеса или близких.
          </p>
        </div>
      </div>

      <!-- Команда -->
      <div class="row">
        <div
          class="col-md-3 col-sm-6 text-center mb-4"
          v-for="member in team"
          :key="member.name"
        >
          <img
            :src="member.photo"
            class="rounded-circle mb-2 shadow"
            :alt="member.name"
            width="150"
            height="150"
          />
          <h5 class="fw-bold">{{ member.name }}</h5>
          <p class="text-light small">{{ member.role }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const team = [
  { name: 'Алексей Литвинец', role: 'Основатель / Художник', photo: '/images/team/human.jpg' },
  { name: 'Григорий Русанов', role: 'Основатель / Художник', photo: '/images/team/human.jpg' },
  { name: 'Андрей', role: 'Менеджер', photo: '/images/team/human.jpg' },
  { name: 'Аня', role: 'Художник', photo: '/images/team/human.jpg' },
  { name: 'Катя', role: 'Художник', photo: '/images/team/human.jpg' },
  { name: 'Вика', role: 'Художник', photo: '/images/team/human.jpg' },
  { name: 'Алексей', role: 'Художник', photo: '/images/team/human.jpg' },
  { name: 'Ира', role: 'Художник', photo: '/images/team/human.jpg' },
]
</script>

<style scoped>
#about {
  scroll-margin-top: 80px;
}

img.rounded-circle {
  object-fit: cover;
  object-position: center;
}

.bg-dark {
  background-color: #212529 !important;
}

.shadow {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
}
</style>
