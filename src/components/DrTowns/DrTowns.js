import React from 'react'

import walkingRight from './assets/images/walking_right.svg'
import walkingLeft from './assets/images/walking_left.svg'
import neutral from './assets/images/neutral.svg'

import './DrTowns.css'


export default function DrTowns() {

    const [rotation, setRotation] = React.useState('0');
    const [walking, setWalking] = React.useState(false);
    const [x, setX] = React.useState(0);
    const [y, setY] = React.useState(0);

    React.useEffect(() => {

        const up = ['ArrowUp', 'w',]
        const right = ['ArrowRight', 'd',]
        const down = ['ArrowDown', 's',]
        const left = ['ArrowLeft', 'a',]

        const handleKeyDown = (e) => {
            if ([...up, ...right, ...down, ...left].includes(e.key)) {
                setWalking(true);
                if (up.includes(e.key)) { setRotation('-90'); setY(prevY => prevY - 1); }
                if (right.includes(e.key)) { setRotation('0'); setX(prevX => prevX + 1); }
                if (down.includes(e.key)) { setRotation('90'); setY(prevY => prevY + 1); }
                if (left.includes(e.key)) { setRotation('180'); setX(prevX => prevX - 1); }
            }
        }

        const handleKeyUp = (e) => {
            setWalking(false)
        }

        document.addEventListener('keydown', e => handleKeyDown(e));
        document.addEventListener('keyup', e => handleKeyUp(e));

        return () => {
            document.removeEventListener('keydown', e => handleKeyDown(e));
            document.removeEventListener('keyup', e => handleKeyUp(e));
        };
    }, []);

    return (
        <div style={{
            transform: "translate(-50%, -50%)",
            position: "fixed",
            top: "50%",
            left: "50%",
        }}>
            {walking ? <div
                style={{
                    width: 75,
                    height: 60,
                    transform: `rotate(${rotation}deg)`,
                    '--walking-right': `url(${walkingRight})`,
                    '--walking-left': `url(${walkingLeft})`,
                    '--neutral': `url(${neutral})`,
                    content: 'var(--neutral)',
                    animation: `walking 500ms infinite`,
                }}
            >
            </div>
                :
                <div
                    style={{
                        width: 75,
                        height: 60,
                        transform: `rotate(${rotation}deg)`,
                        '--walking-right': `url(${walkingRight})`,
                        '--walking-left': `url(${walkingLeft})`,
                        '--neutral': `url(${neutral})`,
                        content: 'var(--neutral)',
                    }}
                >
                </div>
            }
            {rotation} <br />
            x:{x},y:{y}
        </div>
    )
}
