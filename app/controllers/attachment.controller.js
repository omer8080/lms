const fs = require("fs");

const db = require("../models");
const Attachment = db.attachments;

const uploadFiles = async (req, res) => {
  try {
    const userRole = req.user.role;
    if (userRole !== "HR") {
      res.status(401).json({
        message: "You are not allowed to upload attachments",
      });
      return;
    }

    if (!req.file) {
      return res.json(`You must select a file.`);
    }

    if (!req.body.employeeId) {
      res.status(400).json({
        message: "Employee can not be empty!",
      });
      return;
    }

    Attachment.create({
      type: req.file.mimetype,
      name: req.file.originalname,
      employeeId: req.body.employeeId,
      data: fs.readFileSync(
        __basedir + "/resources/static/assets/upload/" + req.file.filename
      ),
    }).then((attachment) => {
      fs.writeFileSync(
        __basedir + "/resources/static/assets/tmp/" + attachment.name,
        attachment.data
      );

      return res.json(`File has been uploaded.`);
    });
  } catch (error) {
    console.log(error);
    return res.json(`Error when trying upload attachments: ${error}`);
  }
};

const downloadFiles = async (req, res) => {
  try {
    const userRole = req.user.role;
    if (userRole !== "HR") {
      res.status(401).json({
        message: "You are not allowed to upload attachments",
      });
      return;
    }

    const fileId = req.params.id;

    // Retrieve the file record from the database
    const file = await Attachment.findByPk(fileId);

    if (!file) {
      return res.status(404).send("File not found");
    }

    const fileName = file.name;
    const fileData = file.data;

    // Set the appropriate headers for the file download
    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

    res.send(fileData);
  } catch (error) {
    console.log(error);
    return res.json(`Error when trying upload attachments: ${error}`);
  }
};

const findAllByEmployeeId = async (req, res) => {
  try {
    if (!req.params.employeeId) {
      res.status(400).json({
        message: "Employee can not be empty!",
      });
      return;
    }
    const employeeId = req.params.employeeId;

    // Retrieve attachments from the database or any other data source
    const attachments = await Attachment.findAll({ where: { employeeId } });

    // Map the attachments to remove the "file" property
    const sanitizedAttachments = attachments.map((attachment) => {
      const { id, employeeId, name, type, createdAt, updatedAt } = attachment;
      return { id, employeeId, name, type, createdAt, updatedAt };
    });

    // Return the sanitized attachments in the response
    res.json(sanitizedAttachments);
  } catch (error) {
    // Handle errors
    console.error("Error when retrieving attachments:", error);
    res.status(500).json({ error: "Failed to retrieve attachments" });
  }
};

module.exports = {
  uploadFiles,
  downloadFiles,
  findAllByEmployeeId,
};
