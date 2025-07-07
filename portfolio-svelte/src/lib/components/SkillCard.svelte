<script lang="ts">
  import { onMount } from 'svelte';
  export let skill;
  import { currentLanguage } from '../stores/language.js';
  import gsap from 'gsap';

  let mounted = false;

  // GSAP hover handlers for cards
  function handleCardMouseEnter(event: MouseEvent) {
    gsap.to(event.currentTarget, {
      y: -8,
      scale: 1.02,
      boxShadow: '0 10px 20px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
      duration: 0.3,
      ease: 'power2.out'
    });
  }
  function handleCardMouseLeave(event: MouseEvent) {
    gsap.to(event.currentTarget, {
      y: 0,
      scale: 1,
      boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1.5px 6px rgba(0,0,0,0.04)',
      duration: 0.3,
      ease: 'power2.in'
    });
  }

  onMount( async () => {
    // Dynamically import GSAP and ScrollTrigger only on the client
    const gsapModule = await import('gsap');
    const ScrollTrigger = (await import('gsap/ScrollTrigger')).ScrollTrigger;
    gsapModule.gsap.registerPlugin(ScrollTrigger);

    setTimeout(() => {
      mounted = true;
    }, 100);
  });
</script>

<!-- Skill card component -->
<div class="skill-card bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-md"
  aria-hidden="true"
  onmouseenter={handleCardMouseEnter}
  onmouseleave={handleCardMouseLeave}>
  <div class="text-blue-600 text-2xl sm:text-3xl mb-2 sm:mb-3 transform transition-transform duration-300 hover:scale-110">💻</div>
  <h3 class="lg:!text-3xl md:!text-2xl sm:!text-xl font-semibold text-gray-800 mb-1 sm:mb-2">
    {$currentLanguage === 'fa' ? skill.acf.عنوان : skill.title.rendered}
  </h3>
  <p class="text-base sm:text-lg text-gray-600">{skill.acf.technologies}</p>
</div> 