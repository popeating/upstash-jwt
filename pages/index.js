import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Redis } from '@upstash/redis';
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default function Home() {
  return <div>hekk</div>;
}
