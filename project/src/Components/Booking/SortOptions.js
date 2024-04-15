import React from 'react';

const SortOptions = ({ sortOption, handleSortChange }) => (
<div>
    <h1>Sắp xếp</h1>
    <div>
        <div>
        <input
            type="radio"
            id="default"
            value="default"
            checked={sortOption === 'default'}
            onChange={handleSortChange}
        />
        <label htmlFor="default">Mặc định</label>
        </div>

        <div>
        <input
            type="radio"
            id="earliest"
            value="earliest"
            checked={sortOption === 'earliest'}
            onChange={handleSortChange}
        />
        <label htmlFor="earliest">Giờ đi sớm nhất</label>
        </div>

        <div>
        <input
            type="radio"
            id="latest"
            value="latest"
            checked={sortOption === 'latest'}
            onChange={handleSortChange}
        />
        <label htmlFor="latest">Giờ đi muộn nhất</label>
        </div>

        <div>
        <input
            type="radio"
            id="highest"
            value="highest"
            checked={sortOption === 'highest'}
            onChange={handleSortChange}
        />
        <label htmlFor="highest">Đánh giá cao nhất</label>
        </div>

        <div>
        <input
            type="radio"
            id="ascending"
            value="ascending"
            checked={sortOption === 'ascending'}
            onChange={handleSortChange}
        />
        <label htmlFor="ascending">Giá tăng dần</label>
        </div>

        <div>
        <input
            type="radio"
            id="descending"
            value="descending"
            checked={sortOption === 'descending'}
            onChange={handleSortChange}
        />
        <label htmlFor="descending">Giá giảm dần</label>
        </div>
    </div>
</div>
);

export default SortOptions;
