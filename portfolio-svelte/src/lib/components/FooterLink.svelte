<script lang="ts">
  import { onMount } from 'svelte';
  export let link;
  import { currentLanguage } from '../stores/language.js';

  let mounted = false;
  let gsapInstance: any;

  // GSAP hover handlers for buttons
  function handleButtonMouseEnter(event: MouseEvent) {
    if (!gsapInstance) return;
    gsapInstance.to(event.currentTarget, {
      y: -8,
      scale: 1.02,
      boxShadow: '0 10px 20px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
      duration: 0.3,
      ease: 'power2.out'
    });
  }
  function handleButtonMouseLeave(event: MouseEvent) {
    if (!gsapInstance) return;
    gsapInstance.to(event.currentTarget, {
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
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsapModule.gsap.registerPlugin(ScrollTrigger);
    gsapInstance = gsapModule.gsap;

    setTimeout(() => {
      mounted = true;
    }, 100);
  });
</script>

<a
  href={link.acf.url}
  class="text-sm sm:!text-lg inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gray-700 text-white rounded-lg shadow-lg footer-link footer-animate-init"
  target="_blank"
  rel="noopener"
  aria-hidden="true"
  onmouseenter={handleButtonMouseEnter}
  onmouseleave={handleButtonMouseLeave}
  title={$currentLanguage === 'fa' ? link.acf['بستر'] : link.acf.platform_name}
>
  <span>{$currentLanguage === 'fa' ? link.acf['بستر'] : link.acf.platform_name}</span>
</a> 