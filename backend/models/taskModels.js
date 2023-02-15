const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "please add name"]
    },
    completed: {
        type: Boolean,
        required: true,
        default: false,
    },
},

{
    timestamps:true
}
)

const Todo = mongoose.model("Todo",todoSchema);

module.exports = Todo;