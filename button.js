var min = 714;
var max = 1365;

function Sleep(milliseconds) {
     return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function Click() {
     var randVal = Math.floor(Math.random() * (max - min + 1)) + min;
     await Sleep(randVal); // Pausiert die Funktion für X Millisekunden
     document.getElementsByClassName('recaptcha-checkbox-checkmark')[0].click();
     console.log('click after ' + randVal + ' milliseconds');
}

var oldOnload = window.onload;

window.onload = function () {

    if (typeof oldOnload == 'function') {
       oldOnload();
    }
       
    Click();
      
} 