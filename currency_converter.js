/*
 * ===========================================================================================
 *                                Project: Currency Converter
 *                                     Version: v1.3.1
 *                                   Author: Naman Jain
 *
 * --------------------------------------------------------------------------------------------
 *                          Description:
 *      A fast and responsive web-based currency converter
 *      that fetches real-time exchange rates using a public
 *      API. The application supports multiple currencies,
 *      theme switching, conversion history, default currency
 *      preferences, offline detection, and persistent data
 *      storage via localStorage.
 *
 *      Designed with user experience in mind, featuring
 *      auto-conversion, keyboard-friendly interactions,
 *      mobile optimizations, and clean UI transitions.
 *
 * --------------------------------------------------------------------------------------------
 *                                  Tech Stack:
 *                           HTML, CSS, JavaScript
 *                          Frankfurter Exchange Rate API
 *                                  Flags API
 *
 * ===========================================================================================
 */


//=======================================================================================
//                                       DOM Elements

const body=document.querySelector("body");
const settings=document.querySelector("#settings-logo");
const navBar=document.querySelector(".settings-section");
const themeBtn=document.querySelector("#theme");
const defCurrBtn=document.querySelector("#default-currency");
const historyBtn=document.querySelector("#history");
const clearHistoryBtn=document.querySelector("#clear-history")
const resetBtn=document.querySelector("#reset");
const aboutBtn=document.querySelector("#about");
const abtWrapper=document.querySelector(".about-wrapper");
const fromFlagimg=document.querySelector("#fromFlag");
const toFlagimg=document.querySelector("#toFlag");
const fromValue=document.querySelector(".fromValue");
const toValue=document.querySelector(".toValue");
const submitBtn=document.querySelector("#submit-btn");
const amountVal=document.querySelector("#amountVal");
const convertedAmount=document.querySelector(".convertedAmount");
const exchangeRate=document.querySelector(".exchangeRate");
const conversionWrapper=document.querySelector(".conversion-wrapper");
const swapBtn = document.querySelector("#exchange-logo");
const dateUpdation=document.querySelector(".date-updation");
const conversation=document.querySelector("#convo");
const historySection=document.querySelector(".history-section");


//=======================================================================================

//=======================================================================================
//                                    Conversation-History

function saveToLocal() {
    localStorage.setItem("history", JSON.stringify(history));
}
let history=JSON.parse(localStorage.getItem("history")) || [];


//=======================================================================================

//=======================================================================================
//                                    Settings-Section

const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  body.classList.remove("light", "dark");
  body.classList.add(savedTheme);
}

settings.addEventListener("click",()=>{
    navBar.classList.toggle("hide");
})

//--------------------------------------------------------------------------------

themeBtn.addEventListener("click",()=>{
    const isLight=body.classList.contains("light");
    if(isLight){
        body.classList.replace("light","dark");
        localStorage.setItem("theme","dark");
        
    } else{
        body.classList.replace("dark","light");
        localStorage.setItem("theme", "light");
    }
    navBar.classList.add("hide");
})

//--------------------------------------------------------------------------------

defCurrBtn.addEventListener("click", () => {
    localStorage.setItem("defaultFrom", fromValue.value);
    localStorage.setItem("defaultTo", toValue.value);
    alert("Default currency saved");
    navBar.classList.add("hide");
});

const df = localStorage.getItem("defaultFrom");
const dt = localStorage.getItem("defaultTo");
if (df && dt) {
    fromValue.value = df;
    toValue.value = dt;
    renderUI();
}

//--------------------------------------------------------------------------------

historyBtn.addEventListener("click",(e)=>{
    e.stopPropagation();
    historySection.classList.toggle("hide");
    conversation.innerText="";

    if(history.length===0){
        conversation.innerText="No history yet.";
        navBar.classList.add("hide");
        return;
    }

    history.slice(-10).reverse().forEach(item => {
        conversation.innerText +=
        `${item.convertFrom} → ${item.convertTo} | Amount: ${item.convertedAmt} ${item.convertTo}\n`;
    });

    navBar.classList.add("hide");
});

//--------------------------------------------------------------------------------

clearHistoryBtn.addEventListener("click",()=>{
    if(history.length===0){
        alert("No History yet");
        navBar.classList.add("hide");
        return;
    }
    history=[];
    alert("History deleted successfully");
    navBar.classList.add("hide");
})

//--------------------------------------------------------------------------------

resetBtn.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
  alert("Data reset successfully");
  navBar.classList.add("hide");
});

//--------------------------------------------------------------------------------

aboutBtn.addEventListener("click",(e)=>{
    e.stopPropagation();
    abtWrapper.classList.remove("hide");
    navBar.classList.add("hide");
})

abtWrapper.addEventListener("click", (e) => {
  e.stopPropagation();
});

//=======================================================================================

//=======================================================================================
//                                       UI-Flexibility using key-shortcuts

document.addEventListener("click",()=>{
    abtWrapper.classList.add("hide");
    historySection.classList.add("hide");
})

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        abtWrapper.classList.add("hide");
        historySection.classList.add("hide");
    }
});

//=======================================================================================

//=======================================================================================
//                                     Flag Image controller

const savedfrom=localStorage.getItem("from");
if(savedfrom){
    fromValue.value=savedfrom;

    const idx=fromValue.selectedIndex;
    if(idx!==-1){
        const option=fromValue.options[idx];
        fromFlagimg.src=`https://flagsapi.com/${option.dataset.country}/flat/64.png`;}
}

fromValue.addEventListener("change",()=>{
    const idx=fromValue.selectedIndex;
    if(idx===-1){return};
    
    const option=fromValue.options[idx];
    localStorage.setItem("from",fromValue.value);
    fromFlagimg.src=`https://flagsapi.com/${option.dataset.country}/flat/64.png`;
})

const savedto=localStorage.getItem("to");
if(savedto){
    toValue.value=savedto;

    const idx=toValue.selectedIndex;
    if(idx!==-1){
        const option = toValue.options[idx];
        toFlagimg.src=`https://flagsapi.com/${option.dataset.country}/flat/64.png`;}
}

toValue.addEventListener("change",()=>{
    const idx=toValue.selectedIndex;
    if(idx===-1){return};
    
    const option = toValue.options[idx];
    localStorage.setItem("to",toValue.value);
    toFlagimg.src=`https://flagsapi.com/${option.dataset.country}/flat/64.png`
})


//=======================================================================================

//=======================================================================================
//                                      Render-UI section

const getRate = async (link) => {
  const res = await fetch(link);
  const data = await res.json();
  return data;
};

async function renderUI() {
    submitBtn.disabled = false;
    submitBtn.innerText = "Get Exchange Rates";

    let changeFrom = fromValue.value;
    let changeTo = toValue.value;
    let amount = Number(amountVal.value);

    conversionWrapper.classList.remove("hide");
    exchangeRate.classList.add("hide");
    convertedAmount.classList.add("hide");

    if (amount < 0) {
        convertedAmount.innerText = "Enter a valid amount";
        convertedAmount.classList.remove("hide");
        return;
    }

    if (changeFrom === changeTo) {
        convertedAmount.innerText = "Choose different currencies";
        convertedAmount.classList.remove("hide");
        return;
    }

    submitBtn.disabled = true;
    submitBtn.innerText = "Fetching...";

    const Base_URL = `https://api.frankfurter.app/latest?from=${changeFrom}&to=${changeTo}`;

    try {
        const data = await getRate(Base_URL);

        if (!data.rates || !data.rates[changeTo]) {
            convertedAmount.innerText = "Rate unavailable";
            convertedAmount.classList.remove("hide");
            return;
        }

        const rate = data.rates[changeTo];

        dateUpdation.innerText=`Last Updated on: ${data.date}`;
        exchangeRate.classList.remove("hide");
        exchangeRate.innerText = `1 ${changeFrom} = ${rate} ${changeTo}`;

        if (amount > 0) {
            const finalAmount = amount * rate;
            const formattedAmount=finalAmount.toLocaleString(undefined,{
                minimumFractionDigits:2,
                maximumFractionDigits:2
            });
            
            convertedAmount.classList.remove("hide");
            convertedAmount.innerText = `Result: ${formattedAmount} ${changeTo}`;

            if(manualSubmit){
                history.push({
                    convertFrom: changeFrom,
                    convertTo: changeTo,
                    convertedAmt: formattedAmount,
                });

                if (history.length > 10) {
                    history.shift();}
                saveToLocal();
                manualSubmit=false;
            }
        }

    } catch (err) {
        convertedAmount.innerText = "Network error. Please try again.";
        convertedAmount.classList.remove("hide");
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = "Get Exchange Rates";
    }
}

//=======================================================================================

//=======================================================================================
//                                  History Manipulation

let manualSubmit= false;
submitBtn.addEventListener("click",()=>{
    manualSubmit=true;
    renderUI();
})

//=======================================================================================

//=======================================================================================
//                                     Auto-render UI

let debounceTimer;
amountVal.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(renderUI, 400);
});

fromValue.addEventListener("change", renderUI);
toValue.addEventListener("change", renderUI);

//=======================================================================================

//=======================================================================================
//                                         Swap Logic

swapBtn.addEventListener("click", () => {
    
    if ("vibrate" in navigator) { //only for mobile-phones
        navigator.vibrate(50);}

    const tempValue = fromValue.value;
    fromValue.value = toValue.value;
    toValue.value = tempValue;

    let fromOption = fromValue.options[fromValue.selectedIndex];
    fromFlagimg.src = `https://flagsapi.com/${fromOption.dataset.country}/flat/64.png`;

    let toOption = toValue.options[toValue.selectedIndex];
    toFlagimg.src = `https://flagsapi.com/${toOption.dataset.country}/flat/64.png`;

    localStorage.setItem("from", fromValue.value);
    localStorage.setItem("to", toValue.value);

    renderUI();
});

//=======================================================================================

//=======================================================================================
//                                        ONLINE/OFFLINE

window.addEventListener("offline", () => {
    submitBtn.disabled = true;
    submitBtn.innerText="Offline"
    convertedAmount.classList.remove("hide");
    convertedAmount.innerText = "You are offline";
});

window.addEventListener("online", () => {
    submitBtn.disabled = false;
    submitBtn.innerText = "Get Exchange Rates";
    convertedAmount.innerText = "Back online. You can convert now.";
});

//=======================================================================================

