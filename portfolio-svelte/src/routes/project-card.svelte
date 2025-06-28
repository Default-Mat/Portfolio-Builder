<script>
  export let project;
</script>

<div class="project-card bg-white rounded-lg shadow-md border border-gray-200 p-6 flex flex-col gap-3 h-full">
  <h2 class="text-xl font-semibold mb-2">{@html project.title.rendered}</h2>
  <p class="text-gray-700 mb-2">{project.acf.description}</p>
  <p class="text-sm text-gray-500 mb-4"><strong>Technologies:</strong> {project.acf.technologies}</p>
  <a class="btn btn-primary mt-auto w-fit" href={project.acf.url} target="_blank" rel="noopener noreferrer">View Project</a>
</div>
