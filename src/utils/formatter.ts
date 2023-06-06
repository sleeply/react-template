import { useTranslation } from "react-i18next";

export function useFormatter() {
  const { t } = useTranslation();
  const isToday = (someDate: Date) => {
    const today = new Date();
    return (
      someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
    );
  };
  const isYesterday = (someDate: Date) => {
    const today = new Date();
    let yesterday = new Date();

    yesterday.setDate(today.getDate() - 1);
    return (
      someDate.getDate() == yesterday.getDate() &&
      someDate.getMonth() == yesterday.getMonth() &&
      someDate.getFullYear() == yesterday.getFullYear()
    );
  };

  const isTomorrow = (someDate: Date) => {
    const today = new Date();
    let tomorrow = new Date();

    tomorrow.setDate(today.getDate() + 1);
    return (
      someDate.getDate() === tomorrow.getDate() &&
      someDate.getMonth() === tomorrow.getMonth() &&
      someDate.getFullYear() === tomorrow.getFullYear()
    );
  };

  const handleDate = (value: string, format = "dd.mm.yyyy") => {
    const dateObj = new Date(value);
    const months = [
      t("months.january"),
      t("months.february"),
      t("months.march"),
      t("months.april"),
      t("months.may"),
      t("months.june"),
      t("months.july"),
      t("months.august"),
      t("months.september"),
      t("months.october"),
      t("months.november"),
      t("months.december"),
    ];
    const short_months = [
      t("short_months.january"),
      t("short_months.february"),
      t("short_months.march"),
      t("short_months.april"),
      t("short_months.may"),
      t("short_months.june"),
      t("short_months.july"),
      t("short_months.august"),
      t("short_months.september"),
      t("short_months.october"),
      t("short_months.november"),
      t("short_months.december"),
    ];
    switch (format) {
      case "dd":
        return `${("0" + dateObj.getDate()).substr(-2)}`;
      case "mmmm":
        return `${months[dateObj.getMonth()]}`;
      case "dd mmmm":
        return `${("0" + dateObj.getDate()).substr(-2)} ${
          months[dateObj.getMonth()]
        }`;
      case "d m y":
        return `${("0" + dateObj.getDate()).substr(-2)} ${
          short_months[dateObj.getMonth()]
        },  ${dateObj.getFullYear()}`;
      case "dddd":
        return isToday(dateObj)
          ? t("days.today")
          : isYesterday(dateObj)
          ? t("days.yesterday")
          : t("days." + dateObj.getDay());
      case "week":
        return isToday(dateObj)
          ? t("days.today")
          : isYesterday(dateObj)
          ? t("days.yesterday")
          : isTomorrow(dateObj)
          ? t("days.tomorrow")
          : t(`${dateObj.getDate()}`) + " " + months[dateObj.getMonth()];
      default:
        return `${("0" + dateObj.getDate()).substr(-2)}.${(
          "0" +
          (dateObj.getMonth() + 1)
        ).substr(-2)}.${dateObj.getFullYear()}`;
    }
  };

  const handleTime = (value: string, format = "hh:mm") => {
    const dateObj = new Date(value);
    switch (format) {
      // case 'dd.mm.yyyy':
      //   break;
      default:
        return `${("0" + dateObj.getHours()).substr(-2)}:${(
          "0" + dateObj.getMinutes()
        ).substr(-2)}`;
    }
  };

  const handleHms = (value: any, format = "hh:mm") => {
    const h = Math.floor(value / 3600);
    const m = Math.floor((value % 3600) / 60);
    const s = Math.floor((value % 3600) % 60);
    if (h !== 0) {
      switch (format) {
        default:
          return ` ${h + t("hms.h")}. ${m + t("hms.m")}. `;
      }
    } else {
      return `${m.toString().slice(-2) + t(`hms.m`)} ${
        s.toString().slice(-2) + t("hms.s")
      }`;
    }
  };

  const capitalize = (string: string) => {
    string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const moveArrayItemToNewIndex = (
    arr: any[],
    old_index: number,
    new_index: number
  ) => {
    if (new_index! >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
  };

  const removeItemFromArray = (arr: any[], value: number, byIndex = true) => {
    if (byIndex) {
      arr.splice(value, 1);
    } else {
      const index = arr.indexOf(value);
      if (index > -1) {
        arr.splice(index, 1);
      }
    }
  };

  return {
    isToday,
    isYesterday,
    isTomorrow,
    handleDate,
    handleTime,
    handleHms,
    capitalize,
    moveArrayItemToNewIndex,
    removeItemFromArray,
  };
}
