const NotificationService = {
  send(title, message, url) {
    let pb = window.pb;
    pb.register();
    pb.q.push([
      "sendNotification",
      { title: title, message: message, url: url }
    ]);
  }
};
