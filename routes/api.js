const express = require("express")
const router = express.Router()
const Workout = require("../models/workout.js")

function getAllWorkouts(req, res) {
    Workout.find()
        .then(workouts => {
            res.json(workouts)
        })
        .catch(err => {
            res.json(err)
        })
}

function createWorkout(req, res){
    Workout.create({})
    .then(workouts => {
        res.json(workouts)
    })
    .catch(err => {
        res.json(err)
    })
}

// router.get("/api/workouts", getAllWorkouts)
// router.post("/api/workouts", createWorkout)

//Alternative way of calling api routes
router.route ("/api/workouts").get(getAllWorkouts).post(createWorkout)

router.get("/api/workouts/range", (req, res) => {
    // aggregating code https://masteringjs.io/tutorials/mongoose/aggregate
    Workout.aggregate([
        {
            // aggregating the fields based off of total duration which is equal to the sum of the exercise duration
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" }
            }
        }
    ])
        // sorting the workout results by id and then only returning 7 results (7 days)
        .sort({ _id: 1 })
        .limit(7)
        .then(results => {
            res.json(results)
        })
        .catch(err => {
            res.json(err)
        })
})
router.put("/api/workouts/:id", ({ body, params }, res) => {
    //finding by id and updating https://kb.objectrocket.com/mongo-db/how-to-use-mongoose-to-find-by-id-and-update-with-an-example-1209
    Workout.findByIdAndUpdate(params.id ,{ exercises: body}, function(err, result){
        if(err){
            res.send(err)
        }
        else{
            res.send(result)
        }
    })
})
module.exports = router