// --- Anotações de Estudo: Seleção dos Elementos ---
const cityInput = document.querySelector('#city-input');
const searchBtn = document.querySelector('#search-btn');

const weatherDataContainer = document.querySelector('#weather-data');
const cityNameElement = document.querySelector('#city-name');
const weatherIconElement = document.querySelector('#weather-icon');
const temperatureElement = document.querySelector('#temperature');
const weatherDescriptionElement = document.querySelector('#weather-description');
const humidityElement = document.querySelector('#humidity');
const windSpeedElement = document.querySelector('#wind-speed');

// --- Anotações de Estudo: Variáveis Globais ---
const apiKey = "ed430457d177280ce86eca93f33473cc"; // Lembre-se de colocar sua chave aqui

// --- Anotações de Estudo: Event Listeners ---
searchBtn.addEventListener('click', function() {
    const city = cityInput.value.trim();
    if (city === '') return; // Se o input estiver vazio, não faz nada
    getWeatherData(city);
});

// --- Anotações de Estudo: Função de Busca na API ---
async function getWeatherData(city) {
    // CORREÇÃO: A URL inteira precisa estar entre crases (`) para que as variáveis ${...} funcionem.
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Cidade não encontrada.');
        const data = await response.json();

        // Em vez de só mostrar no console, agora eu chamo a nova função pra mostrar os dados na tela.
        displayWeatherData(data);

    } catch (error) {
        alert("Não foi possível encontrar o clima. Verifique o nome da cidade e se a chave de API está correta e ativa.");
        console.error("Erro na busca:", error);
    }
}

// --- Anotações de Estudo: Função para Exibir os Dados na Tela ---
function displayWeatherData(data) {
    // Pego o nome da cidade, que está na propriedade 'name' do objeto.
    cityNameElement.innerText = data.name;

    // CORREÇÃO: Precisa de crases (`) para formatar o texto com a variável.
    temperatureElement.innerText = `${parseInt(data.main.temp)}°C`;

    // A descrição fica dentro de 'weather', que é uma lista (Array). Pego o primeiro item [0] e a propriedade 'description'.
    weatherDescriptionElement.innerText = data.weather[0].description;
    
    // CORREÇÃO: O link da imagem (src) também é um texto e precisa estar entre crases (`) para usar a variável.
    weatherIconElement.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);

    // CORREÇÃO: Precisa de crases (`) aqui também.
    humidityElement.innerText = `${data.main.humidity}%`;
    
    // CORREÇÃO: E aqui também.
    windSpeedElement.innerText = `${data.wind.speed} km/h`;

    // Essa é a linha final! Eu removo a classe 'hidden' do container de resultados,
    // fazendo ele finalmente aparecer na tela com todos os dados preenchidos.
    weatherDataContainer.classList.remove('hidden');
}