const CATEGORY_JOKES = 'https://api.chucknorris.io/jokes/categories';

const jokesCategoryList = {
    list: document.querySelector('#jokes'),
    item: document.querySelector('#joke_list')
}

jokesCategoryList.list.addEventListener('change', (event) => {
    const ITEM_JOKES = `https://api.chucknorris.io/jokes/random?category=${event.target.value}`;
    const tempJokes = getFile(ITEM_JOKES);
    jokesCategoryList.item.innerHTML = '';

    const optionCurrent = event.target;
    optionCurrent.setAttribute('disabled', 'true');

    tempJokes.then( element => {
            const containerJoke = document.createElement('li');
            const categoryJoke = document.createElement('p');
            categoryJoke.textContent = 'Category: ' + event.target.value;
            const valueJoke = document.createElement('p');
            valueJoke.textContent = element.value;
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove Joke';

            containerJoke.append(categoryJoke, valueJoke, removeBtn);
            jokesCategoryList.item.append(containerJoke);

            return removeBtn;      
    })
    .then ((removeBtn) => {
        removeBtn.addEventListener('click', () => {
            jokesCategoryList.item.innerHTML = '';
            optionCurrent.removeAttribute('disabled');
            
        })
    })

    
})

const jokesCategory = getFile(CATEGORY_JOKES);

jokesCategory.then( element => {
    element.forEach(element => {
        const optionList = document.createElement('option');
        optionList.textContent = element;
        jokesCategoryList.list.append(optionList);
    });
}
)
   
function getFile (file) {
    const fileFetch = fetch(file).then(data => data.json());
    return fileFetch;
}
