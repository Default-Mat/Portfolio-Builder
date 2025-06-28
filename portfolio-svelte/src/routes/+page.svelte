<script lang="ts">
  import { onMount } from 'svelte';
  import ProjectCard from './project-card.svelte';

  type Project = {
    id: number;
    title: { rendered: string };
    acf: {
      description: string;
      technologies: string;
      url: string;
    };
  };

  let projects: Project[] = [];

  onMount(async () => {
    try {
      const res = await fetch('http://localhost/portfolio-builder/wp-json/wp/v2/project');
      const data = await res.json();
      projects = data;
    } catch (error) {
      console.error('Failed to load projects:', error);
    }
  });
</script>

<h1 class="text-3xl font-bold text-center my-8">My Projects</h1>

{#if projects.length > 0}
  <div class="project-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
    {#each projects as project}
      <ProjectCard {project} />
    {/each}
  </div>
{:else}
  <div class="flex justify-center items-center min-h-[200px]">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading projects...</span>
    </div>
  </div>
{/if}
