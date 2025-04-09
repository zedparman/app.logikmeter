const mongoose = require("mongoose");

const versionSchema = new mongoose.Schema({
  locale: { type: String, required: true },
  title: { type: String, required: true },
  voteCount: { type: Number, default: 0 },
  caption: { type: String },
  endDate: { type: Date },
  options: [{ type: Object }],
  categories: [{ type: String }],
  aboutQuestion: { type: String },
  questionSummary: { type: String },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  dateModified: { type: Date, default: Date.now },
});

const questionSchema = new mongoose.Schema({
  questionId: { type: String, required: true },
  author: { type: String, required: true },
  locale: { type: String, required: true },
  title: { type: String, required: true },
  voteCount: { type: Number, default: 0 },
  caption: { type: String },
  endDate: { type: Date },
  options: [{ type: Object }],
  categories: [{ type: String }],
  aboutQuestion: { type: String },
  questionSummary: { type: String },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  versions: [versionSchema],
});

const Question =
  mongoose.models.Question || mongoose.model("Question", questionSchema);

module.exports = Question;
