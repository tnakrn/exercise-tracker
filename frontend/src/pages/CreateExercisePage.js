import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const CreateExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('lbs');
    const [date, setDate] = useState('');

    const history = useHistory();

    const createExercise = async () => {
        const newExercise = { name, reps, weight, unit, date };
        const response = await fetch('/exercises', {
            method: 'post',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            alert("Successfully added the exercise!");
        } else {
            alert(`Failed to add exercise, status code = ${response.status}`);
        }
        history.push("/");
    };


    return (
        <>
            <article>
                <h2>Add a New Exercise</h2>
                <p>Fill out the form below to add a new exercise to your log.</p>
                <form onSubmit={(e) => { e.preventDefault(); }}>
                    <fieldset>
                        <legend>Add a new exercise below:</legend>
                        <label for="name">Exercise Name</label>
                        <input
                            type="text"
                            placeholder="Name of Exercise"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            id="name"
                            required />

                        <label for="reps">Reps</label>
                        <input
                            type="number"
                            value={reps}
                            placeholder="Number of Reps"
                            onChange={e => setReps(e.target.value)}
                            id="reps"
                            min="1"
                            required />

                        <label for="weight">Weight</label>
                        <input
                            type="number"
                            placeholder="Weight of Equipment / Distance"
                            value={weight}
                            onChange={e => setWeight(e.target.value)}
                            id="weight"
                            min="1"
                            required />

                        <label for="unit">Unit</label>
                        <select value={unit} id="unit" onChange={e => setUnit(e.target.value)}>
                            <option value="lbs">lbs</option>
                            <option value="kgs">kgs</option>
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
                                type="submit"
                                onClick={createExercise}
                                id="submit">Add
                            </button>
                        </label>
                    </fieldset>
                </form>
            </article>
        </>
    );
}

export default CreateExercisePage;