const useConnectionChange = () => {
  let isDisconnected = false;
  const status = navigator.onLine ? "online" : "offline";
  if (status === "online") {
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
