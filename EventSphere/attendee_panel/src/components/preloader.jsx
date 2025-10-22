import { useEffect, useState } from 'react';


function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay (e.g., wait for 2 seconds)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div id="preloder">
      <div className="loader"></div>
    </div>
  );
}

export default Preloader;
