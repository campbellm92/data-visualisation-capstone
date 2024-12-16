const helmet = require("helmet");

const helmetConfig = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: [
        "'self'",
        "http://localhost:3000",
        "https://localis-capstone-f7a22eb1b92e.herokuapp.com",
      ],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'",
        "'unsafe-eval'",
        "https://maps.googleapis.com",
        "https://www.google.com",
      ],
      imgSrc: ["'self'", "data:", "https://maps.gstatic.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      frameSrc: [
        "'self'",
        "https://www.google.com",
        "https://maps.googleapis.com",
      ],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
    },
  },
});
module.exports = helmetConfig;
