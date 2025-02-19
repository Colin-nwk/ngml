import { useCallback } from "react";

const useScrollToId = () => {
  const scrollToId = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return scrollToId;
};

export default useScrollToId;
