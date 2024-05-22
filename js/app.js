const cityInput = document.querySelector('#cityInput');
const weatherBox = document.querySelector('#weather-box');

cityInput.addEventListener(
    'keyup',
    async function (e) {
        if(e.key == 'Enter'){
            const cityName = e.target.value;
            cityInput.innerText == '';
            
            if(cityName == ''){
                cityInput.focus();
                return ;
            } else{
                cityInput.disabled= true;
                const Api = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=21805bff7224936fa25d6cec016a0a4b&units=metric`;
                weatherBox.innerHTML=`
                <div class="spinner-border text-primary" role="status">
                 <span class="sr-only">Loading...</span>
                </div>
                `;

                const response = await fetch(Api);
                console.log(response)
                cityInput.disabled= false;
                if(response.status == 200){
                    const data= await response.json();
                    console.log(data)
                    weatherBox.innerHTML=`
                    <div class="weather-icon mb-4">
                            <img src="https://openweathermap.org/img/wn/${data.weather[0].  icon}@2x.png" alt="">
                    </div>
                    <div class="weather-info mb-4">
                        <h2 class="mb-3">${data.name}</h2>
                        <div class="row">
                            <div class="col">
                            <p>Temperature : ${data.main.temp} </p>
                                <p>Min-Temperature : ${data.main.temp_min}</p>
                                <p>Max-Temperature : ${data.main.temp_max} </p>
                                
                            </div>
                            <div class="col">
                                <p>Condition : ${data.weather[0].main} </p>
                                <p>Sunrise : ${new Date(data.sys.sunrise *1000).toLocaleTimeString()} </p>
                                <p>Sunset : ${new Date(data.sys.sunset *1000).toLocaleTimeString()} </p>
                            </div>
                        </div>
                    </div>
                    `;
                } else if(response.status == 404) {
                    weatherBox.innerHTML= `
                    <h2> City not found </h2>
                    `;
                }
            }
        }
    }
)
