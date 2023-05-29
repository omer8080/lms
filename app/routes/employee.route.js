module.exports = (app) => {
  const employees = require("../controllers/employee.controller.js");
  const authenticateToken = require("../middleware/authJwt");

  var router = require("express").Router();

  /**
   * @swagger
   * /api/employees:
   *   post:
   *     summary: Create a new employee
   *     description: Create a new employee with the specified information
   *     tags:
   *       - Employees
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               id:
   *                 type: string
   *                 description: The unique identifier of the employee
   *               username:
   *                 type: string
   *                 description: The username of the employee
   *               dob:
   *                 type: string
   *                 format: date
   *                 description: The date of birth of the employee
   *               gender:
   *                 type: string
   *                 enum: [MALE, FEMALE, OTHERS]
   *                 description: The gender of the employee
   *               email:
   *                 type: string
   *                 format: email
   *                 description: The email address of the employee
   *               position:
   *                 type: string
   *                 enum: [DEVELOPER, MANAGER, BA, DB, DEVOPS, TESTER]
   *                 description: The position of the employee
   *               phoneNo:
   *                 type: string
   *                 description: The phone number of the employee
   *               role:
   *                 type: string
   *                 enum: [HR, EMPLOYEE, CEO]
   *                 description: The role of the employee
   *     responses:
   *       201:
   *         description: employee created successfully
   *       400:
   *         description: Bad request, employee creation failed
   */
  router.post("/", authenticateToken, employees.create);

  /**
   * @swagger
   * /api/employees:
   *   get:
   *     summary: Get all employees
   *     description: Get a list of all employees with their information
   *     tags:
   *       - Employees
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Successful response
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: string
   *                     description: The unique identifier of the employee
   *                   username:
   *                     type: string
   *                     description: The username of the employee
   *                   dob:
   *                     type: string
   *                     format: date
   *                     description: The date of birth of the employee
   *                   gender:
   *                     type: string
   *                     enum: [MALE, FEMALE, OTHER]
   *                     description: The gender of the employee
   *                   email:
   *                     type: string
   *                     format: email
   *                     description: The email address of the employee
   *                   position:
   *                     type: string
   *                     enum: [DEVELOPER, MANAGER, BA, DB, DEVOPS, TESTER]
   *                     description: The position of the employee
   *                   phoneNo:
   *                     type: string
   *                     description: The phone number of the employee
   *                   role:
   *                     type: string
   *                     enum: [HR, EMPLOYEE, CEO]
   *                     description: The role of the employee
   */
  router.get("/", authenticateToken, employees.findAll);

  /**
   * @swagger
   * /api/employees/{id}:
   *   get:
   *     summary: Get a employee by ID
   *     description: Get the information of a employee with the specified ID
   *     tags:
   *       - Employees
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: The ID of the employee to retrieve
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Successful response
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                   description: The unique identifier of the employee
   *                 username:
   *                   type: string
   *                   description: The username of the employee
   *                 dob:
   *                   type: string
   *                   format: date
   *                   description: The date of birth of the employee
   *                 gender:
   *                   type: string
   *                   enum: [MALE, FEMALE, OTHERS]
   *                   description: The gender of the employee
   *                 email:
   *                   type: string
   *                   format: email
   *                   description: The email address of the employee
   *                 position:
   *                   type: string
   *                   enum: [DEVELOPER, MANAGER, BA, DB, DEVOPS, TESTER]
   *                   description: The position of the employee
   *                 phoneNo:
   *                   type: string
   *                   description: The phone number of the employee
   *                 role:
   *                   type: string
   *                   enum: [HR, EMPLOYEE, CEO]
   *                   description: The role of the employee
   *       404:
   *         description: employee not found
   */
  router.get("/:id", authenticateToken, employees.findById);

  /**
   * @swagger
   * /api/employees/{id}:
   *   put:
   *     summary: Update a employee by ID
   *     description: Update the specified employee with the new information
   *     tags:
   *       - Employees
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: The ID of the employee to update
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *                 description: The updated username of the employee
   *               dob:
   *                 type: string
   *                 format: date
   *                 description: The updated date of birth of the employee
   *               gender:
   *                 type: string
   *                 enum: [MALE, FEMALE, OTHERS]
   *                 description: The updated gender of the employee
   *               email:
   *                 type: string
   *                 format: email
   *                 description: The updated email address of the employee
   *               position:
   *                 type: string
   *                 enum: [DEVELOPER, MANAGER, BA, DB, DEVOPS, TESTER]
   *                 description: The updated position of the employee
   *               phoneNo:
   *                 type: string
   *                 description: The updated phone number of the employee
   *               role:
   *                 type: string
   *                 enum: [HR, EMPLOYEE, CEO]
   *                 description: The updated role of the employee
   *     responses:
   *        200:
   *          description: Employee updated successfully
   *        400:
   *          description: Bad request, employee update failed
   *        404:
   *          description: Employee not found
   */
  router.put("/:id", authenticateToken, employees.update);

  /**
   * @swagger
   * /api/employees/{id}:
   *   delete:
   *     summary: Delete a employee by ID
   *     description: Delete the employee with the specified ID
   *     tags:
   *       - Employees
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: The ID of the employee to delete
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Successful response
   *       404:
   *         description: Employee not found
   */
  router.delete("/:id", authenticateToken, employees.delete);

  app.use("/api/employees", router);
};
