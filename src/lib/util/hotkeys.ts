import type { KeyboardEventHandler } from 'svelte/elements';
import { end, pause, play, record, stop } from '$lib/util/status';
import status from '$lib/stores/status';
import { get } from 'svelte/store';
import { Status } from '$lib/util/definitions/status.d';
import trackSelect from '$lib/stores/trackSelect';

const hotkeys: KeyboardEventHandler<any> = (e: KeyboardEvent): any => {
  switch (e.key) {
    case ' ':
      e.preventDefault();
      if (get(status) === Status.play) pause();
      else if (get(status) !== Status.record) play();
      break;
    case 'Backspace':
      e.preventDefault();
      if (get(status) === Status.pause || get(status) === Status.play) stop();
      break;
    case 'r':
      if (e.ctrlKey || e.metaKey) break;
      e.preventDefault();
      if (get(trackSelect) !== -1)
        get(status) === Status.record ? end() : record();
      break;
  }
};

export default hotkeys;
