import { useState } from '../context/Context';

export default () => {
  const [, { addMapping }] = useState();
  addMapping('Default', 'export default x => x;');
};
