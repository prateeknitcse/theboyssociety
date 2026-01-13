import Birthday from "../models/Birthday.js";
import Contribution from "../models/Contribution.js";

export const getTodayBirthday = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const birthday = await Birthday.findOne({
      date: today,
      active: true,
    }).populate("user", "name");

    // No birthday today
    if (!birthday) {
      return res.json({
        hasBirthday: false,
        message: "No birthday contribution for you today 🎈",
      });
    }

    // If logged-in user is birthday boy
    if (birthday.user._id.toString() === req.user.id) {
      return res.json({
        hasBirthday: false,
        message: "It's your birthday 🎉 Enjoy!",
      });
    }

    // Fetch all contributions
    const contributions = await Contribution.find({
      birthday: birthday._id,
    }).populate("user", "name");

    // Find logged-in user's contribution
    const myContribution = contributions.find(
      (c) => c.user._id.toString() === req.user.id
    );

    res.json({
      hasBirthday: true,
      birthday: {
        name: birthday.user.name,
        amount: birthday.contributionAmount,
        date: birthday.date,
      },
      myStatus: myContribution?.status || "pending",
      contributions: contributions.map((c) => ({
        user: c.user.name,
        status: c.status,
        paidAt: c.paidAt || null,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
