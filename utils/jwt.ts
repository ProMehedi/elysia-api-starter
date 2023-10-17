import * as jose from 'jose'

const secret = new TextEncoder().encode(Bun.env.JWT_SECRET || 'secret')

type JWT = {
  data: jose.JWTPayload
  exp?: string
}

export const sign = async ({ data, exp = '7d' }: JWT) =>
  await new jose.SignJWT(data)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(exp)
    .sign(secret)

export const verify = async (jwt: string) =>
  (await jose.jwtVerify(jwt, secret)).payload

export const jwt = {
  sign,
  verify,
}
