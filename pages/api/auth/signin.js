import bcrypt from 'bcrypt';

import {
  generateAccessToken,
  generateRefreshToken,
  addToList,
  redis,
} from '../../../utils';

export default async (req, res) => {
  if (req.method === 'GET') {
    res.status(405).send('Not Allowed');
  } else {
    console.log(req.body.user);
    try {
      const user = await redis.hgetall(`user:${req.body.user}`);

      if (user) {
        const validPassword = bcrypt.compare(req.body.password, user.password);
        if (validPassword) {
          const token = generateAccessToken(req.body.user, user.level);
          const refreshToken = generateRefreshToken(req.body.user, user.level);

          const refresh = await addToList(req.body.user, refreshToken);

          const content = {
            user: req.body.user,
            level: user.level,
          };
          res.status(200).json({
            message: 'Logged in',
            content: content,
            JWT: token,
            refresh: refreshToken,
          });
        } else {
          res.status(400).json({ error: 'Invalid Password' });
        }
      } else {
        res.status(401).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  }
};
