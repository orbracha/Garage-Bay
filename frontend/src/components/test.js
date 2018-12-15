function digital_root(n) {
    while (n > 9) {
        var strNum = n.toString();
        n = 0;
        for (var i = 0; i < strNum.length; i++) {
            n += parseInt(strNum[i]);
        }
    }
}

digital_root(46745)


function jadenCased(str) {
    var arr = str.split(' ');
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substr(1)

    }
    return arr
}

jadenCased('sdfdsf xfsdf gdf')

function solution(number) {
    var sum = 0;
    strNum = number.toString()
    var sumArr = [];
    for (let i = 1; i <= sumArr.length; i++) {
        if (i % 3 === 0) sumArr.push(i)
        else if (i % 5 === 0) sumArr.push(i)
    }
    sumArr.forEach((n) => {
        sum += n
    })
    return sum
}


// return masked string
function maskify(cc) {
    var strNum = cc.toString()

    if (strNum.length > 4) return cc;
    for (let i = 0; i < strNum.length - 4; i++) {
        strNum = '#' + strNum.substr(i + 1)

    }
    return strNum
}

maskify(545454576575)

function digPow(n, p) {
    var arr = (n).toString().split("").map(function (t) { return parseInt(t) })
    console.log(arr);
    var sum = 0;
    while (sum < n * p) {
        for (let i = 0; i < arr.length; i++) {
            sum += Math.pow[arr[i], p + i]
            if (sum % n === 0) var k = sum / n

        }
    }
    return k

}

function songDecoder(song) {
    return song.split('WUB').filter(Boolean).join(' ');
}
function songDecoder(song) {
    return song.replace(/(WUB)+/g, " ").trim()
}

function divisors(integer) {
    var res = [];
    for (let i = integer - 1; i > 1; i--) {
        if (integer % i === 0) res.push(integer / i)

    }
    return res.length ? res : (integer + " is prime")
};

function createPhoneNumber(numbers) {
    var phoneNum = '(';
    for (let i = 0; i < 3; i++) {
        phoneNum += numbers[i]
    }
    phoneNum += ') ';
    for (let i = 3; i <= 5; i++) {
        phoneNum += numbers[i]
    }
    phoneNum += '-';
    for (let i = 6; i < numbers.length; i++) {
        phoneNum += numbers[i]
    }
    return phoneNum
}

function createPhoneNumber(numbers) {
    numbers = numbers.join('')
    return '(' + numbers.substr(0, 3) + ') '
        + numbers.substr(3, 3) + '-'
        + numbers.substr(6, 4)
}

function findNb(m) {
    // your code
    var vol = 0;
    var n = 1
    while (vol < m) {
        vol += Math.pow(n, 3)
        if (vol === m) return n
        n++
    }
    return (-1);
}

function nbYear(p0, percent, aug, p) {
    // your code
    counter = 0
    while (p0 < p) {
        p0 = p0 + p0 * percent / 100 + aug
        counter++
    }
    return counter
}

function nbYear(p0, percent, aug, p) {
    for (var y = 0; p0 < p; y++) p0 = p0 * (1 + percent / 100) + aug;
    return y;
}


function comp(array1, array2) {
    //your code here
    if (array2.length !== array1.length) return false;
    for (let i = 0; i < array1.length; i++) {
        var idx = array2.indexOf(array1[i] ** 2)
        if (idx === -1) return false
        array2.splice(idx, 1)
    }

    return true
}

function comp(array1, array2) {
    if(array1 == null || array2 == null) return false;
    array1.sort((a, b) => a - b); array2.sort((a, b) => a - b);
    return array1.map(v => v * v).every((v, i) => v == array2[i]);
  }

  function alphabetPosition(text) {
    text = text.replace(/[^a-z+]+/gi, '')

    for (let i = 0; i < text.length; i++) {
        text.charAt(i).replace(text.charCodeAt(i).toString())
    }
    return text;
  }

  alphabetPosition('text4  656gytl!!') 
