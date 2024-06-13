import React, {useState} from 'react';
import styles from './Coach.module.css';
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

function CarForm(props) {
    return (props.trigger) ? (
        <div className={styles.popUp}>
            <div className={styles.popUpInner}>
                <button className={styles.closePopUpButton} onClick={() => props.setTrigger(false)}>×</button>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default CarForm;