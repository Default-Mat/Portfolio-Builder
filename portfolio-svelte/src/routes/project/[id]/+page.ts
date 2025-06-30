import type { PageLoad } from './$types.js';

export const load: PageLoad = async ({ params, fetch }) => {
  const projectId = params.id;
  let project = null;
  let imageUrl = null;

  // Fetch project data
  const projectRes = await fetch(`http://localhost/portfolio-wp/wp-json/wp/v2/project/${projectId}`);
  if (projectRes.ok) {
    project = await projectRes.json();

    // Fetch image if available
    if (project.acf?.images) {
      const mediaRes = await fetch(`http://localhost/portfolio-wp/wp-json/wp/v2/media/${project.acf.images}`);
      if (mediaRes.ok) {
        const mediaData = await mediaRes.json();
        imageUrl = mediaData.source_url;
      }
    }
  }

  return {
    project,
    imageUrl
  };
}; 