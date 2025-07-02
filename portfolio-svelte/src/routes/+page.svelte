<script lang="ts">
  import { onMount } from 'svelte';
  import ProjectCard from './project-card.svelte';
  import LanguageSwitcher from '../lib/components/LanguageSwitcher.svelte';
  import { currentLanguage, translations } from '../lib/stores/language.js';
  import gsap from 'gsap';

  // Type for the project data
  type Project = {
    id: number;
    title: { rendered: string };
    acf: {
      description: string;
      technologies: string;
      url: string;
      عنوان?: string; // Persian title
      توضیحات?: string; // Persian description
    };
  };

  let projects: Project[] = [];
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

  // GSAP entrance animation for hero section
  let heroTitleEl: HTMLHeadingElement;
  let heroSubtitleEl: HTMLParagraphElement;
  let heroDescEl: HTMLParagraphElement;
  let heroImgEl: HTMLDivElement;

  // Set initial state for hero elements as soon as they are available
  $: if (heroImgEl && heroTitleEl && heroSubtitleEl && heroDescEl) {
    gsap.set([heroImgEl, heroTitleEl, heroSubtitleEl, heroDescEl], { opacity: 0, y: 40 });
  }

  // Fetching projects from the WordPress API
  onMount(async () => {
    try {
      const res = await fetch('http://localhost/portfolio-wp/wp-json/wp/v2/project');
      const data = await res.json();
      projects = data;
    } catch (error) {
      console.error('Failed to load projects:', error);
    }
    
    // Dynamically import GSAP and ScrollTrigger only on the client
    const gsapModule = await import('gsap');
    const ScrollTrigger = (await import('gsap/ScrollTrigger')).ScrollTrigger;
    gsapModule.gsap.registerPlugin(ScrollTrigger);

    // Animate skills heading on scroll
    gsapModule.gsap.from('.skills-heading', {
      scrollTrigger: {
        trigger: '.skills-heading',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 50,
      duration: 0.6
    });

    // Animate skills cards on scroll
    const skills = gsapModule.gsap.utils.toArray('.skill-card');
    skills.forEach((skill, index) => {
      gsapModule.gsap.from(skill as HTMLElement, {
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: 0.05 + (index * 0.05)
      });
    });

    // Animate projects heading on scroll
    gsapModule.gsap.from('.projects-heading', {
      scrollTrigger: {
        trigger: '.projects-heading',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 50,
      duration: 0.6
    });

    // Animate each project card on scroll
    const cards = gsapModule.gsap.utils.toArray('.project-card');
    cards.forEach((card, index) => {
      gsapModule.gsap.from(card as HTMLElement, {
        scrollTrigger: {
          trigger: '.project-grid',
          start: 'top 90%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: 0.05 + (index * 0.05)
      });
    });

    // Animate hero section elements in sequence
    gsap.to(heroImgEl, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.1, onStart: () => heroImgEl.classList.remove('hero-animate-init') });
    gsap.to(heroTitleEl, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.2, onStart: () => heroTitleEl.classList.remove('hero-animate-init') });
    gsap.to(heroSubtitleEl, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.3, onStart: () => heroSubtitleEl.classList.remove('hero-animate-init') });
    gsap.to(heroDescEl, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.4, onStart: () => heroDescEl.classList.remove('hero-animate-init') });

    setTimeout(() => {
      mounted = true;
    }, 100);
  });

  // Create reactive localized projects data
  $: localizedProjects = projects.map(project => ({
    ...project,
    localizedTitle: $currentLanguage === 'fa' && project.acf.عنوان 
      ? project.acf.عنوان 
      : project.title.rendered,
    localizedDescription: $currentLanguage === 'fa' && project.acf.توضیحات 
      ? project.acf.توضیحات 
      : project.acf.description
  }));

  // Get localized project title
  function getLocalizedTitle(project: Project): string {
    if ($currentLanguage === 'fa' && project.acf.عنوان) {
      return project.acf.عنوان;
    }
    return project.title.rendered;
  }

  // Get localized project description
  function getLocalizedDescription(project: Project): string {
    if ($currentLanguage === 'fa' && project.acf.توضیحات) {
      return project.acf.توضیحات;
    }
    return project.acf.description;
  }
</script>

<!-- Language Switcher -->
<LanguageSwitcher />

<!-- Hero Section with Personal Information -->
<section class="flex flex-col justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4 overflow-hidden" dir={$currentLanguage === 'fa' ? 'rtl' : 'ltr'}>
  <div class="max-w-6xl mx-auto">
    <div class="flex flex-col lg:flex-row items-center gap-8 md:gap-12 xl:gap-20">
      <!-- Profile Image (Top on mobile, right on desktop) -->
      <div class="lg:order-last md:order-first sm:order-first w-[16rem] h-[16rem] sm:w-[20rem] sm:h-[20rem] md:w-[28rem] md:h-[28rem] xl:w-[32rem] xl:h-[32rem] rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg overflow-hidden hero-animate-init"
        bind:this={heroImgEl}>
        <img 
          src="/imgs/profile-pic.jpg" 
          alt="" 
          class="w-full h-full object-cover rounded-full"
          onerror={(e) => {
            // Fallback to icon if image fails to load
            const target = e.target as HTMLImageElement;
            if (target && target.nextElementSibling) {
              target.style.display = 'none';
              (target.nextElementSibling as HTMLElement).style.display = 'flex';
            }
          }}
        />
        <div class="w-full h-full flex items-center justify-center" style="display: none;">
          {translations[$currentLanguage].hero.icon}
        </div>
      </div>
      <!-- Text Content (Below image on mobile, left on desktop) -->
      <div class="lg:order-first md:order-last sm:order-last flex-1">
        <h1 class="text-4xl sm:text-6xl lg:text-7xl xl:!text-8xl font-bold text-gray-800 mb-4 hero-animate-init"
          bind:this={heroTitleEl}>
          {translations[$currentLanguage].hero.title}
        </h1>
        <p class="text-xl sm:text-2xl lg:text-4xl text-left text-gray-600 mb-6 hero-animate-init"
          bind:this={heroSubtitleEl}>
          {translations[$currentLanguage].hero.subtitle}
        </p>
        <p class="text-base sm:text-lg lg:text-xl text-left text-gray-700 leading-relaxed hero-animate-init"
          bind:this={heroDescEl}>
          {translations[$currentLanguage].hero.description}
        </p>
      </div>
    </div>
  </div>
</section>

<!-- Skills Section -->
<section class="skills-section flex flex-col justify-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 sm:py-16 md:py-20 px-4 sm:px-8 md:px-16" dir={$currentLanguage === 'fa' ? 'rtl' : 'ltr'}>
  <div class="max-w-6xl mx-auto">
    <h2 class="!text-3xl sm:!text-5xl lg:!text-6xl font-bold text-center text-gray-800 mb-8 sm:mb-12 md:mb-16 skills-heading">
      {translations[$currentLanguage].skills.title}
    </h2>
    <div class="skills-grid grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
      <div class="skill-card bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-md"
        aria-hidden="true"
        onmouseenter={handleCardMouseEnter}
        onmouseleave={handleCardMouseLeave}>
        <div class="text-blue-600 text-2xl sm:text-3xl mb-2 sm:mb-3 transform transition-transform duration-300 hover:scale-110">💻</div>
        <h3 class="!text-xl sm:!text-2xl md:!text-3xl font-semibold text-gray-800 mb-1 sm:mb-2">{translations[$currentLanguage].skills.frontend}</h3>
        <p class="text-base sm:text-lg text-gray-600">{translations[$currentLanguage].skills.frontendDesc}</p>
      </div>
      <div class="skill-card bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-md"
        aria-hidden="true"
        onmouseenter={handleCardMouseEnter}
        onmouseleave={handleCardMouseLeave}>
        <div class="text-green-600 text-2xl sm:text-3xl mb-2 sm:mb-3 transform transition-transform duration-300 hover:scale-110">⚙️</div>
        <h3 class="!text-xl sm:!text-2xl md:!text-3xl font-semibold text-gray-800 mb-1 sm:mb-2">{translations[$currentLanguage].skills.backend}</h3>
        <p class="text-base sm:text-lg text-gray-600">{translations[$currentLanguage].skills.backendDesc}</p>
      </div>
      <div class="skill-card bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-md"
        aria-hidden="true"
        onmouseenter={handleCardMouseEnter}
        onmouseleave={handleCardMouseLeave}>
        <div class="text-purple-600 text-2xl sm:text-3xl mb-2 sm:mb-3 transform transition-transform duration-300 hover:scale-110">☁️</div>
        <h3 class="!text-xl sm:!text-2xl md:!text-3xl font-semibold text-gray-800 mb-1 sm:mb-2">{translations[$currentLanguage].skills.devops}</h3>
        <p class="text-base sm:text-lg text-gray-600">{translations[$currentLanguage].skills.devopsDesc}</p>
      </div>
    </div>
  </div>
</section>

<!-- Projects Section -->
<section class="projects-section flex flex-col justify-center min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-8 md:px-16 bg-gray-50" dir={$currentLanguage === 'fa' ? 'rtl' : 'ltr'}>
  <div class="max-w-6xl mx-auto">
    <h2 class="!text-3xl sm:!text-5xl lg:!text-6xl font-bold text-center text-gray-800 projects-heading" >
      {translations[$currentLanguage].projects.title}
    </h2>

    <!-- Displaying projects -->
    {#if projects.length > 0}
      <div class="project-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-10">
        {#each localizedProjects as project, index}
          <div class="project-card shadow-md"
            aria-hidden="true"
            onmouseenter={handleCardMouseEnter}
            onmouseleave={handleCardMouseLeave}>
            <ProjectCard {project} {getLocalizedTitle} {getLocalizedDescription} />
          </div>
        {/each}
      </div>
    {:else}
      <div class="flex justify-center items-center min-h-[200px] transform transition-all duration-700 {mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}">
        <div class="spinner-border text-primary animate-spin" role="status">
          <span class="visually-hidden">{translations[$currentLanguage].projects.loading}</span>
        </div>
      </div>
    {/if}
  </div>
</section>

<style>
  /* Custom animations */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  /* Skill cards - separate initial animation from hover effects */
  .skill-card {
    animation-fill-mode: both;
  }

  .skill-card:hover {
    transition-delay: 0s !important;
  }

  /* Gradient animation for hero section */
  .bg-gradient-to-br {
    background-size: 200% 200%;
    animation: gradientShift 8s ease infinite;
  }

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  /* Projects heading margin override */
  .projects-heading, .skills-heading {
    margin-bottom: 6rem !important;
  }

  /* RTL grid adjustments */
  [dir="rtl"] .grid {
    direction: rtl;
  }

  .project-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04);
  }

  .hero-animate-init {
    opacity: 0;
    transform: translateY(40px);
  }
</style>
