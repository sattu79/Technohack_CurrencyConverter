
var selectElements = document.querySelectorAll("select")
const btn = document.querySelector('.btn')
const input = document.querySelector('.input')
const res = document.querySelector(".res")

get_currencies()
async function get_currencies(){
  const resp = await fetch("https://api.frankfurter.app/currencies")
  const respData = await resp.json()
  //console.log(respData);

  show_to_dom(respData)
}

function show_to_dom (data){
  const entries = Object.entries(data)
  for(let i = 0; i < entries.length; i++) {
    const option = document.createElement("option")
    //console.log(entries[i][0]);
    option.value = `${entries[i][0]}`
    option.innerText = `${entries[i][0]}`

    selectElements[0].appendChild(option)
    selectElements[1].appendChild(option.cloneNode(option))
  }
}

btn.addEventListener('click', () => {
  let currency1 = selectElements[0].value;
  let currency2 = selectElements[1].value;
  let value = input.value;

  if (currency1 != currency2) {
    convert(currency1, currency2, value)
  } else {
    const p = document.createElement('p')
    p.innerText = `ALERT : Choose Different Currency!!`
    p.classList.add('alert')
    document.querySelector('.container').appendChild(p)
    setTimeout(() => {
      p.style.display = 'none'
    }, 3000)
  }
})

function convert(currency1, currency2, value) {
  const host = "api.frankfurter.app";
  fetch(
    `https://${host}/latest?amount=${value}&from=${currency1}&to=${currency2}`
  )
    .then((val) => val.json())
    .then((val) => {
      console.log(Object.values(val.rates)[0]);
      res.value = Object.values(val.rates)[0];
    });
}