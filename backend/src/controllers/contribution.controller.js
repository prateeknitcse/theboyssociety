import Contribution from "../models/Contribution.js";
import Birthday from "../models/Birthday.js";
import Certificate from "../models/Certificate.js"; // ✅ ADDED

/**
 * GET contribution status for a birthday
 */
export const getContributions = async (req, res) => {
  try {
    const { birthdayId } = req.params;

    const contributions = await Contribution.find({
      birthday: birthdayId,
    }).populate("user", "name");

    res.status(200).json(contributions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * POST mark contribution as paid
 * Rules:
 * - Birthday boy cannot pay
 * - One payment per user
 */
export const payContribution = async (req, res) => {
  try {
    const { birthdayId, amount } = req.body;
    const userId = req.user.id;

    const birthday = await Birthday.findById(birthdayId);

    if (!birthday) {
      return res.status(404).json({ message: "Birthday not found" });
    }

    // Birthday boy cannot pay
    if (birthday.user.toString() === userId) {
      return res
        .status(403)
        .json({ message: "Birthday boy cannot contribute" });
    }

    const existing = await Contribution.findOne({
      birthday: birthdayId,
      user: userId,
    });

    if (existing && existing.status === "paid") {
      return res.status(400).json({ message: "Already paid" });
    }

    let contribution;

    if (existing) {
      existing.status = "paid";
      existing.amount = amount;
      existing.paidAt = new Date();
      contribution = await existing.save();
    } else {
      contribution = await Contribution.create({
        birthday: birthdayId,
        user: userId,
        amount,
        status: "paid",
        paidAt: new Date(),
      });
    }

    // ✅ STEP 3.2 — SAVE CERTIFICATE AFTER PAYMENT
    await Certificate.create({
      user: userId,
      amount,
      purpose: "Birthday Contribution",
    });

    res.status(200).json({
      message: "Payment successful",
      contribution,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
