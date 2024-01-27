<template>
    <swiper
    :autoplay="{delay:4500}"
    :loop="true"
    :modules="modules"
      :spaceBetween="30"
      :effect="'fade'"
      :speed="1000"
    >
      <swiper-slide
        ><img
          src="/images/clearcut.jpg" /></swiper-slide
      ><swiper-slide
        ><img
          src="/images/clearcut1.jpg" /></swiper-slide
      >
     <swiper-slide
        ><img
          src="/images/clearcut2.jpg" /></swiper-slide
      >
      <swiper-slide
        ><img src="/images/clearcut3.jpg"
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
  