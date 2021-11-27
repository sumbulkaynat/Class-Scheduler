module.exports = app => {
    const attendRequest = require("../controllers/attendRequest.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", attendRequest.create);
  
    // Retrieve all Tutorials
    router.get("/", attendRequest.findAll);
  
    // Retrieve all published Tutorials
    //router.get("/published", attendRequest.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", attendRequest.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", attendRequest.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", attendRequest.delete);
  
    // Create a new Tutorial
    router.delete("/", attendRequest.deleteAll);
  
    app.use("/api/attendRequests", router);
  };