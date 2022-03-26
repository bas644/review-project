// Start your code ***HERE*** =========

// Create array with all lowercase letters in the english alphabet
let charsArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

// Create array with all Uppercase letters in the english alphabet
let upperCaseArr = []
for(let i = 0; i < charsArr.length; i++){
    let uc = charsArr[i].toUpperCase();
    upperCaseArr.push(uc);
}

// Create array with all numbers from 0 - 9
let numArr = Array.from({length:10}, (v, k) => k);

// Create array with special characters returned from function
function defCustomChars(chars = '*{:<>^'){
    let cusChars = [];
    for(let i = 0; i < chars.length; i++){
        cusChars.push(chars[i])
    }
    return cusChars;
}

let specArr = defCustomChars();




// create an array with all possible character types: Uppercase, Lowercase, numbers, and symbols stored in a variable
// slight change to above.  Create array with all possible character types selected by user

const numEle = document.getElementById('numbers');
const upperEle = document.getElementById('uppercase');
const specEle = document.getElementById('specialChar');

let enforceNums = false;
let enforceUpper = false;
let enforceSpecs = false;

let selectedCharsArray = []
let selectCharsArray = () => {
    let sArr = []
    sArr = sArr.concat(charsArr)
    if(numEle.checked){
        sArr = sArr.concat(numArr); 
        enforceNums = true;  
    } else {
        enforceNums = false;
    }
    if(upperEle.checked){
        sArr = sArr.concat(upperCaseArr);
        enforceUpper = true;
    } else {
        enforceUpper = false;
    }
    if(specEle.checked){
        sArr = sArr.concat(specArr);
        enforceSpecs = true;
    } else {
        enforceSpecs = false;
    }
    selectedCharsArray = sArr;
}

numEle.addEventListener('click', selectCharsArray);
upperEle.addEventListener('click', selectCharsArray);
specEle.addEventListener('click', selectCharsArray);


let password = document.getElementById("password")


// create a global variable called "pwLength" with a number between 10 and 18
let pwLengthArr = Array.from({length:9}, (v,k) => k + 10);
const custButton = document.getElementById('charLen');
let useCustomCharLength = false;
let pwLength = pwLengthArr[Math.floor(Math.random() * 8)];
setPasswordFontsize()

function setPasswordFontsize() {
    if(pwLength >= 40){
        password.style.fontSize = '77%';
    } else if(pwLength >= 26){
        password.style.fontSize = '100%';
    } else {
        password.style.fontSize = '150%';
    }
}

function randoLen(){
    if(!useCustomCharLength){
        pwLength = pwLengthArr[Math.floor(Math.random() * 8)];
        setPasswordFontsize()
    }
}

function charLenPopUp() {
    let pwLenFailed = false
    do {
        pwLength = prompt("How many characters would you like in your password?  Please enter a number between: 6 - 49");
        if(pwLength === null){
            pwLenFailed = false
            useCustomCharLength = false
            randoLen();
        }
        else if(isNaN(parseInt(pwLength))){
            pwLenFailed = true;
            alert(`${pwLength} is not a number!`);
        } else if(parseInt(pwLength) < 6){
            pwLenFailed = true;
            alert(`${pwLength} is not enough characters to make a proper password.`);
        } else if(parseInt(pwLength) > 49){
            pwLenFailed = true;
            alert(`You don't want to spend all day typing a password that is ${pwLength} long!`);
        } else {
            pwLength = parseInt(pwLength)            
            useCustomCharLength = true;
            pwLenFailed = false;
            setPasswordFontsize()
        }
    } while (pwLenFailed);    
}

custButton.addEventListener('click', charLenPopUp);

// Using the above array and password length variable, create a random password using a for loop inside of a function called "addNewPassword" either saved as an arrow function variable or a traditional function

function addNewPassword(){
    let myPw = '';
    let verified = false;
    let lower = false;
    let upper = false;
    let num = false;
    let spec = false;
    randoLen();
    selectCharsArray();
    for(let i = 0; i < pwLength; i++){
        myPw += selectedCharsArray[Math.floor(Math.random() * (selectedCharsArray.length - 1))];
    }

    for(char in myPw){
        if(charsArr.includes(myPw[char])){
            lower = true;
        } 
        if(enforceUpper){
            if(upperCaseArr.includes(myPw[char])){
                upper = true;
            }
        } else {
            upper = true;
        }
        if(enforceNums){
            if(numArr.includes(parseInt(myPw[char]))){
                num = true;
            }
        } else {
            num = true;
        }
        if(enforceSpecs){
            if(specArr.includes(myPw[char])){
                spec = true;
            }
        } else {
            spec = true;
        }
    }
    if(lower && upper && num && spec){
        verified = true;
    }
    if(!verified){
        addNewPassword()
    }
    return myPw;
}

// ========= ⬇ DO NOT TOUCH THIS CODE ⬇ ======

let genBtn = document.getElementById("btnGen");
let buttonHandler = () => {
    password.value = addNewPassword();
};
// Event listener for generate PW button
genBtn.addEventListener("click", buttonHandler);

// ========= ⬆ DO NOT TOUCH THIS CODE ⬆ ======
