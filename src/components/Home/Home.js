import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button } from 'antd';
import styles from './Home.module.scss';

const Home = () => {
    const { Title, Paragraph } = Typography;
    return (
        <div className={styles.home}>
            <Typography className={styles.subContent}>
                <Title>ClassifyAI</Title>
                <Paragraph>
                    Welcome to ClassifyAI! Create your own CNN models for image classification
                    without coding. Our easy-to-use platform allows you to gather data, train models
                    and test them with just a few clicks. Ideal for researchers, students and
                    business owners. Try it now!
                </Paragraph>
                <div>
                    <Button type="primary">
                        <Link to="/train">Get Started</Link>
                    </Button>
                </div>
            </Typography>
        </div>
    );
};

export default Home;
