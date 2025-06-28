<script>
  // Exporting the project data
  export let project;
</script>

<!-- Project card component -->
<div class="project-card bg-white rounded-lg shadow-md hover:shadow-lg border border-gray-200 p-6 flex flex-col gap-3 h-full transition-all duration-300 transform hover:-translate-y-2">
  <h2 class="text-xl font-semibold mb-2">{@html project.title.rendered}</h2>
  <p class="text-gray-700 mb-2">{project.acf.description}</p>
  <!-- <p class="text-sm text-gray-500 mb-4"><strong>Technologies:</strong> {project.acf.technologies}</p> -->
  <div class="flex gap-2 mt-auto">
    <a class="btn btn-primary w-fit" href="/project/{project.id}">View Details</a>
    <a class="btn btn-outline w-fit" href={project.acf.url} target="_blank" rel="noopener noreferrer">Live Demo</a>
  </div>
</div>
