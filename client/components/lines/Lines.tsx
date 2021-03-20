import React from 'react';
import styles from "../../styles/sign/sign.module.scss";

const Lines = () => {
    return (
        <>
            <div className={styles.lineRight}>
                <img src='/lines-right.png' alt="lines-right"/>
            </div>
            <div className={styles.lineLeft}>
                <img src='/lines-left.png' alt="lines-left"/>
            </div>
        </>
    );
};

export default Lines;
