<script setup>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { faCalendar, faTrash } from '@fortawesome/free-solid-svg-icons';
</script>

<template>
  <article class="pt-8 pb-5 px-8 rounded-md bg-white shadow-md">
    <div class="rounded-md overflow-x-hidden">
      <img src="https://picsum.photos/1152/288" alt="" class="w-full h-64 object-cover">
    </div>
    <div class="mt-5 text-[#4a5565]">
      <FontAwesomeIcon :icon="faCalendar" />
      <time datetime="">
        31 декабря 2053 12:53
      </time>
    </div>

    <div class="mt-5 flex justify-between items-end">
      <h1 class="text-3xl">Заголовок статьи</h1>
      <button aria-label="Удалить статью">
        <FontAwesomeIcon :icon="faTrash" />
      </button>
    </div>
    <div class="mt-5">
      <p class="mb-8 text-lg">Повседневная практика показывает, что начало повседневной работы по формированию позиции позволяет выполнять
        важные задания по разработке модели развития. Идейные соображения высшего порядка, а также начало повседневной
        работы по формированию позиции требуют от нас анализа существующих решений и выработки новых подходов.
      </p>
      <p class="mb-8 text-lg">Разнообразный и богатый опыт реализация намеченных плановых заданий влечет за собой процесс внедрения и
        модернизации модели развития. Значимость этих проблем настолько очевидна, что постоянный количественный рост и
        сфера нашей активности позволяет оценить значение позиций, занимаемых участниками в отношении поставленных
        задач. Задача организации, в особенности же реализация намеченных плановых заданий влечет за собой процесс
        внедрения и модернизации системы обучения кадров соответствует насущным потребностям. Не следует, однако
        забывать, что начало повседневной работы по формированию позиции позволяет оценить значение соответствующих
        условий активизации.
      </p>
    </div>

  </article>
</template>
