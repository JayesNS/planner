// Obtaining data from remote server and returning Promise
const getData = (url) => {
    return new Promise((resolve, reject) => {

        let xhr = new XMLHttpRequest();

        xhr.open('GET', url, true);

        xhr.onreadystatechange = () => {
            // Checking if request is done
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                }

                reject("Błąd podczas ładowania strony");
            }
        };
        xhr.send();
    });
};

// Making API request url from given parameters
const prepareUrl = (type, id, range) => {
    // Base url
    let url = 'http://api.jsthats.me/api';

    // Appending values to url if they exist
    url += type ? '/'+type : '';
    url += id ? '/'+id : '';
    url += range ? '/'+range : '';

    return url;
};