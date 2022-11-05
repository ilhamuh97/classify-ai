import React, { useState } from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import Button from '../common/Button/Button';
import sketch from './sketch';

const MainCanvas = ({ id, label }) => {
    const [click, setClick] = useState(0);
    return (
        <div>
            <ReactP5Wrapper
                sketch={sketch}
                label={label}
                click={click}
                setClick={setClick}
                id={id}
            />
            <Button id={id} onClick={() => setClick(click + 1)} className={label}>
                Add Pic {label} and total pic: {click}
            </Button>
        </div>
    );
};

export default MainCanvas;
