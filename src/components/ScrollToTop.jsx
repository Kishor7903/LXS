import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const scrollPositions = {};

export default function ScrollManager() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType(); // "PUSH" | "POP" | "REPLACE"

  useEffect(() => {
    const scrollContainer = document.querySelector(".scrollable-content") || window;

    if (navigationType === "POP") {
      // Going back/forward → restore scroll position if available
      const saved = scrollPositions[pathname];
      if (saved !== undefined) {
        scrollContainer.scrollTo({ top: saved, behavior: "auto" });
        return;
      }
    }

    // On new navigation (PUSH/REPLACE) → scroll to top
    scrollContainer.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, navigationType]);

  useEffect(() => {
    const scrollContainer = document.querySelector(".scrollable-content") || window;

    const handleScroll = () => {
      scrollPositions[pathname] = scrollContainer.scrollTop || window.scrollY;
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return null;
}
