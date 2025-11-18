"use client";
import styles from "./sidescrolling.module.css"; 
import { useRef } from "react";

const SideScrolling = ({ data }) => {
  const scrollRef = useRef(null);

  const scrollByItems = (direction) => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const item = container.querySelector(`.${styles.scrollItem}`);
    if (!item) return;

    const gap = parseInt(getComputedStyle(container).gap || "0", 10);
    const itemWidth = item.offsetWidth + gap;
    const itemsPerScroll = 3;

    container.scrollBy({
      left: direction * itemWidth * itemsPerScroll,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.scrollContainer} ref={scrollRef}>
      {data?.map((item, index) => (
        <div className={styles.scrollItem} key={index}>
          {item}
        </div>
      ))}
    </div>
  );
};

export default SideScrolling;
