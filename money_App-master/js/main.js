//елементи розрахунку бюджету
let totalBtn = document.querySelector(".s2_total-btn"),
    budgetCalc = document.querySelector(".budget_calculation"),
    extraIncomes = document.querySelector(".incomes-addit"),
    mainIncomes = document.querySelector(".incomes-main"),
    totalIncomes = document.querySelector(".total-incomes"),
    totalCosts = document.querySelector(".total-costs"),
    remains = document.querySelector(".remains");

// елементи прокрутки
let detailedCosts = document.querySelector(".detailed-costs"),
    costsBlock = document.getElementById("costs"),
    detailedIncomes = document.querySelector(".detailed-incomes"),
    incomesBlock = document.getElementById("incomes");

//елементи відкриття/закриття вікна
let addCost = document.querySelectorAll(".s2_costs-btn"),
    formBack = document.querySelector(".form-back"),
    formEnter = document.querySelector(".form_enter-costs");

//елементи вводу витрат
let addOneMoreCost = document.querySelector(".add-cost"),
    sendCosts = document.querySelector(".send-costs");

//елементи блоків витрат
let li,
    target;

// елементи створення нових інпутів
let newEnterCostName = document.createElement("input"),
    newEnterCostSum = document.createElement("input"),
    formInputs = document.querySelector(".form-inputs"),
    enterCostBlock = document.querySelector(".cost-block"),
    countOfNewInputs = 1;

//відкриття вікна
addCost.forEach(function(item){
    item.addEventListener("click", function(){
        formBack.style.display = "flex";
        target = event.target;
    });
});

// створення дод. інпутів
addOneMoreCost.addEventListener("click", function(event){
    countOfNewInputs++;
    formInputs.insertAdjacentHTML("beforeend", '<div class="cost-block"><input required maxlength="20" class="enter_costname" type="text" placeholder="Стаття витрат"/><input required class="enter_costsum" type="number" placeholder="Сума" /></div>') ;
    //встановлення макс. кіл-сті символів у інпуті number
    let enterCostSum = document.querySelectorAll(".enter_costsum");
    enterCostSum.forEach(function(item){
        item.addEventListener('input', function() {
            if (item.value > 999999999) {
                item.value = 999999999;
            }
        });
    });
    event.preventDefault();
});

//запис витрат у блоки
sendCosts.addEventListener("click", function(event){
    let enterCostName = document.querySelectorAll(".enter_costname"),
        enterCostSum = document.querySelectorAll(".enter_costsum");

    enterCostSum.forEach(function(item){
        item.addEventListener('input', function() {
            if (item.value > 999999999) {
                item.value = 999999999;
            }
        });
    });

    //перевірка на пустоту
    for (let i=0; i<countOfNewInputs; i++) {
        if (enterCostSum[i].value === '' || enterCostName[i].value === '') {
            // console.log(123);
            return;
        }        
    }

    enterCostSum.forEach(function(item, i){
        if (target.classList.contains("main")) {
            li = document.querySelector(".mainCosts-list");
        } else {
            li = document.querySelector(".additCosts-list");
        }
        li.innerHTML += '<li><span>'+enterCostName[i].value+'</span><span class="number">'+item.value+'</span><span><img class="close-img" src="./img/close.png"></img></span><br></li>';  
    });
    formInputs.innerHTML = '<div class="cost-block"><input required maxlength="20" class="enter_costname" type="text" placeholder="Стаття витрат"/><input required class="enter_costsum" type="number" placeholder="Сума" /></div>';
    countOfNewInputs = 1;
    formBack.style.display = "none";
    event.preventDefault();
});

//закриття вікна через темне поле
formBack.addEventListener("click", function(){
    countOfNewInputs = 1;
    formInputs.innerHTML = '<div class="cost-block"><input required maxlength="20" class="enter_costname" type="text" placeholder="Стаття витрат"/><input required class="enter_costsum" type="number" placeholder="Сума" /></div>';
    formBack.style.display = "none";
});

//вимикання закриття вікна через інші елементи
formEnter.addEventListener("click", function(e){
    e.stopPropagation();
});

//видалення по крестику
document.addEventListener("click", function(event) {
    let target = event.target;
    if (target.classList.contains("close-img")) {
        let parent = target.parentNode;
        parent.parentNode.remove();
    } else {
        return;
    }
});

//додавання всіх витрат
function arraySum() {
    let sum = 0,
        costsSum = document.querySelectorAll(".number");
    if (costsSum.length === 0) {
        totalCosts.innerHTML = 0;
    }
    costsSum.forEach(function(item){
        sum += Number(item.innerText);
        totalCosts.innerHTML = sum;
    });
}

//розрахунок бюджету
totalBtn.addEventListener("click", function(){
    totalIncomes.innerHTML = Number(mainIncomes.value) + Number(extraIncomes.value);
    arraySum();
    remains.innerHTML = Number(totalIncomes.innerText) - Number(totalCosts.innerText);
    budgetCalc.style.display = "flex";
});

//прокрутка до якоря
detailedCosts.addEventListener("click", function(){
    costsBlock.scrollIntoView({
        behavior: "smooth",
        block:    "center" 
    });
});

detailedIncomes.addEventListener("click", function(){
    incomesBlock.scrollIntoView({
        behavior: "smooth",
        block:    "center" 
    });
});