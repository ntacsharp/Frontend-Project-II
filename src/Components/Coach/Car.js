import React, {useState} from 'react';
import styles from './Coach.module.css';
import { Link, useNavigate} from 'react-router-dom';

const Car = (props) => {
    const {car} = props;
    
    return (
        <div className={styles.carWrapper}>
            <div className={styles.tripTitle} style={{paddingBottom: "10px"}}>Biển số {car.licenseplate}</div>
            <div>Loại xe {car.type} chỗ</div>
        </div>
    )
    
}

export default Car;