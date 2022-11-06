import React from 'react';
import { Button } from 'antd';
import { Typography } from 'antd';
import styles from './Home.module.scss';

const Home = ({ started, setStarted }) => {
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
                    <Button type="primary" onClick={() => setStarted(!started)}>
                        Getting started
                    </Button>
                </div>
            </Typography>
        </div>
    );
};

export default Home;
