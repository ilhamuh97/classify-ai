import React from 'react';
import ReactLogo from '../../../assets/logo/react.svg';
import TensorFlowJsLogo from '../../../assets/logo/tensorflowjs.png';
import ApexChartsLogo from '../../../assets/logo/apexcharts.png';
import p5Js from '../../../assets/logo/p5js.svg';
import AntDesign from '../../../assets/logo/antdesign.png';
import styles from './LogosWrapper.module.scss';

const LogosWrapper = () => {
    return (
        <div className={styles.logosWrapper}>
            <a className={styles.logo} href="https://reactjs.org/" target="_blank" rel="noreferrer">
                <img src={ReactLogo} alt="React logo" />
            </a>
            <a
                className={styles.logo}
                href="https://www.tensorflow.org/js"
                target="_blank"
                rel="noreferrer">
                <img src={TensorFlowJsLogo} alt="TensorFlow js logo" />
            </a>
            <a className={styles.logo} href="https://ant.design/" target="_blank" rel="noreferrer">
                <img src={AntDesign} alt="Ant-Design logo" />
            </a>
            <a className={styles.logo} href="https://p5js.org/" target="_blank" rel="noreferrer">
                <img src={p5Js} alt="P5js logo" />
            </a>
            <a
                className={styles.logo}
                href="https://apexcharts.com/"
                target="_blank"
                rel="noreferrer">
                <img src={ApexChartsLogo} alt="Apex-Charts logo" />
            </a>
        </div>
    );
};

export default LogosWrapper;
