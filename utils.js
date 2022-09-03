import jwt from 'jsonwebtoken';
import { Redis } from '@upstash/redis';
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
export function generateAccessToken(username, email, level) {
  return jwt.sign(
    { user: username, email: email, level: level },
    process.env.SECRET_TOKEN,
    {
      expiresIn: '1h',
    }
  );
}

export function generateRefreshToken(username, email, level) {
  return jwt.sign(
    { user: username, email: email, level: level },
    process.env.SECRET_RTOKEN,
    {
      expiresIn: '30d',
    }
  );
}

export async function addToList(user, refresher) {
  try {
    await redis.hset('refresh:' + user, { refresh: refresher });
  } catch (error) {
    console.log(error);
  }
}

export async function tokenRefresh(refreshtoken, res) {
  var decoded = '';
  try {
    decoded = jwt.verify(refreshtoken, process.env.SECRET_RTOKEN);
  } catch (error) {
    return res.status(401).send("Can't refresh. Invalid Token");
  }
  if (decoded) {
    try {
      const rtoken = await redis.hget('refresh:' + decoded.user, 'refresh');
      console.log(rtoken);
      if (rtoken !== refreshtoken) {
        return res.status(401).send("Can't refresh. Invalid Token");
      } else {
        const user = await redis.hgetall(`user:${decoded.user}`);
        console.log(user);
        const token = generateAccessToken(decoded.user, user.level);
        const refreshToken = generateRefreshToken(decoded.user, user.level);

        const refresh = await addToList(decoded.user, refreshToken);

        const content = {
          user: decoded.user,
          level: user.level,
        };
        return {
          message: 'Token Refreshed',
          content: content,
          JWT: token,
          refresh: refreshToken,
        };
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export async function verifyToken(token, res) {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    return decoded;
  } catch (err) {
    return res.status(405).send('Token is invalid');
  }
}
