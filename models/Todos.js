const mongoose = require("mongoose");

const RouteSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  isDone: Boolean,
  date:  String,
  tab: String
});


module.exports = mongoose.model("Todos", RouteSchema);
