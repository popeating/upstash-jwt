import jsonwebtoken from 'jsonwebtoken';

export default async (req, res) => {
  console.log(req.method, jsonwebtoken);
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
export const config = {
  runtime: 'experimental-edge',
};
