import styles from "./projectcard.module.css";
import { FcTimeline } from "react-icons/fc";
import { GiDuration } from "react-icons/gi";
import { MdOutlineWork } from "react-icons/md";
import { PiBuildingOfficeDuotone } from "react-icons/pi";
import { FaProjectDiagram } from "react-icons/fa";
import { GoFileCode } from "react-icons/go";
import { SiCodementor } from "react-icons/si";
import { dateFormat } from "@/common/CommonFunction";
import { Tooltip } from "@mui/material";

const ProjectCard = ({
  name,
  client,
  role,
  fromdate,
  todate,
  shortname,
  techstack,
  colorcode,
  isLight,
}) => {
  return (
    <div
      className={styles.projectCard}
      style={{
        color: isLight ? "#333" : "white",
        backgroundColor: isLight
          ? "rgba(255, 255, 255, 0.85)"
          : "rgba(0, 0, 0, 0.6)",
      }}
    >
      <div className={styles.itemCard}>
        <Tooltip title="Project" placement="left">
          <FaProjectDiagram size={20} color={colorcode} />
        </Tooltip>
        <Tooltip title={name} placement="right">
          <div className={styles.cardTitle}>{shortname}</div>
        </Tooltip>
      </div>
      <div className={styles.itemCard}>
        <Tooltip title="Client" placement="left">
          <PiBuildingOfficeDuotone size={20} color={colorcode} />
        </Tooltip>
        <span>{client}</span>
      </div>
      <div className={styles.itemCard}>
        <Tooltip title="Role" placement="left">
          <SiCodementor size={20} color={colorcode} />
        </Tooltip>
        <span>{role}</span>
      </div>
      <div className={styles.itemCard}>
        <Tooltip title="Duration" placement="left">
          <GiDuration size={20} color={colorcode} />
        </Tooltip>
        <span>
          {dateFormat(fromdate, "MMM-YYYY") +
            " to " +
            dateFormat(todate, "MMM-YYYY")}
        </span>
      </div>
      <div className={styles.itemCard}>
        <Tooltip title="Tech Stack" placement="left">
          <GoFileCode size={20} color={colorcode} />
        </Tooltip>
        <div className={styles.cardText}>
          {techstack?.split(",").map((tech, index) => (
            <span key={index}>{tech.trim() + ", "}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
