import image from "@astrojs/image";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";


import remarkMath from 'remark-math';
import remarkBreaks from 'remark-breaks';
import rehypeMathjax from 'rehype-mathjax';
import rehypeSlug from 'rehype-slug';
import rehypeFigure from 'rehype-figure';
import remarkCodeTitles from 'remark-code-titles';


// https://astro.build/config
export default defineConfig({
  site: "https://jav-ed.github.io",
  base: "/web_Path",

  markdown: {

    remarkPlugins: [
      remarkCodeTitles, 
      remarkMath,
      remarkBreaks,
    ],

    rehypePlugins: [

      // Plugin to add `id`s to headings.
      rehypeSlug, 

      // ['rehype-autolink-headings', {
      //   behavior: 'prepend'
      // }],



    // see: https://github.com/JS-DevTools/rehype-toc
    // ['rehype-toc', { headings: ['h2', 'h3'] }],

    // [addClasses, { 'h1,h2,h3': 'title' }],

    /* -------------------------------- katex -------------------------------- */
    // it should be more performant than MathJax, however, it firstly require an additional css to be loaded and secondly, labeling at the moment is achieved through manually giving tags --> not wanted
    // see: https://github.com/KaTeX/KaTeX
    // for options, see: https://katex.org/docs/options.html
    // ['rehype-katex', 
    // 		{
    // 			// fleqn: 'true',
    // 			output: "htmlAndMathml"

    // 			}],

    [rehypeMathjax, {
      loader: {
        load: ['[tex]/color', '[tex]/tagformat']
      },
      tex: {
        tags: 'all',
        processRefs: 'true'
      },
      startup: {
        ready: () => {
          MathJax.startup.defaultReady();
          MathJax.startup.promise.then(() => {
            // Your custom JavaScript for equation numbering by chapter will be added here.
          });
        }
      }
    }], 

    rehypeFigure

  ]
	
  
},


  integrations: [
    tailwind(),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
  ],
  vite: {
    ssr: {
      external: ["svgo"],
    },
  },
});
