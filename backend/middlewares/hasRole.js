export default (roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.send({ error: 'Access denied' });
  }
  next();
};
