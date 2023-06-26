import React, { useState } from 'react';
import '../Game.css';

const ClosetGame = () => {
  const [characters, setCharacters] = useState([
    { id: 'biden', name: 'Loser: Joe Biden', show: false },
    { id: 'pelosi', name: 'Loser: Nancy Pelosi', show: false },
    { id: 'clinton', name: 'Loser: Bill Clinton', show: false },
    { id: 'trump', name: 'Winner: Donald Trump', show: false }
  ]);

  const handleDoorClick = (closetId) => {
    const updatedCharacters = characters.map((character) =>
      character.id === closetId ? { ...character, show: true } : { ...character, show: false }
    );
    setCharacters(updatedCharacters);
  };

  return (
    <div className="container">
      {characters.map((character) => (
        <div className="closet" key={character.id}>
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
