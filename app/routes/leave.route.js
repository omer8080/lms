module.exports = (app) => {
  const leaves = require("../controllers/leave.controller.js");
  const authenticateToken = require("../middleware/authJwt");

  var router = require("express").Router();

  /**
   * @swagger
   * /api/leaves:
   *   post:
   *     summary: Create a new leave record
   *     description: Create a new leave record
   *     tags:
   *       - Leaves
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               leaveType:
   *                 type: string
   *                 description: Type of leave
   *               startDate:
   *                 type: string
   *                 format: date
   *                 description: Start date of the leave
   *               endDate:
   *                 type: string
   *                 format: date
   *                 description: End date of the leave
   *               employeeId:
   *                 type: string
   *                 description: ID of the employee
   *     responses:
   *       201:
   *         description: Leave record created successfully
   *       400:
   *         description: Invalid request payload
   */
  router.post("/", authenticateToken, leaves.create);

  /**
   * @swagger
   * /api/leaves:
   *   get:
   *     summary: Get all leave records
   *     description: Retrieve all leave records
   *     tags:
   *       - Leaves
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Successful operation
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   leaveType:
   *                     type: string
   *                     description: Type of leave
   *                   startDate:
   *                     type: string
   *                     format: date
   *                     description: Start date of the leave
   *                   endDate:
   *                     type: string
   *                     format: date
   *                     description: End date of the leave
   *                   employeeId:
   *                     type: string
   *                     description: ID of the employee
   *                   id:
   *                     type: string
   *                     description: ID of the leave
   */
  router.get("/", authenticateToken, leaves.findAllLeaves);

  /**
   * @swagger
   * /api/leaves/find-by-employee/{id}:
   *   get:
   *     summary: Get all leave records for a specific employee
   *     description: Retrieve all leave records based on the employee ID
   *     tags:
   *       - Leaves
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: employeeId
   *         description: ID of the employee
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Successful operation
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   leaveType:
   *                     type: string
   *                     description: Type of leave
   *                   startDate:
   *                     type: string
   *                     format: date
   *                     description: Start date of the leave
   *                   endDate:
   *                     type: string
   *                     format: date
   *                     description: End date of the leave
   *                   employeeId:
   *                     type: string
   *                     description: ID of the employee
   *                   id:
   *                     type: string
   *                     description: ID of the leave
   */
  router.get(
    "/find-by-employee/:employeeId",
    authenticateToken,
    leaves.findAllByEmployeeId
  );

  /**
   * @swagger
   * /api/leaves/{id}:
   *   get:
   *     summary: Get a leave record by ID
   *     description: Retrieve a leave record by its ID
   *     tags:
   *       - Leaves
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: The ID of the leave record to retrieve
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
   *                 leaveType:
   *                   type: string
   *                   enum: [ANNUAL_LEAVE, MEDICAL_LEAVE, EMERGENCY_LEAVE]
   *                   description: The type of leave
   *                 startDate:
   *                   type: string
   *                   format: date
   *                   description: The start date of the leave
   *                 endDate:
   *                   type: string
   *                   format: date
   *                   description: The end date of the leave
   *                 employeeId:
   *                   type: string
   *                   description: The ID of the employee
   *                 id:
   *                   type: string
   *                   description: The ID of the leave
   */

  router.get("/:id", authenticateToken, leaves.findById);

  /**
   * @swagger
   * /api/leaves/submit/{id}:
   *   put:
   *     summary: submit a leave
   *     description: submit a leave by its ID
   *     tags:
   *       - Leaves
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: The ID of the leave submission to submit
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       description: The submit leave data
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               leaveType:
   *                 type: string
   *                 enum: [ANNUAL_LEAVE, MEDICAL_LEAVE, EMERGENCY_LEAVE]
   *                 description: The type of leave
   *               startDate:
   *                 type: string
   *                 format: date
   *                 description: The start date of the leave
   *               endDate:
   *                 type: string
   *                 format: date
   *                 description: The end date of the leave
   *               employeeId:
   *                 type: string
   *                 description: The ID of the employee
   *               id:
   *                 type: string
   *                 description: The ID of the leave
   *     responses:
   *       200:
   *         description: Successful response
   */
  router.put("/submit/:id", authenticateToken, leaves.submit);

  /**
   * @swagger
   * /api/leaves/approve/{id}:
   *   put:
   *     summary: Approve a leave request
   *     description: Approve a leave request by its ID
   *     tags:
   *       - Leaves
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: The ID of the leave request to approve
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Successful response
   */
  router.put("/approve/:id", authenticateToken, leaves.approve);

  /**
   * @swagger
   * /api/leaves/reject/{id}:
   *   put:
   *     summary: Reject a leave request
   *     description: Reject a leave request by its ID
   *     tags:
   *       - Leaves
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: The ID of the leave request to reject
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       description: The rejection reason for the leave request
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               rejectReason:
   *                 type: string
   *                 description: The reason for rejecting the leave request
   *     responses:
   *       200:
   *         description: Successful response
   */
  router.put("/reject/:id", authenticateToken, leaves.reject);

  app.use("/api/leaves", router);
};
