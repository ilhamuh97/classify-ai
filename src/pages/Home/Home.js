import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo/classify.svg';
import { Typography, Button, Layout } from 'antd';
import styles from './Home.module.scss';
import ReactLogo from '../../assets/logo/react.svg';
import TensorFlowJsLogo from '../../assets/logo/tensorflowjs.png';
import ApexChartsLogo from '../../assets/logo/apexcharts.png';
import p5Js from '../../assets/logo/p5js.svg';
import AntDesign from '../../assets/logo/antdesign.png';

const Home = () => {
    const { Title, Paragraph } = Typography;
    return (
        <Layout className={styles.home}>
            <Layout.Header>
                <div className={styles.logo}>
                    <img src={Logo} />
                </div>
            </Layout.Header>
            <Layout.Content>
                <Typography className={styles.subContent}>
                    <Title>
                        Cl<span className={styles.ai}>a</span>ss<span className={styles.ai}>i</span>
                        fy
                        <span className={styles.ai}>AI</span>
                    </Title>
                    <Paragraph>
                        Welcome to ClassifyAI! Create
                        <strong> your own CNN models for image classification </strong>
                        without coding. Our easy-to-use platform allows you to
                        <strong>
                            {' '}
                            gather data, train models and test them with just a few clicks.{' '}
                        </strong>
                    </Paragraph>

                    <div className={styles.logos}>
                        <a
                            className={styles.logo}
                            href="https://reactjs.org/"
                            target="_blank"
                            rel="noreferrer">
                            <img src={ReactLogo} alt="React logo" />
                        </a>
                        <a
                            className={styles.logo}
                            href="https://www.tensorflow.org/js"
                            target="_blank"
                            rel="noreferrer">
                            <img src={TensorFlowJsLogo} alt="TensorFlow js logo" />
                        </a>
                        <a
                            className={styles.logo}
                            href="https://ant.design/"
                            target="_blank"
                            rel="noreferrer">
                            <img src={AntDesign} alt="Ant-Design logo" />
                        </a>
                        <a
                            className={styles.logo}
                            href="https://p5js.org/"
                            target="_blank"
                            rel="noreferrer">
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
                    <div>
                        <Button type="primary" shape="round" size="large">
                            <Link to="/train">Get Started</Link>
                        </Button>
                    </div>
                </Typography>
            </Layout.Content>
            <Layout.Footer>© Copyright {new Date().getFullYear()} Ilhamuh97</Layout.Footer>
        </Layout>
    );
};

export default Home;
