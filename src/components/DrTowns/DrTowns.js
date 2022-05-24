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

    const speed = 500;

    React.useEffect(() => {

        window.addEventListener('keydown', e => handleKeyDown(e));
        window.addEventListener('keyup', e => handleKeyUp(e));

        return () => {
            window.removeEventListener('keydown', e => handleKeyDown(e));
            window.removeEventListener('keyup', e => handleKeyUp(e));
        };
    });

    const handleKeyDown = (e) => {
        if (['ArrowUp', 'w',
            'ArrowLeft', 'a',
            'ArrowRight', 'd',
            'ArrowDown', 's',].includes(e.key)) {
            setWalking(true)

            if (['ArrowUp', 'w'].includes(e.key)) { setRotation('-90'); setY(y - 1); }
            if (['ArrowLeft', 'a'].includes(e.key)) setRotation('180');
            if (['ArrowRight', 'd'].includes(e.key)) setRotation('0');
            if (['ArrowDown', 's'].includes(e.key)) setRotation('90');
        }
    }

    const handleKeyUp = (e) => {
        setWalking(false)
    }

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
                    animation: `walking ${speed}ms infinite`,
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