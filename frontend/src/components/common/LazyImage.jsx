import { useState } from "react";

const LazyImage = ({ src, alt = "", className = "", placeholder = null }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`overflow-hidden ${className}`}>
      {!loaded && (
        <div className="bg-gray-100 animate-pulse w-full h-full" />
      )}

      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />

      {placeholder}
    </div>
  );
};

export default LazyImage;
