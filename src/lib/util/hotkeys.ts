import type { KeyboardEventHandler } from 'svelte/elements';
import { pause, play } from '$lib/util/status';
import status from '$lib/stores/status';
import { get } from 'svelte/store';
import { Status } from '$lib/util/definitions/status.d';

const hotkeys:KeyboardEventHandler<any>  = (e: KeyboardEvent): any => {
  switch (e.key) {
    case ' ':
      if (get(status) === Status.play) pause();
      else if (get(status) !== Status.record) play();
      break;
  }
};

export default hotkeys;
