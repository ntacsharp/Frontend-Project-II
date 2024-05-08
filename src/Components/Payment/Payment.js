import React, {useState} from 'react';
import styles from './Payment.module.css';
import { Link, useNavigate} from 'react-router-dom';

const Payment = () => {
    return (
        <div style={{}}>
            <div className={styles.navbar}>
                <div className={styles.headerLeft}>
    
                </div>
                <ul className={styles.headerRight}>
                    <li>Đăng ký mở bán vé</li>
                    <div className={styles.signInButton}>
                        <button className={styles.buttons}>
                            <i className="material-icons-round">phone</i>
                                Hotline 24/7
                            <span></span>
                        </button>
                        <Link to='/login'>
                            <button className={styles.buttons}>
                                Đăng nhập
                                <span></span>
                            </button>
                        </Link>
                    </div>
                </ul>
            </div>

            <div style={{display: "flex", justifyContent: "center"}}>
                <div style={{width: "1000px"}}>
                    <div className={styles.turnBack}>
                        <p className={styles.turnBackButton}>{'<'} Quay lại</p>
                    </div>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <div className={styles.infoBox}>
                            <div className={styles.infoBoxWrapper}>
                                <div className={styles.infoBoxTitle}>Thông tin liên hệ</div>
                                <form className={styles.infoBoxForm}>
                                    <div className={styles.name}>
                                        <div className={styles.inputContainer}>
                                            <label className={styles.title}>
                                                Tên người đi*
                                            </label>
                                            <input className={styles.input} value="Placeholder"></input>
                                        </div>
                                    </div>
                                    <div style={{display: "flex", gap:"20px"}}>
                                        <div className={styles.inputContainer} style={{width: "92.25px"}}>
                                            <p className={styles.zone}>🇻🇳 +84</p>
                                        </div>

                                        <div className={styles.inputContainer} style={{width: "100%"}}>
                                            <label className={styles.title}>
                                                Số điện thoại*
                                            </label>
                                            <input className={styles.input} value="Placeholder"></input>
                                        </div>
                                    </div>
                                    <div>
                                        <div className={styles.inputContainer}>
                                            <label className={styles.title}>
                                                Email để nhận thông tin đặt chỗ*
                                            </label>
                                            <input className={styles.input} value="Placeholder"></input>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className={styles.money}>
                            <div className={styles.moneyWrapper}>
                                <div className={styles.infoBoxTitle}>Tạm tính</div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Payment 