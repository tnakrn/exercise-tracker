// Import dependencies.
import mongoose from 'mongoose';
import 'dotenv/config';

// Connect based on the .env file parameters.
mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);
const db = mongoose.connection;

// Confirm that the database has connected and print a message in the console.
db.once("open", (err) => {
    if (err) {
        res.status(500).json({ error: '500:Connection to the server failed.' });
    } else {
        console.log('Successfully connected to MongoDB Exercises collection using Mongoose.');
    }
});

// SCHEMA: Define the collection's schema.
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true, minLength: 1 },
    reps: { type: Number, required: true, min: 1 },
    weight: { type: Number, required: true, min: 1 },
    unit: { type: String, required: true, enum: ["kgs", "lbs", "miles", "km"] },
    date: { type: Date, required: true }
});

// Compile the model from the schema.
const Exercise = mongoose.model("Exercise", exerciseSchema);


// CREATE model *****************************************
const createExercise = async (name, reps, weight, unit, date) => {
    const exercise = new Exercise({
        name: name,
        reps: reps,
        weight: weight,
        unit: unit,
        date: date
    });
    return exercise.save();
}


// RETRIEVE models *****************************************
// Retrieve all exercises.
const findExercises = async () => {
    const query = Exercise.find();
    return query.exec();
}

// Retrieve based on the ID and return a promise.
const findExerciseById = async (_id) => {
    const query = Exercise.findById(_id);
    return query.exec();
}


// REPLACE model *****************************************************
const replaceExercise = async (filter, update) => {
    await Exercise.updateOne(filter, update);
    return update;
};


// DELETE model based on ID  *****************************************
const deleteById = async (_id) => {
    const result = await Exercise.deleteOne({ _id: _id });
    return result.deletedCount;
};


// Export our variables for use in the controller file.
export { createExercise, findExercises, findExerciseById, replaceExercise, deleteById }