const NotificationService = {
  send(title, message, url) {
    let pb = window.PB;
    pb.register();
    pb.q.push([
      "sendNotification",
      { title: title, message: message, url: url }
    ]);
  }
};

export default NotificationService;
