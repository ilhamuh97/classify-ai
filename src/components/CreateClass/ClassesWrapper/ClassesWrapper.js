import React from 'react';
import Class from './Class/Class';
import styles from './ClassesWrapper.module.scss';

const ClassesWrapper = () => {
    return (
        <div className={styles.classesWrapper}>
            <Class />
        </div>
    );
};

export default ClassesWrapper;
