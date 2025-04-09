import mongoose from "mongoose";

const configSchema = new mongoose.Schema({
  canCreate: { type: Boolean, default: false },
  accountIsRequired: { type: Boolean, default: false },
  ch: { type: String, default: "chacuso" },
  enCategories: [{ type: Object }],
  faCategories: [{ type: Object }],
});

const Config = mongoose.models.Config || mongoose.model("Config", configSchema);

export default Config;
