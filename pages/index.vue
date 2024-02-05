<template>

    <BaseHeading size="2xl" weight="semibold" class="absolute top-3.5 left-52 ">Skogssvamp</BaseHeading>
    <BaseThemeSwitch class="absolute top-6 right-52 z-20 opacity-90 "/>

<!-- top nav -->
<div class="absolute top-6 flex justify-center w-screen">
    <div class="space-x-10 px-4 flex">
      <NuxtLink to="#om-projektet" class="mb-0.5 text-sm px-2 transition-colors duration-300 opacity-60 hover:opacity-90 " @click.prevent="setActive('#om-projektet')">Funktioner</NuxtLink>
      <!-- <NuxtLink to="#metod" class="text-sm px-2 transition-colors duration-300 opacity-60 hover:opacity-90 " @click.prevent="setActive('#metod')">Om Projektet</NuxtLink>
      <NuxtLink to="#faq" class="text-sm px-2 transition-colors duration-300 opacity-60 hover:opacity-90 " @click.prevent="setActive('#faq')">FAQ</NuxtLink> -->
      <NuxtLink to="#kontakt" class="text-sm px-2 transition-colors duration-300 opacity-60 hover:opacity-90 " @click.prevent="setActive('#kontakt')">Kontakt</NuxtLink>
    </div>
</div>



 <!-- <div v-if="showMessage" class="fixed top-16 left-1/2 transform -translate-x-1/2 text-center z-50 bg-opacity-50">
    <BaseMessage type="danger">
      Under utveckling! Information som presenteras kan vara ofullständig eller felaktig. Färdig version lanseras våren 2025. 
      <BaseButtonClose
      size="xs"
      rounded="full"
      color="muted"
      class="absolute -top-4 -right-4"
      @click="showMessage = false"
    />
    </BaseMessage>
  </div> -->



<!-- blurred background circles -->
<div class="relative z-0 pointer-events-none">
  <div class="absolute top-0 left-0 w-full h-full">
    <div class="absolute bg-green-300   dark:bg-green-700 rounded-full w-96 h-96 top-72 left-20 blur-3xl      dark:opacity-10 opacity-20"></div>
    <div class="absolute bg-green-500   dark:bg-green-500 rounded-full w-2/3 h-96 -top-10 left-20 blur-3xl    dark:opacity-10 opacity-20"></div>
    <div class="absolute bg-violet-400  dark:bg-violet-800 rounded-full w-1/3 h-96 -top-10 right-20 blur-3xl  dark:opacity-10 opacity-10"></div>
    <div class="absolute bg-green-400   dark:bg-green-800 rounded-full w-64 h-64 -top-32 left-0 blur-3xl      dark:opacity-20 opacity-10"></div>
    <div class="absolute bg-green-300   dark:bg-green-500 rounded-full w-72 h-72 top-20 left-1/2 blur-3xl     dark:opacity-0  opacity-0"></div>
    <div class="absolute bg-green-400   dark:bg-green-500 rounded-full w-2/3 h-96 -top-44 right-0 blur-3xl    dark:opacity-10 opacity-0"></div>
    <div class="absolute bg-rose-200    dark:bg-rose-200 rounded-full w-52 h-52 -top-20 -right-10 blur-3xl    dark:opacity-10 opacity-20"></div>
    <div class="absolute bg-green-500   dark:bg-green-800 rounded-full w-48 h-48 top-20 left-40 blur-3xl      dark:opacity-10 opacity-10"></div>
    <div class="absolute bg-violet-500  dark:bg-violet-900 rounded-full w-48 h-96 top-30 left-72 blur-3xl     dark:opacity-10 opacity-10"></div>
    <div class="absolute bg-green-300   dark:bg-green-800 rounded-full w-2/3 h-96 top-40 -right-20 blur-3xl   dark:opacity-20 opacity-20"></div>
    <div class="absolute bg-green-200   dark:bg-green-500 rounded-full w-56 h-56 -bottom-10 right-40 blur-3xl dark:opacity-15 opacity-15"></div>
  </div> 
</div>


<section class="ml-32">
  <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
      <div class="mr-auto place-self-center lg:col-span-7">
        <BaseButton to="https://www.slu.se/ew-nyheter/2023/3/se-svampen-i-din-skog/" target="_blank" color="primary" flavor="pastel" size="sm" shape="full" class=" border-[0.5px] border-green-500 inline-flex mb-10"><span>Läs artikel på slu.se</span>      <Icon name="lucide:arrow-up-right" class="me-1 h-4 w-4" />
        </BaseButton>
          <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Se Svampen i din Skog</h1>
          <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">En webbapplikation för skogsägare och svampintreserade.</p>
          <NuxtLink @click="openSidebar" to="/svampdata" class="inline-flex items-center justify-center"> 
            <div class="rounded-full text-md dark:bg-green-500 dark:border-neutral-600 bg-green-500 border-neutral-300 border-[1px] mr-4 p-2.5 px-5 dark:hover:bg-neutral-800 hover:bg-opacity-85">
              <Icon name="ic:round-rocket-launch" class=" -ms-1 h-6 w-6 mr-3" />
              <span>Kom igång</span>
            </div>
          </NuxtLink> 
          <NuxtLink @click="openSidebar" to="/guide" class="inline-flex items-center justify-center"> 
            <div class="rounded-full text-md dark:bg-neutral-700 dark:border-neutral-600 bg-neutral-100 border-neutral-300 border-[1px] mr-2 p-2.5 px-5 dark:hover:bg-neutral-800 hover:bg-neutral-50">
              <Icon name="mdi:file-cog-outline" class=" -ms-1 h-6 w-6 mr-3" />
              <span>Se dokumentation</span>
            </div>
          </NuxtLink> 
      </div>
      <StartImage />
      <!-- <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img src="/images/threeTrees.png" alt="mockup">
      </div>                 -->
  </div>
</section>
  
<!-- Hero title -->
<!-- <div class="w-full h-screen flex">
  
  <div class="flex flex-col items-center justify-center mt-56">
    <div class="z-10">
      <BaseButton to="https://www.slu.se/ew-nyheter/2023/3/se-svampen-i-din-skog/" target="_blank" color="primary" flavor="pastel" size="sm" shape="full" class=" border-[0.5px] border-green-500"><span>Läs artikel på slu.se</span>      <Icon name="lucide:arrow-up-right" class="me-1 h-4 w-4" />
      </BaseButton>
      <BaseHeading size="7xl" weight="extrabold" class="mb-4">Se Svampen i din Skog</BaseHeading>
      <BaseHeading weight="light" size="xl" class="mb-4 text-neutral-500">En webbapplikation för skogsägare och svampintreserade.</BaseHeading>
    </div>
    <div class="flex gap-6 justify-center mt-6">
      <NuxtLink @click="openSidebar" to="/svampdata"> 
        <div class="rounded-full text-lg dark:bg-neutral-700 dark:border-neutral-600 bg-neutral-100 border-neutral-300 border-[1px] p-2 px-4 dark:hover:bg-neutral-800 hover:bg-neutral-50">
          <Icon name="ic:round-rocket-launch" class=" -ms-1 h-6 w-6 mr-2" />
          <span>Starta appen</span>
        </div>
      </NuxtLink> 
    </div>
  </div>
  <div class="flex justify-center items-center mt-20 ml-40">
    <img src="/images/threeTrees.png">
  </div>
</div> -->



  
<!-- <div class="flex justify-center items-center mt-40">
  <div class="w-2/3">
    <div class="rounded-lg gradient-border p-[1px]">
      <slideShow class="rounded-lg block dark:border-neutral-800 border-neutral-300"/>
    </div>
  </div>
</div> -->


 
  <!-- <div class="mt-36 mx-52">
    <img src="/images/dashboard.jpg" alt="Screenshot" class="mx-auto rounded-lg border-[1px] dark:border-neutral-800 border-neutral-300 dark:hidden">
    <img src="/images/dashboard_dark.jpg" alt="Screenshot" class=" hidden mx-auto rounded-lg border-[1px] dark:border-neutral-800 border-neutral-300 dark:block">
  </div> -->

  <!-- <div class="flex justify-center items-center">
    <BaseHeading size="xl" weight="normal" class="mb-8 mt-40 text-neutral-500">Tidsplan</BaseHeading>
  </div> -->

 

  
    <div id="om-projektet" class="py-8">
      <div class="mx-72 mt-4">
      <div class="flex flex-col items-center justify-center mx-12">
    
        <div class="text-center mb-24">
          <BaseHeading size="sm" class="mb-4 text-green-500">Funktioner</BaseHeading>
          <BaseHeading size="4xl" weight="extrabold" class="mb-4">Svampmångfald och Skogsskötsel</BaseHeading>
          <BaseHeading weight="light" size="xl" class="mb-10 text-neutral-500">
            Vi bygger en webbapp för att visualisera och utforska mykorrhizasvampars mångfald i svenska skogsbestånd och deras respons vid olika skogssbruksåtgärder.</BaseHeading>
        </div>

        <BaseHeading weight="light" size="lg" class="mb-14 text-neutral-500">Börja utforska</BaseHeading>

        <div class="flex"> 
          <NuxtLink @click="openSidebar" to="/svampdata">
          <div class=" -rotate-6 bg-neutral-100 backdrop-blur-2xl bg-opacity-40 shadow-xl hover:bg-green-100 hover:bg-opacity-20 hover:dark:brightness-110 dark:bg-neutral-900 p-6 w-72 rounded-xl border-neutral-300 dark:border-neutral-700 border-[0.5px]">
          <div class="w-12 h-12 mb-4 rounded-lg text-green-500 flex justify-center items-center  border-[0.5px] dark:border-neutral-700 border-neutral-300 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-neutral-300 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">              
            <Icon name="mingcute:mushroom-line" class="h-6 w-6" /> 
          </div>      
          <BaseHeading weight="normal" size="lg" class="mb-2 "> Svampararter i olika skogar </BaseHeading>
          <BaseHeading weight="light" size="md" class="mb-4 text-neutral-500">
            Ta del av nysammanställd information om vilka svampar som finns i olika skogsmiljöer. </BaseHeading>
            <Icon name="lucide:arrow-right" class="h-5 w-5" /> 
        </div>
      </NuxtLink>
      <NuxtLink @click="openSidebar" to="/skogsbruk">
        <div class=" rotate-6 bg-neutral-100 backdrop-blur-2xl bg-opacity-40 shadow-xl hover:bg-green-100 hover:bg-opacity-20 hover:dark:brightness-110 dark:bg-neutral-900 p-6 w-72 rounded-xl border-neutral-300 dark:border-neutral-700 border-[0.5px]">
          <div class="w-12 h-12 mb-4 rounded-lg text-green-500 flex justify-center items-center  border-[0.5px] dark:border-neutral-700 border-neutral-300 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-neutral-300 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">              
            <Icon name="jam:tree" class="h-7 w-7" /> 
          </div>      
          <BaseHeading weight="normal" size="lg" class="mb-2 "> Svampar och skogsbruk </BaseHeading>
          <BaseHeading weight="light" size="md" class="mb-4 text-neutral-500">
            Lär dig om hur svampar och träd hänger ihop, och se hur marksvampar påverkas vid och efter avverkning.</BaseHeading>
            <Icon name="lucide:arrow-right" class="h-5 w-5" /> 

          </div>
      </NuxtLink>
      </div>
       
      
      </div>
    </div>
  </div>

  <div class="relative z-0 pointer-events-none">
    <!-- Blurred Circles as Background -->
    <div class="absolute top-0 left-0 w-full h-full">
      <div class="absolute bg-green-500 rounded-full w-80 h-44 top-48 right-72 blur-3xl opacity-20"></div>
    </div>
  </div>
  

  <div class="grid grid-cols-2 mx-44 mt-48 mb-52 justify-center items-center ">
      <div class="ml-6">
        <div class="w-12 h-12 mb-4 rounded-lg flex justify-center items-center text-green-500 border-[0.5px] dark:border-neutral-700 border-neutral-300 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-neutral-300 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">              
          <Icon name="mingcute:mushroom-line" class="h-6 w-6" /> 
        </div>      
        <BaseHeading weight="extrabold" size="3xl" class="mb-4 ">Vilka svampar finns i vilka skogar?</BaseHeading>
        <BaseHeading weight="light" size="lg" class="mb-4 text-neutral-500">
          Uppgifter om geografi, trädslag, beståndsålder och fältskikt kopplas till information om art och frekvens av vilka svampar som förväntas förekomma i beståndet.</BaseHeading>
         <NuxtLink to="/svampdata" >
          <BaseHeading weight="default" size="md" class="mb-2 w-fit border-transparent hover:border-b-black border-b-2 dark:hover:border-b-white  "> Läs mer <Icon name="material-symbols:arrow-forward" class=" h-4 w-4" /></BaseHeading>
        </NuxtLink>
      </div>
     <div class="flex justify-end mr-12"><ListBoxRowHorizontal/></div>
      
  
    

  </div>
  

  <div class="mx-72">
      <div class="flex flex-col items-center justify-center mx-16">
        <div class="text-center">
          <BaseHeading size="4xl" weight="extrabold" class="mb-4">Vad går att se per bestånd? </BaseHeading>
          <BaseHeading weight="light" size="xl" class="mb-20 text-neutral-500">
          För varje beståndstyp presenteras information om: </BaseHeading>
          </div>
      
      </div>
  </div>

  <div class="grid grid-cols-2 mx-96 justify-center items-center gap-7 ">
      <div class="hover:bg-neutral-100 hover:bg-opacity-50 hover:dark:bg-opacity-50 hover:dark:bg-neutral-800 p-6 h-48 rounded-xl border-neutral-300 dark:border-neutral-700 border-[0.5px]">
        <div class="w-12 h-12 mb-4 rounded-lg text-violet-500 flex justify-center items-center  border-[0.5px] dark:border-neutral-700 border-neutral-300 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-neutral-300 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">              
          <Icon name="game-icons:plant-roots" class="h-6 w-6" /> 
        </div>      
        <BaseHeading weight="normal" size="lg" class="mb-2 "> Vanliga arter </BaseHeading>
        <BaseHeading weight="light" size="md" class="mb-4 text-neutral-500">
          Vanligt förekommande mykorrhiza baserat på DNA-analys från över 2000 skogar.</BaseHeading>
      </div>
      <div class="hover:bg-opacity-50 hover:dark:bg-opacity-50 hover:bg-neutral-100 hover:dark:bg-neutral-800 p-6 h-48 rounded-xl border-neutral-300 dark:border-neutral-700 border-[0.5px]">
        <div class="w-12 h-12 mb-4 rounded-lg text-yellow-500 flex justify-center items-center  border-[0.5px] dark:border-neutral-700 border-neutral-300 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-neutral-300 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">              
          <Icon name="fluent:food-16-filled" class="h-6 w-6" /> 
        </div>      
        <BaseHeading weight="normal" size="lg" class="mb-2 "> Matsvampar </BaseHeading>
        <BaseHeading weight="light" size="md" class="mb-4 text-neutral-500">
          Matsvampar baseras på artdatabanken och länkar till svampguiden.se </BaseHeading>
      </div>
      <div class="hover:bg-opacity-50 hover:dark:bg-opacity-50 hover:bg-neutral-100 hover:dark:bg-neutral-800 p-6 h-48 rounded-xl border-neutral-300 dark:border-neutral-700 border-[0.5px]">
        <div class="w-12 h-12 mb-4 text-red-500 rounded-lg flex justify-center items-center  border-[0.5px] dark:border-neutral-700 border-neutral-300 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-neutral-300 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">              
          <Icon name="ph:warning" class="h-6 w-6" /> 
        </div>      
        <BaseHeading weight="normal" size="lg" class="mb-2 "> Rödlistade arter </BaseHeading>
        <BaseHeading weight="light" size="md" class="mb-4 text-neutral-500">
          Möjligt förekommande rödlistade arter baseras på artdatabanken</BaseHeading>
      </div>
      <div class="hover:bg-opacity-50 hover:dark:bg-opacity-50 hover:bg-neutral-100 hover:dark:bg-neutral-800 p-6 h-48 rounded-xl border-neutral-300 dark:border-neutral-700 border-[0.5px]">
        <div class="w-12 h-12 mb-4 text-green-500 rounded-lg flex justify-center items-center  border-[0.5px] dark:border-neutral-700 border-neutral-300 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-neutral-300 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">              
          <Icon name="game-icons:mushrooms" class="h-6 w-6" /> 
        </div>      
        <BaseHeading weight="normal" size="lg" class="mb-2 "> Artrikedom </BaseHeading>
        <BaseHeading weight="light" size="md" class="mb-4 text-neutral-500">
          Beräknad artrikedom baserad på nya studier från SLU</BaseHeading>
      </div>
  </div>

  <div class="grid grid-cols-2 mx-44 mt-80 mb-52 justify-center items-center z-0">
  
    <!-- Slideshow2 Component with Blurred Background -->
    <div class="relative flex justify-left items-start w-full px-6">
      <!-- Blurred Background -->
      <div class="absolute top-0 left-0 right-0 bottom-0 bg-green-500 rounded-2xl blur-3xl opacity-15 pointer-events-none"></div>
      
      <!-- Slideshow2 -->
      <slideShow2 class="relative z-10 rounded-lg border-[1px] dark:border-neutral-800 border-neutral-300 w-full"/>
    </div>
  
    <!-- Other Content -->
    <div class="ml-6 ">
      <div class="w-12 h-12 mb-4 rounded-lg flex justify-center items-center text-green-500 border-[0.5px] dark:border-neutral-700 border-neutral-300 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-neutral-300 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">              
        <Icon name="jam:tree" class="h-6 w-6" /> 
      </div>      
      <BaseHeading weight="extrabold" size="3xl" class="mb-4 ">Marksvampar och Skogssbruk</BaseHeading>
      <BaseHeading weight="light" size="lg" class="mb-4 text-neutral-500">
        Utforska hur olika skogsbruksmetoder påverkar mykorrhizasvampar över en omloppstid i en interaktiv modell</BaseHeading>
       <NuxtLink to="/svampdata" >
        <BaseHeading weight="default" size="md" class="mb-2 w-fit border-transparent hover:border-b-black border-b-2 dark:hover:border-b-white  "> Läs mer <Icon name="material-symbols:arrow-forward" class=" h-4 w-4" /></BaseHeading>
      </NuxtLink>
    </div>
  
  </div>

<!-- Jämför olika skogsbrukmetoder title -->
<div class="mx-72 ">
  <div class="flex flex-col items-center justify-center mx-16">
    <div class="text-center">
      <BaseHeading size="4xl" weight="extrabold" class="mb-4">Jämför olika skogsbruksmetoder</BaseHeading>
      <BaseHeading weight="light" size="xl" class="mb-20 text-neutral-500">
      För varje beståndstyp presenteras information om: </BaseHeading>
      </div>
  </div>
</div>

<!-- 6 Skogsbrukmetoder -->
<div class="grid grid-cols-3 mx-40 mb-40 justify-center items-center gap-7">
  <div class="hover:bg-neutral-100 hover:bg-opacity-50 hover:dark:bg-opacity-50 hover:dark:bg-neutral-800 p-6 h-48 rounded-xl border-neutral-300 dark:border-neutral-700 border-[0.5px]">
    <div class="w-12 h-12 mb-4 rounded-lg flex justify-center items-center  border-[0.5px] dark:border-neutral-700 border-neutral-300 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-neutral-300 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">              
      <Icon name="material-symbols:resize" class="h-6 w-6" /> 
    </div>      
    <BaseHeading weight="normal" size="lg" class="mb-2 "> Hyggesstorlek </BaseHeading>
    <BaseHeading weight="light" size="md" class="mb-4 text-neutral-500">
      Utforska hyggestorlekens betydelse för mykorrhizasvampar</BaseHeading>
  </div>
  <div class="hover:bg-opacity-50 hover:dark:bg-opacity-50 hover:bg-neutral-100 hover:dark:bg-neutral-800 p-6 h-48 rounded-xl border-neutral-300 dark:border-neutral-700 border-[0.5px]">
    <div class="w-12 h-12 mb-4 rounded-lg  flex justify-center items-center  border-[0.5px] dark:border-neutral-700 border-neutral-300 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-neutral-300 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">              
      <Icon name="pepicons-pop:tree-circle" class="h-6 w-6" /> 
    </div>      
    <BaseHeading weight="normal" size="lg" class="mb-2 "> Hänsynsträd </BaseHeading>
    <BaseHeading weight="light" size="md" class="mb-4 text-neutral-500">
     Se och jämför enstaka och gruppställda hänsynsträds naturvårdsroll</BaseHeading>
  </div>
  <div class="hover:bg-opacity-50 hover:dark:bg-opacity-50 hover:bg-neutral-100 hover:dark:bg-neutral-800 p-6 h-48 rounded-xl border-neutral-300 dark:border-neutral-700 border-[0.5px]">
    <div class="w-12 h-12 mb-4 rounded-lg flex justify-center items-center  border-[0.5px] dark:border-neutral-700 border-neutral-300 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-neutral-300 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">              
      <Icon name="tabler:seeding-off" class="h-6 w-6" /> 
    </div>      
    <BaseHeading weight="normal" size="lg" class="mb-2 "> Gallring </BaseHeading>
    <BaseHeading weight="light" size="md" class="mb-4 text-neutral-500">
     Se påverkan vid olika gallringsfaser</BaseHeading>
  </div>
  <div class="hover:bg-opacity-50 hover:dark:bg-opacity-50 hover:bg-neutral-100 hover:dark:bg-neutral-800 p-6 h-48 rounded-xl border-neutral-300 dark:border-neutral-700 border-[0.5px]">
    <div class="w-12 h-12 mb-4  rounded-lg flex justify-center items-center  border-[0.5px] dark:border-neutral-700 border-neutral-300 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-neutral-300 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">              
      <Icon name="tabler:christmas-tree-off" class="h-6 w-6" /> 
    </div>      
    <BaseHeading weight="normal" size="lg" class="mb-2 "> Blädning </BaseHeading>
    <BaseHeading weight="light" size="md" class="mb-4 text-neutral-500">
      Utforska blädningsbrukets påverkan på marksvampar</BaseHeading>
  </div>
  <div class="hover:bg-opacity-50 hover:dark:bg-opacity-50 hover:bg-neutral-100 hover:dark:bg-neutral-800 p-6 h-48 rounded-xl border-neutral-300 dark:border-neutral-700 border-[0.5px]">
    <div class="w-12 h-12 mb-4  rounded-lg flex justify-center items-center  border-[0.5px] dark:border-neutral-700 border-neutral-300 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-neutral-300 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">              
      <Icon name="simple-icons:redwoodjs" class="h-5 w-5" /> 
    </div>      
    <BaseHeading weight="normal" size="lg" class="mb-2 "> Skärmträd </BaseHeading>
    <BaseHeading weight="light" size="md" class="mb-4 text-neutral-500">
      Hur påverkar skärmträd och tiden de bevaras marksvampar? </BaseHeading>
  </div>
  <div class="hover:bg-opacity-50 hover:dark:bg-opacity-50 hover:bg-neutral-100 hover:dark:bg-neutral-800 p-6 h-48 rounded-xl border-neutral-300 dark:border-neutral-700 border-[0.5px]">
    <div class="w-12 h-12 mb-4 rounded-lg flex justify-center items-center  border-[0.5px] dark:border-neutral-700 border-neutral-300 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-neutral-300 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">              
      <Icon name="pixelarticons:chess" class="h-6 w-6" /> 
    </div>      
    <BaseHeading weight="normal" size="lg" class="mb-2 "> Luckhuggning </BaseHeading>
    <BaseHeading weight="light" size="md" class="mb-4 text-neutral-500">
      Utforska kanteffektens fördelar med luckhuggning </BaseHeading>
  </div>
</div>

<!-- Blurred Circle for SLU Play-->
<div class="relative z-0 pointer-events-none ">
  <div class="absolute top-0 left-0 w-screen h-full justify-center flex">
    <div class=" dark:bg-green-800 bg-green-400 rounded-full w-80 h-44 mt-24 blur-3xl dark:opacity-10 opacity-10"></div>
  </div>
</div>

<!-- SLU Play -->
<div class="flex justify-center items-center my-64">
  <div class="w-96 text-center">
    <div class="flex justify-center">
    <div class="w-12 h-12 mb-4 rounded-lg flex justify-center items-center text-green-500 border-[0.5px] dark:border-neutral-700 border-neutral-300 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-neutral-300 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">              
      <Icon name="ic:baseline-ondemand-video" class="h-6 w-6" /> 
    </div> 
  </div>     
    <BaseHeading weight="normal" size="lg" class="mb-2 ">Föredrag om Svampar och Skogsbruk</BaseHeading>
    <BaseHeading weight="light" size="md" class="mb-4 text-neutral-500">
      Se Anders Dahlberg berätta om hur svampar och skogsbruk hänger ihop på SLU Play</BaseHeading>
      <BaseButton to="https://play.slu.se/id/0_42ki6c9z" target="_blank" color="muted" flavor="pastel" size="sm" shape="full" class=" border-[0.5px] dark:border-neutral-700 border-neutral-400"><span>SLU Play</span><Icon name="lucide:arrow-up-right" class="me-1 h-4 w-4" />
      </BaseButton>
  </div>
</div>

<!-- 
<div id="metod" class="py-8 mt-32 mx-96">
    <div class="text-center">
      <BaseHeading size="sm" class="mb-4 text-green-500">Om Projektet</BaseHeading>
      <BaseHeading size="4xl" weight="extrabold" class="mb-4">Verklighetsnära Visualiseringar</BaseHeading>
    </div>
</div>

<div class="flex items-center mt-40 mx-60">

  <div class="w-12 h-12 ml-4 rounded-lg flex justify-center items-center border-[0.5px] dark:border-neutral-700 border-neutral-300 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-neutral-300 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">      
    <Icon name="ic:baseline-build" class="h-5 w-5" />
  </div> 

 

  <div class="flex-auto h-[2px] w-96 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-400 to-neutral-100 dark:from-neutral-500 dark:to-neutral-950"></div>
  

  <div class="w-12 h-12 rounded-lg flex justify-center items-center border-[0.5px] dark:border-neutral-700 border-neutral-300 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-neutral-300 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">              
    <Icon name="material-symbols:person-check" class="h-6 w-6 ms-1" /> 
  </div>
  

  <div class="flex-auto h-[2px] w-24 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-400 to-neutral-100 dark:from-neutral-500 dark:to-neutral-950"></div>
  


  <div class="w-12 h-12 mr-4 rounded-lg flex justify-center items-center border-[0.5px] dark:border-neutral-700 border-neutral-300 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-neutral-300 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">                      
    <Icon name="mdi:web-check" class="h-6 w-6" />
  </div>
</div>

<div class="flex items-center mx-60">

<div>
  <div class="w-20 mt-2 flex justify-center items-center text-green-500">
    Projektstart
  </div>
  <div class="w-20 flex justify-center items-center text-neutral-500">
    Aprill 2023
  </div> 
</div>
    

<div class="flex-auto w-96 "></div>
  
<div>
  <div class="w-40 mt-2 flex justify-center items-center text-green-500">
    Användartest
  </div>
  <div class="w-40 flex justify-center items-center text-neutral-500">
    September 2024
  </div> 
</div>
  
 
<div class="flex-auto w-24 "></div>
  

<div>
  <div class="w-20 mt-2 flex justify-center items-center text-green-500">
    Publik 
  </div>
  <div class="w-20 flex justify-center items-center text-neutral-500">
    Mars 2025
  </div> 
</div>
</div>
   
-->  
  

<!-- Kontakt -->
<div id="kontakt" class="py-8 mt-40">
    <div class="flex flex-col items-center justify-center mx-12">
      <BaseHeading size="sm" class="mb-4 text-green-500">Kontakt</BaseHeading>
      <BaseHeading size="4xl" weight="extrabold" class="mb-4">Vi som arbetar med projektet</BaseHeading>

      <div class="grid grid-cols-2 mt-10 mb-14 mx-44 gap-48">
        <div class="flex items-start">
          <div class="w-12 h-12 mr-5 rounded-lg flex justify-center items-center border-[0.5px] dark:border-neutral-700 border-neutral-300 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-neutral-300 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">              <Icon name="ic:baseline-devices" class="h-5 w-5" /> </div>      
          <div>
            <BaseHeading size="sm" class=" text-green-500">Apputveckling och Visualiseringar</BaseHeading>
            <BaseHeading size="md" weight="extrabold" class="">Jacob Bertilsson</BaseHeading>
            <BaseHeading size="sm"  class=" text-neutral-500">jacob.bertilsson@gmail.com</BaseHeading>
          </div>
        </div>
        <div class="flex items-start">
          <div class="w-12 h-12 mr-5 rounded-lg flex justify-center items-center  border-[0.5px] dark:border-neutral-700 border-neutral-300 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-neutral-300 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">              <Icon name="game-icons:grass-mushroom" class="h-5 w-5" /> </div>      
          <div >
            <BaseHeading size="sm" class=" text-green-500">Professor vid Institutionen för skoglig mykologi och växtpatologi</BaseHeading>
            <BaseHeading size="md" weight="extrabold" class="">Anders Dahlberg</BaseHeading>
            <BaseHeading size="sm"  class=" text-neutral-500">anders.dahlberg@slu.se</BaseHeading>
          </div>
        </div>
      </div>
    </div>
  </div>

   <!-- Blurred background circles-->
  <div class="relative z-0 pointer-events-none">
    <div class="absolute top-0 left-0 w-full">
      <!-- <div class="absolute bg-green-500 rounded-full w-2/3 h-96 -top-10 left-20 blur-3xl opacity-10"></div> -->
      <!-- <div class="absolute bg-violet-800 rounded-full w-1/3 h-96 -top-10 right-20 blur-3xl opacity-10"></div> -->
      <div class="absolute bg-green-300   dark:bg-green-800  rounded-full w-64 h-64 -top-32 left-0 blur-3xl opacity-0"></div>
      <div class="absolute bg-green-400   dark:bg-green-500  rounded-full w-72 h-72 top-20 left-1/2 blur-3xl dark:opacity-5 opacity-10"></div>
      <div class="absolute bg-violet-400  dark:bg-violet-500 rounded-full w-1/3 h-96 top-60 right-20 blur-3xl dark:opacity-5 opacity-20"></div>
      <div class="absolute bg-violet-400  dark:bg-violet-500 rounded-full w-60 h-96 -top-96 -right-40 blur-3xl dark:opacity-0 opacity-20"></div>
      <div class="absolute bg-rose-300    dark:bg-rose-300   rounded-full w-40 h-52 -top-20 -right-10 blur-3xl dark:opacity-0 opacity-15"></div>
      <div class="absolute bg-green-400   dark:bg-green-800  rounded-full w-48 h-60 top-20 left-40 blur-3xl opacity-10"></div>
      <div class="absolute bg-green-300   dark:bg-green-900  rounded-full w-48 h-96 top-30 left-72 blur-3xl opacity-10"></div>
      <div class="absolute bg-green-500   dark:bg-green-800  rounded-full w-2/3 h-96 top-40 -right-20 blur-3xl dark:opacity-10 opacity-10"></div>
    </div> 
  </div>

  <div class="flex justify-center mt-32">
    <img src="/images/slu_logo_svart_webb.png" class="h-64">
  </div>

  <!-- Referensgrupp title & icons-->
<!-- <div class="flex flex-col items-center justify-center mx-12 mt-16">
    <BaseHeading size="md" weight="light" class="mb-6 m-20 text-neutral-500">Involverad referensgrupp</BaseHeading>
</div>

<div class="grid grid-cols-6 py-4 mx-56">
    
    <div class="flex justify-center items-center">
      <img src="/images/bitzer.png" alt="Bitzer Logo" class="max-h-16 dark:brightness-200 ">
    </div>
    <div class="flex justify-center items-center">
      <img src="/images/ardatabanken_logo.png" alt="ArtDatabanken Logo" class="max-h-14 dark:brightness-200 ">
    </div>
    <div class="flex justify-center items-center">
      <img src="/images/skogsstyrelsen.png" alt="Skogsstyrelsen Logo" class="max-h-20 p-1 ml-6 dark:brightness-200 ">
    </div>
    <div class="flex justify-center items-center">
      <img src="/images/skogssforsk.png" alt="Skogsforsk Logo" class="max-h-16 mr-6 dark:brightness-200 ">
    </div>
    <div class="flex justify-center items-center">
      <img src="/images/södra.png" alt="Södra Logo" class="max-h-8 dark:brightness-200 ">
    </div>
    <div class="flex justify-center items-center">
      <img src="/images/Sveaskog_Logo.svg.png" alt="Sveaskog Logo" class="max-h-10 dark:brightness-200 ">
    </div>
   
</div>  -->



  
  
 
  



  <div class="relative mt-60">
    <div class="absolute bottom-8 left-24 flex justify-start items-center">
      <BaseHeading size="sm" weight="light" class="text-neutral-500 mb-1 mx-4">Skogssvamp finansieras av</BaseHeading>
      <img src="/images/funding.png" alt="funding" class="h-9 dark:brightness-200">
    </div>
    <div class="absolute bottom-10 flex w-screen justify-center">
    <div class="flex gap-10">
      <NuxtLink to="#om-projektet" class="mb-0.5 text-sm px-2 transition-colors duration-300 opacity-60 hover:opacity-90 " @click.prevent="setActive('#om-projektet')">Funktioner</NuxtLink>
      <!-- <NuxtLink to="#metod" class="mb-0.5 text-sm px-2 transition-colors duration-300 opacity-60 hover:opacity-90 " @click.prevent="setActive('#metod')">Metod</NuxtLink>
      <NuxtLink to="#faq" class="mb-0.5 text-sm px-2 transition-colors duration-300 opacity-60 hover:opacity-90 " @click.prevent="setActive('#faq')">FAQ</NuxtLink> -->
      <NuxtLink to="#kontakt" class="mb-0.5 text-sm px-2 transition-colors duration-300 opacity-60 hover:opacity-90 " @click.prevent="setActive('#kontakt')">Kontakt</NuxtLink>
    </div>
  </div>
  <div class="flex absolute bottom-10 right-12 z-0">
  <Icon name="mdi:github" class="me-1 h-6 w-6 mr-6 opacity-70" />
  <BaseThemeSwitch class="opacity70"/>
</div>
  </div>
  

</template>

<style>

body {
  overflow-x: hidden;
  /* background-color: #e21313; */
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.gradient-border {
  background: linear-gradient(270deg, #404040, #5b21b6, #15803d, #404040, #404040);
  background-size: 200% 200%;
  animation: gradient 12s ease infinite;
}

/* Optional: for smooth scrolling when clicking on the links */
html {
  scroll-behavior: smooth;
}
</style>


<script setup>
  import { useSidebarStore } from '~/stores/sidebarStore';
  import { ref, onMounted, onBeforeUnmount } from 'vue';

  const showMessage = ref(false);
  const { openSidebar } = useSidebarStore();

  onMounted(() => {
  // This code will run when the component is mounted
  // Reset showMessage to true when the component mounts
  showMessage.value = false;
});

  const items = [{
  label: 'Hur många olika svampar finns i min skog?',
  defaultOpen: true,
  content: 'I Sverige är det vanligt med i storleksordningen tusen olika svampar i ett bestånd där mellan hundra och tvåhundra kan vara olika arter mykorrhizasvampar. Även om svamparna inte är synliga ovan mark lever de nere i jorden bland trädrötterna; hela marken är likt en stor mycelmatta.Ett mindre antal arter är vanliga och utgör merparten av svampmängden i skogsmarken. De flesta arter är ovanliga och många förekommer bara någon enstaka gång.'
}, {
  label: 'Vilka arter finns i min skog?',
  content: 'Olika svampar trivs i olika skogsmiljöer. Vilka svampar som finns beror på vilka träd som växer där, var i landet beståndet ligger, beståndets ålder och historik samt ytterligare några miljöfaktorer.Med hjälp av en svampdatabas baserad på över 2000 skogar i hela Sverige kan vi beräkna vilka arter som kan finnas i en skog.Vi planerar att potentiella förekomster av matsvampar och rödlistade svampar skall framgå i applikationen.',
}, {
  label: 'Hur påverkar skogsskötseln artsammansättningen?',
  content: 'Tanken med applikationen är att man med uppgifter om beståndets skogstyp, areal och kanske omgivande bestånd interaktivt skall kunna beräkna och visualisera hur olika skogsskötsel (gallring, slutavverkning, hyggesfria metoder och olika utformad naturvårdshänsyn) potentiellt kan komma att påverka förekomsten och artsammansättningen av svamp under en skogsålder.'
}]

</script>


  
  <script>
  export default {
  data() {
    return {
      // No need for isActive if you use a computed property
    };
  },
  computed: {
    // This computes isActive based on the current route
    isActive() {
      return this.$route.hash;
    },
  },
  methods: {
    setActive(tabName) {
      // Directly scroll, as isActive will be computed automatically
      this.$nextTick(() => {
        this.scrollToSection(tabName);
      });
    },
    scrollToSection(sectionId) {
    const element = document.querySelector(sectionId);
    if (element) {
      const topPosition = element.getBoundingClientRect().top + window.pageYOffset;

      window.scrollTo({
        top: topPosition,
        behavior: 'smooth'
      });
    }
  },
}
};

</script>
