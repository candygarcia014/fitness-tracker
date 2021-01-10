const mongoose = require("mongoose")

const Schema = mongoose.Schema; 

const fitnessSchema = new Schema(
    {
    day: {
        type: Date,
        defaul: () => new Date()
    },
    exercises:[
        {
            type: {
                type: String,
                trim: true,
                required: "Enter an exrecise type"
            },
            name: {
                type: String,
                trim: true,
                required: "Enter an exrecise name" 
            },
            weight: {
                type: Number,
                },
            sets: {
                type: Number,
                },
            reps: {
                type: Number,
                },
            duration: {
                type: Number,
                required: "Enter an exrecise duration" 
                },
            distance: {
                type: Number,
                }
            }
    ]
},

//??? What is this? 
{
    toJSON:{
        virtuals: true
    }
});

const workout = mongoose.model("workout", fitnessSchema);

module.exports = workout;


