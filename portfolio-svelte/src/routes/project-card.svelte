<script lang="ts">
  import { on } from 'svelte/events';
  import { currentLanguage, translations } from '../lib/stores/language.js';
  import type { Language } from '../lib/stores/language.js';
  import { onMount } from 'svelte';

  // Exporting the project data
  export let project;
  export let getLocalizedTitle: (project: any) => string;
  export let getLocalizedDescription: (project: any) => string;
</script>

<!-- Project card component -->
<div class="project-card bg-white rounded-lg shadow-md hover:shadow-lg border border-gray-200 p-6 flex flex-col gap-3 h-full" dir={$currentLanguage === 'fa' ? 'rtl' : 'ltr'}>
  <h2 class="!text-3xl font-semibold mb-2">{project.localizedTitle || getLocalizedTitle(project)}</h2>
  <p class="!text-lg text-gray-700 mb-2">{project.localizedDescription || getLocalizedDescription(project)}</p>
  <!-- <p class="text-sm text-gray-500 mb-4"><strong>Technologies:</strong> {project.acf.technologies}</p> -->
  <div class="flex gap-2 mt-auto">
    <a class="!text-lg btn btn-primary w-fit" href="/project/{project.id}">{translations[$currentLanguage].projects.viewDetails}</a>
    <a class="!text-lg btn btn-outline w-fit" href={project.acf.url} target="_blank" rel="noopener noreferrer">{translations[$currentLanguage].projects.liveDemo}</a>
  </div>
</div>

<style>
  .project-card[dir="rtl"] {
    text-align: right;
  }
</style>
