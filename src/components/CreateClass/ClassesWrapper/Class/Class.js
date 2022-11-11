import React, { useState } from 'react';
import Sketch from 'react-p5';

const Class = () => {
    const [capture, setCapture] = useState(null);

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(265, 265).parent(canvasParentRef);
        let constraints = {
            video: {
                optional: [{ maxFrameRate: 10 }]
            }
        };
        const c = p5.createCapture(constraints);
        c.hide();
        c.size(500, 400);
        setCapture(c);
    };

    const draw = (p5) => {
        p5.background(255);
        //move image by the width of image to the left
        p5.translate(p5.width, 0);
        //then scale it by -1 in the x-axis
        //to flip the image
        p5.scale(-1, 1);
        p5.image(capture, 0, 0, p5.width, ((5 / 4) * (p5.height * capture.height)) / capture.width);
    };

    return (
        <div>
            <Sketch setup={setup} draw={draw} />
        </div>
    );
};

export default Class;
