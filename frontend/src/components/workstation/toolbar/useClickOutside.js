import { useEffect } from 'react';

const useClickOutside = handleClick => {
  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useClickOutside;
