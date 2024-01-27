<template>
    <swiper
    :autoplay="{delay:3500}"
    :loop="true"
    :modules="modules"
      :spaceBetween="30"
      :effect="'fade'"
      :speed="2500"
    >
      <swiper-slide
        ><img
          src="/images/ss1.jpg" /></swiper-slide
      ><swiper-slide
        ><img
          src="/images/ss2.jpg" /></swiper-slide
      >
      <!-- <swiper-slide
        ><img
          src="/images/ss3.jpg" /></swiper-slide
      ><swiper-slide
        ><img
          src="/images/ss4.jpg" /></swiper-slide
      > -->
      <swiper-slide
        ><img src="/images/ss5.jpg"
      /></swiper-slide>
    </swiper>
  </template>
  <script>
    // Import Swiper Vue.js components
    import { Swiper, SwiperSlide } from 'swiper/vue';
  
    // import required modules
    import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';
  
    export default {
      components: {
        Swiper,
        SwiperSlide,
      },
      setup() {
        return {
          modules: [EffectFade, Navigation, Pagination, Autoplay],
        };
      },
    };
  </script>
  