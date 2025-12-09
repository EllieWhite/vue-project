<script setup>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { faCalendar, faComment } from '@fortawesome/free-solid-svg-icons';
</script>
<template>
  <section>
    <h2 class="sr-only">Последние статьи</h2>
    <ul class="mt-8 grid grid-cols-3 gap-8">
      <li class="flex">
        <article class="flex w-full">
          <a href="" class="rounded-md bg-white w-full shadow transition-transform hover:transform-[scale(1.05)]">
            <div class="p-4 flex flex-col">
              <img src="https://picsum.photos/352/234" class="w-full h-48 object-cover" alt="">
              <h3 class="mt-4 mb-3">Новость о веб-технологии</h3>
              <div class="flex justify-between align-center mt-auto">
                <p>
                  <FontAwesomeIcon :icon="faCalendar"/>
                  <time datetime="2023-12-31">31 декабря 2023</time>
                </p>
                <p>
                  <FontAwesomeIcon :icon="faComment"/>
                  <span>25</span>
                </p>
              </div>
            </div>
          </a>
        </article>
      </li>
       <li class="flex">
        <article class="flex w-full">
          <a href="" class="rounded-md bg-white inline-block w-full shadow transition-transform hover:transform-[scale(1.05)]">
            <div class="p-4">
              <img src="https://picsum.photos/352/234" class="w-full h-48 object-cover" alt="">
              <h3 class="mt-4">Новость о веб-технологии</h3>
              <div class="mt-3 flex justify-between align-center">
                <p>
                  <FontAwesomeIcon :icon="faCalendar"/>
                  <time datetime="2023-12-31">31 декабря 2023</time>
                </p>
                <p>
                  <FontAwesomeIcon :icon="faComment"/>
                  <span>25</span>
                </p>
              </div>
            </div>
          </a>
        </article>
      </li>
            <li class="flex">
        <article class="flex w-full">
          <a href="" class="rounded-md bg-white w-full inline-block shadow transition-transform hover:transform-[scale(1.05)]">
            <div class="p-4">
              <img src="https://picsum.photos/352/234" class="w-full h-48 object-cover" alt="">
              <h3 class="mt-4">Новость о веб-технологии xxx sx cdcdv c evxcjn dncj</h3>
              <div class="mt-3 flex justify-between align-center">
                <p>
                  <FontAwesomeIcon :icon="faCalendar"/>
                  <time datetime="2023-12-31">31 декабря 2023</time>
                </p>
                <p>
                  <FontAwesomeIcon :icon="faComment"/>
                  <span>25</span>
                </p>
              </div>
            </div>
          </a>
        </article>
      </li>
    </ul>
  </section>
</template>
