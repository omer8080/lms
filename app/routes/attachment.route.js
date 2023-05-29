module.exports = (app) => {
  const attachmentController = require("../controllers/attachment.controller.js");
  const upload = require("../middleware/upload.js");
  const authenticateToken = require("../middleware/authJwt");

  var router = require("express").Router();

  /**
   * @swagger
   * /api/attachments/upload:
   *   post:
   *     summary: Upload a file
   *     description: Upload a single file
   *     consumes:
   *       - multipart/form-data
   *     tags:
   *       - Attachments
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         required: true
   *         description: Bearer token for authentication
   *         schema:
   *           type: string
   *       - in: formData
   *         name: file
   *         type: file
   *         required: true
   *         description: The file to upload
   *       - in: formData
   *         name: employeeId
   *         type: string
   *         required: true
   *         description: The ID of the employee
   *     responses:
   *       200:
   *         description: File uploaded successfully
   *       400:
   *         description: Bad request, file upload failed
   */

  router.post(
    "/upload",
    authenticateToken,
    upload.single("file"),
    attachmentController.uploadFiles
  );

  /**
   * @swagger
   * /api/attachments/download/{id}:
   *   get:
   *     summary: Download a file
   *     description: Download a file by its ID
   *     tags:
   *       - Attachments
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         required: true
   *         description: Bearer token for authentication
   *         schema:
   *           type: string
   *       - in: path
   *         name: id
   *         required: true
   *         description: The ID of the file to download
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: File downloaded successfully
   *       404:
   *         description: File not found
   */
  router.get(
    "/download/:id",
    authenticateToken,
    attachmentController.downloadFiles
  );

  /**
   * @swagger
   * /api/attachments/{employeeId}:
   *   get:
   *     summary: Get all attachments by employee ID
   *     description: Retrieve all attachments for a specific employee.
   *     parameters:
   *       - in: path
   *         name: employeeId
   *         description: Employee ID
   *         required: true
   *         schema:
   *           type: integer
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
   *                   id:
   *                     type: integer
   *                   employeeId:
   *                     type: integer
   *                   name:
   *                     type: string
   *                   data:
   *                     type: string
   */
  router.get(
    "/:employeeId",
    authenticateToken,
    attachmentController.findAllByEmployeeId
  );

  app.use("/api/attachments", router);
};
