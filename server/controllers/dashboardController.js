const UserProfile = require("../models/userProfile");


exports.dashboardData = async (req, res) => {
try {
        const myProfile = await UserProfile.findOne({ userId: req.user });
        if(!myProfile)
        {
           return res.status(204).json({message: "Profile not found!"});
        }

        const suggestedUsers = await UserProfile.find({
            userId: { $ne: req.user},
            offeredSkills: { $in: myProfile.desiredSkills },
        });

        const recentActivity = [
      { type: "profile", message: "Profile updated", date: new Date() },
      { type: "system", message: "Welcome to SkillSwap!", date: new Date() },
    ];

    res.json({
      stats: {
        offeredCount: myProfile.offeredSkills.length,
        desiredCount: myProfile.desiredSkills.length,
        requestCount: 0, // later replace with real request data
      },
      suggestedUsers,
      recentActivity,
    });
} catch (error) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
}
};
