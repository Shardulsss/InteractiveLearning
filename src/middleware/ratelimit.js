const ratelimit = require('express-rate-limit');


const limiter1 = ratelimit({
    windowMs: 15 * 60 * 1000, // 15 min window
    max: 8, // start blocking after 5 requests
    statusCode: 200,
    message:
      "Test is completed, You can take new test after 15 mins"
  });

const limiter2 = ratelimit({
    windowMs: 15 * 60 * 1000, // 15 min window
    max: 8, // start blocking after 5 requests
    statusCode: 200,
    message:
      "Test is completed, You can take new test after 15 mins"
  });
module.exports = {
  limiter1:limiter1,
  limiter2:limiter2,

};