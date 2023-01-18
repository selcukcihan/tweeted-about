import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0'

export default withApiAuthRequired(async function topics(req, res) {
  const { accessToken } = await getAccessToken(req, res)
  console.log(`CSR FETCH: Bearer ${accessToken}`)
  // Use the access token to call API Gateway.
  const response = await fetch(new URL(' https://jh9hjsbzu2.execute-api.eu-west-1.amazonaws.com/topics'), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  
  const responseData = await response.json()
  res.status(200).json(responseData)
})
