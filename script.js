"use strict";

const dateEl = document.querySelector(".input-date");
const button = document.querySelector(".button");
const message = document.querySelector(".message");
const giffy = document.querySelector(".gif");
giffy.style.display = "none";
// yyyy mm dd
message.textContent = "";
const dateToObject = function (date) {
  // pass in here the date
  const dateElArray = date.split("-");
  const dateObject = {
    day: dateElArray[2],
    month: dateElArray[1],
    year: dateElArray[0],
  };
  console.log(dateObject);
  return dateObject;
};
const palindrome = function () {};
const getDateFormats = function (dateObject) {
  //pass in the date Object here
  // pass in the result of the object function ==> object pass
  // const date = dateToObject(dateEl);
  var ddmmyyyy = dateObject.day + dateObject.month + dateObject.year;
  var mmddyyyy = dateObject.month + dateObject.day + dateObject.year;
  var yyyymmdd = dateObject.year + dateObject.month + dateObject.day;
  var ddmmyy = dateObject.day + dateObject.month + dateObject.year.slice(-2);
  var mmddyy = dateObject.month + dateObject.day + dateObject.year.slice(-2);
  var yyddmm = dateObject.year.slice(-2) + dateObject.day + dateObject.month;

  const dateFormatsArray = [
    ddmmyyyy,
    mmddyyyy,
    yyyymmdd,
    ddmmyy,
    mmddyy,
    yyddmm,
  ];
  return dateFormatsArray;
};

const isStringPalindrome = function (str) {
  // pass in the string here
  const reverse = str.split("").reverse().join("");
  return reverse === str;
};

const checkAllFormatsForPalindrome = function (array) {
  // this will return a array of the results
  // const dateFormatList = getDateFormats();
  let palindromeList = [];

  for (let format of array) {
    let result = isStringPalindrome(format);
    palindromeList.push(result);
  }
  return palindromeList;
};

const leapYear = function (year) {
  if (year % 400 === 0) return true;

  if (year % 100 === 0) return true;

  if (year % 4 === 0) return true;

  return false;
};

const dateCorrectedObject = function (date) {
  // pass in the object here
  let day = date.day;
  let month = date.month;
  let year = date.year;

  if (day < 10) {
    day = "0" + day;
  } else {
    day = day.toString();
  }

  if (month < 10) {
    month = "0" + month;
  } else {
    month = month.toString();
  }

  year = year.toString();

  const dateObject = {
    day: day,
    month: month,
    year: year,
  };
  return dateObject;
};

const getNextDate = function (date) {
  // pass in the object

  let day = Number(date.day) + 1;
  let month = Number(date.month);
  let year = Number(date.year);

  const dayInMonths = [31, 28, 31, 30, 31, 30, 31, 30, 31, 30, 31, 30];

  if (month == 2) {
    if (leapYear(year)) {
      if (day > 29) {
        day = 1;
        month = 3;
      }
    } else {
      if (day > 28) {
        day = 1;
        month = 3;
      }
    }
  } else if (month == 12) {
    if (day > 31) {
      month = 1;
      day = 1;
      year++;
    }
  } else {
    if (day > dayInMonths[month - 1]) {
      day = 1;
      month++;
    }
  }

  const nextDate = {
    day: day,
    month: month,
    year: year,
  };
  const nextDateObject = dateCorrectedObject(nextDate);
  return nextDateObject;
};

const getNextPalindrome = function (date) {
  let nextDate = getNextDate(date);
  // here the next date is in the required object format
  let ctr = 0;

  while (1) {
    ctr++;
    let dateFormatNextDate = getDateFormats(nextDate);
    let resultListNextDate = checkAllFormatsForPalindrome(dateFormatNextDate);

    for (let result of resultListNextDate) {
      if (result) {
        return [ctr, nextDate];
      }
    }
    nextDate = getNextDate(nextDate);
  }
};

const getPrevDate = function (date) {
  // pass in the object
  // const date = dateToObject(dateEl.value);
  let day = Number(date.day) - 1;
  let month = Number(date.month);
  let year = Number(date.year);
  const dayInMonths = [31, 28, 31, 30, 31, 30, 31, 30, 31, 30, 31, 30];

  if (month == 3) {
    if (day < 1) {
      if (leapYear(year)) {
        day = 29;
        month = 2;
      } else {
        day = 28;
        month = 2;
      }
    }
  } else if (month == 1) {
    if (day < 1) {
      month = 12;
      day = 31;
      year--;
    }
  } else if (day < 1) {
    month--;
    day = dayInMonths[month - 2];
  }

  const prevDate = {
    day: day,
    month: month,
    year: year,
  };
  const prevDateObject = dateCorrectedObject(prevDate);
  return prevDateObject;
};

const getPrevPalindrome = function (date) {
  let prevDate = getPrevDate(date);
  // here the next date is in the required object format
  let ctr = 0;

  while (1) {
    ctr++;
    let dateFormatprevDate = getDateFormats(prevDate);
    let resultListprevDate = checkAllFormatsForPalindrome(dateFormatprevDate);

    for (let result of resultListprevDate) {
      if (result) {
        return [ctr, prevDate];
      }
    }
    
    prevDate = getPrevDate(prevDate);
  }
};

const objectToDate = function (obj) {
  return `${obj.day}-${obj.month}-${obj.year}`;
};

button.addEventListener("click", function () {
  message.textContent = "";
  // giffy.style.display = "none";
  if (!dateEl.value) {
    message.textContent = "Please select valid date of birth";
    return;
  }
  giffy.style.display = "block";
  setTimeout(() => {
    giffy.style.display = "none";
    if (dateEl.value) {
      const bdayDate = dateEl.value;
      const dateObject = dateToObject(bdayDate);
      const dateFormatArray = getDateFormats(dateObject);
      const resultList = checkAllFormatsForPalindrome(dateFormatArray);

      let isPalindrome = false;

      for (let result of resultList) {
        if (result) {
          isPalindrome = true;
          break;
        }
      }

      if (isPalindrome) {
        console.log(`Your Birthday is a Palindrome!! YAYY`);
        message.textContent = "Your Birthday is a Palindrome!! YAYY";
      } else {
        // message.textContent = "Your Birthday is not a Palindrome";
        // calculating the next palindrim here
        const [ctr1, nextPalindrome] = getNextPalindrome(dateObject);
        console.log(ctr1);
        const [ctr2, prevPalindrome] = getPrevPalindrome(dateObject);
        console.log(ctr2);

        const nextPalindromeDate = objectToDate(nextPalindrome);
        const prevPalindromeDate = objectToDate(prevPalindrome);

        console.log(nextPalindrome);
        console.log(prevPalindrome);
        if (ctr1 < ctr2) {
          message.textContent = `Sorry!! You missed a Palindrome by ${ctr1} days , next palindrome is on ${nextPalindromeDate}`;
        } else if (ctr1 > ctr2) {
          message.textContent = `Sorry!! You missed a Palindrome by ${ctr2} days , previous palindrome was on ${prevPalindromeDate}`;
        }
      }
    }
  }, 2000);

  // if (dateEl.value) {
  //   const bdayDate = dateEl.value;
  //   const dateObject = dateToObject(bdayDate);
  //   const dateFormatArray = getDateFormats(dateObject);
  //   const resultList = checkAllFormatsForPalindrome(dateFormatArray);

  //   let isPalindrome = false;

  //   for (let result of resultList) {
  //     if (result) {
  //       isPalindrome = true;
  //       break;
  //     }
  //   }

  //   if (isPalindrome) {
  //     console.log(`Your Birthday is a Palindrome!! YAYY`);
  //     message.textContent = "Your Birthday is a Palindrome!! YAYY";
  //   } else {
  //     // message.textContent = "Your Birthday is not a Palindrome";
  //     // calculating the next palindrim here
  //     const [ctr1, nextPalindrome] = getNextPalindrome(dateObject);
  //     console.log(ctr1);
  //     const [ctr2, prevPalindrome] = getPrevPalindrome(dateObject);
  //     console.log(ctr2);

  //     const nextPalindromeDate = objectToDate(nextPalindrome);
  //     const prevPalindromeDate = objectToDate(prevPalindrome);

  //     console.log(nextPalindrome);
  //     console.log(prevPalindrome);
  //     if (ctr1 < ctr2) {
  //       message.textContent = `Sorry!! You missed a Palindrome by ${ctr1} days , next palindrome is on ${nextPalindromeDate}`;
  //     } else if (ctr1 > ctr2) {
  //       message.textContent = `Sorry!! You missed a Palindrome by ${ctr2} days , previous palindrome was on ${prevPalindromeDate}`;
  //     }
  //   }
  // } else {
  //   message.textContent = "Please select valid date of birth";
  // }
});
