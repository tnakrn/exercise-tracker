import React from 'react';
import { useHistory } from "react-router-dom";
import { useState } from 'react';

export const EditExercisePage = ({ exercise }) => {

    const [name, setName] = useState(exercise.name);
    const [reps, setReps] = useState(exercise.reps);
    const [weight, setWeight] = useState(exercise.weight);
    const [unit, setUnit] = useState(exercise.unit);
    // const [date, setDate] = useState(exercise.date);
    const [date, setDate] = useState(exercise.date.substring(0, 10));


    const history = useHistory();

    const editExercise = async () => {
        const response = await fetch(`/exercises/${exercise._id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name: name,
                reps: reps,
                weight: weight,
                unit: unit,
                date: date
            }),
            headers: { 'Content-Type': 'application/json', },
        });

        if (response.status === 200) {
            alert("Successfully edited document!");
        } else {
            const errMessage = await response.json();
            alert(`Failed to update document. Status ${response.status}. ${errMessage.Error}`);
        }
        history.push("/");
    }

    return (
        <>
            <article>
                <h2>Edit an Exercise</h2>
                <p>Make changes to an existing log entry.</p>
                <form onSubmit={(e) => { e.preventDefault(); }}>
                    <fieldset>
                        <legend>Make edits below:</legend>
                        <label for="name">Exercise Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            id="name"
                            required />

                        <label for="reps">Reps</label>
                        <input
                            type="number"
                            value={reps}
                            onChange={e => setReps(e.target.value)}
                            id="reps"
                            min="1"
                            required />

                        <label for="weight">Weight</label>
                        <input
                            type="number"
                            value={weight}
                            onChange={e => setWeight(e.target.value)}
                            id="weight"
                            min="1"
                            required />

                        <label for="unit">Unit</label>
                        <select value={unit} id="unit" onChange={e => setUnit(e.target.value)}>
                            <option selected value="lbs">lbs</option>
                            <option value="kgs">kg</option>
                            <option selected value="miles">miles</option>
                            <option selected value="km">km</option>
                        </select>

                        <label for="date">Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            id="date"
                            required />


                        <label for="submit">
                            <button
                                onClick={editExercise}
                                id="submit">Save
                            </button>
                        </label>
                    </fieldset>
                </form>
            </article>
        </>
    );
}
export default EditExercisePage;