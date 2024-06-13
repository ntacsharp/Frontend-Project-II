import React from "react";
import "./test.css";
import styles from "./Booking.module.css"

const SortOptions = ({ sortOption, handleSortChange }) => (
  <div>
    <div className={styles.title}>Sắp xếp</div>
    <div style={{display: "flex", gap: "8px", flexDirection: "column"}}>
      <div>
        <input
          type="radio"
          id="default"
          value="default"
          checked={sortOption === "default"}
          className={styles.radio}
          onChange={handleSortChange}
        />
        <label htmlFor="default" style={{marginRight: "15px", lineHeight:"32px"}}>Mặc định</label>
      </div>

      <div>
        <input
          type="radio"
          id="earliest"
          value="earliest"
          className={styles.radio}
          checked={sortOption === "earliest"}
          onChange={handleSortChange}
        />
        <label htmlFor="earliest" style={{marginRight: "15px", lineHeight:"32px"}}>Giờ đi sớm nhất</label>
      </div>

      <div>
        <input
          type="radio"
          id="latest"
          value="latest"
          className={styles.radio}
          checked={sortOption === "latest"}
          onChange={handleSortChange}
        />
        <label htmlFor="latest" style={{marginRight: "15px", lineHeight:"32px"}}>Giờ đi muộn nhất</label>
      </div>

      <div>
        <input
          type="radio"
          id="highest"
          value="highest"
          className={styles.radio}
          checked={sortOption === "highest"}
          onChange={handleSortChange}
        />
        <label htmlFor="highest" style={{marginRight: "15px", lineHeight:"32px"}}>Đánh giá cao nhất</label>
      </div>

      <div>
        <input
          type="radio"
          id="ascending"
          value="ascending"
          className={styles.radio}
          checked={sortOption === "ascending"}
          onChange={handleSortChange}
        />
        <label htmlFor="ascending" style={{marginRight: "15px", lineHeight:"32px"}}>Giá tăng dần</label>
      </div>

      <div>
        <input
          type="radio"
          id="descending"
          value="descending"
          className={styles.radio}
          checked={sortOption === "descending"}
          onChange={handleSortChange}
        />
        <label htmlFor="descending" style={{marginRight: "15px", lineHeight:"32px"}}>Giá giảm dần</label>
      </div>
    </div>
  </div>
);

export default SortOptions;
