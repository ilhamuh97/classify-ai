import { CSSProperties, useEffect, useRef } from 'react';
import p5 from 'p5';

interface P5SketchProps {
    setup: (p5: p5, canvasParentRef: Element) => void;
    draw: (p5: p5) => void;
    style?: CSSProperties;
}

const P5Sketch = ({ setup, draw, style }: P5SketchProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const setupRef = useRef(setup);
    const drawRef = useRef(draw);

    useEffect(() => {
        setupRef.current = setup;
        drawRef.current = draw;
    });

    useEffect(() => {
        const container = containerRef.current!;
        const instance = new p5((sketch: p5) => {
            sketch.setup = () => setupRef.current(sketch, container);
            sketch.draw = () => drawRef.current(sketch);
        }, container);

        return () => {
            instance.remove();
        };
    }, []);

    return <div ref={containerRef} style={style} />;
};

export default P5Sketch;
