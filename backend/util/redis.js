import { Redis } from '@upstash/redis'
import dotenv from "dotenv"
dotenv.config();

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});


export const addCache = async (key, value, expInSecs) => {
    redis.set(key, value, { ex: expInSecs });
}

export const getCache = async(key) => {
  return await redis.get(key);
}

export const removeCache = async(key) => {
  return await redis.del(key);
}
