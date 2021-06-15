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


// Generate Password main function
function generatePasswordAndUpdate() {
    try {
        // get user details
        let validated_spec = getUserSpecifications();

        // generate new password
        let password = generatePasswordFromSpec(validated_spec);

        // update html #password input element with result
        writePassword(password);

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
    // initial spec object defaults
    spec = {'length': undefined,
            'lower':true,
            'upper':false,
            'numeric':false,
            'special':false};

    spec.length = getLengthFromUser();

    return spec
}

// get password length spec
function getLengthFromUser(){
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
        getLengthFromUser();
    }

    // validate user input range
    // if number too small
    if (userLengthInt < 8){
        console.log(`User entered: ${userLengthInt} which was too small`);
        alert("Your number was too small, try again");
        // try again to get details from user
        getLengthFromUser();

    // if number too big
    } else if (userLengthInt > 128){
        console.log(`User entered: ${userLengthInt} was too big`);
        alert("Your number was too big, try again");
        // try again to get details from user
        getLengthFromUser();

    // success case
    } else {
        return userLengthInt;
    }
}


// generate password from spec
function generatePasswordFromSpec(spec){
    console.log('logging spec instead of generating password',spec)
}


// Write password to the #password input
function writePassword(password) {
    var passwordText = document.querySelector("#password");
    passwordText.value = password;
}
