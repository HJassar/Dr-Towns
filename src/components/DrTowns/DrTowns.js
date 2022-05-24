import React from 'react'

import walkingRight from './assets/images/walkingRight.svg';
import walkingLeft from './assets/images/walkingLeft.svg';
import neutral from './assets/images/neutral.svg';

import './DrTowns.css'

export default function DrTowns() {

    const [rotation, setRotation] = React.useState('0');
    const [walking, setWalking] = React.useState(false);
    const [x, setX] = React.useState(0);
    const [y, setY] = React.useState(0);

    const [pressedKeys, setPressedKeys] = React.useState({});

    React.useEffect(() => {

        const up = ['ArrowUp', 'w',]
        const right = ['ArrowRight', 'd',]
        const down = ['ArrowDown', 's',]
        const left = ['ArrowLeft', 'a',]

        const handleKeyDown = (e) => {
            if ([...up, ...right, ...down, ...left].includes(e.key)) {
                if (up.includes(e.key)) { setPressedKeys(prevPressedKeys => ({ ...prevPressedKeys, up: true, down: false, })); }
                if (right.includes(e.key)) { setPressedKeys(prevPressedKeys => ({ ...prevPressedKeys, right: true, left: false, })); }
                if (down.includes(e.key)) { setPressedKeys(prevPressedKeys => ({ ...prevPressedKeys, down: true, up: false, })); }
                if (left.includes(e.key)) { setPressedKeys(prevPressedKeys => ({ ...prevPressedKeys, left: true, right: false, })); }
            }
        }

        const handleKeyUp = (e) => {
            if ([...up, ...right, ...down, ...left].includes(e.key)) {
                if (up.includes(e.key)) { setPressedKeys(prevPressedKeys => ({ ...prevPressedKeys, up: false })); }
                if (right.includes(e.key)) { setPressedKeys(prevPressedKeys => ({ ...prevPressedKeys, right: false })); }
                if (down.includes(e.key)) { setPressedKeys(prevPressedKeys => ({ ...prevPressedKeys, down: false })); }
                if (left.includes(e.key)) { setPressedKeys(prevPressedKeys => ({ ...prevPressedKeys, left: false })); }
            }
        }

        document.addEventListener('keydown', e => handleKeyDown(e));
        document.addEventListener('keyup', e => handleKeyUp(e));

        return () => {
            document.removeEventListener('keydown', e => handleKeyDown(e));
            document.removeEventListener('keyup', e => handleKeyUp(e));
        };

    }, []);

    React.useEffect(() => {
        if (Object.values(pressedKeys).some(v => !!v)) {
            setWalking(() => true);

            if (pressedKeys.right) setX(prevX => prevX + 1);
            if (pressedKeys.left) setX(prevX => prevX - 1);
            if (pressedKeys.up) setY(prevY => prevY - 1);
            if (pressedKeys.down) setY(prevY => prevY + 1);

            setRotation(() => {
                if (pressedKeys.up && pressedKeys.right) return '45';
                if (pressedKeys.up && pressedKeys.left) return '-45';
                if (pressedKeys.down && pressedKeys.right) return '135';
                if (pressedKeys.down && pressedKeys.left) return '-135';
                if (pressedKeys.up) return '0';
                if (pressedKeys.right) return '90';
                if (pressedKeys.down) return '180';
                if (pressedKeys.left) return '-90';
            });
        } else {
            setWalking(() => false);
        }
    }, [pressedKeys]);

    return (
        <div style={{
            transform: "translate(-50%, -50%)",
            position: "fixed",
            top: "50%",
            left: "50%",
            zIndex: "1",
        }}>
            {walking ? <div
                style={{
                    // width: 75,
                    // height: 60,
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
                        // width: 75,
                        // height: 60,
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
            x:{x},y:{y} <br />
            walking: {walking.toString()} <br />
            <div className="level"></div>
        </div>
    )
}
