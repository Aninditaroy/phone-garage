const searchPhones = () =>{  
    const inputField = document.getElementById('input-field');
    const inputText = inputField.value;
    inputField.value = '';
    const url = (`https://openapi.programming-hero.com/api/phones?search=${inputText}`);
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhones(data.data));
}
const displayPhones = phones =>{
    console.log(phones);
}