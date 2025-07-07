<script lang="ts">
  import { currentLanguage, translations } from '../stores/language.js';

  // Exporting the project data
  export let project: any;
</script>

<!-- Project card component -->
<h2 class="lg:!text-3xl md:!text-2xl sm:!text-xl font-semibold mb-2">{project.localizedTitle}</h2>
<p class="!text-lg text-gray-700 mb-2">{project.localizedDescription}</p>
<div class="flex gap-2 mt-auto">
  <a class="lg:!text-lg sm:!text-base md:!text-lg btn btn-primary w-fit" href="/project/{project.id}">{translations[$currentLanguage].projects.viewDetails}</a>
  <a class="lg:!text-lg sm:!text-base md:!text-lg btn btn-outline w-fit" href={project.acf.url} target="_blank" rel="noopener noreferrer">{translations[$currentLanguage].projects.liveDemo}</a>
</div>
