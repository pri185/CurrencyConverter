const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");

const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// to make country name and code in dropdown 
for(let select of dropdowns){
    for(Currencycode in countryList){
        let newOptions = document.createElement("option");
        newOptions.innerText = Currencycode;
        newOptions.value = Currencycode;
        // to make country at front at dropdown
        if(select.name === "from" && Currencycode === "INR"){
            newOptions.selected = "selected";
        }else if(select.name === "to" && Currencycode === "USD"){
            newOptions.selected = "selected";
        }
        select.append(newOptions);
    }
    select.addEventListener("change",(evt) =>{
        updateFlag(evt.target);
    });
}

const updateFlag = (element)=>{
    let Currencycode = element.value;
    let countryCode = countryList[Currencycode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};
btn.addEventListener("click", async (evt)=>{
    evt.preventDefault(); // process do not show after page get refresh
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if(amtval < 1 || amtval === ""){
        amtval = 1;
        amount.value = "1";
    }
    // console.log(fromCurr,toCurr);
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];

    let finalAmount = amtval * rate;
    msg.innerText = `${amtval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});



