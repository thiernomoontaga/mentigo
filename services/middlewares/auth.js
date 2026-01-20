module.exports = (req, res, next) => {
  if (req.method === 'POST' && req.path === '/auth/login') {
    const { email, password } = req.body;

    if (email === 'fatou.student@example.com' && password === 'password123') {
      req.method = 'GET'; // Change to GET to return session data
      req.query = { userId: 1 };
    } else if (email === 'aminata.diop@example.com' && password === 'password123') {
      req.method = 'GET';
      req.query = { userId: 2 };
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }
  }

  if (req.method === 'POST' && req.path === '/auth/register') {
    next();
  }

  next();
};