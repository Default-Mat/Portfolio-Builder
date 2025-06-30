<script lang="ts">
  let { children } = $props();
  import "../app.css";
  import { currentLanguage, translations } from '../lib/stores/language.js';
  import { beforeNavigate, afterNavigate } from '$app/navigation';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  const loading = writable(false);

  onMount(() => {
    beforeNavigate(() => loading.set(true));
    afterNavigate(() => loading.set(false));
  });
</script>

{#if $loading}
  <div class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-60 z-50">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
{/if}

{@render children()}

<!-- Footer Section -->
<footer class="flex flex-col justify-center bg-gray-900 text-white py-8 sm:py-12 px-4 sm:px-8 md:px-16 transform transition-all duration-700 hover:bg-gray-800" dir={$currentLanguage === 'fa' ? 'rtl' : 'ltr'}>
  <div class="max-w-6xl mx-auto">
    <div class="text-center lg:text-left mb-6 sm:mb-8">
      <h3 class="text-2xl sm:text-4xl lg:!text-6xl font-bold mb-2 sm:mb-4 transform transition-all duration-300 hover:scale-105">
        {translations[$currentLanguage].footer.title}
      </h3>
      <p class="text-base sm:text-lg md:!text-xl text-gray-300 max-w-lg mx-auto lg:mx-0 leading-relaxed">
        {translations[$currentLanguage].footer.description}
      </p>
    </div>

    <!-- Contact & Social Links -->
    <div class="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
      <a href="mailto:matin.arno4646@email.com" class="text-sm sm:!text-lg inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl">
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
        </svg>
        {translations[$currentLanguage].footer.contactMe}
      </a>
      <a href="https://linkedin.com/in/matinmeskinnavaz" class="text-sm sm:!text-lg inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl">
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"/>
        </svg>
        {translations[$currentLanguage].footer.linkedin}
      </a>
      <a href="https://github.com/Default-Mat" class="text-sm sm:!text-lg inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl">
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"/>
        </svg>
        {translations[$currentLanguage].footer.github}
      </a>
    </div>

    <!-- Copyright -->
    <div class="text-center lg:text-left pt-6 sm:pt-8 border-t border-gray-700">
      <p class="text-xs sm:text-sm md:text-base text-gray-400 transition-colors duration-300 hover:text-gray-300">
        {translations[$currentLanguage].footer.copyright}
      </p>
    </div>
  </div>
</footer>

<style>
</style>