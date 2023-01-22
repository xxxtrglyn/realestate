import React, { MouseEvent, useEffect, useRef } from "react";

const useOutsideClick = (callback: () => void) => {
  const ref = useRef<Element>(null);
  useEffect(() => {
    function handleClick(event: React.MouseEvent<Element>): void {
      if (ref.current && !ref.current.contains(event.currentTarget)) {
        callback();
      }
    }
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
  return ref;
};

export default useOutsideClick;
