import { useState, useEffect } from "react";

const useElementSizeById = (id: string) => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const element = document.getElementById(id);
    if (element) {
      const observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
          setSize({
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          });
        }
      });

      observer.observe(element);

      return () => {
        observer.disconnect();
      };
    }
  }, [id]);

  return size;
};

export default useElementSizeById;
