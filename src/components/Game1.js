import React, { useEffect, useRef } from 'react';
import '../Game.css';
import { json } from 'react-router-dom';
import FairnessButton from './Fairness';

const Game = ({ betAmount }) => {    

    const canvasRef = useRef(null);
    const imgRef = useRef(null);

    useEffect(() => {
        var globalRocketPosition = 0.0;
        
        // Connect to the WebSocket server
        const ws = new WebSocket('ws://localhost:8080');
        
        // WebSocket connection opened
        ws.onopen = function open() {
            console.log('Connected to server');
        };
        
        // WebSocket message received
        ws.onmessage = function incoming(event) {
            
            const gameUpdate = JSON.parse(event.data);
            
            console.log(gameUpdate);

            document.getElementById('currentMultiplier').innerText = gameUpdate.rocketPosition.toFixed(2).toString() + 'x';
            // console.log(typeof(gameUpdate.rocketPosition));
            
            // Display game state and data
            // document.getElementById('gameState').textContent = 'Game State: ' + gameUpdate.gameState;
            // document.getElementById('rocketPosition').textContent = 'Rocket Position: ' + JSON.stringify(gameUpdate.rocketPosition);
            // globalRocketPosition = JSON.stringify(gameUpdate.rocketPosition);
            
            // document.getElementById('crashedPosition').textContent = 'Crashed Position: ' + JSON.stringify(gameUpdate.crashedPosition);
            // document.getElementById('waitingTime').textContent = 'Waiting Time: ' + gameUpdate.remainingTime;
        };
        
        // WebSocket connection closed
        ws.onclose = function close() {
            console.log('Disconnected from server');
        };
    }, []);
    

    
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        
        return () => {
            
        };
    }, []);
    
    return (
        <div>
        <div id="gameContainer">
        <canvas id="game" ref={canvasRef} height="400" width="700"></canvas>
        <img src ="/public/img/kim-jong-high.png" ref = { imgRef } style={{display: 'none'}} />
        <p id="currentMultiplier">0.0x</p>
        </div>
        
        <div id="infoContainer">
        <div style={{ display: 'flex' }}>
        <p id="balance">?</p>
        <p id="crashedAt">Multiplier at crash:</p>
        <FairnessButton />
        </div>
        </div>
        </div>
        );
    };
    
    export default Game;
    