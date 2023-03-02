import React from 'react';
import Exercise from './Exercise';

function ExerciseList({ exercises, onDelete, onEdit }) {
    return (
        <table id="exercises">
            <caption>Delete or Edit Exercises</caption>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Weight/Dist.</th>
                    <th>Unit</th>
                    <th>Date</th>
                    <th>Delete</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map((exercise, i) =>
                    <Exercise
                        exercise={exercise}
                        key={i}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />)}
            </tbody>
        </table>
    );
}

export default ExerciseList;
