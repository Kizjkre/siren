import { useEffect } from 'react';

const useClickOutside = handleClick => {
  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useClickOutside;
