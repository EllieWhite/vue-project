import verify from 'jsonwebtoken';
import User from '../models/User';

export default async (req, res, next) => {
  try {
    const tokenData = verify(req.cookies.token);
    const user = await User.findOne({ _id: tokenData.id });

    if (!user) {
      return res.send({ error: 'Authenticated user not found' });
    }

    req.user = user;
    next();
  } catch (e) {
    res.send({ error: e.message || 'Token error' });
  }
};