import PDFDocument from "pdfkit";

/**
 * Generate Contribution Certificate PDF
 */
import User from "../models/User.js";
import Certificate from "../models/Certificate.js";

export const getMyCertificates = async (req, res) => {
  const certificates = await Certificate.find({
    user: req.user.id,
  }).sort({ createdAt: -1 });

  res.json(certificates);
};


export const generateCertificate = async (req, res) => {
  try {
    const { amount, purpose } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const doc = new PDFDocument({ size: "A4", margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=certificate-${Date.now()}.pdf`
    );

    doc.pipe(res);

    doc.fontSize(24).text("Boys Society", { align: "center" });
    doc.moveDown();
    doc.fontSize(18).text("Contribution Certificate", { align: "center" });

    doc.moveDown(2);
    doc.fontSize(14).text("This certifies that", { align: "center" });
    doc.moveDown();

    doc.fontSize(20).text(user.name, {
      align: "center",
      underline: true,
    });

    doc.moveDown();
    doc
      .fontSize(14)
      .text(`has contributed ₹${amount}`, { align: "center" });

    doc.moveDown();
    doc
      .fontSize(14)
      .text(`For: ${purpose}`, { align: "center" });

    doc.moveDown(2);
    doc
      .fontSize(12)
      .text(`Date: ${new Date().toLocaleDateString()}`, {
        align: "center",
      });

    doc.moveDown(3);
    doc.fontSize(12).text("Authorized by Boys Society", {
      align: "center",
    });

    doc.end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
