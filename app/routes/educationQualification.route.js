module.exports = (app) => {
  const educationQualifications = require("../controllers/educationQualification.controller.js");
  const authenticateToken = require("../middleware/authJwt");

  var router = require("express").Router();

  /**
   * @swagger
   * /api/education-qualifications:
   *   post:
   *     summary: Create a new education qualification
   *     description: Create a new education qualification record with the provided information
   *     tags:
   *       - Education Qualifications
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       description: Education qualification data
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               id:
   *                 type: string
   *                 description: The unique identifier of the education qualification
   *               course:
   *                 type: string
   *                 description: The course name
   *               institute:
   *                 type: string
   *                 description: The name of the institute
   *               passDate:
   *                 type: string
   *                 format: date
   *                 description: The date of passing the qualification
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
   *                   description: The unique identifier of the education qualification
   *                 course:
   *                   type: string
   *                   description: The course name
   *                 institute:
   *                   type: string
   *                   description: The name of the institute
   *                 passDate:
   *                   type: string
   *                   format: date
   *                   description: The date of passing the qualification
   *                 employeeId:
   *                   type: string
   *                   description: The foreign key of the employee
   */
  router.post("/", authenticateToken, educationQualifications.create);

  /**
   * @swagger
   * /api/education-qualifications/{id}:
   *   get:
   *     summary: Get an education qualification by ID
   *     description: Get the details of an education qualification by its ID
   *     tags:
   *       - Education Qualifications
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: The ID of the education qualification to retrieve
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
   *                   description: The unique identifier of the education qualification
   *                 course:
   *                   type: string
   *                   description: The course name
   *                 institute:
   *                   type: string
   *                   description: The name of the institute
   *                 passDate:
   *                   type: string
   *                   format: date
   *                   description: The date of passing the qualification
   *                 employeeId:
   *                   type: string
   *                   description: The ID of the employee associated with the education qualification
   */
  router.get("/:id", authenticateToken, educationQualifications.findById);

  /**
   * @swagger
   * /api/education-qualifications/{id}:
   *   put:
   *     summary: Update an education qualification
   *     description: Update the details of an education qualification
   *     tags:
   *       - Education Qualifications
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: The ID of the education qualification to update
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       description: The updated details of the education qualification
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               course:
   *                 type: string
   *                 description: The updated course name
   *               institute:
   *                 type: string
   *                 description: The updated name of the institute
   *               passDate:
   *                 type: string
   *                 format: date
   *                 description: The updated date of passing the qualification
   *               id:
   *                 type: string
   *                 description: The unique identifier of the education qualification
   *               employeeId:
   *                 type: string
   *                 description: The ID of the employee associated with the education qualification
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
   *                   description: The unique identifier of the education qualification
   *                 course:
   *                   type: string
   *                   description: The updated course name
   *                 institute:
   *                   type: string
   *                   description: The updated name of the institute
   *                 passDate:
   *                   type: string
   *                   format: date
   *                   description: The updated date of passing the qualification
   *                 employeeId:
   *                   type: string
   *                   description: The ID of the employee associated with the education qualification
   */
  router.put("/:id", authenticateToken, educationQualifications.update);

  /**
   * @swagger
   * /api/education-qualifications/{id}:
   *   delete:
   *     summary: Delete an education qualification
   *     description: Delete an education qualification by its ID
   *     tags:
   *       - Education Qualifications
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: The ID of the education qualification to delete
   *         schema:
   *           type: string
   *     responses:
   *       204:
   *         description: Successful response
   */
  router.delete("/:id", authenticateToken, educationQualifications.delete);

  /**
   * @swagger
   * /api/education-qualifications/findAllEducationQualification/:employeeId:
   *   get:
   *     summary: Get education qualifications
   *     description: Get a list of education qualifications for an employee
   *     tags:
   *       - Education Qualifications
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: query
   *         name: employeeId
   *         required: true
   *         description: The ID of the employee to retrieve education qualifications for
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
   *                   course:
   *                     type: string
   *                     description: The course name
   *                   institute:
   *                     type: string
   *                     description: The name of the institute
   *                   passDate:
   *                     type: string
   *                     format: date
   *                     description: The date of passing the qualification
   *                   employeeId:
   *                     type: string
   *                     description: The ID of the employee associated with the education qualification
   */
  router.get(
    "/findAllEducationQualification/:employeeId",
    authenticateToken,
    educationQualifications.findAllByEmployeeId
  );

  app.use("/api/education-qualifications", router);
};
