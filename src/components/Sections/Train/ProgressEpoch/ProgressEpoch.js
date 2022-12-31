import React from 'react';
import { Progress } from 'antd';
import styles from './ProgressEpoch.module.scss';

const ProgressEpoch = ({ logs, paramConfig }) => {
    console.log(logs);
    return (
        <div className={styles.progressWrapper}>
            <Progress
                className={styles.progress}
                percent={(((logs[logs.length - 1]?.epoch ?? 0) + 1) / paramConfig.epochs) * 100}
                format={() =>
                    `${(logs[logs.length - 1]?.epoch ?? 0) + 1}/${paramConfig.epochs} Epoch`
                }
            />
        </div>
    );
};

export default ProgressEpoch;
