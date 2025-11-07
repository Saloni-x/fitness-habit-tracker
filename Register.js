import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', formData);
            alert(res.data.msg);
            navigate('/login');
        } catch (err) {
            if (err.response && err.response.data && err.response.data.msg) {
                alert(err.response.data.msg);
            } else {
                alert('Something went wrong!');
            }
        }
    };
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input 
        type="text" 
        name="name" 
        placeholder="Name" 
         value={formData.name} 
           onChange={handleChange} 
                    required 
                /><br /><br />
                <input 
     type="email" 
       name="email" 
           placeholder="Email" 
           value={formData.email} 
         onChange={handleChange} 
                    required 
                /><br /><br />
                <input 
         type="password" 
         name="password" 
        placeholder="Password" 
        value={formData.password} 
         onChange={handleChange} 
         required 
                /><br /><br />
                <button type="submit">Register</button>
            </form>
            <p style={{ marginTop: '20px' }}>
                Already have an account?{" "}
                <button onClick={() => navigate('/login')}>
                    Login
                </button>
            </p>
        </div>
    );
};


export default Register;
