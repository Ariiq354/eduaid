import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()]
  // optimizeDeps: {
  //   include: [
  //     'svelte-cloudinary',
  //     'svelte-headless-table',
  //     'svelte-headless-table/*',
  //     'clsx',
  //     'tailwind-merge',
  //     'tailwind-variants',
  //     'mode-watcher',
  //     'svelte-sonner',
  //     'bits-ui',
  //     'formsnap',
  //     'sveltekit-superforms',
  //     'sveltekit-superforms/*',
  //     'lucide-svelte',
  //     'lucide-svelte/icons/*',
  //     'zod',
  //     'ai',
  //     'ai/*',
  //     'ts-deepmerge',
  //     '@sinclair/*',
  //     '@sinclair/typebox/compiler',
  //     '@sinclair/typebox',
  //     'yup',
  //     '@gcornut/valibot-json-schema',
  //     'valibot',
  //     'zod-to-json-schema',
  //     '@vinejs/vine',
  //     'just-clone',
  //     'memoize-weak',
  //     'nanoid/non-secure',
  //     'dequal',
  //     '@internationalized/date',
  //     '@floating-ui/dom',
  //     'focus-trap'
  //   ]
  // }
});
