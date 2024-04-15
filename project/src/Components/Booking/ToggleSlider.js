import React, { useState } from 'react';
import RangeSlider from './RangeSlider';


const ToggleableRangeSlider = ({ min, max, step, formatLabel,handleChange }) => {
    const [showSlider, setShowSlider] = useState(false);
    const [currentImage, setCurrentImage] = useState('image1'); // Thêm state để theo dõi ảnh hiện tại

    const toggleSlider = () => {
        setShowSlider(prevState => !prevState);
    };

    const handleClick = () => {
        toggleSlider(); // Khi ảnh được click, toggle slider
        setCurrentImage(prevImage => (prevImage === 'image1' ? 'image2' : 'image1')); // Đổi ảnh
    };

    return (
        <div>
            <img
                src={currentImage === 'image1' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Ic_keyboard_arrow_down_48px.svg/768px-Ic_keyboard_arrow_down_48px.svg.png' : 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Ic_keyboard_arrow_up_48px.svg/768px-Ic_keyboard_arrow_up_48px.svg.png'}
                alt="Toggle Image"
                onClick={handleClick} // Sử dụng handleClick khi ảnh được click
                className='arrow'
                style={{ height: '25px', width: '25px' }}
            />
            {/* Hiển thị slider nếu showSlider là true */}
            {showSlider && <RangeSlider min={min} max={max} step={step} formatLabel={formatLabel } handleChange={handleChange} />
}
        </div>
    );
}

export default ToggleableRangeSlider;
