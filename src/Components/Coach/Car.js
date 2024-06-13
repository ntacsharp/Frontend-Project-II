import React, {useState} from 'react';
import styles from './Coach.module.css';
import { Link, useNavigate} from 'react-router-dom';

const Car = (props) => {
    const {c} = props;
    
    return (
        <div className={styles.carWrapper}>
            <div className={styles.tripTitle} style={{paddingBottom: "10px"}}>Biển số {c.licenseplate}</div>
            <div>Loại xe {c.number} chỗ</div>
        </div>
    )
    
}

export default Car;