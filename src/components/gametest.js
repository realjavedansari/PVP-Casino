import React, { useEffect, useRef } from 'react';
import '../Game.css';
const Game = () => {
    const canvasRef = useRef(null);
    const imgRef = useRef(null);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = imgRef.current;
        
        let speed = 0.01;
        let curvePoints = [];
        let gameLoop;
        let success;
        let balance = 100000;
        let crashed;
        let betAmount;
        let profitsTaken;
        let frameCount = 0;
        let copy_CurrentMultiplier;
        let rocketPosition = { x: 1, y: 1 };
        
        let colorIndex = 0;
        const rainbowColors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8B00FF'];
        let rainbowframesInterval = 3000;
        const balanceDisplay = document.getElementById('balance');
        balanceDisplay.innerText = balance + '$';
        
        const betAmountInput = document.getElementById('betAmount');
        
        const xLabelSpacing = 100;
        let xOffset = 0;
        let labelCounter = 2;
        
        const yLabelSpacing = 50;
        let yLabelMultiplier = 1;
        
        
        function updateCurve() {
            // console.log("updateCurve");
            frameCount++;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            
            ctx.strokeStyle = "white";
            ctx.beginPath();
            
            
            ctx.moveTo(0, canvas.height);
            ctx.lineTo(canvas.width, canvas.height);
            ctx.stroke();
            
            ctx.moveTo(0, 0);
            ctx.lineTo(0, canvas.height);
            ctx.stroke();
            
            ctx.fillStyle = 'white';
            ctx.font = '12px Arial';
            for (let i = xLabelSpacing - xOffset; i <= canvas.width; i += xLabelSpacing) {
                const label = labelCounter - Math.floor((canvas.width - i) / xLabelSpacing) + 6;
                ctx.fillText(`${label}s`, i, canvas.height - 5);
            }
            
            xOffset = (xOffset + 0.5) % xLabelSpacing;
            if (xOffset === 0) {
                labelCounter++;
            }
            
            ctx.fillStyle = 'white';
            ctx.font = '12px Arial';
            
            let max_y_multiplier_label = Math.floor(copy_CurrentMultiplier);
            const no_of_rows = 8;
            for (let i = 1; i < max_y_multiplier_label + no_of_rows; i++) {
                if (max_y_multiplier_label < 7) {
                    ctx.fillText(i + 'x', 10, canvas.height - i * yLabelSpacing);
                } else {
                    ctx.fillText(max_y_multiplier_label - no_of_rows + i + 1 + 'x', 10, canvas.height - i * yLabelSpacing);
                }
            }
            
            //   for (let i = 0; i < curvePoints.length; i++) {
            //     const { x, y } = curvePoints[i];
            //     ctx.lineTo(x, y);
            //   }
            
            const curveOffset = 3; // Adjust this value to set the offset between curves
            const numberOfCurves = rainbowColors.length - 1;
            
            for (let j = 0; j < numberOfCurves; j++) {
                ctx.beginPath();
                ctx.lineWidth = 4;
                ctx.strokeStyle = rainbowColors[(colorIndex + j) % rainbowColors.length]; // Use different colors for each curve
                for (let i = 0; i < curvePoints.length; i++) {
                    const { x, y } = curvePoints[i];
                    ctx.lineTo(x, y + (j * curveOffset)); // Offset the y-coordinate for each curve
                }
                ctx.stroke();
            }
            
            //reset ctx values
            ctx.lineWidth = 2;
            ctx.strokeStyle = "red";
            
            // Check if it's time to change the stroke style
            if (frameCount % rainbowframesInterval === 0) {
                // Increment the color index or reset to 0 if reached the end of the rainbow colors array
                colorIndex = (colorIndex + 1) % rainbowColors.length;
            }
            
            if (!crashed) {
                const lastPoint = curvePoints[curvePoints.length - 1];
                
                if (curvePoints.length >= 2) {
                    const secondLastPoint = curvePoints[curvePoints.length - 2];
                    const deltaX = lastPoint.x - secondLastPoint.x;
                    const deltaY = lastPoint.y - secondLastPoint.y;
                    const angle = Math.atan2(deltaY, deltaX) + Math.PI / 4;
                    
                    ctx.save();
                    ctx.translate(lastPoint.x, lastPoint.y);
                    ctx.rotate(angle);
                    
                    ctx.font = '60px Arial';
                    //   ctx.fillText('🚀', 0, -10);
                    ctx.drawImage(img, -50, -60, 105, 110);
                    
                    rocketPosition = { x: lastPoint.x, y: lastPoint.y };
                    
                    ctx.restore();
                } else {
                    ctx.font = '60px Arial';
                    rocketPosition = { x: lastPoint.x, y: lastPoint.y };
                }
            } else {
                if (rocketPosition && curvePoints[curvePoints.length - 2]) {
                    const crashPosition = { x: rocketPosition.x, y: rocketPosition.y - 10 };
                    const crashAngle = Math.atan2(
                        rocketPosition.y - curvePoints[curvePoints.length - 2].y,
                        rocketPosition.x - curvePoints[curvePoints.length - 2].x
                        ) + Math.PI / 4;
                        // const crashAngle = Math.atan2(100, 100) + Math.PI / 4;
                        
                        ctx.save();
                        ctx.translate(crashPosition.x, crashPosition.y);
                        ctx.rotate(crashAngle);
                        
                        ctx.font = '50px Arial';
                        ctx.fillText('💥', 0, 0);
                        
                        labelCounter = 2;
                        
                        ctx.restore();
                        
                        setTimeout(start_game, 5000);
                    }
                    
                }
            }
            
            
            function start_game() {
                if (balance > betAmountInput.value) {
                    balance = balance - betAmountInput.value;
                    balanceDisplay.innerText = balance + '$';
                    
                    crashed = false;
                    profitsTaken = false;
                    startGame();
                    
                    gameLoop = setInterval(() => {
                        updateCurvePoints();
                        
                        updateCurve();
                    }, 16);
                    
                    betAmount = betAmountInput.value;
                    
                    setTimeout(function () {
                        crashCurve(betAmountInput.value);
                        
                        // Enable the button after the crash
                        document.getElementById('submitBet').disabled = false;
                    }, getRandomCrashTime(5, 10));
                    //change this for crash time testing
                }
            }
            
            function updateCurvePoints() {
                const lastPoint = curvePoints[curvePoints.length - 1];
                const newX = lastPoint.x + 1;
                const newY = canvas.height - Math.pow(newX, 1.65) / 100;
                
                document.getElementById('currentMultiplier').innerText = curvePoints.length / 100 + 'x';
                // ctx.font = "50px serif";
                
                // ctx.fillText(curvePoints.length / 100 + 'x', 30, 200);
                copy_CurrentMultiplier = curvePoints.length / 100;
                curvePoints.push({ x: newX, y: newY });
                

            }
            
            function startGame() {
                curvePoints = [{ x: 0, y: canvas.height }];
                rocketPosition = { x: 0, y: canvas.height };
                updateCurve();
                //   console.log("stared gamed");
            }
            
            function getRandomCrashTime(min, max) {
                min *= 1000;
                max *= 1000;
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
            
            function crashCurve(betAmount) {
                clearInterval(gameLoop);
                
                const crashValue = curvePoints.length / 100;
                document.getElementById('crashedAt').innerText = `Multiplier at crash: ${crashValue}`;
                crashed = true;
                
                //   const crash = document.createElement('p');
                //   crash.innerText = crashValue;
                //   crash.style = 'padding: 0; margin: 0;';
                //   crash.style.color = profitsTaken ? 'lime' : 'red';
                
                //   document.getElementById('lastCrashes').appendChild(crash);
                
                updateCurve();
            }
            
            start_game();
            
            return () => {
                clearInterval(gameLoop);
                //   clearTimeout(timer);
            };
        }, []);
        
        return (
            <div>
            <div id="gameContainer">
            <canvas id="game" ref={canvasRef} height="400" width="700"></canvas>
            <img src ="../img/kim-jong-high.png" ref = { imgRef } style={{display: 'none'}} />
            <p id="currentMultiplier">0.0x</p>
            </div>
            
            <div id="infoContainer">
            <div style={{ display: 'flex' }}>
            <p id="balance">?</p>
            <p id="crashedAt">Multiplier at crash:</p>
            </div>
            </div>
            
            <div id="buttonContainer">
            <button id="submitBet">Start Game</button>
            <button id="takeProfits">Cash Out</button>
            <label htmlFor="betAmount">Bet Amount:</label>
            <input type="number" id="betAmount" defaultValue="1" />
            </div>
            
            <div id="lastCrashesContainer">
            <p>Last Crashes:</p>
            <div id="lastCrashes"></div>
            </div>
            </div>
            );
        };
        
        export default Game;
        