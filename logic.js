const form = document.forms[0];

const inputDate = document.querySelector("#date");

const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function reverseString(str) {

    return str.split("").reverse().join('');

}

function isPalindrome(str) {
    var reverseStr = reverseString(str)
    return str = reverseStr
}

function convertDateToString(date) {

    var dateString = { day: '', month: '', year: '' }

    if (dateString.day < 10) {
        dateString.day = '0' + date.day
    } else {
        dateString.day = date.day.toString()
    }

    if (dateString.month < 10) {
        dateString.month = '0' + date.month
    } else {
        dateString.month = date.month.toString()
    }


    // if (dateString.month < 10) {
    //     dateString.month = '1' + date.month
    // } else {
    //     dateString.month = date.month.toString()
    // }


    dateString.year = date.year.toString();

    return dateString
}

// function reverseString(str) {

//     return str.split("").reverse().join('');



function allDateFormate(date) {
    let dateString = convertDateToString(date);
    
    var ddmmyyyy = dateString.day + dateString.month + dateString.year;
    
    var mmddyyyy = dateString.month + dateString.day + dateString.year;

    var yyyymmdd = dateString.year + dateString.month + dateString.day
    
    var ddmmyy = dateString.day + dateString.month + dateString.year.substring(2)
    
    var mmddyy = dateString.month + dateString.day + dateString.year.substring(2)
    
    var yymmdd = dateString.year.substring(2) + dateString.month + dateString.day;
    
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd]
}

function checkPalindromeForAllFormate(date) {
    var listOfPalindrome = allDateFormate(date)

    var flag = false;
    for (i = 0; i < listOfPalindrome.length; i++) {
        if (listOfPalindrome[i] === reverseString(listOfPalindrome[i])) {
            flag = true;
            break;
        }
    }
    return flag;
}

function leapYear(year) {
    if (year % 400 === 0) {
        return true
    }
    if (year % 100 === 0) {
        return false
    }
    if (year % 4 === 0) {
        return true
    }
    return false;
}

function findNextDate(date) {
    var day = date.day + 1;
    
    var month = date.month;
    
    var year = date.year;

    if (month === 2) {
        if (leapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        } else {
            if (day > 28) {
                day = 1;
               month++;
            }
        }
    }
    else {
        if ((day > daysInMonth[month - 1])) {
            day = 1;
            month++;
        }

    }

    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    }
}


// function checkPalindromeForAllFormate(date) {
//     var listOfPalindrome = allDateFormate(date)

//     var flag = false;
//     for (i = 0; i < listOfPalindrome.length; i++) {
//         if (listOfPalindrome[i] === reverseString(listOfPalindrome[i])) {
//             flag = true;
//             break;
//         }
//     }
//     return flag;
// }


function getNextPalindromeDate(date) {
   
    var ctr = 0;
   
    var nextDate = findNextDate(date);
   
    while (1) {
        ctr++;
        var isPalinromeDate = checkPalindromeForAllFormate(nextDate);
        if (isPalinromeDate) {
            break;
        }
        nextDate = findNextDate(nextDate)
    }
    return [ctr, nextDate]
}


form.addEventListener('submit', clickHandler)

form.addEventListener('submit',clickHandler)

function clickHandler(e) {
    e.preventDefault();

    const dateValue = inputDate.value;

    if (dateValue) {
      
        var bdydate = dateValue.split('-')

        var date = { 
      
            day: Number(bdydate[2]),
      
            month: Number(bdydate[1]),
      
            year: Number(bdydate[0])
      
        }

        var isPalindrome = checkPalindromeForAllFormate(date); 

        if (isPalindrome === true) {
      
            document.querySelector(".output").innerHTML = `<img  style="width: 90px;" />`;
      
            setTimeout(() => { isPalindromeMessage() }, 100);

        } else {
      
            var [counter, nextdate] = getNextPalindromeDate(date)
      
            document.querySelector(".output").innerHTML = `<img  style="width: 90px;" />`;
      
            setTimeout(() => { notPalindromeMessage(counter, nextdate) }, 100   );
      
        }
    }
}


// function allDateFormate(date) {
//     let dateString = convertDateToString(date);
//     var ddmmyyyy = dateString.day + dateString.month + dateString.year;
//     var mmddyyyy = dateString.month + dateString.day + dateString.year;
//     var yyyymmdd = dateString.year + dateString.month + dateString.day
//     var ddmmyy = dateString.day + dateString.month + dateString.year.substring(2)
//     var mmddyy = dateString.month + dateString.day + dateString.year.substring(2)
//     var yymmdd = dateString.year.substring(2) + dateString.month + dateString.day;
//     return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd]
// }



function isPalindromeMessage() {
   
    message = `<p class="result">VAMOS Your Birthday is Pallindrome </p>`;

    document.querySelector(".output").innerHTML = message;
}

function notPalindromeMessage(c, n) {
    message = `<p class="result"> Nah Mahn missed it! The Next pallindrome date will be  ${n.day}-${n.month}-${n.year} you missed it by ${c} days.`;
   
    document.querySelector(".output").innerHTML = message;
}

