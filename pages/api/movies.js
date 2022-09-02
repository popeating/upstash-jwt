import { Redis } from '@upstash/redis/with-fetch';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_RO_REST_TOKEN,
});
export default async (req, res) => {
  console.log('boh', req.method, redis);
  //await runMiddleware(req, res);
  try {
    const result = await redis.scan(0, { match: 'movie:*' });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
  const greeting = 'Hello World!';
  return new Response(greeting);
};

function runMiddleware(req, res) {
  console.log('runMiddleware');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}
export const config = {
  runtime: 'experimental-edge',
};
