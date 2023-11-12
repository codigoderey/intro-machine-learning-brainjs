// select word element
const word = document.getElementById('word');
// select button-bueno
const btnBueno = document.getElementById('button-bueno');
// select button-malo
const btnMalo = document.getElementById('button-malo');

// data to train the machine learning model
const sentiments = [
    'alegre',
    'amable',
    'amoroso',
    'apasionado',
    'apreciado',
    'apreciativo',
    'aprobado',
    'ardiente',
    'atento',
    'atractivo',
    'bien',
    'bienaventurado',
    'bueno',
    'cálido',
    'cariñoso',
    'celebrado',
    'contento',
    'contento',
    'creativo',
    'deseado',
    'deseoso',
    'dichoso',
    'divertido',
    'divino',
    'emocionado',
    'abandonado',
    'abatido',
    'abrumado',
    'aceptado',
    'adolorido',
    'agotado',
]

let wordPosition = 0;

const processTrainingData = async (e) => {
    wordPosition++

    if(wordPosition === sentiments.length) {
        wordPosition = 0;
    }

    word.textContent = sentiments[wordPosition];

    const post = {
        input: `Me siento ${sentiments[wordPosition - 1]}`,
        output: e.target.dataset.value
    }

    console.log(post)

    // make a fetch post request to json server api http://localhost:3000/feelings
    try {
        const response = await fetch("http://localhost:3000/feelings", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        });

        const json = await response.json();
        
    } catch (error) {
        console.log(error);
    }
}

// add event listeners to buttons
btnBueno.addEventListener('click', processTrainingData)
btnMalo.addEventListener('click', processTrainingData)