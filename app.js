const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const msg = document.querySelector(".msg");


for (let select of dropdown){
    for(currcode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;
        if (select.name === "from" && currcode === "USD"){
            newOption.selected = "selected";
        } else if (select.name === "to" && currcode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }


    select.addEventListener("change", (evt) => {
updateFlag(evt.target);     
/*target is when we do some change the thing thats changed is passed to function*/
    })
}

const updateExchngRate = async () => {
const fromCurr = document.querySelector(".from select").value;
const toCurr = document.querySelector(".to select").value;

let amt = document.querySelector("form input");
let amtValue =  amt.value;
if (amtValue === "" || amtValue < 0 ){
    alert("Please enter a valid positive number.");
}



const URL = `${BASE_URL}/${fromCurr.toLowerCase()}.json`;
let respose = await fetch(URL);
const data = await respose.json();
const rate = data[fromCurr.toLowerCase()][toCurr.toLowerCase()]
const finalAmt = amtValue * rate;
msg.innerText = `${amtValue} ${fromCurr} = ${finalAmt} ${toCurr}`;
}

const updateFlag = (Element) => {
    let currcode = Element.value ;
    let countryCode = countryList[currcode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = Element.parentElement.querySelector("img");
    img.src = newSrc ;
};

btn.addEventListener("click", (evt) =>{
evt.preventDefault(); 
/*preventdefault prevents fron website's default behavior like on clicking btn the webpage refreash now everything happen acc to us*/ 

updateExchngRate();
});


window.addEventListener( "load", () => {
    updateExchngRate();
})
