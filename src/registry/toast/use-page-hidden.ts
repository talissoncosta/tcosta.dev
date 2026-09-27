import { useEffect, useState } from 'react';

export function usePageHidden() {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const onChange = () => setIsHidden(document.hidden);
    document.addEventListener('visibilitychange', onChange);
    return () => document.removeEventListener('visibilitychange', onChange);
  }, []);

  return isHidden;
}
