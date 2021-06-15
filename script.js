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

function Spec () {
    // initial spec object defaults
    this.length = undefined;
    this.lower = true;
    this.upper = false;
    this.numeric = false;
    this.special = false;
    this.password = undefined;

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

    // generate password from spec
    this.generatePassword = function(){
        console.log('logging spec instead of generating password', this)
    }

    // Write password to the #password input
    this.writePassword = function (password) {
        var passwordText = document.querySelector("#password");
        passwordText.value = this.password;
    }

    // get user details method
    this.getUserInput = function() {
        this.getLengthFromUser();
        this.getLowerFromUser();
        this.getUpperFromUser();
        this.getNumericFromUser();
        this.getSpecialFromUser();
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

// Get User specifications
function getUserSpecifications(){
    // using series of alerts as instructed in AC#3
    /* user conditions are:
            length: [8-128] characters
            types: lowercase[default], uppercase, numeric, and/or special chars
    */

    spec = {
        'length': undefined,
        'lower':true,
        'upper':false,
        'numeric':false,
        'special':false
    };

    spec.length = getLengthFromUser();
    spec.lower = getLowerFromUser();
    spec.upper = getUpperFromUser();
    spec.numeric = getNumericFromUser();
    spec.special = getSpecialFromUser();

    return spec
}

// // get password length spec
// function getLengthFromUser(){
//     /* This function will continuously attempt to get a correct user input as a valid range integer
//     and it will console log any NEW incorrect user action, it doesn't log the user doing the same mistake twice */
//
//     // get user input with guiding default
//     userLengthText = prompt('How long should the password be?', '8-128');
//
//     // case where user cancels prompt, state is 'length collection'
//     if (userLengthText === null){
//         throw new UserExit('Length Collection');
//     }
//
//     // get user length int
//     userLengthInt = parseInt(userLengthText, 10);
//
//     // validate user entered a number
//     if (isNumeric(userLengthInt) === false){
//         console.log(`User entered: ${userLengthText} which failed the numeric test`);
//         alert("Your input wasn't a number, try again");
//         // try again to get details from user
//         getLengthFromUser();
//     }
//
//     // validate user input range
//     // if number too small
//     if (userLengthInt < 8){
//         console.log(`User entered: ${userLengthInt} which was too small`);
//         alert("Your number was too small, try again");
//         // try again to get details from user
//         getLengthFromUser();
//
//     // if number too big
//     } else if (userLengthInt > 128){
//         console.log(`User entered: ${userLengthInt} was too big`);
//         alert("Your number was too big, try again");
//         // try again to get details from user
//         getLengthFromUser();
//
//     // success case
//     } else {
//         return userLengthInt;
//     }
// }
//
// // get user preference for lower case
// function getLowerFromUser(){
//     /* This function simply gets and logs user input for boolean */
//
//     // get user input with guiding default
//     userUseLower = confirm('Should Lower case letters be included?');
//
//     console.log(`User opted for: ${userUseLower} to using lower case letters`);
//
//     return userUseLower;
//
// }
//
// // get user preference for upper case
// function getUpperFromUser(){
//     /* This function simply gets and logs user input for boolean */
//     userUseUpper = confirm('Should Upper case letters be included?');
//
//     console.log(`User opted for: ${userUseUpper} to using upper case letters`);
//
//     return userUseUpper;
//
// }
//
// // get user preference for numerics
// function getNumericFromUser(){
//     /* This function simply gets and logs user input for boolean */
//     userUseNumeric = confirm('Should numbers be included?');
//
//     console.log(`User opted for: ${userUseNumeric} to using numbers`);
//
//     return userUseNumeric;
//
// }
//
// // get user preference for special characters
// function getSpecialFromUser(){
//     /* This function simply gets and logs user input for boolean */
//     userUseSpecial = confirm('Should special characters be included?');
//
//     console.log(`User opted for: ${userUseSpecial} to using special characters`);
//
//     return userUseSpecial;
//
// }


