module.exports = (req, res, next) => {
  const reliability = 0.8; // use 1 for 100% success rate
  setTimeout(function () {
    if (Math.random() > reliability) {
      res.status(500).jsonp({
        error: "Oh no! Flaky backend :( Try again...",
      });
    } else {
      next();
    }
  }, Math.max(200, Math.min(700, Math.random() * 1000)));
};
