import React from 'react';
import styles from './Homepage.module.css';
import { Link, useNavigate } from 'react-router-dom';



const Homepage = () => {
  // const navigate = useNavigate();

  // const handleLoginButtonClick = () => {
  //   navigate('/login');
  // };


  return (
    <div>
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
              <button className={styles.buttons} /*onClick={handleLoginButtonClick}*/>
                Đăng nhập
                <span></span>
              </button>
            </Link>
          </div>
        </ul>
      </div>
      <div className={styles.banner}>
        <img className={styles.bannerBackground} src="https://229a2c9fe669f7b.cmccloud.com.vn/images/banner-main-vi.jpg"/>
        <div className={styles.bannerMiddle}>
          <h2>Đặt vé xe đơn giản và an toàn</h2>
          <div className={styles.ticketWidget}>
            <div className={styles.infoRow}>
              <div className={styles.info} id={styles.startPoint}>

                <div className={styles.switchButton}>
                  <div className={styles.switchIcon}>
                    <i className="material-icons-outlined">import_export</i>
                  </div>
                </div>

                <div className={styles.selectStartPoint}>
                  <div className={styles.iconPoint}>
                    <img className={styles.itemImg} src="https://229a2c9fe669f7b.cmccloud.com.vn/svgIcon/pickup_vex_blue_24dp.svg"/>
                  </div>
                  <div className={styles.inputPointContainer}>
                    <label className={styles.titlePoint}>
                      Nơi xuất phát
                    </label>
                    <input className={styles.inputPoint} value="Hà Nội"></input>
                  </div>
                </div>
              </div>
              <div className={styles.info} id={styles.endPoint}>
                <div className={styles.selectEndPoint}>
                    <div className={styles.iconPoint}>
                      <img className={styles.itemImg} src="https://229a2c9fe669f7b.cmccloud.com.vn/svgIcon/dropoff_new_24dp.svg"/>
                    </div>
                    <div className={styles.inputPointContainer}>
                      <label className={styles.titlePoint}>
                        Nơi đến
                      </label>
                      <input className={styles.inputPoint} value="TP. HCM"></input>
                    </div>
                  </div>
                </div>
              <div className={styles.info} id={styles.startDate}>
                <div className={styles.selectEndPoint}>
                    <div className={styles.iconPoint}>
                      <img className={styles.itemImg} src="https://storage.googleapis.com/fe-production/svgIcon/event_vex_blue_24dp.svg"/>
                    </div>
                    <div className={styles.inputPointContainer}>
                      <label className={styles.titlePoint}>
                        Ngày đi
                      </label>
                      <input className={styles.inputPoint} value="Ngày nào đó"></input>
                    </div>
                  </div>
              </div>
              <div className={styles.info} id={styles.endDate}>
   
              </div>
            </div>
            <div className={styles.searchButton}>
              <button className={styles.buttons} id={styles.searchButton}>
                Tìm kiếm chuyến xe ngay
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.end}>
        <div className={styles.background}></div>
        <div className={styles.endItems}>
          <div className={styles.items}>
            <img className={styles.itemImg} src="https://229a2c9fe669f7b.cmccloud.com.vn/svgIcon/verified_yellow.svg" alt="Verified" />
            <p className={styles.title}>Chắc chắn có chỗ</p>
          </div>
          <div className={styles.items}>
            <img className={styles.itemImg} src="https://229a2c9fe669f7b.cmccloud.com.vn/svgIcon/headset_mic_yellow.svg" alt="Headset" />
            <p className={styles.title}>Hỗ trợ 24/7</p>
          </div>
          <div className={styles.items}>
            <img className={styles.itemImg} src="https://229a2c9fe669f7b.cmccloud.com.vn/svgIcon/discount_yellow.svg" alt="Discount" />
            <p className={styles.title}>Nhiều ưu đãi</p>
          </div>
          <div className={styles.items}>
            <img className={styles.itemImg} src="https://229a2c9fe669f7b.cmccloud.com.vn/svgIcon/monetization_on_yellow.svg" alt="Payment" />
            <p className={styles.title}>Thanh toán đa dạng</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
