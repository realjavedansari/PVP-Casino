import React, { useState, useEffect } from 'react';
import '../Game.css';

const ClosetGame = () => {
    const [characters, setCharacters] = useState([
      { id: 'biden', name: 'Loser: Joe Biden', show: false },
      { id: 'pelosi', name: 'Loser: Nancy Pelosi', show: false },
      { id: 'clinton', name: 'Loser: Bill Clinton', show: false },
      { id: 'trump', name: 'Winner: Donald Trump', show: false }
    ]);
  
    const handleDoorClick = (closetId) => {
      const updatedCharacters = characters.map((character) => {
        if (character.id === closetId) {
          return { ...character, show: true };
        } else {
          return { ...character, show: false };
        }
      });
      setCharacters(updatedCharacters);
    };
  
    return (
      <div className="container">
        {characters.map((character, index) => (
          <div className="closet" key={`closet${index + 1}`}>
            <div
              className={`door ${character.show ? 'door-open' : ''}`}
              onClick={() => handleDoorClick(character.id)}
            ></div>
            <div className={`character ${character.show ? 'slideIn' : ''}`}>
              {character.show && character.name}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default ClosetGame;
  
