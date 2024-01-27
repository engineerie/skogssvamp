<template>
    <div class="fixed h-screen px-3 py-4 w-20 bg-neutral-100 dark:bg-neutral-900 dark:bg-opacity-100 border-r-[1px] dark:border-neutral-800 border-neutral-300">
        <div class="flex flex-col items-center">
            <BaseButtonIcon :color="isInHome ? 'primary' : 'default'" @click="closeSidebar" shape="full" to="/"  class="h-5 w-5 my-5" data-nui-tooltip-position="right" data-nui-tooltip="Hem">
                <icon name="tabler:home" class="h-5 w-5"/> 
            </BaseButtonIcon>
            <BaseButtonIcon :color="isInSvampData ? 'primary' : 'default'" @click="openSidebar" shape="full" to="/svampdata" class="h-5 w-5 my-5" data-nui-tooltip-position="right" data-nui-tooltip="Svampar i olika skogar">
                <icon name="mingcute:mushroom-line" class="h-5 w-5"/>
            </BaseButtonIcon>
            <BaseButtonIcon :color="isInSkogsbruk ? 'primary' : 'default'" @click="openSidebar" shape="full" to="/skogsbruk" class="h-5 w-5 my-5" data-nui-tooltip-position="right" data-nui-tooltip="Svampar och skogsbruk">
                <icon name="jam:tree" class="h-5 w-5"/>
            </BaseButtonIcon>
            <!-- <BaseButtonIcon :color="isInSvampliv ? 'primary' : 'default'" @click="openSidebar" shape="full" to="/svampliv" class="h-5 w-5 my-5" data-nui-tooltip-position="right" data-nui-tooltip="Hur svampar lever">
                <icon name="tabler:mushroom" class="h-5 w-5"/>
            </BaseButtonIcon> -->
            <BaseButtonIcon :color="isInGuide ? 'primary' : 'default'" @click="openSidebar" shape="full" to="/guide" class="h-5 w-5 my-5" data-nui-tooltip-position="right" data-nui-tooltip="Dokumentation">
                <icon name="mdi:file-cog-outline" class="h-5 w-5"/>
            </BaseButtonIcon>
            <BaseButtonIcon :color="isInAbout ? 'primary' : 'default'" @click="openSidebar" shape="full" to="/about" class="h-5 w-5 my-5" data-nui-tooltip-position="right" data-nui-tooltip="Om Projektet">
                <icon name="tabler:info-circle" class="h-5 w-5"/>
            </BaseButtonIcon>
        </div>
    </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useSidebarStore } from '~/stores/sidebarStore';
import { useRoute } from 'vue-router';

const route = useRoute();

const isActiveDirectory = (directory) => {
  return computed(() => {
    return route.path.includes(`/${directory}`);
  });
};

const isInSvampData = isActiveDirectory('svampdata');
const isInSkogsbruk = isActiveDirectory('skogsbruk');
const isInAbout = isActiveDirectory('about');
const isInSvampliv = isActiveDirectory('svampliv');
const isInGuide = isActiveDirectory('guide');
const isInHome = computed(() => route.path === '/');

const { openSidebar, isSidebarOpen, closeSidebar } = useSidebarStore(); // Destructure isSidebarOpen here
    

</script>

