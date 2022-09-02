import { Redis } from '@upstash/redis';
import { useEffect } from 'react';
const redis = new Redis({
  url: 'https://global-open-badger-30771.upstash.io',
  token:
    'AXgzACQgZGM3OWQ4YmYtNDUxZi00ZDIyLThiY2ItNmFiMzY1ODg0NTZiMDZhOGMzNzI0M2EyNDZjNGI0MmI0ODZkYzNkNGY3NjQ=',
});

export default function Home() {
  useEffect(() => {
    async function getData() {
      try {
        const result = await redis.scan(0, { match: 'movie:*' });

        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  return <div>hekk</div>;
}
