import React, { useState, useEffect } from 'react';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [classResponsive, setClassResponsive] = useState('none');

  useEffect(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= lastDate; i++) {
      days.push(i);
    }
    setDaysInMonth(days);
  }, [currentMonth]);

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const monthName = currentMonth.toLocaleString('default', { month: 'long' });
  const year = currentMonth.getFullYear();

  return (
    <div className="Calendar-Container">
      <div className="Calendar-Header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <span>{monthName} {year}</span>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="Calendar-Grid">
        <div className="Calendar-Grid-Header">Sun</div>
        <div className="Calendar-Grid-Header">Mon</div>
        <div className="Calendar-Grid-Header">Tue</div>
        <div className="Calendar-Grid-Header">Wed</div>
        <div className="Calendar-Grid-Header">Thu</div>
        <div className="Calendar-Grid-Header">Fri</div>
        <div className="Calendar-Grid-Header">Sat</div>
        {daysInMonth.map((day, index) => (
          <div key={index} onClick={() => setClassResponsive('block')}
            className={`Calendar-Day ${day ? 'filled' : ''}`}>
            {day}
          </div>
        ))}
      </div>
      <div className='classes_responsive' onClick={() => setClassResponsive('none')} style={{ display: classResponsive }}> perro</div>
    </div>
  );
};

export default function Main_Page() {
  const [classes, setClasses] = useState([]);
  const [user, setUser] = useState();
  const [showUsers, setShowUsers] = useState(false); 

  const fetchClasses = async () => {
    try {
      const response = await fetch('http://localhost:5000/classes');
      if (response.ok) {
        const data = await response.json();
        setClasses(data);
      } else {
        console.error("Error en la respuesta de la API:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await fetch('http://localhost:5000/login?Password=123456789&Mail=chichanello@gmail.com');
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        console.error("Error en la respuesta de la API:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleToggleData = () => {
    if (showUsers) {
      fetchClasses(); 
    } else {
      fetchUser();
    }
    setShowUsers(!showUsers); 
  };

  useEffect(() => {
    fetchClasses(); 
  }, []);

  return (
    <div className="App">
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
      <div className="WebApp-Body">
        <div className="Content-Container">
          {showUsers && user ? (
            <div className="Table-Container">
              <table className="Table-Classes">
                <thead className="Table-Classes-Header">
                  <tr>
                    <th>Username</th>
                    <th>Name</th>
                    <th>Lastname</th>
                    <th>Birthday</th>
                    <th>Gym</th>
                  </tr>
                </thead>
                <tbody className="Table-Classes-Rows">
                  <tr>
                    <td>{user.Username}</td>
                    <td>{user.Name}</td>
                    <td>{user.Lastname}</td>
                    <td>{user.Birthday}</td>
                    <td>{user.Gym}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="Table-Container">
              {classes.length > 0 ? (
                <table className="Table-Classes">
                  <thead className="Table-Classes-Header">
                    <tr>
                      <th>Nombre</th>
                      <th>Hora</th>
                      <th>Fecha</th>
                    </tr>
                  </thead>
                  <tbody className="Table-Classes-Rows">
                    {classes.map((clase, index) => (
                      <tr key={index}>
                        <td>{clase.Name}</td>
                        <td>{clase.Hour}</td>
                        <td>{clase.Date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No hay clases disponibles aún.</p>
              )}
            </div>
          )}
          <Calendar />
        </div>
        <div className="Content-Container-Parte-Inferior">
          <img src="/Spining.jpg" className="Image-MainMenu-Slider" />
          <div className="Text-MainMenu-Slider">aaa</div>
          <img src="/yoga.png" className="Image-MainMenu-Slider"/>
          <div className="Text-MainMenu-Slider">Texto a gusto numero 2</div>
          <img src="/Boxeo.jpeg" className="Image-MainMenu-Slider" />
          <div className="Text-MainMenu-Slider">Texto a gusto numero 3</div>
        </div>
      </div>
      <button className='button-fetch-data' onClick={handleToggleData}>
        {showUsers ? 'Mostrar Clases' : 'Mostrar Usuarios'}
      </button>
    </div>
  );
}
