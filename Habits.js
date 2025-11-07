import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const Habits = () => {
    const [habit, setHabit] = useState('');
    const [habits, setHabits] = useState([]);
    const token = localStorage.getItem('token');

    // ✅ useCallback lagao
    const fetchHabits = useCallback(async () => {
        const res = await axios.get('http://localhost:5000/api/habits', {
            headers: { Authorization: `Bearer ${token}` }
        });
        setHabits(res.data);
    }, [token]);

    useEffect(() => {
        fetchHabits();
    }, [fetchHabits]);

    const addHabit = async () => {
        if (habit === '') return;

        await axios.post('http://localhost:5000/api/habits', { name: habit }, {
            headers: { Authorization: `Bearer ${token}` }
        });

        setHabit('');
        fetchHabits();
    };

    const deleteHabit = async (id) => {
        await axios.delete(`http://localhost:5000/api/habits/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        fetchHabits();
    };

    return (
        <div>
            <h2>Your Habits</h2>
            <input 
                type="text" 
                value={habit} 
                onChange={(e) => setHabit(e.target.value)} 
                placeholder="Enter new habit" 
            />
            <button onClick={addHabit}>Add Habit</button>

            <ul>
                {habits.map(h => (
                    <li key={h._id}>
                        {h.name}
                        <button onClick={() => deleteHabit(h._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Habits;