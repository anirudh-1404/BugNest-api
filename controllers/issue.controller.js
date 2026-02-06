import { Issue } from "../modals/issue.schema.js";

export const createIssue = async (req, res, next) => {
  try {
    const { title, description, priority } = req.body;

    if (!title || !description || !priority) {
      return res.status(400).json({
        message: "Title, description and priority are required",
      });
    }

    const issue = await Issue.create({
      title,
      description,
      priority,
      status: "open",
      createdBy: req.user.id,
    });

    await issue.populate("createdBy", "name email");
    return res.status(201).json({
      message: "Issue created successfully",
      id: issue._id,
      data: issue,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const getMyIssues = async (req, res, next) => {
  try {
    const myIssues = await Issue.find({ createdBy: req.user._id });

    if (!myIssues) {
      return res.status(404).json({
        message: "No issues found!",
      });
    }

    return res.status(200).json({
      message: "Issues fetched successfully!",
      data: myIssues,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const getAllIssues = async (req, res, next) => {
  try {
    const allIssues = await Issue.find();

    if (!allIssues) {
      return res.status(404).json({
        message: "Issues not found!",
      });
    }

    return res.status(200).json({
      message: "All Issues fetched",
      data: allIssues,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const getSingleIssue = async (req, res, next) => {
  try {
    const { id } = req.params;

    const issue = await Issue.findById(id);

    if (!issue) {
      return res.status(404).json({
        message: "Issue not found!",
      });
    }
    return res.status(200).json({
      message: "Issue fetched successfully!",
      data: issue,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
