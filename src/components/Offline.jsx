import { useConnectionChange } from "../hooks";
import { useEffect, useState } from "react";

const Offline = () => {
  const [isDisconnected, setIsDisconnected] = useState(true);
  useEffect(() => {
    setIsDisconnected(useConnectionChange());
    window.addEventListener("offline", useConnectionChange());
    window.removeEventListener("offline", useConnectionChange());
  }, []);

  return (
    <div>
      {isDisconnected && (
        <div>
          <p>Internet connection lost</p>
        </div>
      )}
    </div>
  );
};

export default Offline;
