'use strict';

// get value from cookie
const getCookie = (cName) => {
    cName = cName + '=';
    const cookieData = document.cookie;
    const start = cookieData.indexOf(cName);
    let cValue = '';
    if (start != -1) {
        start += cName.length;
        const end = cookieData.indexOf(';', start);
        if (end == -1) end = cookieData.length;
        cValue = cookieData.substring(start, end);
    }
    console.log(document.cookie);
    return cValue;
}