import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function usePageLeave() {
  const location = useLocation();

  useEffect(() => {
    function handleBeforeUnload(event) {
      event.preventDefault();
      event.returnValue = '';
    }

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [location]);
}

export default usePageLeave;
