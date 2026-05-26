const Project = require("../models/Project");

// CREATE PROJECT
const createProject = async (req, res) => {

  try {

    const { title, description } = req.body;

    const project = await Project.create({
      title,
      description,
    });

    res.status(201).json(project);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// GET PROJECTS
const getProjects = async (req, res) => {

  try {

    const projects = await Project.find();

    res.status(200).json(projects);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// DELETE PROJECT
const deleteProject = async (
  req,
  res
) => {

  try {

    await Project.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Project deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  createProject,
  getProjects,
  deleteProject,
};