import React, { useState } from "react";
import axios from "axios";

export const Register = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if any field is empty
        if (username === '' || password === '' || rePassword === '') {
            setError("All fields are required");
            return;
        }

        // Check if password length is less than 10
        if (password.length < 10) {
            setError("Password must be at least 10 characters long");
            return;
        }
        // Check if passwords match
        if (password !== rePassword) {
            setError("Password doesn't match");
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost/hw-test/Controller/RestApi/Register/register.php',
                {
                    username,
                    password,
                    register: 'register', // Add a parameter to indicate register action
                }
            );

            console.log(response);

            if (response.data.message === 'Register successful') {
                console.log('Register successful');
                props.onRegister();
            } else {
                setError(response.data.error);
            }
        } catch (error) {
            console.error('Error sending registration request:', error);
            setError('An error occurred');
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Enter Username:
                        <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Enter Password:
                        <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="rePassword">Repeat Password:
                        <input type="password" name="rePassword" id="rePassword" value={rePassword} onChange={(e) => setRePassword(e.target.value)} />
                    </label>
                </div>
                <div className="form-btn">
                    <input type="submit" value="Register" name="register" />
                </div>
            </form>
            {error && <div className="error">{error}</div>}
            <button onClick={() => props.onFormSwitch('login')}>Already have an account? Login here</button>
        </>
    );

};

export default Register;