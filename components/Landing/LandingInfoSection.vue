<template>
  <div class="py-16">
    <div class="container mx-auto px-6 text-center">
      <BaseHeading
        size="5xl"
        lead="tight"
        class="font-bold text-center leading-tight"
      >
        Svampar och träd
      </BaseHeading>
      <BaseHeading
        size="5xl"
        class="text-primary-500 font-bold mb-4 text-center leading-tight"
      >
        hänger ihop
      </BaseHeading>
      <BaseHeading size="5xl" class="font-bold mb-4"> </BaseHeading>
      <p class="text-xl mb-4 text-gray-500 mx-40">
        Mykorrhizasvampar lever i symbios med träd och hjälper dem att ta upp
        näringsämnen från marken. De flesta större svampar, som kremlor, soppar,
        spindlingar och matsvampar, tillhör denna grupp.
      </p>
      <!-- Video Placeholder with Play Icon -->
      <div
        class="relative w-full pb-[56.25%] bg-transparent border border-neutral-300 rounded-2xl cursor-pointer"
        style="
          background-image: repeating-linear-gradient(
            -45deg,
            rgba(0, 0, 0, 0.1) 0px,
            rgba(0, 0, 0, 0.1) 5px,
            transparent 5px,
            transparent 10px
          );
        "
      >
        <!-- Play Triangle -->
        <button
          class="absolute inset-0 flex items-center justify-center focus:outline-none"
          aria-label="Play Video"
          style="
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            width: 80px;
            height: 80px;
            margin: auto;
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#333"
            width="40"
            height="40"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
