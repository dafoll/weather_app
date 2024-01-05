const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");

//API KEY;
const apiKey = "6262072381150875d4284869c6b4560f";

form.addEventListener("submit", e => {
    e.preventDefault();
    const inputVal = input.value;

    const listItems = list.querySelectorAll(".ajax-section .city");
    const listItemsArray = Array.from(listItems);

    if(listItemsArray.length > 0){
        const filtroarray = listItemsArray.filter(el =>{
            let content = "";

            if(inputVal.includes(",")){
                if(inputVal.split(",")[1].length > 2){
                    inputVal = inputVal.split(",")[0];
                    content = el.querySelector(".city-name span").textContent.toLocaleLowerCase();
                } else {
                    content = el.querySelector(".city-name").dataset.name.toLocaleLowerCase();
                }

            } else {
                content = el.querySelector(".city-name span").textContent.toLocaleLowerCase()
            }
        });

        if(filtroarray.length > 0){
            msg.textContent = `Ya sabes el clima para ${filtroarray[0].querySelector(".city-name span").textContent}.. si no, se mas especifico ingresando el pais`
            form.reset();
            input.focus();
            return;    
        }

    }


    //URL
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

    //FETCH
    fetch(url)
    .then(Response => Response.json())
    .then(data => {

        const {main, name, sys, weather} = data;
        const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;

        
        const li = document.createElement("li");

        li.classList.add("city")
        const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
        <span>${name}</span>
        <sup>${sys.country}</sup>
        </h2>

        <div class="city-temp">
            ${Math.round(main.temp)} <sup>°C</sup>
        </div>

        <figure>
            <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
            <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
        `
        li.innerHTML = markup;
        list.appendChild(li);



    })
    .catch(() => {
        msg.textContent = "Por favor ingrese una ciudad valida"
    })

    msg.textContent = "";
    form.reset();
    input.focus();












});

