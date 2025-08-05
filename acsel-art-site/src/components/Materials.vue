<template>
  <section id="materials" class="bg-dark text-white py-5 position-relative">
    <div class="container">
      <h2 class="text-center fw-bold mb-4">Используемые материалы</h2>
      <blockquote class="text-center fst-italic mb-5">
        «Эти ребята шарят, у них не вода из-под крана, а Molotow в вене»
      </blockquote>

      <div class="row text-center mb-5">
        <div class="col-md-4">
          <h5 class="fw-bold">Краски</h5>
          <p>Molotow, Montana, Loop Colors</p>
        </div>
        <div class="col-md-4">
          <h5 class="fw-bold">Защита</h5>
          <p>Фасадные лаки, акриловые и полиуретановые покрытия, грунтовки</p>
        </div>
        <div class="col-md-4">
          <h5 class="fw-bold">Инструменты</h5>
          <p>Маски, насадки, респираторы, скотчи, кисти и др.</p>
        </div>
      </div>

      <div ref="canvasContainer" class="threejs-container"></div>
    </div>
  </section>
</template>

<script setup>

</script>

<style scoped>
.threejs-container {
  width: 100%;
  height: 500px;
  margin-top: 3rem;
  margin-bottom: 3rem;

  border: 2px solid white;        /* ← белая рамка */
  border-radius: 10px;            /* ← скругление по желанию */
  box-shadow: 0 0 15px #ffffff33; /* ← лёгкая светящаяся тень */
  overflow: hidden;               /* ← обрезать всё, что выходит за рамки */
}
</style>
