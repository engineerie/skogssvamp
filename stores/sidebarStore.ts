import { defineStore } from 'pinia';

export const useSidebarStore = defineStore({
  // unique id of the store across your application
  id: 'sidebar',

  // a function that returns a fresh state
  state: () => ({
    isSidebarOpen: false,
  }),

  // optional getters
  getters: {
    isOpen() {
      return this.isSidebarOpen;
    },
  },

  // optional actions
  actions: {
    openSidebar() {
      this.isSidebarOpen = true;
      console.log("Sidebar opened:", this.isSidebarOpen);
    },
    closeSidebar() {
      this.isSidebarOpen = false;
      console.log("Sidebar closed:", this.isSidebarOpen);
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
      console.log("Sidebar toggled:", this.isSidebarOpen);
    },
  },
});
