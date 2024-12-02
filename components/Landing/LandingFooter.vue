<template>
  <footer class="bg-neutral-100 dark:bg-neutral-900 py-10">
    <div
      class="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
    >
      <!-- Column 1: Funktioner -->
      <div>
        <h3 class="font-bold mb-4">Funktioner</h3>
        <ul>
          <li class="mb-2">
            <NuxtLink to="/svampdata" class="text-gray-600 dark:text-gray-300"
              >Svamparter</NuxtLink
            >
          </li>
          <li class="mb-2">
            <NuxtLink to="/skogsbruk" class="text-gray-600 dark:text-gray-300"
              >Skogsbruk</NuxtLink
            >
          </li>
        </ul>
      </div>
      <!-- Column 2: Dokumentation -->
      <div>
        <h3 class="font-bold mb-4">Dokumentation</h3>
        <ul>
          <li class="mb-2">
            <NuxtLink
              to="/dokumentation/miljoindelningar"
              class="text-gray-600 dark:text-gray-300"
              >Miljöindelningar</NuxtLink
            >
          </li>
          <li class="mb-2">
            <NuxtLink
              to="/dokumentation/dna-analys"
              class="text-gray-600 dark:text-gray-300"
              >DNA-analys</NuxtLink
            >
          </li>
          <li class="mb-2">
            <NuxtLink
              to="/dokumentation/artrikedom"
              class="text-gray-600 dark:text-gray-300"
              >Artrikedom</NuxtLink
            >
          </li>
          <!-- Add more links as needed -->
        </ul>
      </div>
      <!-- Column 3: Om Projektet -->
      <div>
        <h3 class="font-bold mb-4">Om Projektet</h3>
        <ul>
          <li class="mb-2">
            <NuxtLink
              to="/om/motivation"
              class="text-gray-600 dark:text-gray-300"
              >Motivation</NuxtLink
            >
          </li>
          <li class="mb-2">
            <NuxtLink to="/om/kontakt" class="text-gray-600 dark:text-gray-300"
              >Kontakt</NuxtLink
            >
          </li>
        </ul>
      </div>
      <!-- Column 4: Social Media / Other Links -->
      <div>
        <h3 class="font-bold mb-4">Följ oss</h3>
        <!-- Add social media links or other relevant information -->
      </div>
    </div>
  </footer>
</template>

<script setup></script>
