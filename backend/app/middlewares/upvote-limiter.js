import rateLimit from 'express-rate-limit';

const upvoteLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5000, // limit each IP to 5 requests per windowMs
    message: 'Too many upvotes from this IP, please try again later.',
  });

export default upvoteLimiter;