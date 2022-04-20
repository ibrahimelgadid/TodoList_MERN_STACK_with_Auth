const mongoose = require("mongoose");
const schema = mongoose.Schema;

const todoSchema = new schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },

    body: {
      type: String,
      required: true,
    },

    user: {
      type: schema.Types.ObjectId,
      ref: "Auth",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
