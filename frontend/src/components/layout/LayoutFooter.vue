<script setup>
  import { onBeforeMount } from 'vue';
  import LayoutContainer from './LayoutContainer.vue';
  import { ref } from 'vue';

  const lat = 55.7522;
  const lon = 37.615;

  const city = ref('');
  const temp = ref(0);
  const precStrength = ref(0);

  const fetchWeatherData = (lat, lon, headers) => {
    fetch(`https://api.weather.yandex.ru/v2/forecast?lat=${lat}&lon=${lon}`, { headers })
    .then(response => response.json())
    .then(json => {
      city.value = json.geo_object.locality.name;
      temp.value = json.fact.temp;
      precStrength.value = json.fact.prec_strength
    });
  }

  const year = new Date().toLocaleString('ru-RU', {
    year: 'numeric'
  });

  onBeforeMount(() => {
    const accessKey = import.meta.env.VITE_APP_YANDEX_WEATHER_KEY;

      const headers = {
        'X-Yandex-Weather-Key': accessKey
      };

      navigator.geolocation.getCurrentPosition((position) =>{
        fetchWeatherData(position.coords.latitude, position.coords.longitude, headers);
      }, () => {
        fetchWeatherData(lat, lon, headers);
      });

  })

</script>

<template>
  <footer class="bg-white">
    <LayoutContainer>
      <div class="py-8 flex justify-between">
        <div>
          <p>Блог веб-разработчика</p>
          <a href="mailto:eb@developer.ru">web@developer.ru</a>
        </div>
        <div>
          <p>
            {{ city }},
            <time :datetime="year">{{ year }}</time></p>
          <p>Погода: сила осадков {{ precStrength }}, {{ temp }}°C</p>
        </div>
      </div>
    </LayoutContainer>

  </footer>
</template>
