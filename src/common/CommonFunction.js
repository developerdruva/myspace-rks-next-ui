// common funtions file
import Swal from "sweetalert2";
import apiServices from "@/utils/service-calls/apiServices";
import { reduxStore } from "@/store/index";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrBefore);

export const showAlertNotice = (title, icon) => {
  return Swal.fire({
    title: title,
    // text: text,
    icon: icon,
  });
};

export const getPortfolioDetails = () => {
  apiServices.getPortfolioDetails().then((res) => {
    if (res?.data?.status == "success") {
      console.log("res data --> ", res?.data?.data);
      reduxStore?.dispatch({
        type: "PORTFOLIO_DETAILS",
        payload: res?.data?.data,
      });
    }
  });
};
export const getDateDurationbtPeriod = (fromDate, toDate) => {
  if (toDate === "present") toDate = new Date();
  const start = dayjs(fromDate);
  const end = dayjs(toDate);
  if (end.isBefore(start)) throw new Error("toDate must be after fromDate");

  const totalMonths = end.diff(start, "month");
  const consolidatedMonths = start.add(totalMonths, "month");

  return {
    years: Math.floor(totalMonths / 12),
    months: totalMonths % 12,
    days: end.diff(consolidatedMonths, "day"),
  };
};

export const commonDateFormat = (dateObj) => {
  return dayjs(dateObj).format("DD/MM/YYYY");
};
export const dateFormatMonthYear = (dateObj) => {
  return dayjs(dateObj).format("MMM-YYYY");
};

export const colorToRGBA = (color, alpha = 1) => {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, 1, 1);
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);

  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const dateFormat = (dateObj, formatString = "DD-MM-YYYY") => {
  return dayjs(dateObj).format(formatString);
};

export const showApiStatusNotice = (message, status) => {
  return Swal.fire({
    title: status === "success" ? "Success" : "Error",
    text: message,
    icon: status === "success" ? "success" : "error",
    timer: 2500,
    showConfirmButton: false,
    position: "top-end",
  });
};

export const durationByDates = (fromDate, toDate) => {
  const years = differenceInYears(toDate, fromDate);
  const afterYears = sub(toDate, { years });

  const months = differenceInMonths(afterYears, fromDate);
  const afterMonths = sub(afterYears, { months });

  const days = differenceInDays(afterMonths, fromDate);

  return { years, months, days };
};

export const getTableCellStyles = () => {
  return {
    border: "1px solid #ccc",
    padding: "8px 10px",
    textAlign: "left",
  };
};
