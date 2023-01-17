import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0'

export default withApiAuthRequired(async function topics(req, res) {
  const { accessToken } = await getAccessToken(req, res);
  console.log(`Bearer ${accessToken}`)
  // Use the access token to call API Gateway?
  await new Promise((resolve) => setTimeout(() => resolve(0), 2000))
  res.status(200).json([{
    name: 'Something',
    count: 9,
  }]);
})
