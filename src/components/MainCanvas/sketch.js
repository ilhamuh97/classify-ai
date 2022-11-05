let captures = [];

const sketch = (p5) => {
    let capture;

    p5.updateWithProps = (props) => {
        if (props.click) {
            captures.push({
                id: props.id,
                label: props.label,
                image: p5.drawingContext.getImageData(0, 0, 500, 400)
            });
        }
    };

    p5.setup = () => {
        p5.createCanvas(500, 400);
        capture = p5.createCapture(p5.VIDEO);
        capture.hide();
        capture.size(500, 400);
    };

    p5.draw = () => {
        p5.background(255);
        p5.image(capture, 0, 0, 500, 400);
    };
};
export default sketch;
export { captures };
