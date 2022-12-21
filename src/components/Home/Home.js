import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button } from 'antd';
import styles from './Home.module.scss';

const Home = () => {
    const { Title, Paragraph } = Typography;
    return (
        <div className={styles.home}>
            <Typography className={styles.subContent}>
                <Title>Create Own Model</Title>
                <Paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin aliquet luctus
                    aliquam. Phasellus eget lacinia mauris. Aliquam varius malesuada diam sit amet
                    efficitur. Aliquam justo metus, blandit at metus sed, euismod accumsan metus.
                    Proin iaculis tortor non tellus finibus vulputate. Aliquam fringilla metus arcu,
                    nec porttitor risus sodales quis. Mauris egestas tempus velit non aliquet.
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
