import { createSignal } from 'solid-js';
import { STATUS } from '../constants/constants';

const [status, setStatus] = createSignal(STATUS.STOPPED);

export default { status, setStatus };
