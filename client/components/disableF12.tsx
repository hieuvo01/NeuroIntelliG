// components/DisableF12.js
import { useEffect } from "react";

const DisableF12 = () => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleKeyDown = (event: any) => {
      if (event.key === "F12") {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleContextMenu = (event: any) => {
      event.preventDefault();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("contextmenu", handleContextMenu);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return null;
};

export default DisableF12;
