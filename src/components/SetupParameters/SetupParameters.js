import React from 'react';
import SettingField from './SettingField/SettingField';
import styles from './SetupParameters.module.scss';

const SetupParameters = ({ model, setModel, graphModel, setGraphModel, classesLength }) => {
    return (
        <div className={styles.setupParameters}>
            <SettingField
                graphModel={graphModel}
                setGraphModel={setGraphModel}
                model={model}
                setModel={setModel}
                classesLength={classesLength}
            />
        </div>
    );
};

export default SetupParameters;
