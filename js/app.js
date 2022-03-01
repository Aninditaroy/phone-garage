// fetch search phone api
const searchPhones = () =>{  
    const inputField = document.getElementById('input-field');
    const inputText = inputField.value;
    inputField.value = '';
    const url = (`https://openapi.programming-hero.com/api/phones?search=${inputText}`);
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhones(data.data));
}
// display phones card
const displayPhones = phones =>{
    console.log(phones);
    const displayPhoneContainer = document.getElementById('display-phones');
    displayPhoneContainer.textContent = '';
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card mt-4 mb-4 g-4 w-100 h-100 shadow-lg">
          <div class="text-center mt-4">
              <img src="${phone.image}" class="card-img-top w-50" alt="...">
          </div>
          <span class="mt-4 border-2 border-top ms-5 me-5 border-dark"></span>
          <div class="card-body">
            <h4 class="card-title text-center">${phone.phone_name}</h4>
            <h5 class="card-text text-center text-muted">${phone.brand}</h5>
          </div>
          <div class="border-0 text-center mb-4">
            <button class="btn btn-dark rounded-pill">See Details</button>
          </div>
        </div>
        `;
        displayPhoneContainer.appendChild(div);
    });
}