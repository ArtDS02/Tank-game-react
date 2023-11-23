import React, { useState, useEffect, useRef } from 'react';
import '../App.css'

const RandomRedBox = () => {
    const [boxes, setBoxes] = useState([]);
    const [boxId, setBoxId] = useState(0);
    const maxBoxes = 5;
    const [score, setScore] = useState(0);

    useEffect(() => {
        console.log('Bắt đầu tìm vị trí ');

        const handleKeyPress = (event) => {
            if (event.key === " ") {
                console.log('bắn này');
                let bulletElement = document.querySelector('.bullet');
                if (bulletElement) {
                    setTimeout(() => {
                        bulletElement = document.querySelector('.bullet');
                        const rect = bulletElement.getBoundingClientRect();
                        // console.log('Vị trí và kích thước của Bullet x = ', rect.top, " y = ", rect.left);
                        handleCheckPosition(rect.top, rect.left);
                    }, 800);
                }
            }
        }

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    });

    const handleCheckPosition = (top, left) => {
        let tankElement = document.querySelector('.tank');
        const tankRect = tankElement.getBoundingClientRect();
        let startX = 0;
        let endX = 0;
        let startY = 0;
        let endY = 0;

        // set trục ngang
        if (tankRect.x > left) {
            startX = left;
            endX = tankRect.x;
        } else {
            startX = tankRect.x;
            endX = left;
        }

        // set trục dọc
        if (tankRect.y > top) {
            startY = top;
            endY = tankRect.y;
        } else {
            startY = tankRect.y;
            endY = top;
        }
        console.log("StartX = ", startX, " EndX = ", endX);
        setBoxes(prevBoxes => {
            const updatedBoxes = [...prevBoxes];
            updatedBoxes.forEach((box, index) => {
                if ((top >= box.position.y && top <= box.position.y + 64 && box.position.x >= startX && box.position.x <= endX) ||
                    (left >= box.position.x && left <= box.position.x + 64 && box.position.y >= startY && box.position.y <= endY)) {
                    console.log("===========Oke============");
                    console.log(box.position);
                    setScore(prevScore => prevScore + 1);
                    updatedBoxes.splice(index, 1);
                    console.log("==========================");
                }
            });
            return updatedBoxes;
        });
    };


    const getRandomPosition = () => {
        const positionX = Math.random() * window.innerWidth - 100; // Random position X
        const positionY = Math.random() * (window.innerHeight - 100); // Random position Y
        return { x: positionX, y: positionY };
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (boxes.length < maxBoxes) {
                const newPosition = getRandomPosition();
                setBoxes([...boxes, { id: boxId, position: newPosition }]);
                setBoxId(boxId + 1);
            }
        }, 2000);
        return () => clearInterval(interval);
    }, [boxes, boxId]);



    return (
        <div style={{ position: "absolute", top: "0px", width: "100vw", height: "100vh" }}>
            <div style = {{fontSize: "20px",color:"white"}}>Score: {score}</div>
            {boxes.map(({ id, position }) => (
                <div
                    key={id}
                    className='enemy'
                    style={{
                        position: 'absolute',
                        top: `${position.y}px`,
                        left: `${position.x}px`,
                        width: '64px',
                        height: '64px',
                        backgroundColor: 'none',
                        cursor: 'pointer'
                    }}
                />
            ))}
        </div>
    );
};

export default RandomRedBox;
