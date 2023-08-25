import type { Action, ActionReturn } from 'svelte/action';
// @ts-ignore
import { dev } from '$app/environment';
import portDispatcher from '$lib/util/sandbox/portDispatcher';

const message: Action<HTMLIFrameElement> = (node: HTMLIFrameElement): ActionReturn => {
  const post: EventListener = (): any => {
    const channel: MessageChannel = new MessageChannel();

    document.dispatchEvent(portDispatcher(channel.port1));

    node.contentWindow!.postMessage('', '*', [channel.port2]);
  }

  (post as Function)();
  // REF: https://github.com/sveltejs/svelte/issues/6967
  dev && node.addEventListener('load', post); // NOTE: HMR Workaround

  return {
    destroy: () => node.removeEventListener('load', post)
  }
};

export default message;
