import { createEffect } from 'solid-js';
import { STATUS } from '../../constants/constants';
import useStatus from '../../hooks/useStatus';

const Seeker = () => {
  const { status } = useStatus;

  let ref;

  let prev;
  let curr = 0;

  createEffect(() => {
    // noinspection FallThroughInSwitchStatementJS
    switch (status()) {
      case STATUS.PLAYING:
        const play = time => {
          if (status() !== STATUS.PLAYING) return;
          if (prev) {
            curr += time - prev;
            ref.style.transform = `translateX(${ curr / 10 }px)`;
          }
          prev = time;
          requestAnimationFrame(play);
        };
        requestAnimationFrame(play);
        break;
      case STATUS.STOPPED:
        curr = 0;
        ref.style.transform = '';
      case STATUS.PAUSED:
        prev = null;
        break;
    }
  });

  return (
    <div ref={ ref } class="absolute left-[200px] border-x border-red-400 h-full cursor-grab z-[1]" />
  );
};

export default Seeker;
