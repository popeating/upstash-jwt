import { redis, verifyToken } from '../../../utils';
export default async (req, res) => {
  var id;
  console.log(req.query);
  if (req.query.id) {
    id = req.query.id[0];
  }

  var decoded = '';
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(403).send('A token is required for authentication');
  } else {
    decoded = await verifyToken(token, res);
  }
  if (decoded) {
    if (id) {
      try {
        const result = await redis.hgetall(id);
        console.log(result);
        return res.status(200).json(result);
      } catch (error) {
        return res.status(500).send('Internal Server Error');
      }
    } else {
      try {
        const result = await redis.scan(0, { match: 'movie:*' });
        return res.status(200).json(result);
      } catch (error) {
        return res.status(500).send('Internal Server Error');
      }
    }
  }
};
