// Assignment Code
var generateBtn = document.querySelector("#generate");

// Add event listener to generate button
generateBtn.addEventListener("click", generatePasswordAndUpdate);

// custom user exception for validating input
function UserException(message) {
    this.message = message;
    this.name = 'UserException';
}

// custom user exit exception for when they cancel a prompt etc
function UserExit(exitPoint){
    this.name = 'UserExit';
    this.state = exitPoint;
}

// validation function for testing user input is a number
// following stack over flow article on numeric validation quirks of coercion
// https://stackoverflow.com/questions/18082/validate-decimal-numbers-in-javascript-isnumeric
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}


function generateRandomIntFromRange(min, max){
    return Math.floor(math.random()*(max-min+1)+min);
}

function Spec () {
    // initial spec object defaults
    this.length = undefined;
    this.lower = true;
    this.upper = false;
    this.numeric = false;
    this.special = false;
    this.letterSpace = [];
    this.password = undefined;
    this.specialSet = ['"',' ','!','"','#','$','%','&',"'",'(',')','*','+',','
        ,'-','.','/',':',';','<','=','>','?','@','[','\\',']','^','_','`','{','|','}','~'];
    this.lowerSet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q',
        'r','s','t','u','v','w','x','y','z'];
    this.upperSet = this.lowerSet.toUpperCase();
    this.numberSet = [0,1,2,3,4,5,6,7,8,9]

    // get the length of the password
    this.getLengthFromUser = function(){
        /* This function will continuously attempt to get a correct user input as a valid range integer
        and it will console log any NEW incorrect user action, it doesn't log the user doing the same mistake twice */

        // get user input with guiding default
        userLengthText = prompt('How long should the password be?', '8-128');

        // case where user cancels prompt, state is 'length collection'
        if (userLengthText === null){
            throw new UserExit('Length Collection');
        }

        // get user length int
        userLengthInt = parseInt(userLengthText, 10);

        // validate user entered a number
        if (isNumeric(userLengthInt) === false){
            console.log(`User entered: ${userLengthText} which failed the numeric test`);
            alert("Your input wasn't a number, try again");
            // try again to get details from user
            this.getLengthFromUser();
        }

        // validate user input range
        // if number too small
        if (userLengthInt < 8){
            console.log(`User entered: ${userLengthInt} which was too small`);
            alert("Your number was too small, try again");
            // try again to get details from user
            this.getLengthFromUser();

            // if number too big
        } else if (userLengthInt > 128){
            console.log(`User entered: ${userLengthInt} was too big`);
            alert("Your number was too big, try again");
            // try again to get details from user
            this.getLengthFromUser();

            // success case
        } else {
            this.length = userLengthInt;
        }
    };

    // get user preference for lower case
    this.getLowerFromUser = function (){
        /* This function simply gets and logs user input for boolean */

        // get user input with guiding default
        userUseLower = confirm('Should Lower case letters be included?');

        console.log(`User opted for: ${userUseLower} to using lower case letters`);

        this.lower = userUseLower;

    }

    // get user preference for upper case
    this.getUpperFromUser = function (){
        /* This function simply gets and logs user input for boolean */
        userUseUpper = confirm('Should Upper case letters be included?');

        console.log(`User opted for: ${userUseUpper} to using upper case letters`);

        this.upper = userUseUpper;

    }

    // get user preference for numerics
    this.getNumericFromUser = function(){
        /* This function simply gets and logs user input for boolean */
        userUseNumeric = confirm('Should numbers be included?');

        console.log(`User opted for: ${userUseNumeric} to using numbers`);

        this.userUseNumeric;

    }

    // get user preference for special characters
    this.getSpecialFromUser = function(){
        /* This function simply gets and logs user input for boolean */
        userUseSpecial = confirm('Should special characters be included?');

        console.log(`User opted for: ${userUseSpecial} to using special characters`);

        this.special = userUseSpecial;

    }

    // get user details method
    this.getUserInput = function() {
        this.getLengthFromUser();
        this.getLowerFromUser();
        this.getUpperFromUser();
        this.getNumericFromUser();
        this.getSpecialFromUser();
    }

    // generate a word space given spec values
    this.generateLetterSpace = function(){
        // if lower case is available
        if (this.lower){
            // add lower case letters to the letter space
            this.letterSpace.append(this.lowerSet);
        }
        // if upper case is available
        if (this.upper){
            // add lower case letters to the letter space
            this.letterSpace.append(this.upperSet);
        }
        // if numerics are available
        if (this.numeric){
            // add numbers to the letter space
            this.letterSpace.append(this.numberSet);
        }
        // if special chars are available
        if (this.special){
            // add lower case letters to the letter space
            this.letterSpace.append(this.specialSet);
        }
    }

    this.chooseFromLetterSpace = function (){
        // generate a random number in the range of 0 to length of letter space - start at 0 for array indexing
        let index = generateRandomIntFromRange(0, this.letterSpace.length);
        // return this letter
        return this.letterSpace[index];
    }

    // generate password from spec
    this.generatePassword = function(){
        // make letter space
        this.generateLetterSpace();

        // loop through length and randomly select a letter from letter space
        for (let i=0; i < this.length; i++){
            this.password += this.chooseFromLetterSpace();
        }
    }

    // Write password to the #password input
    this.writePassword = function (password) {
        var passwordText = document.querySelector("#password");
        passwordText.value = this.password;
    }


}

// Generate Password main function
function generatePasswordAndUpdate() {
    try {
        // create a new spec object
        let spec = new Spec();

        // get user details
        spec.getUserInput();

        // generate new password
        spec.generatePassword();

        // update html #password input element with result
        spec.writePassword();

    // if the user exits the program early
    } catch(error) {
        if (error.name === 'UserExit'){
            console.log(`User exited at: ${error.state}`);
        }
    }
}