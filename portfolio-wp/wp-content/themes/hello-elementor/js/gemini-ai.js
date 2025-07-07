jQuery(document).ready(function($) {
    const button = $('<button type="button" class="button">✨ Generate Project Description (Gemini)</button>');
    $('#postdivrich').before(button);

    button.on('click', async function() {
        const prompt = `
            i created a "projects" post type using acf in wordpress.
            the fields i defined for each project are title, farsi_title, description, farsi_description, technologies, url, and image.
            the farsi_title and farsi_description are the same as title and description, but in farsi.
            i want you to suggest a project each time i ask you, with these information.
            it can be a project related to anything. AI, web, mobile, desktop, etc. but don't suggest the same project twice.
            for the technologies, separate them with comma.
            only aswer me in json format.
            don't write anything else.
        `;

        const response = await fetch('/portfolio-wp/wp-content/themes/hello-elementor/gemini-proxy.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: 1.3,
                }
            })
        });

        const data = await response.json();
        const rawResponse = data.candidates?.[0]?.content?.parts?.[0]?.text ?? 'Failed to generate content';
        // Clean up Markdown fences like ```json ... ```
        const cleaned = rawResponse
            .replace(/^```json[\s\n]*/i, '')  // Remove opening ```json with optional whitespace
            .replace(/^```[\s\n]*/i, '')      // Or plain ```
            .replace(/```[\s\n]*$/g, '')      // Remove closing ```, even with newlines/spaces
            .trim();
        console.log(cleaned);        
        const project = JSON.parse(cleaned);
        console.log(project);
        $('#title').val(project.title);
        $('[data-name="عنوان"] input').val(project.farsi_title);
        $('[data-name="description"] input').val(project.description);
        $('[data-name="توضیحات"] input').val(project.farsi_description);
        $('[data-name="technologies"] input').val(project.technologies);
        $('[data-name="url"] input').val(project.url);
    });
});
