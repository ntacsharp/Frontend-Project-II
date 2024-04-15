import React, { useEffect, useState, useRef } from 'react';
import './test.css';
import ToggleableRangeSlider from './ToggleSlider';
import SortOptions from './SortOptions';


const Booking = () => {
    const [sortOption, setSortOption] = useState('default'); 
    const [filteredBookings, setFilteredBookings] = useState([]);
    const isFirstRender = useRef(true);
    const [filteredAndSortedBookings, setFilteredAndSortedBookings] = useState([]);

    const bookings = [
        { id: 1, departureTime: "9:45", arrivalTime: "11:10", price: 50, rating: 3 , nhaXe: 'peo1'},
        { id: 2, departureTime: "12:15", arrivalTime: "14:30", price: 60, rating: 1 , nhaXe: 'peo2'},
        { id: 3, departureTime: "15:00", arrivalTime: "17:45", price: 70, rating: 5, nhaXe: 'peo3' },
        { id: 4, departureTime: "16:30", arrivalTime: "19:40", price: 90, rating: 4, nhaXe: 'peo4' }
    ];

    const [list,setList] = useState(bookings);

    const sortBookings = (option, list) => {
        switch (option) {
            case 'earliest':
                return list.slice().sort((a, b) => {
                    const timeA = parseInt(a.departureTime.replace(':', ''));
                    const timeB = parseInt(b.departureTime.replace(':', ''));
                    return timeA - timeB;
                });
            case 'latest':
                return list.slice().sort((a, b) => {
                    const timeA = parseInt(a.departureTime.replace(':', ''));
                    const timeB = parseInt(b.departureTime.replace(':', ''));
                    return timeB - timeA;
                });
            case 'highest':
                return list.slice().sort((a, b) => b.rating - a.rating);
            case 'ascending':
                return list.slice().sort((a, b) => a.price - b.price);
            case 'descending':
                return list.slice().sort((a, b) => b.price - a.price);
            default:
                return list;
        }
    };

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };


const [priceRange, setPriceRange] = useState([0, 100]); // State lưu trữ khoảng giá vé
const [timeRange, setTimeRange] = useState([0, 24]); // State lưu trữ khoảng thời gian đi

// Hàm xử lý thay đổi của slider giờ đi
const handleTimeChange = (newValue) => {
    setTimeRange(newValue); // Cập nhật state với giá trị mới từ slider
    filterBookings(newValue, priceRange); // Lọc danh sách đặt phòng với giá trị mới từ cả hai slider
};

// Hàm xử lý thay đổi của slider giá vé
const handlePriceChange = (newValue) => {
    setPriceRange(newValue); // Cập nhật state với giá trị mới từ slider
    filterBookings(timeRange, newValue); // Lọc danh sách đặt phòng với giá trị mới từ cả hai slider
};

// Hàm lọc danh sách đặt phòng dựa trên cả hai tiêu chí: giờ đi và giá vé
const filterBookings = (timeRange, priceRange) => {
    const filtered = bookings.filter(booking => {
        // Kiểm tra nếu giờ đi của đặt phòng nằm trong khoảng thời gian và giá vé nằm trong khoảng giá trị
        if(priceRange[0] != priceRange[1] && timeRange[0] != timeRange[1]){
            if(booking.price >= priceRange[0] && booking.price <= priceRange[1]){
                if(parseInt(booking.departureTime.split(":")[0]) >= timeRange[0] && parseInt(booking.arrivalTime.split(":")[0]) <= timeRange[1]){
                    if(parseInt(booking.arrivalTime.split(":")[0]) < timeRange[1]) return booking;
                    else if(parseInt(booking.arrivalTime.split(":")[1]) === 0 ) return booking;
                        else return false;
                    }
            }
        }else return false;
        
        return false;
        
    });
    setFilteredBookings(filtered); // Cập nhật danh sách đặt phòng đã lọc
};

    useEffect(() => {
        if (!isFirstRender.current) {
            let sortedList;
            if (filteredBookings.length > 0) {
                sortedList = sortBookings(sortOption, filteredBookings);
            } else {
                sortedList = sortBookings(sortOption, bookings);
            }
            setFilteredAndSortedBookings(sortedList);
        }
    }, [sortOption, filteredBookings]);

    useEffect(() => {
        if (!isFirstRender.current) {
            setList(filteredBookings);
        } else {
            isFirstRender.current = false;
        }
    }, [filteredBookings]);

    
      
    return (
        <div>
            <SortOptions sortOption={sortOption} handleSortChange={handleSortChange}  />
            <div>
                <h1>Lọc</h1>
                <div>
                    <div>
                        <p>Giờ đi</p>
                        { <ToggleableRangeSlider min={0} max={24} step={1} formatLabel={(value) => `${value}:00` } handleChange={handleTimeChange} />}
                    </div>
                    <div>
                        <p>Giá vé</p>
                        {<ToggleableRangeSlider min={0} max={100} step={10} handleChange={handlePriceChange} />}
                    </div>
                </div>
            </div>
            <div>
                <h1>Danh sách chuyến đi</h1>
                <div id="booking">
                <ul>
                    {filteredAndSortedBookings.map(booking => (
                        <li key={booking.id}>
                            <strong>Giờ đi:</strong> {booking.departureTime} <br />
                            <strong>Giờ đón:</strong> {booking.arrivalTime} <br />
                            <strong>Giá vé:</strong> ${booking.price} <br />
                            <strong>Đánh giá:</strong> {booking.rating} sao <br />
                            <strong>Nhà xe:</strong> {booking.nhaXe} <br />
                        </li>
                    ))}
                </ul>
                </div>
                
                
            </div>
        </div>
    );
}

export default Booking;
