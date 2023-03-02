import 'dotenv/config';
import express from 'express';
import * as exercises from './exercises-model.mjs';

const PORT = process.env.PORT;
const app = express();
app.use(express.json());


// CREATE controller ******************************************
app.post('/exercises', (req, res) => {
    exercises.createExercise(
        req.body.name,
        req.body.reps,
        req.body.weight,
        req.body.unit,
        req.body.date
    )
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: 'Invalid request' });
        });
});


// RETRIEVE controller ****************************************************
// GET all exercises.
app.get('/exercises', (req, res) => {
    exercises.findExercises()
        .then(exercises => {
            res.json(exercises);
        })
        .catch(error => {
            console.error(error);
            res.status(404).json({ Error: 'Request to retrieve documents failed' });
        });
});


// GET exercises by ID
app.get('/exercises/:_id', (req, res) => {
    const exerciseID = req.params._id;
    exercises.findExerciseById(exerciseID)
        .then(exercise => {
            if (exercise !== null) {
                res.json(exercise);
            } else {
                res.status(404).json({ Error: 'Document not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Request to retrieve a document failed' });
        });
});


// UPDATE controller ************************************
app.put('/exercises/:_id', (req, res) => {
    exercises.findExerciseById(req.params._id)
        .then(exercise => {
            // 404 error if id does not exist.
            if (exercise === null) {
                res.status(404).json({ Error: 'Document not found' });
            }
            // 400 error if missing parameters.
            else if (Object.keys(req.body).length !== 5) {
                res.status(400).json({ Error: 'Request to update a document failed' });
            }
            // Otherwise if the id exists and all parameters are filled, check that each parameter is valid.
            else {
                const update = {}
                update._id = req.params._id
                if (req.body.name !== undefined && req.body.name.length > 0) {
                    update.name = req.body.name
                    // console.log(update);
                }
                if (req.body.reps !== undefined && req.body.reps > 0) {
                    update.reps = req.body.reps
                    // console.log(update);
                }
                if (req.body.weight !== undefined && req.body.weight > 0) {
                    update.weight = req.body.weight
                    // console.log(update);
                }
                if (req.body.unit !== undefined) {
                    update.unit = req.body.unit
                    // console.log(update);
                }
                if (req.body.date !== undefined && req.body.date.length > 0) {
                    update.date = req.body.date
                    // console.log(update);
                }
                // 400 error if not all parameters were valid.
                if (Object.keys(update).length !== 6) {
                    res.status(400).json({ Error: 'Request to update a document failed' });
                }
                else {
                    exercises.replaceExercise({ _id: req.params._id }, update)
                        .then(exercise => {
                            res.json(exercise);
                        })
                        .catch(error => {
                            console.error(error);
                            res.status(400).json({ Error: 'Request to update a document failed' });
                        });
                }
            }
        });
});


// DELETE Controller ******************************
app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Document not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Request to delete a document failed' });
        });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});