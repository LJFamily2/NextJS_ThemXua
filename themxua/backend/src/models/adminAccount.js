const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Admin", "Nhân viên"],
  },
  status: {
    type: String,
    enum: ["Đã duyệt", "Chưa duyệt"],
    default: "Chưa duyệt",
  },
  verified: Boolean,
  verificationToken: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const adminAccount = mongoose.model("Accounts", accountSchema);

module.exports = adminAccount;
