import Application from "../model/Application.js";

export const createApplication = async (req, res) => {
  try {
    const { company, role, jobType, status, jobLink, notes } = req.body;

    if (!company || !role) {
      return res.status(400).json({
        message: "Company and Role are required",
      });
    }

    const application = await Application.create({
      user: req.user._id,
      company,
      role,
      jobType,
      status,
      jobLink,
      notes,
    });

    return res.status(200).json(application);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const getApplication = async (req, res) => {
  try {
    const applications = await Application.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json(applications);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const updateApplication = async (req, res) => {
  try {
    const application = await Application.findOne({ _id: req.params.id });

    if (!application) {
      return res.status(404).json({
        message: "Application not Found",
      });
    }

    if (application.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not Authorized",
      });
    }

    const updatedApplication = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      message: "Application is updated",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

export const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findOne({ _id: req.params.id});

    if (!application) {
      return res.status(404).json({
        message: "Application not Found",
      });
    }

    if (application.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not Authorized",
      });
    }

    await Application.deleteOne();

    return res.status(200).json({
      message: "Application is deleted",
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Server Error",
    });
  }
};
