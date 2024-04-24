import React, { useState } from 'react';
import styles from './Homepage.module.css'

function Enddate() {
  const [showEnddate, setShowEnddate] = useState(false);

  const buttonStyle = showEnddate ? styles.buttonEnddateShow : styles.buttonEnddateHidden
  const buttonContent = showEnddate ? "+ Thêm ngày về" : "×"

  return (
    <div style={{width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center"}}>
      <button className={buttonStyle} onClick={() => setShowEnddate(!showEnddate)}> 
        {buttonContent}
      </button>

      {!showEnddate && (
        <div>
            <div className={styles.selectEndPoint}>
                <div className={styles.iconPoint}>
                    <img className={styles.itemImg} src="https://storage.googleapis.com/fe-production/svgIcon/event_vex_blue_24dp.svg"/>
                </div>
                <div className={styles.inputPointContainer}>
                    <label className={styles.titlePoint}>
                        Ngày về
                    </label>
                    <input className={styles.inputPoint} value="Ngày nào đó"></input>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}

export default Enddate;