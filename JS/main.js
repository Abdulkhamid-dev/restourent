var modal = document.getElementById("myModal");
var modalUpdate = document.getElementById("myModalSecond");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
var spanUpdate = document.getElementsByClassName("closeUpdate")[0];
let editForm = document.getElementById('formFoodUpdate')

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


var foodName = document.getElementById('foodName')
var price = document.getElementById('price')
var description = document.getElementById('descp')
var category = document.getElementById('inpSelect')
var imgLink = document.getElementById('imgSrc')
var foodList = document.getElementById('cardsBlock')
var foodForm = document.getElementById('formFood')

foodForm.onsubmit = function (e) {
  e.preventDefault()

  let dataBase;
  if (localStorage.dataBase) {
    dataBase = JSON.parse(localStorage.getItem("dataBase"));
  } else {
    dataBase = [];
  }
  var formData = {
    foodName: foodName.value,
    price: price.value,
    description: description.value,
    category: category.value,
    imgLink: imgLink.value,
    id: Date.now()
  }
 console.log(formData)
  dataBase.push(formData);
  localStorage.setItem('dataBase', JSON.stringify(dataBase))
  console.log(dataBase)

 foodName.value = ''
 price.value = ''
 description.value = ''
 category.value = ''
 imgLink.value = ''
setInterval(rendering(), 500);
}

this.onload = () => {
  rendering();
  if (localStorage.getItem('dataBase')) {
    let getDataFromLocalStorage = localStorage.getItem('dataBase')
  let parsingData = JSON.parse(getDataFromLocalStorage)
  let newArr = parsingData.reduce((acc, cal) => {
    acc.push(cal.price)
    console.log(acc);
  },[])
  // let priceArr =  parsingData.filter(item => item.price = item.price) 
  // console.log(priceArr);
  }
}
function rendering() {
  foodList.innerHTML = '';
  let getDataFromLocalStorage = localStorage.getItem('dataBase')
  let parsingData = JSON.parse(getDataFromLocalStorage)
  console.log(parsingData);
  if (localStorage.getItem('dataBase')) {
    parsingData.forEach(item => {
      const {foodName, imgLink, price, description, id, category} = item
      foodList.innerHTML += `
      <div class="main_card">
      <div class="top_card" style="background-image: url(${imgLink});">
      </div>
      <div class="info_card">
          <h3>${foodName}</h3>
          <p>Free delivery</p>
      </div>
      <div class="footer_card" id='${id}'>
          <span class="rate"><i class="fas fa-star"></i>$ ${price}</span> <span class="categories_info"><img src="ASSETS/img/category.svg" alt=""><p>${category}</p></span><span class="deliver_info"><img src="ASSETS/img/Delivery.svg" alt=""><p>20-30 min</p></span><span class='editSpan'><i class="far fa-trash-alt" onclick="deleteEach(this)"></i><i class="far fa-edit" onclick='update(${id})'></i></span>
      </div>
  </div>
      `
    })
  } else{
    foodList.innerText = 'There is no information'
  }
    modal.style.display = "none"; 
}

function deleteEach(element) {
  element.parentElement.parentElement.parentElement.remove()
  let elId = element.parentElement.parentElement.id
  let arrParse = JSON.parse(localStorage.getItem('dataBase'))
  let deletedArr = arrParse.filter((i) => i?.id.toString() !== elId)
  localStorage.setItem('dataBase', JSON.stringify(deletedArr))
}

function update(el) {
  var foodName = document.getElementById('foodNameUpdate')
  var price = document.getElementById('priceUpdate')
  var description = document.getElementById('descpUpdate')
  var category = document.getElementById('categoryUpdate')
  var imgLink = document.getElementById('imgSrcUpdate')
  var updateForm = document.getElementById('formFoodUpdate')
    // let updateForm = document.getElementById('formFoodUpdate')
  
    let eachElId = el
    var formParse = JSON.parse(localStorage.getItem("dataBase"));
    console.log(formParse);
    var formFind = formParse.find((item) => item.id === eachElId);
    updateForm.className = formFind.id
    foodName.value = formFind.foodName
    price.value = formFind.price
    imgLink.value = formFind.imgLink
    description.value = formFind.description
    category.value = formFind.category
   console.log(updateForm.className);
    modalUpdate.style.display = 'block'
  
  spanUpdate.onclick = function() {
    modalUpdate.style.display = 'none'
  }
  }


  editForm.onsubmit = (e) => {
  e.preventDefault()
  let itemId = document.getElementById('formFoodUpdate').getAttribute('class')
  console.log(itemId);
  let dataBase = JSON.parse(localStorage.getItem('dataBase') || '[]')
  var foodName = document.getElementById('foodNameUpdate').value
var price = document.getElementById('priceUpdate').value
var description = document.getElementById('descpUpdate').value
var category = document.getElementById('categoryUpdate').value
var imgLink = document.getElementById('imgSrcUpdate').value

let formFind = dataBase.find((item) => item.id == itemId)
formFind.foodName = foodName;
formFind.price = price;
formFind.description = description;
formFind.category = category;
formFind.imgLink = imgLink;

localStorage.setItem('dataBase', JSON.stringify(dataBase))
JSON.parse(localStorage.getItem('dataBase'))
modalUpdate.style.display = 'none'
rendering()
}

function renderByCategory(str) {
  let getDataFromLocalStorage = localStorage.getItem('dataBase')
  let parsingData = JSON.parse(getDataFromLocalStorage)
  if (localStorage.getItem('dataBase')) {
    let eachCategoryArr = parsingData.filter(item => item.category === str)
    console.log(eachCategoryArr);
    foodList.innerHTML = '';
  eachCategoryArr.forEach((item) => {
    const {foodName, imgLink, price, description, category, id} = item
    foodList.innerHTML += `
    <div class="main_card">
    <div class="top_card" style="background-image: url(${imgLink});">
    </div>
    <div class="info_card">
        <h3>${foodName}</h3>
        <p>Free delivery</p>
    </div>
    <div class="footer_card" id='${id}'>
        <span class="rate"><i class="fas fa-star"></i>$ ${price}</span> <span class="categories_info"><img src="ASSETS/img/category.svg" alt=""><p>${category}</p></span><span class="deliver_info"><img src="ASSETS/img/Delivery.svg" alt=""><p>20-30 min</p></span><span class='editSpan'><i class="far fa-trash-alt" onclick="deleteEach(this)"></i><i class="far fa-edit" onclick='update(${id})'></i></span>
    </div>
</div>
    `;
  })
} else {
  foodList.innerText = 'There is no information'
}
}

const sortPrice = (num, num2) => {
  let getDataFromLocalStorage = localStorage.getItem('dataBase')
  let parsingData = JSON.parse(getDataFromLocalStorage)
  if (localStorage.dataBase) {
    let sort = parsingData.filter(item => item.price >= num && item.price <= num2)
    console.log(sort)
    foodList.innerHTML = ''
    sort.forEach((item) => {
      const {foodName, imgLink, price, description, category, id} = item
      foodList.innerHTML += `
      <div class="main_card">
      <div class="top_card" style="background-image: url(${imgLink});">
      </div>
      <div class="info_card">
          <h3>${foodName}</h3>
          <p>Free delivery</p>
      </div>
      <div class="footer_card" id='${id}'>
          <span class="rate"><i class="fas fa-star"></i>$ ${price}</span> <span class="categories_info"><img src="ASSETS/img/category.svg" alt=""><p>${category}</p></span><span class="deliver_info"><img src="ASSETS/img/Delivery.svg" alt=""><p>20-30 min</p></span><span class='editSpan'><i class="far fa-trash-alt" onclick="deleteEach(this)"></i><i class="far fa-edit" onclick='update(${id})'></i></span>
      </div>
  </div>
      `;
    })
  } else{
    foodList.innerText = 'There is no information'
  }
}
