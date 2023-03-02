import React from 'react';
import { MdOutlineDelete, MdOutlineMode } from 'react-icons/md';

function Exercise({ exercise, onEdit, onDelete }) {
    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date.substring(0, 10)}</td>
            <td><MdOutlineDelete onClick={() => onDelete(exercise._id)} /></td>
            <td><MdOutlineMode onClick={() => onEdit(exercise)} /></td>
        </tr>
    );
}

export default Exercise;