import ReactLogo from '../../../assets/logo/react.svg';
import TensorFlowJsLogo from '../../../assets/logo/tensorflowjs.png';
import p5Js from '../../../assets/logo/p5js.svg';

const LogosWrapper = () => {
    return (
        <div className="flex flex-wrap items-center justify-center gap-8 opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0">
            <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
                <img src={ReactLogo} alt="React logo" className="h-9" />
            </a>
            <a href="https://www.tensorflow.org/js" target="_blank" rel="noreferrer">
                <img src={TensorFlowJsLogo} alt="TensorFlow js logo" className="h-9" />
            </a>
            <a href="https://p5js.org/" target="_blank" rel="noreferrer">
                <img src={p5Js} alt="P5js logo" className="h-9" />
            </a>
        </div>
    );
};

export default LogosWrapper;
