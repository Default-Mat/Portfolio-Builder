<script lang="ts">
  import { onMount } from 'svelte';
  import ProjectCard from './project-card.svelte';
  import LanguageSwitcher from '../lib/components/LanguageSwitcher.svelte';
  import { currentLanguage, translations } from '../lib/stores/language.js';

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

  // Fetching projects from the WordPress API
  onMount(async () => {
    try {
      const res = await fetch('http://localhost/portfolio-wp/wp-json/wp/v2/project');
      const data = await res.json();
      projects = data;
    } catch (error) {
      console.error('Failed to load projects:', error);
    }
    
    // Trigger animations after component mounts
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
<section class="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4 overflow-hidden" dir={$currentLanguage === 'fa' ? 'rtl' : 'ltr'}>
  <div class="max-w-6xl mx-auto">
    <div class="text-center mb-12">
      <div class="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg transform transition-all duration-700 {mounted ? 'scale-100 opacity-100' : 'scale-75 opacity-0'} hover:scale-110 hover:shadow-xl">
        {translations[$currentLanguage].hero.icon}
      </div>
      <h1 class="text-5xl font-bold text-gray-800 mb-4 transform transition-all duration-700 delay-200 {mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}">
        {translations[$currentLanguage].hero.title}
      </h1>
      <p class="text-xl text-gray-600 mb-6 transform transition-all duration-700 delay-300 {mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}">
        {translations[$currentLanguage].hero.subtitle}
      </p>
      <p class="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed transform transition-all duration-700 delay-400 {mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}">
        {translations[$currentLanguage].hero.description}
      </p>
    </div>

    <!-- Skills Section -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="skill-card bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 {mounted ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'}" style="animation-delay: 500ms;">
        <div class="text-blue-600 text-2xl mb-3 transform transition-transform duration-300 hover:scale-110">💻</div>
        <h3 class="text-lg font-semibold text-gray-800 mb-2">{translations[$currentLanguage].skills.frontend}</h3>
        <p class="text-gray-600">{translations[$currentLanguage].skills.frontendDesc}</p>
      </div>
      <div class="skill-card bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 {mounted ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'}" style="animation-delay: 600ms;">
        <div class="text-green-600 text-2xl mb-3 transform transition-transform duration-300 hover:scale-110">⚙️</div>
        <h3 class="text-lg font-semibold text-gray-800 mb-2">{translations[$currentLanguage].skills.backend}</h3>
        <p class="text-gray-600">{translations[$currentLanguage].skills.backendDesc}</p>
      </div>
      <div class="skill-card bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 {mounted ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'}" style="animation-delay: 700ms;">
        <div class="text-purple-600 text-2xl mb-3 transform transition-transform duration-300 hover:scale-110">☁️</div>
        <h3 class="text-lg font-semibold text-gray-800 mb-2">{translations[$currentLanguage].skills.devops}</h3>
        <p class="text-gray-600">{translations[$currentLanguage].skills.devopsDesc}</p>
      </div>
    </div>
  </div>
</section>

<!-- Projects Section -->
<section class="py-16 px-4 bg-gray-50" dir={$currentLanguage === 'fa' ? 'rtl' : 'ltr'}>
  <div class="max-w-6xl mx-auto">
    <h2 class="text-4xl font-bold text-center text-gray-800 projects-heading transform transition-all duration-700 {mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}" style="transition-delay: 800ms;">
      {translations[$currentLanguage].projects.title}
    </h2>

    <!-- Displaying projects -->
    {#if projects.length > 0}
      <div class="project-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each localizedProjects as project, index}
          <div class="project-card transform transition-all duration-300 {mounted ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'}" style="animation-delay: {900 + (index * 100)}ms;">
            <ProjectCard {project} currentLang={$currentLanguage} {getLocalizedTitle} {getLocalizedDescription} />
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

  /* Animation classes */
  .animate-fadeInUp {
    animation: fadeInUp 0.7s ease-out forwards;
  }

  /* Skill cards - separate initial animation from hover effects */
  .skill-card {
    animation-fill-mode: both;
  }

  .skill-card:hover {
    transition-delay: 0s !important;
  }

  /* Project cards - separate initial animation from hover effects */
  .project-card {
    animation-fill-mode: both;
  }

  .project-card:hover {
    transition-delay: 0s !important;
  }

  /* Smooth scrolling */
  html {
    scroll-behavior: smooth;
  }

  /* Enhanced hover effects */
  .project-grid > div {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .project-grid > div:hover {
    transform: translateY(-8px);
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
  .projects-heading {
    margin-bottom: 3rem !important;
  }

  /* RTL specific styles */
  [dir="rtl"] .skill-card {
    text-align: right;
  }

  [dir="rtl"] .project-card {
    text-align: right;
  }

  /* Persian font support */
  [dir="rtl"] {
    font-family: 'Tahoma', 'Arial', sans-serif;
  }

  /* RTL grid adjustments */
  [dir="rtl"] .grid {
    direction: rtl;
  }

  /* RTL button and link adjustments */
  [dir="rtl"] .btn {
    direction: rtl;
  }

  [dir="rtl"] a {
    direction: rtl;
  }
</style>
