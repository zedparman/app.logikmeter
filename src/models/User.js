import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isModerator: { type: Boolean, default: false },
  isBanned: { type: Boolean, default: false },
  canCreate: { type: Boolean, default: true },
  questions: {
    type: [{ type: Object }],
    default: [],
    ref: "Question",
  },
  saveQuestions: {
    type: [{ type: Object }],
    default: [],
    ref: "Question",
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
