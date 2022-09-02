export const config = {
  runtime: 'experimental-edge',
};

export default async (req, res) => {
  console.log(req.method);
  await runMiddleware(req, res);
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  console.log(email, process.env.SECRET_TOKEN);
  return new Response('Hello world!');
};

function runMiddleware(req, res) {
  console.log('runMiddleware');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}
