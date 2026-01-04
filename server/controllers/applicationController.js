import Application from '../model/Application.js';

export const createApplication = async(req,res) => {

    try {
        const {
        company,
        role,
        jobType,
        status,
        jobLink,
        notes
    } = req.body;

    if(!company || !role){
        return res.status(400).json({
            message: 'Company and Role are required'
        });
    }

    const application = await Application.create({
        user: req.user._id,
        company,
        role,
        jobType,
        status,
        jobLink,
        notes
    })

    return res.status(200).json(application);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error"
        });
    }
};

export const getApplication = async(req,res) => {
    try {
        const applications = await Application.find({
            user: req.user._id
       }).sort({ createdAt: -1});

       return res.status(200).json(applications);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error"
        });
    }
};