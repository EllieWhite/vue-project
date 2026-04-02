import jwt from 'jsonwebtoken'

const sign = 'test';

const generate = (data) => jwt.sign(data, sign, { expiresIn: '30d' });

const verify = (token) => {
  if (!token) {
    throw new Error('Invalid token');
  }
  return jwt.verify(token, sign);
};



export default { generate, verify }