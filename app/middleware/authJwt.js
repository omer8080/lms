const express = require('express');
const jwt = require('jsonwebtoken');

// Authorization middleware
const authenticateToken = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  const token = bearerToken && bearerToken.split(' ')[1];

  if (token) {
    jwt.verify(token, 'PI826372HBYQ02837H', (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }

      // Pass the decoded information to the next middleware or route handler
      req.user = decoded;
      next();
    });
  } else {
    res.status(401).json({ message: 'Missing token' });
  }
};

module.exports = authenticateToken;