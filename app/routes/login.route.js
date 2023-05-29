module.exports = (app) => {
  const login = require("../controllers/login.controller.js");

  var router = require("express").Router();
  /**
   * @swagger
   * /api/login:
   *   post:
   *     summary: Authenticate user and generate JWT token
   *     description: Authenticate user and generate JWT token
   *     tags:
   *       - Authentication
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *                 description: User's username
   *               password:
   *                 type: string
   *                 description: User's password
   *     responses:
   *       200:
   *         description: User authenticated successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: string
   *                   description: JWT token for authentication
   *       401:
   *         description: Unauthorized access
   */
  router.post("/", login.create);

  app.use("/api/login", router);
};
