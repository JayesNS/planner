const getData = (url) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if(xhr.status === 200)
                    resolve(JSON.parse(xhr.responseText));
                else
                    reject("Błąd podczas ładowania strony\n");
            }
        };
        xhr.send();
    });
};

const prepareUrl = (type, id, range) => {
    let url = 'http://api.jsthats.me/api';
    url += type !== undefined ? '/'+type : '';
    url += id !== undefined ? '/'+id : '';
    url += range !== undefined ? '/'+range : '';
    return url;
};