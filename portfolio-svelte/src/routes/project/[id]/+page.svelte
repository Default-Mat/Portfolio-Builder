<script lang="ts">
  import { currentLanguage, translations } from '../../../lib/stores/language.js';
  import LanguageSwitcher from '../../../lib/components/LanguageSwitcher.svelte';
  export let data: { project: any; imageUrl: string | null };

  $: localizedTitle = $currentLanguage === 'fa' && data.project?.acf.عنوان
    ? data.project.acf.عنوان
    : data.project?.title.rendered;

  $: localizedDescription = $currentLanguage === 'fa' && data.project?.acf.توضیحات
    ? data.project.acf.توضیحات
    : data.project?.acf.description;

  // Get localized project title
  function getLocalizedTitle(project: any): string {
    if ($currentLanguage === 'fa' && project.acf.عنوان) {
      return project.acf.عنوان;
    }
    return project.title.rendered;
  }

  // Get localized project description
  function getLocalizedDescription(project: any): string {
    if ($currentLanguage === 'fa' && project.acf.توضیحات) {
      return project.acf.توضیحات;
    }
    return project.acf.description;
  }
</script>

<!-- Language Switcher -->
<LanguageSwitcher />

<svelte:head>
  <title>{data.project ? localizedTitle : 'Project Details'} - Matin Meskinnavaz</title>
</svelte:head>

{#if !data.project}
  <!-- Error State -->
  <div class="min-h-screen bg-gray-50 flex items-center justify-center" dir={$currentLanguage === 'fa' ? 'rtl' : 'ltr'}>
    <div class="text-center">
      <div class="text-red-500 text-6xl mb-4">⚠️</div>
      <h1 class="text-2xl font-bold text-gray-800 mb-2">
        {$currentLanguage === 'fa' ? 'پروژه یافت نشد' : 'Project Not Found'}
      </h1>
      <p class="text-gray-600 mb-6">
        {$currentLanguage === 'fa' ? 'پروژه‌ای که به دنبال آن هستید وجود ندارد یا حذف شده است.' : 'The project you\'re looking for doesn\'t exist or has been removed.'}
      </p>
      <a href="/" class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
        {$currentLanguage === 'fa' ? 'بازگشت به پورتفولیو' : 'Back to Portfolio'}
      </a>
    </div>
  </div>
{:else}
  <!-- Project Detail Content -->
  <div class="min-h-screen bg-gray-50" dir={$currentLanguage === 'fa' ? 'rtl' : 'ltr'}>
    <!-- Header -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-6xl mx-auto px-4 py-6">
        <a href="/" class="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors mb-4">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          {$currentLanguage === 'fa' ? 'بازگشت به پورتفولیو' : 'Back to Portfolio'}
        </a>
        <h1 class="text-4xl font-bold text-gray-800">{localizedTitle}</h1>
      </div>
    </div>

    <!-- Project Content -->
    <div class="max-w-4xl mx-auto px-4 py-12">
      <div class="bg-white rounded-xl shadow-lg p-8">
        <!-- Project Images -->
        {#if data.imageUrl}
          <div class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">
              {$currentLanguage === 'fa' ? 'تصویر پروژه' : 'Project Image'}
            </h2>
            <div class="relative group overflow-hidden rounded-lg">
              <img 
                src={data.imageUrl} 
                alt={localizedTitle}
                class="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>
        {/if}

        <!-- Project Description -->
        <div class="mb-8">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">
            {$currentLanguage === 'fa' ? 'نمای کلی پروژه' : 'Project Overview'}
          </h2>
          <p class="text-gray-700 leading-relaxed text-lg">{localizedDescription}</p>
        </div>

        <!-- Technologies Used -->
        <div class="mb-8">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">
            {$currentLanguage === 'fa' ? 'تکنولوژی‌های استفاده شده' : 'Technologies Used'}
          </h2>
          <div class="flex flex-wrap gap-2">
            {#each data.project.acf.technologies.split(',').map((tech: string) => tech.trim()) as technology}
              <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {technology}
              </span>
            {/each}
          </div>
        </div>

        <!-- Project Actions -->
        <div class="border-t pt-8">
          <div class="flex flex-wrap gap-4">
            <a 
              href={data.project.acf.url} 
              target="_blank" 
              rel="noopener noreferrer"
              class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
              {$currentLanguage === 'fa' ? 'مشاهده پروژه زنده' : 'View Live Project'}
            </a>
            <a 
              href="/" 
              class="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
              </svg>
              {$currentLanguage === 'fa' ? 'بازگشت به پورتفولیو' : 'Back to Portfolio'}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  /* RTL specific styles for project detail page */
  [dir="rtl"] .flex {
    flex-direction: row-reverse;
  }

  [dir="rtl"] .mr-2 {
    margin-right: 0;
    margin-left: 0.5rem;
  }

  [dir="rtl"] .text-center {
    text-align: center;
  }

  /* Persian font support */
  /* [dir="rtl"] {
    font-family: 'Vazir', 'Tahoma', 'Arial', sans-serif;
  } */
</style> 