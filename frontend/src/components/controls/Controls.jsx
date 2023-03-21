import Icon from '../../assets/icons/Icons';
import { STATUS } from '../../constants/constants';
import useStatus from '../../hooks/useStatus';

const Controls = () => {
  const { status, setStatus } = useStatus;

  const handlePlay = () => setStatus(STATUS.PLAYING);
  const handlePause = () => setStatus(STATUS.PAUSED);
  const handleStop = () => setStatus(STATUS.STOPPED);

  return (
    <div class="flex py-4 px-8 justify-center items-end gap-2">
      <div>
        <button
          class={ `rounded-full border ${ status() !== STATUS.PLAYING ? 'text-white' : 'text-black border-blue-600 bg-gray-100' } p-3` }
          onClick={ handlePause }
          disabled={ status() !== STATUS.PLAYING }
        >
          <Icon>pause</Icon>
        </button>
      </div>
      <div>
        <button
          class={ `rounded-full border ${ status() === STATUS.PLAYING ? 'text-white' : 'text-black border-blue-600 bg-gray-100' } p-6` }
          onClick={ handlePlay }
          disabled={ status() === STATUS.PLAYING }
        >
          <Icon>play</Icon>
        </button>
      </div>
      <div>
        <button
          class={ `rounded-full border ${ status() === STATUS.STOPPED ? 'text-white' : 'text-black border-blue-600 bg-gray-100' } p-3` }
          onClick={ handleStop }
          disabled={ status() === STATUS.STOPPED }
        >
          <Icon>stop</Icon>
        </button>
      </div>
    </div>
  );
};

export default Controls;
