import { useEffect } from 'react';

const useClickOutside = (handleClick, listen) => {
  useEffect(() => {
    if (Object.values(listen).every(v => !v)) document.removeEventListener('click', handleClick);
    else document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [listen]); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useClickOutside;
