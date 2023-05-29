module.exports = (app) => {
  const workExperiences = require("../controllers/workExperience.controller.js");
  const authenticateToken = require("../middleware/authJwt");

  var router = require("express").Router();

  /**
   * @swagger
   * /api/work-experiences:
   *   post:
   *     summary: Create a new work experiences
   *     description: Create a new work experiences record with the provided information
   *     tags:
   *       - Work Experiences
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       description: work experiences data
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               id:
   *                 type: string
   *                 description: The unique identifier of the work experiences
   *               companyName:
   *                 type: string
   *                 description: The company name
   *               startDate:
   *                 type: string
   *                 format: date
   *               endDate:
   *                 type: string
   *                 format: date
   *               employeeId:
   *                 type: string
   *                 description: The foreign key of the employee
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
   *                   description: The unique identifier of the work experiences
   *                 companyName:
   *                   type: string
   *                   description: The company name
   *                 startDate:
   *                   type: string
   *                   format: date
   *                 endDate:
   *                   type: string
   *                   format: date
   *                 employeeId:
   *                   type: string
   *                   description: The foreign key of the employee
   */
  router.post("/", authenticateToken, workExperiences.create);

  /**
   * @swagger
   * /api/work-experiences/{id}:
   *   get:
   *     summary: Get an work experience by ID
   *     description: Get the details of an work experience by its ID
   *     tags:
   *       - Work Experiences
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: The ID of the work experience to retrieve
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
   *                   description: The unique identifier of the work experience
   *                 companyName:
   *                   type: string
   *                 startDate:
   *                   type: string
   *                   format: date
   *                 endDate:
   *                   type: string
   *                   format: date
   *                 employeeId:
   *                   type: string
   *                   description: The ID of the employee associated with the work experience
   */
  router.get("/:id", authenticateToken, workExperiences.findById);

  /**
   * @swagger
   * /api/work-experiences/{id}:
   *   put:
   *     summary: Update an work experience
   *     description: Update the details of an work experience
   *     tags:
   *       - Work Experiences
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: The ID of the work experience to update
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       description: The updated details of the work experience
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               company:
   *                 type: string
   *                 description: The updated company name
   *               startDate:
   *                 type: string
   *                 format: date
   *               endDate:
   *                 type: string
   *                 format: date
   *               id:
   *                 type: string
   *                 description: The unique identifier of the work experience
   *               employeeId:
   *                 type: string
   *                 description: The ID of the employee associated with the work experience
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
   *                   description: The unique identifier of the work experience
   *                 companyName:
   *                   type: string
   *                   description: The updated companyName
   *                 startDate:
   *                   type: string
   *                   format: date
   *                 endDate:
   *                   type: string
   *                   format: date
   *                 employeeId:
   *                   type: string
   *                   description: The ID of the employee associated with the work experience
   */
  router.put("/:id", authenticateToken, workExperiences.update);

  /**
   * @swagger
   * /api/work-experiences/{id}:
   *   delete:
   *     summary: Delete a work experience by its ID
   *     description: Delete an work experience by its ID
   *     tags:
   *       - Work Experiences
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: The ID of the work experience to delete
   *         schema:
   *           type: string
   *     responses:
   *       204:
   *         description: Successful response
   */
  router.delete("/:id", authenticateToken, workExperiences.delete);

  /**
   * @swagger
   * /api/work-experiences/findAllWorkExperience/{employeeId}:
   *   get:
   *     summary: Get work experiences
   *     description: Get a list of work experiences for an employee
   *     tags:
   *       - Work Experiences
   *     produces:
   *       - application/json
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: query
   *         name: employeeId
   *         required: true
   *         description: The ID of the employee to retrieve work experiences for
   *         schema:
   *           type: string
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
   *                     description: The unique identifier of the education qualification
   *                   companyName:
   *                     type: string
   *                     description: The course name
   *                   startDate:
   *                     type: string
   *                     format: date
   *                   endDate:
   *                     type: string
   *                     format: date
   */
  router.get(
    "/findAllWorkExperience/:employeeId",
    authenticateToken,
    workExperiences.findAllByEmployeeId
  );

  app.use("/api/work-experiences", router);
};
