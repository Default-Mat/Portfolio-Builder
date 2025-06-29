<script lang="ts">
  import { currentLanguage, toggleLanguage } from '../stores/language.js';
  import { onMount } from 'svelte';

  let mounted = false;

  onMount(() => {
    mounted = true;
  });
</script>

<div class="language-switcher fixed top-4 right-4 z-50 transform transition-all duration-300 {mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}">
  <button
    on:click={toggleLanguage}
    class="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 text-gray-700 hover:text-gray-900"
    title={$currentLanguage === 'en' ? 'فارسی' : 'English'}
  >
    <span class="text-sm font-medium">
      {$currentLanguage === 'en' ? 'فا' : 'EN'}
    </span>
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
    </svg>
  </button>
</div>

<style>
  .language-switcher {
    direction: ltr;
  }
</style> 