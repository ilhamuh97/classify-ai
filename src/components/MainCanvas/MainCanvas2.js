import React, { useState } from 'react';
import Sketch from 'react-p5';

const MainCanvas2 = () => {
    const [on, setOn] = useState(false);
    const [capture, setCapture] = useState(null);
    const [stream, setStream] = useState(null);

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(500, 400).parent(canvasParentRef);
        const c = p5.createCapture(p5.VIDEO, (mediaStream) => {
            setStream(mediaStream);
            console.log('Camera Turned On!', mediaStream);
        });
        c.hide();
        c.size(500, 400);
        setCapture(c);
    };

    const draw = (p5) => {
        p5.background(255);
        if (on) {
            p5.image(capture, 0, 0, 500, 400);
        }
    };

    const turnOffCamera = () => {
        if (on) {
            const tracks = stream.getTracks();
            tracks.forEach((track) => {
                track.stop();
            });
            console.log(tracks);
            setOn(false);
        } else {
            setOn(true);
        }
    };

    /*
    const [sketchFns] = useState({
        setup: (p5, canvasParentRef) => {
            p5.createCanvas(500, 400).parent(canvasParentRef);
            capture = p5.createCapture(p5.VIDEO);
            capture.hide();
            capture.size(500, 400);
        },
        draw: (p5) => {
            p5.background(0);
            if (on) {
                p5.image(capture, 0, 0, 500, 400);
            }
        },
        onOffCamera: (value) => {
            setOn(true);
            console.log(on);
            console.log(value);
        }
    });
    */

    return (
        <div>
            {on ? <Sketch setup={setup} draw={draw} /> : ''}

            <button onClick={() => turnOffCamera(!on)}>Click here</button>
        </div>
    );
};

export default MainCanvas2;
