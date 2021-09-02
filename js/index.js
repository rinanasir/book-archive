const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value.trim();
    searchField.value = ''; // clearing input field
    toggleSpinner('block');
    // calling function to load data
    loadBooks(searchText);
}
// toggle functions for spinner, search cound and error message
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
const toggleSearchCount = displayStyle => {
    document.getElementById('search-count').style.display = displayStyle;
}
const toggleError = displayStyle => {
    document.getElementById('error-text').style.display = displayStyle;
}
// funcion for loading data
const loadBooks = searchText => {
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data))
        .catch(error => displayError(error));
}
// function for error message
const displayError = error => {
    toggleError('block');
}
// funtion for displaying result
const displaySearchResult = data => {
    // condition for showing error message
    if (data.numFound === 0) {
        toggleError('block');
    }
    else {
        toggleError('none');
    }
    const books = data.docs;
    const searchResult = document.getElementById('search-result');
    // clearing search content from previous search
    searchResult.textContent = '';
    toggleSearchCount('none');
    // condition counting for total search result
    if (books.length !== 0) {
        const resultCount = document.getElementById('result-count');
        resultCount.innerText = books.length;
        toggleSearchCount('block');
    }
    // forEach loop to append each element
    books.forEach(book => {
        if (book.author_name === undefined) {
            book.author_name = '';
        }
        if (book.first_publish_year === undefined) {
            book.first_publish_year = '';
        }
        const div = document.createElement('div');
        div.classList.add('col');
        // checking if a book has it's cover or not
        if (book.cover_i !== undefined) {
            div.innerHTML = `
            <div class="card h-100">
                <img height="350px" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <p class="card-text"><span class="fw-bold">Author name: </span>${book.author_name[0]}</p>
                    <p class="card-text"><span class="fw-bold">First published year: </span>${book.first_publish_year}</p>
                </div>
            </div>
        `;
            searchResult.appendChild(div);
        }
        else {
            div.innerHTML = `
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <p class="card-text"><span class="fw-bold">Author name: </span>${book.author_name[0]}</p>
                    <p class="card-text"><span class="fw-bold">Publish year: </span>${book.first_publish_year}</p>
                </div>
            </div>
        `;
            searchResult.appendChild(div);
        }
    });
    toggleSpinner('none');
}