// Assignment Code
var form_submit = document.querySelector("#form_submit");

// Add event listener to generate button
form_submit.addEventListener("click", generatePasswordAndUpdate);

// Generate Password main function
function generatePasswordAndUpdate() {
    try {
        // create a new spec object
        let spec = new Spec(true);

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
    return Math.floor(Math.random()*(max-min+1)+min);
}

function Spec (debug) {
    // initial spec object defaults
    this.debug = debug;
    this.length = undefined;
    this.lower = true;
    this.upper = false;
    this.numeric = false;
    this.special = false;
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
        this.lower = confirm('Should Lower case letters be included?');

        console.log(`User opted for: ${this.lower} to using lower case letters`);

    }

    // get user preference for upper case
    this.getUpperFromUser = function (){
        /* This function simply gets and logs user input for boolean */
        this.upper = confirm('Should Upper case letters be included?');

        console.log(`User opted for: ${this.upper} to using upper case letters`);

    }

    // get user preference for numerics
    this.getNumericFromUser = function(){
        /* This function simply gets and logs user input for boolean */
        this.numeric = confirm('Should Numbers be included?');

        console.log(`User opted for: ${this.numeric} to using numbers`);

    }

    // get user preference for special characters
    this.getSpecialFromUser = function(){
        /* This function simply gets and logs user input for boolean */
        this.special = confirm('Should Special characters be included?');

        console.log(`User opted for: ${this.special} to using special characters`);
    }

    // get user details method
    this.getUserInput = function() {
        this.getLengthFromUser();
        this.getLowerFromUser();
        this.getUpperFromUser();
        this.getNumericFromUser();
        this.getSpecialFromUser();

        // Case for if user selects no to all types
        if (!this.lower && !this.upper && !this.numeric && !this.special){
            alert('You left me no choice, I have to use lower case at least')
            this.lower = true;
        }
    }

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
        console.log(this.password);
        var passwordText = document.querySelector("#password");
        passwordText.value = this.password;
    };
}

