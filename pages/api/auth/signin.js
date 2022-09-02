import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const config = {
  runtime: 'experimental-edge',
};

export default async (req, res) => {
  console.log(req.method, req.body, jsonwebtoken);
  //await doLogin(req, res);

  return new Response('Hello world!');
};

function doLogin(req, res) {
  console.log('runMiddleware');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}
