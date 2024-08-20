import { Config } from './config';
import { getMarked } from './get-marked-with-highlighter';

/**
 * Generates a HTML document from a markdown string and returns it as a string.
 */
export const getHtml = (md: string, config: Config) => {
	const markedContent = getMarked(config.marked_options, config.marked_extensions)(md);
	return `<!DOCTYPE html>
<html>
<head>
  <title>${config.document_title}</title>
  <meta charset="utf-8">
  ${config.stylesheet.map((sheet) => `<link rel="stylesheet" href="${sheet}">`).join('\n')}
</head>
<body class="${config.body_class.join(' ')}">
  ${markedContent}

  ${config.script.map((script) => `<script type="module">${script.content}</script>`).join('\n')}
  <script type="module">
    import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
	document.addEventListener('DOMContentLoaded', () => {
    mermaid.initialize({
  logLevel: "error", // [1]
  securityLevel: "loose", // [2]
  theme: (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) ?
    "dark" :
    "default" // [3]
});
  });
  </script>
</body>
</html>`;
};
