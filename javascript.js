$(document).ready(function () {

    var displayResult = document.getElementById("convertedSummary");

    displayResult.style.display = "none";

    var initialBox = document.getElementById("inputType");

    var convertBox = document.getElementById("toBeConverted");


    addValuesToSelect(initialBox, convertBox);

    var clear = document.getElementById("reset");

    var convertButton = document.getElementById("convertCurrency");

    var inputValue = document.getElementById("currencyValue");

    convertButton.addEventListener("click", function () {

        var value = inputValue.value;

        var initType = initialBox.options[initialBox.selectedIndex].value;

        var convertType = convertBox.options[convertBox.selectedIndex].value;



        if (!(value === "" || initType === "null" || convertType === "null")) {

            requestToServer(initType, convertType, value);

            var spinner = document.getElementById("spinner");
            spinner.style.display = "block";

            clear.style.display = "inline";

            convertButton.style.display = "none";

            initialBox.disabled = true;
            convertBox.disabled = true;

            inputValue.disabled = true;

        } else {
            alert("Please fill and select all the details...!");
        }

    });

    clear.addEventListener("click", function () {

        clear.style.display = "none";

        inputValue.value = "";

        convertButton.style.display = "inline";

        displayResult.style.display = "none";

        inputValue.disabled = false;

        initialBox.disabled = false;
        convertBox.disabled = false;

        initialBox.selectedIndex = 0;

        convertBox.selectedIndex = 0;
    });

});


function requestToServer(initial, final, value) {

    var httpObject = new XMLHttpRequest();

    var address = "https://api.exchangeratesapi.io/latest?base=" + initial;

    httpObject.open("GET", address, true);

    httpObject.send();

    httpObject.onreadystatechange = function () {

        if (this.readyState === 4 && this.status === 200) {
            setValues(this.responseText, initial, final, value);

        }

    }

}

function setValues(response, init, final, value) {
    var jsonObject = JSON.parse(response);

    var convertValue = jsonObject["rates"][final];

    display(convertValue, value, init, final);

}

function display(resultValue, value, init, final) {
    console.log(resultValue, value);

    var result = Number(resultValue) * Number(value);

    var card1 = document.getElementById("initialValue");

    var card2 = document.getElementById("finalValue");

    var type1 = document.getElementById("initType");

    var type2 = document.getElementById("finalType");

    card1.innerHTML = value;
    card2.innerHTML = Math.round(result).toString();

    type1.innerHTML = init;
    type2.innerHTML = final;

    var spinner = document.getElementById("spinner");
    spinner.style.display = "none";

    var displayResult = document.getElementById("convertedSummary");
    displayResult.style.display = "flex";

}


function addValuesToSelect(initialBox, convertBox) {

    var options =
        [
            {
                "text": "Choose...",
                "value": "null",
                "selected": true
            },
            {
                "text": "AUD",
                "value": "AUD",
            },
            {
                "text": "BGN",
                "value": "BGN",
            },
            {
                "text": "BRL",
                "value": "BRL"
            },
            {
                "text": "CAD",
                "value": "CAD"
            },
            {
                "text": "CHF",
                "value": "CHF"
            },
            {
                "text": "EUR",
                "value": "EUR",
            },
            {
                "text": "HKD",
                "value": "HKD"
            },
            {
                "text": "ILS",
                "value": "ILS"
            },
            {
                "text": "INR",
                "value": "INR"
            },
            {
                "text": "JPY",
                "value": "JPY"
            },
            {
                "text": "NZD",
                "value": "NZD"
            },
            {
                "text": "PHP",
                "value": "PHP"
            },
            {
                "text": "RUB",
                "value": "RUB",
            },
            {
                "text": "TRY",
                "value": "TRY",
            },
            {
                "text": "USD",
                "value": "USD",
            },

        ];


    for (var i = 0, l = options.length; i < l; i++) {
        var option = options[i];
        initialBox.options.add(new Option(option.text, option.value, option.selected));

        convertBox.options.add(new Option(option.text, option.value, option.selected));
    }

}

