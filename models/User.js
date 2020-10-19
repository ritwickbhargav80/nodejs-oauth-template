const mongoose = require("mongoose");
const { toTitleCase } = require("../utility/helpers");

const UserSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      default: "guest",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  this.displayName = String(this.displayName).trim();
  next();
});

module.exports = User = mongoose.model("User", UserSchema);
