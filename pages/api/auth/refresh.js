import { tokenRefresh, redis } from '../../../utils';
export default async (req, res) => {
  if (req.method === 'GET') {
    res.status(405).send('Not Allowed');
  } else {
    console.log(req.body.refresh);
    const refresp = await tokenRefresh(req.body.refresh, res);
    res.status(200).json(refresp);
  }
};
