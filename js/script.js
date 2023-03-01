const loadMeals = (searchText) =>{
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
    console.log(url);
    fetch(url)
    .then(res => res.json())
        .then(data => displayMeals(data.meals))
}

const displayMeals = meals => {
    // console.log(meals);
    // step 1: container element
    const mealsContainer = document.getElementById('meals-container')
    mealsContainer.innerText = '';
    meals.forEach(meal => {
        console.log(meal);
        // step 2: Create Child for each element
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col');
        // step 3: set content of the child element
        mealDiv.innerHTML = `
        <div class="card h-100">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional
                    content. This content is a little bit longer.</p>
                <button onclick="loadMealDetail(${meal.idMeal})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mealDetails">
                    Details
                    </button>
            </div>
        </div>
        `
        // step 4: append child
        mealsContainer.appendChild(mealDiv);
         
    })
}

const searchMeals = () =>{
    const searchText = document.getElementById('search-field').value;
    // search meals
    console.log(searchText);
    loadMeals(searchText);
    
    // 

}

const loadMealDetail = idMeal => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayMealsDetails(data.meals[0]))
    .catch (error => {
        console.error("Error:", error);
    })

}

const displayMealsDetails = meal => {
    document.getElementById('mealDetailsLabel').innerText = meal.strMeal;
    const mealDetais = document.getElementById('mealDetailsBody');
    mealDetais.innerHTML = `
        <img class="img-fluid" src="${meal.strMealThumb}">
    `
}



loadMeals('rice');