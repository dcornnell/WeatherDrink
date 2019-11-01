$(document).ready(function() {
    $(document).foundation();
    // this this out  first is the temp(hot or cold), (second is cloudness needs to be percent), (rain no rain)
    const currWeather = [];
    let bestIngredient = ""



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
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longintude = position.coords.longitude;
            var queryURL = "http://api.openweathermap.org/data/2.5/weather?units=imperial&lat=" + latitude + "&lon=" + longintude + "&appid=" + APIKey

            $.ajax({
                url: queryURL,
                method: "GET"
            })

            .then(function(response) {


                console.log(response);
                let hotness = isHot(response.main.temp_max)
                let cloudness = isCloudy(response.clouds.all)
                let rainyness = isRaining(response.weather[0].main)
                currWeather[0] = hotness;
                currWeather[1] = cloudness;
                currWeather[2] = rainyness;
                console.log(currWeather)
                console.log(getIngredient(currWeather));
                bestIngredient = (getIngredient(currWeather))

                $("#location").text(response.name);
                $("#cloud").text(response.clouds.all);
                $("#wind").text(response.wind.speed);
                $("#humidity").text(response.main.humidity);
                $("#temperature").text(Math.round(response.main.temp_max));

                //bring in drinks based on best ingredient
                var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + bestIngredient;
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function(response) {
                    console.log(response);
                    const drinks = response.drinks;
                    const n = drinks.length;
                    const randomIndex = Math.floor(Math.random() * n);
                    const randomDrink = drinks[randomIndex];
                    console.log(randomDrink);
                });




            });
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }

    //functions
    // function for random
    function randomize(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    //deterimes if its cloudy
    function isCloudy(input) {
        if (input > 35) {
            return "cloudy"
        } else
            return "sunny"

    }
    // determines if its hot
    function isHot(input) {
        if (input > 70) {
            return "hot"
        } else {
            return "cold"
        }
    }

    //is is raining
    function isRaining(input) {
        if (input === "Rain" || input === "Thunderstorm") {
            return "rainy"
        } else {
            return "norain"
        }
    }

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



    var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + bestIngredient;
    var Cocktails = []
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        //do something here with response
    })


})