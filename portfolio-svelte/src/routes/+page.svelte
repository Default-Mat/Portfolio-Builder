<script lang="ts">
  import { onMount } from 'svelte';
  import ProjectCard from '../lib/components/project-card.svelte';
  import LanguageSwitcher from '../lib/components/LanguageSwitcher.svelte';
  import { currentLanguage, translations } from '../lib/stores/language.js';
  import gsap from 'gsap';
  import SkillCard from '../lib/components/SkillCard.svelte';
  import { tick } from 'svelte';

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

  // Add profile type
  type Profile = {
    id: number;
    title: { rendered: string };
    acf: {
      name: string;
      title: string;
      bio: string;
      avatar: number;
      skills: number[];
      projects: number[];
      social_links: number[];
      // Persian fields
      نام?: string;
      عنوان?: string;
      شرح?: string;
    };
  };

  // Type for the skill data
  type Skill = {
    id: number;
    title: { rendered: string };
    acf: {
      عنوان: string; // Persian name/title
      technologies: string;
    };
  };

  // Type for the social link data
  type SocialLink = {
    id: number;
    title: { rendered: string };
    acf: {
      name: string;
      url: string;
      icon?: string; // e.g., image URL or SVG
      نام?: string; // Persian name
    };
  };

  let profile: Profile | null = null;
  let imageUrl: string | null = null;
  let projects: Project[] = [];
  let skills: Skill[] = [];
  let socialLinks: SocialLink[] = [];
  let mounted = false;

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
    window.scrollTo(0, 0);

    try {
      // Fetch profile
      const profileRes = await fetch('http://localhost/portfolio-wp/wp-json/wp/v2/profile');
      const profileData = await profileRes.json();
      if (profileData.length > 0) {
        profile = profileData[0];
      }
    } catch (error) {
      console.error('Failed to load profile data:', error);
    }

    // Fetch image if available
    if (profile?.acf.avatar) {
      const mediaRes = await fetch(`http://localhost/portfolio-wp/wp-json/wp/v2/media/${profile.acf.avatar}`);
      if (mediaRes.ok) {
        const mediaData = await mediaRes.json();
        imageUrl = mediaData.source_url;
      }
    }

    // Fetch projects
    try {
      const res = await fetch('http://localhost/portfolio-wp/wp-json/wp/v2/project');
      const data = await res.json();
      projects = data;
    } catch (error) {
      console.error('Failed to load projects:', error);
    }
    
    // Fetch skills and social links in batch if profile is loaded
    if (profile) {
      // Fetch all skills in one request
      if (profile.acf.skills?.length) {
        const skillIds = profile.acf.skills.join(',');
        try {
          const res = await fetch(`http://localhost/portfolio-wp/wp-json/wp/v2/skill?include=${skillIds}`);
          skills = await res.json();
        } catch (error) {
          console.error('Failed to load skills:', error);
        }
      }
      // Fetch all social links in one request
      if (profile.acf.social_links?.length) {
        const socialLinkIds = profile.acf.social_links.join(',');
        try {
          const res = await fetch(`http://localhost/portfolio-wp/wp-json/wp/v2/social-link?include=${socialLinkIds}`);
          socialLinks = await res.json();
        } catch (error) {
          console.error('Failed to load social links:', error);
        }
      }
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
    const skillsCards = gsapModule.gsap.utils.toArray('.skill-card');
    skillsCards.forEach((skill, index) => {
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
          trigger: card as HTMLElement,
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

  // Create reactive localized filtered projects data
  $: localizedFilteredProjects = filteredProjects.map(project => ({
    ...project,
    localizedTitle: $currentLanguage === 'fa' && project.acf.عنوان 
      ? project.acf.عنوان 
      : project.title.rendered,
    localizedDescription: $currentLanguage === 'fa' && project.acf.توضیحات 
      ? project.acf.توضیحات 
      : project.acf.description
  }));

  // Get localized project title
  // function getLocalizedTitle(project: Project): string {
  //   if ($currentLanguage === 'fa' && project.acf.عنوان) {
  //     return project.acf.عنوان;
  //   }
  //   return project.title.rendered;
  // }

  // // Get localized project description
  // function getLocalizedDescription(project: Project): string {
  //   if ($currentLanguage === 'fa' && project.acf.توضیحات) {
  //     return project.acf.توضیحات;
  //   }
  //   return project.acf.description;
  // }

  let selectedTech: string = 'All';
  let projectGridEl: HTMLDivElement;

  // Extract all unique technologies from projects
  $: allTechnologies = Array.from(
    new Set(
      projects
        .flatMap(p => p.acf.technologies.split(',').map((t: string) => t.trim()))
        .filter(Boolean)
    )
  );

  // Filtered projects based on selected technology
  $: filteredProjects = selectedTech !== 'All'
    ? projects.filter(p =>
        p.acf.technologies
          .split(',')
          .map((t: string) => t.trim())
          .includes(selectedTech)
      )
    : projects;

  // Animate project cards on filter change
  $: if (filteredProjects && projectGridEl) {
    tick().then(() => {
      const cards = projectGridEl.querySelectorAll('.project-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.07,
          ease: 'power2.out'
        }
      );
    });
  }
</script>

<!-- Language Switcher -->
<LanguageSwitcher />

<!-- Hero Section with Personal Information -->
<section class="flex flex-col justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:bg-gray-800 py-16 px-4 overflow-hidden" dir={$currentLanguage === 'fa' ? 'rtl' : 'ltr'}>
  <div class="max-w-6xl mx-auto">
    <div class="flex flex-col lg:flex-row items-center gap-8 md:gap-12 xl:gap-20">
      <!-- Profile Image (Top on mobile, right on desktop) -->
      <div class="lg:order-last md:order-first sm:order-first w-[16rem] h-[16rem] sm:w-[20rem] sm:h-[20rem] md:w-[28rem] md:h-[28rem] xl:w-[32rem] xl:h-[32rem] rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg overflow-hidden hero-animate-init"
        bind:this={heroImgEl}>
        {#if imageUrl}
          <img 
            src={imageUrl} 
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
        {:else}
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
        {/if}
        <div class="w-full h-full flex items-center justify-center" style="display: none;">
          {translations[$currentLanguage].hero.icon}
        </div>
      </div>
      <!-- Text Content (Below image on mobile, left on desktop) -->
      <div class="lg:order-first md:order-last sm:order-last flex-1">
        <!-- Show profile data if loaded, else fallback to translations -->
        <h1 class="sm:!text-5xl md:!text-6xl lg:!text-7xl xl:!text-8xl font-bold text-gray-800 mb-4 hero-animate-init"
          bind:this={heroTitleEl}>
          {#if profile}
            {$currentLanguage === 'fa' ? profile.acf.نام : profile.acf.name}
          {:else}
            {translations[$currentLanguage].hero.title}
          {/if}
        </h1>
        <p class="text-xl sm:text-2xl lg:text-4xl text-left text-gray-600 mb-6 hero-animate-init"
          bind:this={heroSubtitleEl}>
          {#if profile}
            {$currentLanguage === 'fa' ? profile.acf.عنوان : profile.acf.title}
          {:else}
            {translations[$currentLanguage].hero.subtitle}
          {/if}
        </p>
        <p class="text-base sm:text-lg lg:text-xl text-left text-gray-700 leading-relaxed hero-animate-init"
          bind:this={heroDescEl}>
          {#if profile}
            {$currentLanguage === 'fa' ? profile.acf.شرح : profile.acf.bio}
          {:else}
            {translations[$currentLanguage].hero.description}
          {/if}
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
    <!-- Custom skills grid from API -->
    {#if skills.length}
      <div class="skills-grid grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
        {#each skills as skill}
          <SkillCard {skill}/>
        {/each}
      </div>
    {:else}
      <!-- Fallback to static skills if API not loaded -->
      <div class="skills-grid grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
        <div class="skill-card bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-md"
          aria-hidden="true"
          onmouseenter={handleCardMouseEnter}
          onmouseleave={handleCardMouseLeave}>
          <div class="text-blue-600 text-2xl sm:text-3xl mb-2 sm:mb-3 transform transition-transform duration-300 hover:scale-110">💻</div>
          <h3 class="lg:!text-3xl md:!text-2xl sm:!text-xl font-semibold text-gray-800 mb-1 sm:mb-2">{translations[$currentLanguage].skills.frontend}</h3>
          <p class="text-base sm:text-lg text-gray-600">{translations[$currentLanguage].skills.frontendDesc}</p>
        </div>
        <div class="skill-card bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-md"
          aria-hidden="true"
          onmouseenter={handleCardMouseEnter}
          onmouseleave={handleCardMouseLeave}>
          <div class="text-green-600 text-2xl sm:text-3xl mb-2 sm:mb-3 transform transition-transform duration-300 hover:scale-110">⚙️</div>
          <h3 class="lg:!text-3xl md:!text-2xl sm:!text-xl font-semibold text-gray-800 mb-1 sm:mb-2">{translations[$currentLanguage].skills.backend}</h3>
          <p class="text-base sm:text-lg text-gray-600">{translations[$currentLanguage].skills.backendDesc}</p>
        </div>
        <div class="skill-card bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-md"
          aria-hidden="true"
          onmouseenter={handleCardMouseEnter}
          onmouseleave={handleCardMouseLeave}>
          <div class="text-purple-600 text-2xl sm:text-3xl mb-2 sm:mb-3 transform transition-transform duration-300 hover:scale-110">☁️</div>
          <h3 class="lg:!text-3xl md:!text-2xl sm:!text-xl font-semibold text-gray-800 mb-1 sm:mb-2">{translations[$currentLanguage].skills.devops}</h3>
          <p class="text-base sm:text-lg text-gray-600">{translations[$currentLanguage].skills.devopsDesc}</p>
        </div>
      </div>
    {/if}
  </div>
</section>

<!-- Projects Section -->
<section class="projects-section flex flex-col justify-center min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-8 md:px-16 bg-gray-50" dir={$currentLanguage === 'fa' ? 'rtl' : 'ltr'}>
  <div class="max-w-6xl mx-auto">
    <h2 class="!text-3xl sm:!text-5xl lg:!text-6xl font-bold text-center text-gray-800 projects-heading" >
      {translations[$currentLanguage].projects.title}
    </h2>

    <!-- Filter Buttons -->
    <div class="flex flex-wrap gap-2 mb-8 justify-center">
      <button
        class="px-4 py-2 !rounded-full border font-medium transition-all duration-200 border-blue-600 focus:outline-none {selectedTech === 'All' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 hover:bg-blue-50'}"
        onclick={() => selectedTech = 'All'}
      >
      {$currentLanguage === 'fa' ? 'همه' : 'All'}
      </button>
      {#each allTechnologies as tech}
        <button
          class="px-4 py-2 !rounded-full border font-medium transition-all duration-200 border-blue-600 focus:outline-none {selectedTech === tech ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 hover:bg-blue-50'}"
          onclick={() => selectedTech = tech}
        >
          {tech}
        </button>
      {/each}
    </div>

    <!-- Displaying projects -->
    {#if localizedFilteredProjects.length > 0}
      <div class="project-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-10" bind:this={projectGridEl}>
        {#each localizedFilteredProjects as project, index (project.id)}
          <div class="project-card bg-white rounded-lg shadow-md hover:shadow-lg border border-gray-200 p-6 flex flex-col gap-3 h-full" dir={$currentLanguage === 'fa' ? 'rtl' : 'ltr'}
            aria-hidden="true"
            onmouseenter={handleCardMouseEnter}
            onmouseleave={handleCardMouseLeave}>
            <ProjectCard {project} />
          </div>
        {/each}
      </div>
    {:else}
      <div class="text-center text-gray-500 py-12">
        No projects found for this technology.
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
