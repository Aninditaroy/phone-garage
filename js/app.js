// display error message
const displayError = error => {
    document.getElementById('not-found-error').style.display = error;
}
const displayNoPhoneFoundError = error => {
    document.getElementById('no-phone-found').style.display = error;
}
// spinner load
const spinnerLoad = error =>{
    document.getElementById('spinner').style.display = error;
} 
// display other phone details
const otherPhoneDisplay = error => {
    document.getElementById('see-more-btn').style.display = error;
}
// fetch search phone api
const searchPhones = () => {
    const inputField = document.getElementById('input-field');
    const inputText = inputField.value;
    inputField.value = '';
    const displayPhoneContainer = document.getElementById('display-phones');
    displayPhoneContainer.textContent = '';
    const displayPhoneDetailsContainer = document.getElementById('phone-details');
    displayPhoneDetailsContainer.textContent = '';
    if (inputText === '') {
        spinnerLoad('none');
        displayError('block');
        displayNoPhoneFoundError('none');
    }
    else {
        displayError('none');
        displayNoPhoneFoundError('none');
        spinnerLoad('block');
        const url = (`https://openapi.programming-hero.com/api/phones?search=${inputText.toLowerCase()}`);
        fetch(url)
            .then(res => res.json())
            .then(data => displayPhones(data.data));
    }

}
// display phones card
const displayPhones = phones => {
    console.log(phones);
    const displayPhoneContainer = document.getElementById('display-phones');
    displayPhoneContainer.textContent = '';
    const displayPhoneDetailsContainer = document.getElementById('phone-details');
    displayPhoneDetailsContainer.textContent = '';
    let count = 20;
    if (phones.length == 0) {
        spinnerLoad('none');
        displayNoPhoneFoundError('block');
    }
    else {
        phones.slice(0, count).forEach(phone => {
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
              <div class="see-details border-0 text-center mb-4">
              <a href="#details-section"><button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-dark rounded-pill">See Details</button></a>
              
              </div>
             </div>
            </div>
            `;
            displayPhoneContainer.appendChild(div);
        });
        displayNoPhoneFoundError('none');
        spinnerLoad('none');
    }
}

// fetch phone details api
const loadPhoneDetails = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data));
}
// display phone details
const displayPhoneDetails = phone => {
    console.log(phone);
    const displayPhoneDetailsContainer = document.getElementById('phone-details');
    displayPhoneDetailsContainer.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card', 'mx-auto', 'mb-4', 'shadow-lg', 'details-card');
    div.innerHTML = `
    <div class="row g-0">
       <div class="col-sm-3 col-md-4 pe-3">
          <img src="${phone.image}" class="details-image rounded-start" alt="..."> 
       </div>        
       <div class="col-sm-9 col-md-8 mt-1">
         <div class="card-body">  
            <h4 class="card-title">${phone.name}</h4>
            <h5 class="card-text text-muted">${phone.brand}</h5> 
            <span class="card-text">Release Date: <small class="text-muted">${phone?.releaseDate || 'Comming Soon!!'}</small></span>
            </br>
            </br>
            <h6 class='text-white'><span class='bg-dark rounded text-center ps-1 pe-1'>Main Features: </span></h6>
            <span class="card-text">Storage: <small class="text-muted">${phone.mainFeatures.storage}</small></span>
            </br>
            <span class="card-text">Display Size: <small class="text-muted">${phone.mainFeatures.displaySize}</small></span>
            </br>
            <span class="card-text">Chipset: <small class="text-muted">${phone.mainFeatures.chipSet}</small></span>
            </br>
            <span class="card-text">Memory: <small class="text-muted">${phone.mainFeatures.memory}</small></span>
            </br>
            </br>
            <h5 class='text-dark'>Sensors:</h5>
            <small class="text-white bg-dark rounded text-center ps-1 pe-1">${phone?.mainFeatures?.sensors[0] || 'Adding Soon'}</small></span>
            <small class="text-white bg-dark rounded text-center ps-1 pe-1">${phone?.mainFeatures?.sensors[1] || 'Adding Soon'}</small></span>
            <small class="text-white bg-dark rounded text-center ps-1 pe-1">${phone?.mainFeatures?.sensors[2] || 'Adding Soon'}</small></span>
            <small class="text-white bg-dark rounded text-center ps-1 pe-1">${phone?.mainFeatures?.sensors[3] || 'Adding Soon'}</small></span>
            <small class="text-white bg-dark rounded text-center ps-1 pe-1">${phone?.mainFeatures?.sensors[4] || 'Adding Soon'}</small></span>
            <small class="text-white bg-dark rounded text-center ps-1 pe-1">${phone?.mainFeatures?.sensors[5] || 'Adding Soon'}</small></span>
            <h5 class='text-dark'>Others:</h5>
            <span>WLAN: <small class="text-white bg-dark rounded text-center ps-1 pe-1">${phone?.others?.WLAN || 'Not Found'}</small></span>
            <br>
            <span>Bluetooth: <small class="text-white bg-dark rounded text-center ps-1 pe-1">${phone?.others?.Bluetooth || 'Not Found'}</small></span>
            <br>
            <span>GPS: <small class="text-white bg-dark rounded text-center ps-1 pe-1">${phone?.others?.GPS || 'Not Found'}</small></span>
            <br>
            <span>NFC: <small class="text-white bg-dark rounded text-center ps-1 pe-1">${phone?.others?.NFC || 'Not Found'}</small></span>
            <br>
            <span>Radio: <small class="text-white bg-dark rounded text-center ps-1 pe-1">${phone?.others?.Radio || 'Not Found'}</small></span>
            <br>
            <span>USB: <small class="text-white bg-dark rounded text-center ps-1 pe-1">${phone?.others?.USB || 'Not Found'}</small></span>
           </div>
        </div>
    </div>
        `;
    displayPhoneDetailsContainer.appendChild(div);
}

