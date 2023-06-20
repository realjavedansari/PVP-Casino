import React, { useEffect, useRef } from 'react';
import '../Game.css';
import { json } from 'react-router-dom';
import FairnessButton from './Fairness';

const Game = ({ betAmount }) => {
    
    useEffect(() => {
        const serverUrl = 'http://localhost:3001'; // Replace with your server address
        
        const eventSource = new EventSource(`${serverUrl}/sse`);

        
        eventSource.addEventListener('message', (event) => {
            const data = event.data;
            // Handle the received data from the server
            // console.log(data);
            let jsonData = JSON.stringify(data);
            console.log(jsonData);
        });
        
        eventSource.addEventListener('error', (error) => {
            // Handle any error that occurs during the SSE connection
            console.error('SSE error:', error);
        });
        
        // Clean up the SSE connection when the component unmounts
        return () => {
            eventSource.close();
        };
    }, []);
    
    
    const canvasRef = useRef(null);
    const imgRef = useRef(null);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = imgRef.current;
        
        let mainRandomNumber = 10;
        
        let speed = 0.01;
        let curvePoints = [];
        let gameLoop;
        let success;
        let balance = 100000;
        let crashed;
        let betAmount;
        let boolProfitsTaken;
        let frameCount = 0;
        let copy_CurrentMultiplier;
        let rocketPosition = { x: 1, y: 1 };
        let canvasOffsetX = 0;
        
        let colorIndex = 0;
        const rainbowColors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8B00FF'];
        let rainbowframesInterval = 3000;
        let rainbowCoordinates = []; // Array to store the rainbow coordinates
        let rainbowAnimationFlag = true;
        
        const balanceDisplay = document.getElementById('balance');
        balanceDisplay.innerText = balance + '$';
        
        const betAmountInput = document.getElementById('betAmount');
        
        const xLabelSpacing = 100;
        let xOffset = 0;
        let labelCounter = 2;
        
        const yLabelSpacing = 50;
        let yLabelMultiplier = 1;
        
        function updateAxes() {
            // console.log("updateaxes");
            frameCount++;
            // ctx.clearRect(canvas.width, 0, canvas.width - 50, 0);
            // ctx.clearRect(0, 0, 50, canvas.height);
            // ctx.beginPath();
            
            // draw axis
            ctx.strokeStyle = "white";
            ctx.beginPath();
            ctx.moveTo(0, canvas.height);
            ctx.lineTo(canvas.width, canvas.height);
            ctx.stroke();
            
            // draw another axis
            ctx.moveTo(0, 0);
            ctx.lineTo(0, canvas.height);
            ctx.stroke();
            
            // draw labels 
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
        }
        
        function updateCurve() {
            // ctx.beginPath();
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            updateAxes();
            
            //   for (let i = 0; i < curvePoints.length; i++) {
            //     const { x, y } = curvePoints[i];
            //     ctx.lineTo(x, y);
            //   }
            
            const curveOffset = 3; // Adjust this value to set the offset between curves
            const numberOfCurves = rainbowColors.length - 1;
            // rainbowCoordinates.length = 1;
            
            for (let j = 0; j < numberOfCurves; j++) {
                ctx.beginPath();
                ctx.lineWidth = 4;
                ctx.strokeStyle = rainbowColors[(colorIndex + j) % rainbowColors.length]; // Use different colors for each curve
                let x, y, y_calc;
                const goTillWhere = Math.min(mainRandomNumber, 5);
                if(curvePoints.length / 100 < goTillWhere){
                    let statementExecuted = false;
                    for (let i = 0; i < curvePoints.length; i++) {
                        x = curvePoints[i].x;
                        y = curvePoints[i].y;
                        y_calc = y + (j * curveOffset);
                        ctx.lineTo(x, y_calc); // Offset the y-coordinate for each curve
                    }
                    if (!statementExecuted) {
                        rainbowCoordinates.push({x: x, y: y});
                        statementExecuted = true;
                    }
                } else {
                    // console.log("size of rainbowCoordinates: " + rainbowCoordinates.length);
                    // console.log("size of curvePoints: " + curvePoints.length);
                    for (let i = 0; i < rainbowCoordinates.length; i++) {
                        let { x, y } = rainbowCoordinates[i];
                        y_calc = y + (j * curveOffset);
                        ctx.lineTo(x, y_calc); // Offset the y-coordinate for each curve
                    }
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
                ctx.drawImage(img, rainbowCoordinates[rainbowCoordinates.length - 1].x - 35, rainbowCoordinates[rainbowCoordinates.length - 1].y - 65, 105, 110);
            }else {
                ctx.font = "60px Arial";
                ctx.fillText('bang!', rainbowCoordinates[rainbowCoordinates.length - 1].x, rainbowCoordinates[rainbowCoordinates.length - 1].y - 75);
                setTimeout(start_game.bind(null, mainRandomNumber), 3000);
            }
            
            // if (!crashed) {
            // const lastPoint = curvePoints[curvePoints.length - 1];
            
            // if (curvePoints.length >= 2) {
            //     const secondLastPoint = curvePoints[curvePoints.length - 2];
            //     const deltaX = lastPoint.x - secondLastPoint.x;
            //     const deltaY = lastPoint.y - secondLastPoint.y;
            //     const angle = Math.atan2(deltaY, deltaX) + Math.PI / 4;
            
            //     ctx.save();
            //     ctx.translate(lastPoint.x, lastPoint.y);
            //     ctx.rotate(angle);
            
            //     ctx.font = '60px Arial';
            //     //   ctx.fillText('🚀', 0, -10);
            //     // ctx.drawImage(img, -50, -60, 105, 110);
            
            //     // if ((curvePoints / 100) < 2){
            //     rocketPosition = { x: lastPoint.x, y: lastPoint.y };
            //     // }
            
            
            //     ctx.restore();
            // } else {
            //     ctx.font = '60px Arial';
            //     rocketPosition = { x: lastPoint.x, y: lastPoint.y };
            // }
            // } else {
            //     if (rocketPosition && curvePoints[curvePoints.length - 2]) {
            //         const crashPosition = { x: rocketPosition.x, y: rocketPosition.y - 10 };
            //         const crashAngle = Math.atan2(rocketPosition.y - curvePoints[curvePoints.length - 2].y, rocketPosition.x - curvePoints[curvePoints.length - 2].x) + Math.PI / 4;
            //         // const crashAngle = Math.atan2(100, 100) + Math.PI / 4;
            
            //         ctx.save();
            //         ctx.translate(crashPosition.x, crashPosition.y);
            //         ctx.rotate(crashAngle);
            
            //         ctx.font = '25px Arial';
            //         ctx.fillText('bang!', 0, 0);
            
            //         labelCounter = 2;
            
            //         ctx.restore();
            
            //         setTimeout(start_game.bind(null, mainRandomNumber), 3000);
            //     }
            // }
        }
        
        
        function start_game(mainRandomNumber) {
            // console.log("Start agem started with " + mainRandomNumber);
            if (balance > betAmountInput.value) {
                balance = balance - betAmountInput.value;
                balanceDisplay.innerText = balance + '$';
                
                crashed = false;
                boolProfitsTaken = false;
                initializeCurve();
                
                betAmount = betAmountInput.value;
                
                gameLoop = setInterval(() => {
                    // console.log("Gameloop started.");
                    updateCurvePoints();
                    updateCurve();
                    if (curvePoints.length - 1 == mainRandomNumber * 100){
                        // console.log("Crashed.");
                        crashCurve(betAmountInput.value);
                        // console.log("t");
                    }
                }, 16);
                
                //change this for crash time testing
            }
        }
        
        function updateCurvePoints() {
            const lastPoint = curvePoints[curvePoints.length - 1];
            const newX = lastPoint.x + 1;
            const newY = canvas.height - Math.pow(newX, 1.65) / 100;
            
            document.getElementById('currentMultiplier').innerText = (newX / 100).toFixed(2) + 'x';
            // ctx.font = "50px serif";
            
            // ctx.fillText(curvePoints.length / 100 + 'x', 30, 200);
            copy_CurrentMultiplier = curvePoints.length / 100;
            curvePoints.push({ x: newX, y: newY });
            
            // // Check if the rocket reached 3x
            // if (curvePoints.length / 100 >= 3) {
            //     clearInterval(gameLoop); // Stop updating the rocket position
            //     rocketPosition = { x: newX, y: newY }; // Update the rocket position
            // }
            // if (newX > canvas.width - canvasOffsetX) {
            //     canvasOffsetX = newX - canvas.width + 50; // Adjust the offset value as needed
            //   }
        }
        
        function initializeCurve() {
            curvePoints = [{ x: 0, y: canvas.height }];
            rainbowCoordinates = [{ x: 0, y: canvas.height }];
            rocketPosition = { x: 0, y: canvas.height };
            updateCurve();
            //   console.log("stared gamed");
        }
        
        function crashCurve(betAmount) {
            clearInterval(gameLoop);
            
            const crashValue = curvePoints.length / 100;
            document.getElementById('crashedAt').innerText = `Multiplier at crash: ${crashValue}`;
            crashed = true;
            // curvePoints = [];
            // curvePoints = [{ x: 0, y: canvas.height }];
            
            //   const crash = document.createElement('p');
            //   crash.innerText = crashValue;
            //   crash.style = 'padding: 0; margin: 0;';
            //   crash.style.color = profitsTaken ? 'lime' : 'red';
            
            //   document.getElementById('lastCrashes').appendChild(crash);
            
            // initializeCurve();
            updateCurve();
            // start_game(mainRandomNumber);
        }
        
        start_game(mainRandomNumber);
        
        document.getElementById('takeProfits').addEventListener('click', function () {
            if (!crashed && !boolProfitsTaken) {
                boolProfitsTaken = true;
                console.log(`took profits, multiplier: ${curvePoints.length / 100}, profit: ${betAmount * (curvePoints.length / 100) - betAmount}`);
                balance = (betAmount * (curvePoints.length / 100) + balance).toFixed(2);
                balance = parseFloat(balance);
                balanceDisplay.innerText = balance + '$';
            } else if (boolProfitsTaken) {
                console.log('profits already taken');
            }
        })
        
        return () => {
            clearInterval(gameLoop);
            // clearTimeout(timer);
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
        <FairnessButton />
        </div>
        </div>
        </div>
        );
    };
    
    export default Game;
    