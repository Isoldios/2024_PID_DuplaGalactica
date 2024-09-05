import '../App.css';
import React, { useState } from 'react';

export default function CreateClass() {
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');

    return (
    <div className='App'>
        <div className='Left-Bar'>
            <div className='Logo-Container'>
                <svg className='Container-Logo' viewBox="0 0 220 210">
                <defs>
                    <path id="circlePath" d="M 110,100 m -90,0 a 90,90 0 1,1 180,0 a 90,90 0 1,1 -180,0" />
                </defs>
                <circle cx="100" cy="100" r="90" fill="#14213D" />
                <image href="/LogoGymGenius.png" x="10" y="10" height="180" width="180" />
                <text>
                    <textPath href="#circlePath" className="Circle-Text">
                    GymGenius GymGenius GymGenius GymGenius GymGenius GymGenius GymGenius GymGenius
                    </textPath>
                </text>
                </svg>
            </div>
        </div>
        <div className='login-container'>
            <h2>Nueva contraseña</h2>
            <form >
                <div className="input-container">
                    <label htmlFor="password">Contraseña:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="password">Confirmar contraseña:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={passwordAgain} 
                        onChange={(e) => setPasswordAgain(e.target.value)} 
                    />
                </div>
                <button type="submit" className='button_create_account'>
                    Confirmar nueva contraseña
                </button>
            </form>
        </div>
    </div>
    );
}

