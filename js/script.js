function searchFunction() {
    document.getElementById('foodList').innerHTML = '';
    document.getElementById('foodDetails').innerHTML = '';

    const keyword = document.getElementById('search-input').value;

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`)
        .then(res => res.json())
        .then(data => displayData(data));
}


function displayData(data) {
    document.getElementById('foodList').innerHTML = '';
    document.getElementById('foodDetails').innerHTML = '';
    console.log(data);
    if (data.meals == null) {
        document.getElementById('foodDetails').innerHTML = `
                    <h3 class="empty-meal">Sorry! Search again!</h3>
                `
    }
    else {
        data.meals.forEach(food => {
            const title = food.strMeal;
            const thumbNail = food.strMealThumb;
            const idMeal = food.idMeal;
        
            document.getElementById('foodList').innerHTML += `
                                <div onclick="showDetails(${idMeal})" class="card" style="width: 18rem;">
                                    <img src="${thumbNail}" class="card-img-top" alt="...">
                                    <div class="card-body">
                                        <p class="card-text" style="color:black">${title}</p>
                                    </div>
                                </div>
                    `
        });
    }
}


function showDetails(id) {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => foodDetails(data.meals[0]));
}


const foodDetails = food => {
    document.getElementById('foodDetails').innerHTML = '';

    document.getElementById('foodDetails').innerHTML += `
    <div class="after-click-details">
        <img src="${food.strMealThumb}" class="card-img-top" alt="...">
        <div class = "ingredientList">
            <h3>${food.strMeal} (<em>${food.strArea}</em>)</h3>
            <br>
            <h5>Ingredients</h5>
            <ul>
                <li>${food.strMeasure1} ${food.strIngredient1}</li>
                <li>${food.strMeasure2} ${food.strIngredient2}</li>
                <li>${food.strMeasure3} ${food.strIngredient3}</li>
                <li>${food.strMeasure4} ${food.strIngredient4}</li>
                <li>${food.strMeasure5} ${food.strIngredient5}</li>
                <li>${food.strMeasure5} ${food.strIngredient6}</li>
            </ul>
        </div>
    </div>
    `
}