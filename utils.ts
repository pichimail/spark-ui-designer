/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export const generateId = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

export const wrapHtml = (html: string, title: string) => {
    if (html.includes('<!DOCTYPE html>')) return html;
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body { margin: 0; padding: 0; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background: #09090b; color: #fff; min-height: 100vh; display: flex; align-items: center; justify-content: center; }
        * { box-sizing: inherit; }
        /* Reset for the container to ensure it takes space if needed */
        body > div { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
    </style>
</head>
<body>
    ${html}
</body>
</html>`;
};

export const extractHtmlCssJs = (fullHtml: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(fullHtml, 'text/html');

    const styleTags = doc.querySelectorAll('style');
    let css = '';
    styleTags.forEach(tag => {
        css += tag.innerHTML + '\n';
        tag.remove();
    });

    const scriptTags = doc.querySelectorAll('script');
    let js = '';
    scriptTags.forEach(tag => {
        js += tag.innerHTML + '\n';
        tag.remove();
    });

    let html = doc.body.innerHTML;
    // Remove wrapper div if it exists (simplistic check for generated artifacts)
    // Actually, just returning the body innerHTML is usually what we want for the html file if css/js are separated.
    // However, to make it run, we need a skeleton.
    
    return { html, css, js };
};