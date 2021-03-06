// debug is a prameter used to log to console - global
debug = false;

// get form element in the document
let form_el = document.getElementById('user_spec_form');
form_el.addEventListener('submit', sendUserSettingsToPasswordGenerator);

// a function that returns a random int inclusively between min and max
function generateRandomIntFromRange(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

// validation function for testing user input is a number
// following stack over flow article on numeric validation quirks of coercion
// https://stackoverflow.com/questions/18082/validate-decimal-numbers-in-javascript-isnumeric
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function SpecByForm (length, lower, upper, numeric, special) {
    // initial spec object defaults
    this.debug = false;
    this.length = length;
    this.lower = lower;
    this.upper = upper;
    this.numeric = numeric;
    this.special = special;
    this.letterSpace = [];
    this.password = '';

    // predefined character sets
    this.specialSet = ['"',' ','!','"','#','$','%','&',"'",'(',')','*','+',','
        ,'-','.','/',':',';','<','=','>','?','@','[','\\',']','^','_','`','{','|','}','~'];
    this.lowerSet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q',
        'r','s','t','u','v','w','x','y','z'];
    this.upperSet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q',
        'R','S','T','U','V','W','X','Y','Z'];
    this.numberSet = ['0','1','2','3','4','5','6','7','8','9'];

    // generate a word space given spec values
    this.generateLetterSpace = function(){
        // if lower case is available
        if (this.lower){
            // add lower case letters to the letter space
            if (this.debug){
                console.log(`Letter space was:\n${this.letterSpace}`);
            }
            this.letterSpace = this.letterSpace.concat(this.lowerSet);
            if (this.debug){
                console.log(`Letter space now is:\n${this.letterSpace}`);
            }
        }
        // if upper case is available
        if (this.upper){
            // add lower case letters to the letter space
            if (this.debug){
                console.log(`Letter space was:\n${this.letterSpace}`);
            }
            this.letterSpace = this.letterSpace.concat(this.upperSet);
            if (this.debug){
                console.log(`Letter space now is:\n${this.letterSpace}`);
            }
        }
        // if numerics are available
        if (this.numeric){
            // add numbers to the letter space
            if (this.debug){
                console.log(`Letter space was:\n${this.letterSpace}`);
            }
            this.letterSpace = this.letterSpace.concat(this.numberSet);
            if (this.debug){
                console.log(`Letter space now is:\n${this.letterSpace}`);
            }
        }
        // if special chars are available
        if (this.special){
            // add lower case letters to the letter space
            if (this.debug){
                console.log(`Letter space was:\n${this.letterSpace}`);
            }
            this.letterSpace = this.letterSpace.concat(this.specialSet);
            if (this.debug){
                console.log(`Letter space now is:\n${this.letterSpace}`);
            }
        }

        if (this.debug){
            console.log(`Letter space is:\n${this.letterSpace.length} letters long`);
        }

    };

    // randomly generate an index and select from letter space
    this.chooseFromLetterSpace = function (){
        // generate a random number in the range of 0 to length of letter space - start at 0 for array indexing
        // limit range by 1 to avoid overflow
        let index = generateRandomIntFromRange(0, this.letterSpace.length-1);

        // debugging output
        if (this.debug){
            console.log(`Random Index: ${index} Random Letter: ${this.letterSpace[index]}`)
        }

        // return this letter
        return this.letterSpace[index];
    };

    // generate password from spec
    this.generatePassword = function(){

        // make letter space
        this.generateLetterSpace();

        // loop through length and randomly select a letter from letter space
        for (let i=0; i < this.length; i++){
            newChar = this.chooseFromLetterSpace();
            this.password += newChar;
            if (this.debug){
                console.log(`Added ${newChar} to password`);
            }
        }
    };

    // Write password to the #password input
    this.writePassword = function () {
        var passwordText = document.querySelector("#password");
        passwordText.value = this.password;
    };

    // main function caller
    this.run = function(){
        this.generateLetterSpace();
        this.generatePassword();
        this.writePassword();
    }
}

function sendUserSettingsToPasswordGenerator(e){
    e.preventDefault();
    let elements = (this.elements);
    let length = elements.i_length.value;
    let lower = elements.i_lower.checked;
    let upper = elements.i_upper.checked;
    let numeric = elements.i_numbers.checked;
    let special = elements.i_special.checked;

    // validating user entry
    // Case for if user selects no to all types
    if (!lower && !upper && !numeric && !special){
        alert('You left me no choice, I have to use lower case at least')
        // override true in the spec
        lower = true;

        // set lower button to checked for good aesthetics
        elements.i_lower.checked = true;
    }
    // validating user parsed in a valid number
    if(validateUserLength(length)){
        let spec = new SpecByForm(length, lower, upper, numeric, special);
        if (debug) {
            console.log('the spec parsed in was:', spec);
        }
        spec.run();
    }

    // copy the password to the clipboard
    copyPasswordToClipboard();
}

// returns boolean for valid user input
function validateUserLength(userLengthText){

    // get user length int
    userLengthInt = parseInt(userLengthText, 10);

    // validate user entered a number
    if (isNumeric(userLengthInt) === false){
        if (debug) {
            console.log(`User entered: ${userLengthText} which failed the numeric test`);
        }
        alert("Your length input wasn't a number, try again");
    }

    // validate user input range
    // if number too small
    else if (userLengthInt < 8){
        if (debug) {
            console.log(`User entered: ${userLengthInt} which was too small`);
        }
        alert("Your number was too small, try again");

    // if number too big
    } else if (userLengthInt > 128){
        if (debug) {
            console.log(`User entered: ${userLengthInt} was too big`);
        }
        alert("Your number was too big, try again");

    // success case
    } else {
        return true;
    }
}


// copy the password text to clipboard
function copyPasswordToClipboard(){

    let passwordField = document.getElementById('password');
    passwordField.select();

    document.execCommand('copy');

    // remove the previous footnote
    let footer = document.getElementById('footer');
    footer.innerHTML= '';

    // create new footnote
    let text = document.createTextNode('text copied to clipboard');
    text.id='footnote';

    // append new footnote
    footer.appendChild(text);

}


// multiple color schemes - using https://www.w3schools.com/css/css3_variables_javascript.asp
// added this by dynamically chaning the :root element in the css with javascript
let primaries = ['#FF7F60','#8DA4CF','#F22738','#2E4159','#D93662']
let secondaries = ['#FFB26D','#9EA9CE','#A63247','#51718C','#3A3873']
let tertiaries = ['#FDD272', '#B7B3CC', '#3E3740', '#698FB6', '#04BFAD']
let quaternaries = ['#3EB2A2', '#E2C3CC', '#F2DDD0', '#91B7D9', '#F2AF5C']
let quinaries = ['#385663', '#F8CACC', '#F2F2F2', '#E4E4E4', '#F2695C']

// get the change color button as element
let changeC = document.getElementById('change_color_button');

// add event listener to color change button
changeC.addEventListener('click', shuffleColorScheme);

// change colors in :root dom element
function shuffleColorScheme(){
    // get the style variables in root
    let r = document.querySelector(':root');
    // get the computed style of that element
    let rs = getComputedStyle(r);
    // get the index in the primaries array from the current style value
    let currentIndex = getCurrentPrimaryScheme(rs.getPropertyValue('--primary'));
    // increment
    let newIndex = currentIndex + 1;

    // make sure no overload
    if (newIndex === primaries.length){
        newIndex=0;
    }

    // set all the properties to the new index
    r.style.setProperty('--primary', primaries[newIndex]);
    r.style.setProperty('--secondary', secondaries[newIndex]);
    r.style.setProperty('--tertiary', tertiaries[newIndex]);
    r.style.setProperty('--quaternary', quaternaries[newIndex]);
    r.style.setProperty('--quinary', quinaries[newIndex]);

}

// get current primary value index from color schemes - figure out where the current scheme is in the arrays
function getCurrentPrimaryScheme(colorCode) {
    return primaries.findIndex(x => x === colorCode);
}