<template>
    <div class="fixed h-screen px-3 py-4 w-20 bg-neutral-100 dark:bg-neutral-800 dark:bg-opacity-100 border-r-[1px] dark:border-stone-600 border-neutral-300">
        <div class="flex flex-col items-center">
            <BaseButtonIcon :color="isInHome ? 'primary' : 'default'" @click="closeSidebar" shape="full" to="/"  class="h-5 w-5 my-5" data-nui-tooltip-position="right" data-nui-tooltip="Homepage">
                <icon name="heroicons-outline:home" class="h-6 w-6"/> 
            </BaseButtonIcon>
            <BaseButtonIcon :color="isInSvampData ? 'primary' : 'default'" @click="openSidebar" shape="full" to="/svampdata" class="h-5 w-5 my-5" data-nui-tooltip-position="right" data-nui-tooltip="Mushroom data">
                <icon name="mingcute:mushroom-line" class="h-4 w-4"/>
            </BaseButtonIcon>
            <BaseButtonIcon :color="isInSkogsbruk ? 'primary' : 'default'" @click="openSidebar" shape="full" to="/skogsbruk" class="h-5 w-5 my-5" data-nui-tooltip-position="right" data-nui-tooltip="Forestry">
                <icon name="jam:tree" class="h-6 w-6"/>
            </BaseButtonIcon>
            <BaseButtonIcon :color="isInAbout ? 'primary' : 'default'" @click="openSidebar" shape="full" to="/about" class="h-5 w-5 my-5" data-nui-tooltip-position="right" data-nui-tooltip="About">
                <icon name="heroicons:information-circle" class="h-5 w-5"/>
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
const isInHome = computed(() => route.path === '/');

const { openSidebar, isSidebarOpen, closeSidebar } = useSidebarStore(); // Destructure isSidebarOpen here
    
onMounted(() => {
  console.log('Client: isSidebarOpen:', isSidebarOpen.value);
});
</script>

