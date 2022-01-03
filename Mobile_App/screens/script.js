import { useEffect } from 'react';

const useScript = url => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, [url]);
};

export default useScript;