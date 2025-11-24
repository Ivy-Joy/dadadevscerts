import { RateLimiterMemory } from 'rate-limiter-flexible';

const opts = {
  points: 10, 
  duration: 1 
};

const rateLimiter = new RateLimiterMemory(opts);

export default async function rateLimit(req, res) {
  try {
    await rateLimiter.consume(req.ip);
    return true;
  } catch (rejRes) {
    console.error(rejRes, error);
    res.status(429).json({ error: 'Too Many Requests' });
    return false;
  }
}
