import jwt from 'jsonwebtoken'

const sign = 'test';

const generate = (data) => jwt.sign(data, sign, { expiresIn: '30d' });

export default generate