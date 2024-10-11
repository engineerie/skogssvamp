import { defineStore } from "pinia";

interface OnboardingState {
  selectedStartskog: number;
  selectedFramework: number;
}

export const useOnboardingStore = defineStore("onboardingStore", {
  state: (): OnboardingState => ({
    selectedStartskog: 0, // Default value
    selectedFramework: 0, // Default value
  }),
});
