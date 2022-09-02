import type { NextRequest } from 'next/server';
import { Redis } from '@upstash/redis';
const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = new Redis({
  url: UPSTASH_REDIS_REST_TOKEN,
  token: UPSTASH_REDIS_REST_URL,
});
export default async (req: NextRequest) => {
  let loc = req.geo?.country || 'World';
  const count = await redis.incr(loc);
  return new Response(`Location: ${loc}  View count: ${count}`);
};

export const config = {
  runtime: 'experimental-edge',
};
