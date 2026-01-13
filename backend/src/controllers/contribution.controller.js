import Contribution from "../models/Contribution.js";
import Birthday from "../models/Birthday.js";

export const payContribution = async (req, res) => {
  const { birthdayId, amount } = req.body;
  const userId = req.user.id;

  const birthday = await Birthday.findById(birthdayId);

  if (birthday.user.toString() === userId) {
    return res.status(403).json({ message: "Birthday boy cannot pay" });
  }

  const existing = await Contribution.findOne({
    birthday: birthdayId,
    user: userId,
  });

  if (existing && existing.status === "paid") {
    return res.status(400).json({ message: "Already paid" });
  }

  if (existing) {
    existing.status = "paid";
    existing.amount = amount;
    existing.paidAt = new Date();
    await existing.save();
  } else {
    await Contribution.create({
      birthday: birthdayId,
      user: userId,
      amount,
      status: "paid",
      paidAt: new Date(),
    });
  }

  res.json({ message: "Payment successful" });
};
