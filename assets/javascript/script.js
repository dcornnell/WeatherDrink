$(document).ready(function () {
    $(document).foundation();
    //randomly picking a location
    //let pHLocations = ["Atlanta, GA", "Tampa, Florida", "New York, NY", "Denver, CO"];
    //randomly creating weather condition
    let pHConditions = [{
        "description": "sun",
        "conditionIcon": "wi-day-sunny",
        "background": "sunny"
    },

    {
        "description": "rain",
        "conditionIcon": "wi-day-thunderstorm",
        "background": "rainy"
    },

    {
        "description": "snow",
        "conditionIcon": "wi-day-snow-wind",
        "background": "snowy"
    },

    {
        "description": "cloud",
        "conditionIcon": "wi-day-cloudy",
        "background": "cloudy"
    }
    ]



    let condDisplay = pHConditions[randomize(0, pHConditions.length)];





    $("body").addClass(condDisplay.background)
    $("#condition").addClass(condDisplay.conditionIcon)

    var APIKey = "3cc9b3772873588eb5472e5de97869f4";
    // var queryURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q="  + "&appid=" + APIKey

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longintude = position.coords.longitude;
            var queryURL = "http://api.openweathermap.org/data/2.5/weather?units=imperial&lat=" + latitude + "&lon=" + longintude + "&appid=" + APIKey

            $.ajax({
                url: queryURL,
                method: "GET"
            })

                .then(function (response) {
                    console.log(queryURL);
                    console.log(response);

                    //$(".city").append("City:" + response.name);
                    $("#location").text(response.name);
                    $("#cloud").text(response.clouds.all);
                    $("#wind").text(response.wind.speed);
                    $("#humidity").text(response.main.humidity);
                    $("#temperature").text(response.main.temp);
                    //$(".temp").text("Temperature (F)" + response.main.temp);

                    console.log("Wind:" + response.main.wind);
                    console.log("Humidity:" + response.main.humidity);
                    console.log("Temperature (F):" + response.main.temp);
                    console.log("Cloud:" + response.main.cloud);
                    console.log("City:" + response.main.city);

                });
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }

    //functions
    // function for random
    function randomize(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;

        const currWeather = ["hot", "cloudy", "norain"];

        function getIngredient(weather) {

            const ingredientsToWeather = {
                vodka: { hot: 6, cold: 7, rainy: 6, norain: 5, cloudy: 11, sunny: 6 },
                gin: { hot: 7, cold: 6, rainy: 9, norain: 4, cloudy: 10, sunny: 7 },
                whiskey: { hot: 4, cold: 9, rainy: 7, norain: 11, cloudy: 7, sunny: 5 },
                rum: { hot: 9, cold: 4, rainy: 5, norain: 12, cloudy: 8, sunny: 11 }
            };

            const ingredientScores = {};

            for (let ingr in ingredientsToWeather) {

                for (let weatherType of weather) {
                    if (!ingredientScores[ingr]) {
                        ingredientScores[ingr] = 0;
                    }
                    ingredientScores[ingr] += ingredientsToWeather[ingr][weatherType];
                }
            }

            let winningIngr;
            let winningScore = 0;
            for (let ingr in ingredientScores) {

                if (ingredientScores[ingr] > winningScore) {
                    winningScore = ingredientScores[ingr];
                    winningIngr = ingr;
                }
            }
            return winningIngr;
        }

        const bestIngredient = getIngredient(currWeather);
        console.log(bestIngredient);

        var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + bestIngredient;
        var Cocktails = []
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {


            const drink = response.drinks;
            var n = drink.length;
            const random = Math.floor(Math.random() * n);
            specific = drink[random];
            var specificId = specific.idDrink;
            console.log(specificId);

            var queryURL2 = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + specificId;

            $.ajax({
                url: queryURL2,
                method: "GET"
            }).then(function (response) {
                console.log(response)
                let index = 1;
                let ingredientArray = [];
                let drinkagain = response.drinks[0]
                while (drinkagain['strIngredient' + index]) {
                    ingredientArray.push({ name: drinkagain['strIngredient' + index], amount: drinkagain['strMeasure' + index] ? drinkagain['strMeasure' + index] : "A dash " });
                    index++;
                }
                console.log('Drink: ', drinkagain.strDrink);
                console.log('Ingredients: ');
                console.log(ingredientArray);

            });
        });