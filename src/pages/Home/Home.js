import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo/classify.svg';
import { Typography, Button, Layout } from 'antd';
import styles from './Home.module.scss';

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
                    <div>
                        <Button type="primary">
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
