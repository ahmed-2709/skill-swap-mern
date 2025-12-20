const UserProfile = require("../models/userProfile");

// @desc    Create or update user profile
// @route   POST /api/profile
// @access  Private
exports.createOrUpdateProfile = async (req, res) => {
  try {
    const {  offeredSkills, desiredSkills, bio } = req.body;

    let profile = await UserProfile.findOne({ user: req.user });

    if (profile) {
      profile.offeredSkills = offeredSkills || profile.offeredSkills;
      profile.desiredSkills = desiredSkills || profile.desiredSkills;
      profile.bio = bio || profile.bio;
      await profile.save();
      return res.json(profile);
    }

    profile = new UserProfile({
      userId: req.user,
      offeredSkills,
      desiredSkills,
      bio
    });

    await profile.save();
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get logged-in user's profile
// @route   GET /api/profile/me
// @access  Private
exports.getMyProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ userId: req.user })
      .populate("userId", "name email");

    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

