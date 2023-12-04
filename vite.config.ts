// @ts-ignore
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite';
import sandbox from './server/sandbox';
import osc from './server/osc';

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  plugins: [sveltekit(), sandbox, osc, Icons({ compiler: 'svelte' })]
});
