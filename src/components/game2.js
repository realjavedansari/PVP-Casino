import React, { useState, useEffect, useRef } from 'react';

const Game = () => {
    const canvasRef = useRef(null);
    const playerImageRef = useRef(null);
    const [ctx, setCtx] = useState(null);
    const [playerImage, setPlayerImage] = useState(null);
    const [speed, setSpeed] = useState(0.01);
    const [curvePoints, setCurvePoints] = useState([]);
    const [gameLoop, setGameLoop] = useState(null);
    const [success, setSuccess] = useState(false);
    const [balance, setBalance] = useState(100000);
    const [crashed, setCrashed] = useState(false);
    const [betAmount, setBetAmount] = useState(1);
    const [profitsTaken, setProfitsTaken] = useState(false);
    const [frameCount, setFrameCount] = useState(0);
    const [copyCurrentMultiplier, setCopyCurrentMultiplier] = useState(0);
    const balanceDisplayRef = useRef(null);
    const betAmountInputRef = useRef(null);
    const [xLabelSpacing, setXLabelSpacing] = useState(100);
    const [xOffset, setXOffset] = useState(0);
    const [labelCounter, setLabelCounter] = useState(2);
    const [yLabelSpacing, setYLabelSpacing] = useState(50);
    const [yLabelMultiplier, setYLabelMultiplier] = useState(1);
    const rainbowColors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8B00FF'];
    const [rainbowFramesInterval, setRainbowFramesInterval] = useState(30);
    const [colorIndex, setColorIndex] = useState(0);
    const [rocketPosition, setRocketPosition] = useState({ x: 0, y: 0 });
    
    
    
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvasRef.height = 400;
        canvasRef.width = 700;
        setCtx(context);
        const playerImage = playerImageRef.current;
        setPlayerImage(playerImage);
    }, []);
    
    useEffect(() => {
        if (ctx && playerImage) {
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 2;
            ctx.fillStyle = 'white';
            ctx.font = '12px Arial';
            balanceDisplayRef.current.innerText = `${balance}$`;
            setCurvePoints([{ x: 0, y: canvasRef.current.height }]);
            setCopyCurrentMultiplier(0);
            setXOffset(0);
            setLabelCounter(2);
            setYLabelMultiplier(1);
        }
    }, [ctx]);
    useEffect(() => {
        if (ctx && playerImage) {
            const updateCurve = () => {
                setFrameCount(frameCount + 1);
                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                ctx.beginPath();
                ctx.moveTo(0, canvasRef.current.height);
                ctx.lineTo(canvasRef.current.width, canvasRef.current.height);
                ctx.stroke();
                ctx.moveTo(0, 0);
                ctx.lineTo(0, canvasRef.current.height);
                ctx.stroke();
                ctx.fillStyle = 'white';
                ctx.font = '12px Arial';
                for (let e = 100 - xOffset; e <= canvasRef.current.width; e += 100) {
                    const t = labelCounter - Math.floor((canvasRef.current.width - e) / 100) + 6;
                    ctx.fillText(`${t}s`, e, canvasRef.current.height - 5);
                }
                if (xOffset === (xOffset + 0.5) % 100) {
                    setLabelCounter(labelCounter + 1);
                }
                ctx.fillStyle = 'white';
                ctx.font = '12px Arial';
                let n = Math.floor(copyCurrentMultiplier);
                for (let a = 1; a < n + 8; a++) {
                    if (n < 7) {
                        ctx.fillText(`${a}x`, 10, canvasRef.current.height - 50 * a);
                    } else {
                        ctx.fillText(`${n - 8 + a + 1}x`, 10, canvasRef.current.height - 50 * a);
                    }
                }
                const l = rainbowColors.length - 1;
                for (let r = 0; r < l; r++) {
                    ctx.beginPath();
                    ctx.lineWidth = 4;
                    ctx.strokeStyle = rainbowColors[(colorIndex + r) % rainbowColors.length];
                    for (let o = 0; o < curvePoints.length; o++) {
                        const { x: c, y: i } = curvePoints[o];
                        ctx.lineTo(c, i + 3 * r);
                    }
                    ctx.stroke();
                }
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'red';
                if (frameCount % 30 === 0) {
                    setColorIndex((colorIndex + 1) % rainbowColors.length);
                }
                if (!crashed) {
                    const s = { x: rocketPosition.x, y: rocketPosition.y - 10 };
                    if(s){
                        
                        const lastCurvePoint = curvePoints[curvePoints.length - 2];
                        if (lastCurvePoint) {
                            const $ = Math.atan2(
                                rocketPosition.y - lastCurvePoint.y,
                                rocketPosition.x - lastCurvePoint.x
                                ) + Math.PI / 4;
                                
                                ctx.save();
                                ctx.translate(s.x, s.y);
                                ctx.rotate($);
                                ctx.font = '50px Arial';
                                ctx.fillText('\uD83D\uDCA5', 0, 0);
                                setLabelCounter(2);
                                ctx.restore();
                                setTimeout(startGame, 1000);
                            }
                        }
                    } else {
                        const u = curvePoints[curvePoints.length - 1];
                        if (u) {
                            if (curvePoints.length >= 2) {
                                const x = curvePoints[curvePoints.length - 2];
                                if(x){
                                    const h = u.x - x.x;
                                    const g = u.y - x.y;
                                    ctx.save();
                                    ctx.translate(u.x, u.y);
                                    ctx.rotate(Math.atan2(g, h) + Math.PI / 4);
                                    ctx.font = '60px Arial';
                                    if (playerImage && playerImage.complete && playerImage.naturalWidth !== 0) {
                                        ctx.drawImage(playerImage, -50, -60, 105, 110);
                                    }
                                    setRocketPosition({ x: u.x, y: u.y });
                                    ctx.restore();
                                }
                            } else {
                                const x = curvePoints[curvePoints.length - 2];
                                
                                if(x){
                                    ctx.font = '60px Arial';
                                    setRocketPosition({ x: u.x, y: u.y });
                                }
                                
                            }
                        }
                    }
                };
                
                const updateCurvePoints = () => {
                    const e = curvePoints[curvePoints.length - 1];
                    if(e){
                        const t = e.x + 1;
                        const n = canvasRef.current.height - Math.pow(t, 1.65) / 100;
                        
                        document.getElementById('currentMultiplier').innerText = `${curvePoints.length / 100}x`;
                        setCopyCurrentMultiplier(curvePoints.length / 100);
                        setCurvePoints([...curvePoints, { x: t, y: n }]);
                    }
                };
                
                const startGame = () => {
                    setCurvePoints([{ x: 0, y: canvasRef.current.height }]);
                    updateCurve();
                };
                
                const getRandomCrashTime = (e, t) => {
                    e *= 1000;
                    t *= 1000;
                    e = Math.ceil(e);
                    return Math.floor(Math.random() * (Math.floor(t) - e + 1)) + e;
                };
                const crashCurve = (e) => {
                    clearInterval(gameLoop);
                    const t = curvePoints.length / 100;
                    document.getElementById('crashedAt').innerText = `Multiplier at crash: ${t}`;
                    setCrashed(true);
                    const n = document.createElement('p');
                    n.innerText = t;
                    n.style = 'padding: 0; margin: 0;';
                    n.style.color = profitsTaken ? 'lime' : 'red';
                    document.getElementById('lastCrashes').appendChild(n);
                    updateCurve();
                };
                
                const start_game = () => {
                    const submitBetButton = document.getElementById('submitBet');
                    if (submitBetButton) {
                        submitBetButton.disabled = true;
                    }
                    // document.getElementById('submitBet').disabled = true;
                    if (balance > betAmountInputRef.current.value) {
                        setBalance(balance - betAmountInputRef.current.value);
                        balanceDisplayRef.current.innerText = `${balance}$`;
                        setCrashed(false);
                        setProfitsTaken(false);
                        startGame();
                        setGameLoop(setInterval(() => {
                            updateCurvePoints();
                            updateCurve();
                        }, 1000));
                        setBetAmount(betAmountInputRef.current.value);
                        setTimeout(() => {
                            crashCurve(betAmountInputRef.current.value);
                            if (submitBetButton) {
                                document.getElementById('submitBet').disabled = false;
                            }
                        }, getRandomCrashTime(5, 10));
                    }
                };
                
                document.getElementById('takeProfits').addEventListener('click', () => {
                    if (!crashed && !profitsTaken) {
                        setProfitsTaken(true);
                        const t = curvePoints.length / 100;
                        const profit = betAmount * (t - 1);
                        console.log(`took profits, multiplier: ${t}, profit: ${profit}`);
                        setBalance(parseFloat((betAmount * t + balance).toFixed(2)));
                        balanceDisplayRef.current.innerText = `${balance}$`;
                    } else if (profitsTaken) {
                        console.log('profits already taken');
                    }
                });
                
                setCtx(ctx);
                setPlayerImage(playerImage);
                start_game();
                
                const canvas = canvasRef.current;
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                window.addEventListener('resize', () => {
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                });
            }
        }, [ctx]);
        
        
        
        return (
            <>
            <div id="gameContainer">
            <canvas id="game" ref={canvasRef} />
            <img id="player" style={{ display: 'none' }} src="../img/kim-jong-high.png" ref={playerImageRef} />
            <p id="currentMultiplier">0.0x</p>
            </div>
            
            <div id="infoContainer">
            <div style={{ display: 'flex' }}>
            <p id="balance" ref={balanceDisplayRef}>?</p>
            <p id="crashedAt">Multiplier at crash:</p>
            </div>
            
            <div id="betContainer" />
            
            </div>
            
            <div id="buttonContainer">
            <button id="takeProfits">Cash Out</button>
            <label htmlFor="betAmount">Bet Amount:</label>
            <input type="number" id="betAmount" value={betAmount} ref={betAmountInputRef} />
            </div>
            
            <div id="lastCrashesContainer">
            <p>Last Crashes:</p>
            <div id="lastCrashes" />
            </div>
            </>
            );
        };
        
        export default Game;