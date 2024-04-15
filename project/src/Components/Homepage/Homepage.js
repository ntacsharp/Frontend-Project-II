import React from 'react';
import './Homepage.module.css';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();

  const handleLoginButtonClick = () => {
    navigate('/login');
  };


  return (
    <div>
      <div className="navbar">
        <div className="header-left">

        </div>
        <ul className="header-right">
          <li>Đăng ký mở bán vé</li>
          <div className="sign-in-button">
            <button className="buttons">
              <i className="material-icons-round">phone</i>
              Hotline 24/7
              <span></span>
            </button>
            {/* thêm chức năng xử lý route vào button */}
            <button className="buttons" onClick={handleLoginButtonClick}>
              Đăng nhập
              <span></span>
            </button>
          </div>
        </ul>
      </div>
      <div className="banner">
        {/* test ảnh vì bị lỗi homepage */}
        <img className="banner-background" src="https://229a2c9fe669f7b.cmccloud.com.vn/images/banner-main-vi.jpg" alt="Banner background"  style={{height: 100}}/>
        <div className="banner-middle">
          <h2>Đặt vé xe đơn giản và an toàn</h2>
          <div className="ticket-widget">
            <div className="info-row">
              <div className="info" id="start-point">

              </div>
              <div className="info" id="end-point">
 
              </div>
              <div className="info" id="start-date">
   
              </div>
              <div className="info" id="end-date">
   
              </div>
            </div>
            <div className="search-button">
              <button className="buttons" id="search-button">
                Tìm kiếm chuyến xe ngay
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="end">
        <div className="background"></div>
        <div className="end-items">
          <div className="items">
            <img className="item-img" src="https://229a2c9fe669f7b.cmccloud.com.vn/svgIcon/verified_yellow.svg" alt="Verified" />
            <p className="title">Chắc chắn có chỗ</p>
          </div>
          <div className="items">
            <img className="item-img" src="https://229a2c9fe669f7b.cmccloud.com.vn/svgIcon/headset_mic_yellow.svg" alt="Headset" />
            <p className="title">Hỗ trợ 24/7</p>
          </div>
          <div className="items">
            <img className="item-img" src="https://229a2c9fe669f7b.cmccloud.com.vn/svgIcon/discount_yellow.svg" alt="Discount" />
            <p className="title">Nhiều ưu đãi</p>
          </div>
          <div className="items">
            <img className="item-img" src="https://229a2c9fe669f7b.cmccloud.com.vn/svgIcon/monetization_on_yellow.svg" alt="Payment" />
            <p className="title">Thanh toán đa dạng</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
