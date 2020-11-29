import { useState } from "react";

const useConnectionChange = () => {
  let isDisconnected = false;
  const condition = navigator.onLine ? "online" : "offline";
  if (condition === "online") {
    const webPing = setInterval(() => {
      fetch("//google.com", {
        mode: "no-cors"
      })
        .then(() => {
          isDisconnected = false;
          return clearInterval(webPing);
        })
        .catch(() => {
          return (isDisconnected = true);
        });
    }, 2000);
    return;
  }

  return isDisconnected;
};

export default useConnectionChange;
