/*About the game:
the board with 8 elements will show random colors
for 2 seconds, and than the user will have
10 seconds to click on the colors that he saw on the 
game board above. */



//fetch the relevant divs:
//fetch geme button
var button = document.querySelector('.btn'),
    buttuonText = document.querySelector('.p'),
    //fetch color generate button
    buttonTwo = document.querySelector('.btn2'),
    //fetch the color board (8 div's)
    colorItems = document.querySelectorAll('.color-item'),
    //fetch the main color that gonne be shown
    mainColors = Array.from(document.querySelectorAll('.colors'));
/* creat random array from the 256 rgb colors, this gonne be push to the color board 
section, 8 divs*3 number =24*/
rgbNums = [];
for (var i = 0; i < 24; i++) { rgbNums.push(Math.floor(Math.random(256) * 256)) }
//create event listeners for the buttons, and write their functions
buttonTwo.addEventListener('click', setBoardColors)
button.addEventListener('click', function () {

    generateColors();

    show();

    compare();
    //time out function to remove classes from matched elements so the user wont have to refrash the game
    setTimeout(() => {
        for (var i = 0; i < colorItems.length; i++) {
            colorItems[i].classList.remove('added')
        }

    }, 9000);

});
/* this function gonne show a random colors on the color board section(all of the 256 rgb optional)*/
function setBoardColors() {
    for (var i = 0; i < colorItems.length; i++) {
        colorItems[i].style.backgroundColor = "rgb(" + rgbNums[Math.floor(Math.random(24) * 24)] + ","
            + rgbNums[Math.floor(Math.random(24) * 24)] + "," + rgbNums[Math.floor(Math.random(24) * 24)] + ")"
    }
}

// the main color section (3 elements) gonne inherit random colors from the board section
function generateColors() {
    for (var i = 0; i < mainColors.length; i++) {

        mainColors[i].style.backgroundColor = colorItems[Math.floor(Math.random() * 8)].style.backgroundColor

    }

};
// we want the color to disappear after 4 second, so:
function show() {

    setTimeout(() => {
        {
            for (var i = 0; i < 3; i++) {

                mainColors[i].style.backgroundColor = "transparent"
                mainColors[i].classList.add("added")
            }
        }
    }, 3000);
}
// compare the background color of the elements and add a class to the one that matched
function compare() {

    for (var i = 0; i < colorItems.length; i++) {
        if (colorItems[i].style.backgroundColor === mainColors[0].style.backgroundColor) {
            colorItems[i].classList.add("added")
        }
        else if (colorItems[i].style.backgroundColor === mainColors[1].style.backgroundColor) {
            colorItems[i].classList.add("added")
        }
        else if (colorItems[i].style.backgroundColor === mainColors[2].style.backgroundColor) {
            colorItems[i].classList.add("added")
        }
    }
};
//creat tow counter (will check if the user clicked the right/wrong answer)
var counter = 0;
var counterNegative = 0;
//create event listener on each of the color board elements
colorItems.forEach(function (elem) {
    elem.addEventListener('click', function () {
        //statement to check if there is a match between the clicked and the relevent colors:
        // case of choosing right colors:
        if ($(elem).hasClass("added")) {

            ++counter
            if (counter === 3) {
                //reset counter and print result
                counter = 0;
                counterNegative = 0;

                button.style.backgroundColor = "gold";
                buttuonText.style.color = "black";
                buttuonText.innerHTML = "Winner!!!"
                //time out function for canceling the css changes
                setTimeout(() => {
                    button.style.backgroundColor = null;
                    buttuonText.style.color = null;
                    buttuonText.innerHTML = 'Lets Play!';
                }, 2500);
            }

        }
        //case of choosing wrong colors (this one includes jQuery)
        if (!$(elem).hasClass("added")) {
            ++counterNegative
            //reset counter and print result
            if (counterNegative === 1) {
                counterNegative = 0;
                counter = 0;

                button.style.backgroundColor = "black";
                buttuonText.style.color = "red";
                buttuonText.innerHTML = "looser!!!"
                //time out function for canceling the css changes
                setTimeout(() => {
                    button.style.backgroundColor = null;
                    buttuonText.style.color = null;
                    buttuonText.innerHTML = 'Lets Play!';
                }, 2500);
            }

        }
    });
});





