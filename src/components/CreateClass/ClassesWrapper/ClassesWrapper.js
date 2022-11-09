import React, { useState } from 'react';
import Class from './Class/Class';
import styles from './ClassesWrapper.module.scss';

const ClassesWrapper = () => {
    const [datasets, setDatasets] = useState([]);

    const initialClasses = () => {
        var indents = [];
        for (var i = 0; i < 2; i++) {
            indents.push(<Class key={i} index={i} setDatasets={setDatasets} />);
        }
        return indents;
    };

    const datasetsClasses = () => {
        return datasets.map((dataset, i) => {
            return <Class key={i} index={i} setDatasets={setDatasets} dataset={dataset} />;
        });
    };

    return (
        <div className={styles.classesWrapper}>
            {datasets.length === 0 ? initialClasses() : datasetsClasses()}
        </div>
    );
};

export default ClassesWrapper;
