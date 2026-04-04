// common funtions file
import Swal from "sweetalert2";
import apiServices from "@/utils/service-calls/apiServices";
import { reduxStore } from "@/store/index";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { FIELD_CONFIG } from "@/forms/DynamicForm/formConfig";

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
export const getTotalExperience = (experienceList, from, to) => {
  return experienceList.reduce(
    (total, exp) => {
      const { months, years } = getDurationByMonths(exp[from], exp[to]);
      total.years += years;
      total.months += months;
      if (total.months >= 12) {
        total.years += Math.floor(total.months / 12);
        total.months = total.months % 12;
      }
      return total;
    },
    { years: 0, months: 0, days: 0 },
  );
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

export const getDurationByMonths = (fromDate, toDate) => {
  if (toDate === "present") toDate = new Date();
  const start = dayjs(fromDate);
  const end = dayjs(toDate);
  if (end.isBefore(start)) throw new Error("toDate must be after fromDate");

  const totalDays = end.diff(start, "days");
  console.log("total days ", totalDays);
  let months = Math.floor(totalDays / 30);
  const remainingDays = totalDays % 30;

  if (remainingDays > 21) {
    months += 1;
  }
  return {
    years: Math.floor(months / 12),
    months: months % 12,
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

export const getFieldsByCategory = (category) => {
  return FIELD_CONFIG.filter(
    (field) =>
      field.categories.includes("ALL") || field.categories.includes(category),
  );
};
