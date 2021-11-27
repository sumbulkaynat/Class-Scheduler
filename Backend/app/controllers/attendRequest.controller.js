const db = require("../models");
const AttendRequest = db.attendRequests;

// Create and Save a new attendRequest
exports.create = (req, res) => {

  // Validate request
  if (req.body.vaccineStatus==="Not Vaccinated") {
    res.status(200).send({ 
      message: "Sorry! Only vaccinated students allowed." ,
      colour: "danger"
    });
    return;
  }

  // Create a AttendRequest
  const attendRequest = new AttendRequest({
    username: req.body.username,
    userid: req.body.userid,
    date: req.body.date,
    day: req.body.day,
    subject: req.body.subject,
    vaccineStatus: req.body.vaccineStatus
  });

  // Save AttendRequest in the database
  attendRequest
    .save(attendRequest)
    .then(data => {
      //console.log(data);
      res.send({
        ...data, 
        message: "Request Approved!",
        colour: "success"
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the AttendRequest."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  AttendRequest.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving AttendRequest."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  AttendRequest.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete AttendRequest with id=${id}. Maybe AttendRequest was not found!`
        });
      } else {
        res.send({
          message: "AttendRequest was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete AttendRequest with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  AttendRequest.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Tutorials were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};
