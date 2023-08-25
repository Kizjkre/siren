import { onMount } from 'svelte';
import ace from 'ace-builds';

declare global {
  // noinspection JSUnusedGlobalSymbols
  interface Window {
    define: Function,
    require: Function
  }
}

const initAce: Function = (): any => onMount((): any => {
  window.require = ace.require;
  // @ts-ignore
  window.define = ace.define;
});

export default initAce;
