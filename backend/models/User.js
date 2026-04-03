const mongoose = require("mongoose");

// Each user has a name, a unique email, and a hashed password
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,   // No two users can share the same email
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true, // Stored as a bcrypt hash, never plain text
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
