// Extracting element from DOM and deleting it
const getTemplate = (element) => {
    // Checking existence of given element
    if (!element)
        return;

    // Delete template from DOM and return
    element.remove();
    return element;
};

const fillAndInsertTemplate = (container, template, data) => {
    // Checking if all parameters are present
    if (!container || !template || !data) {
        return;
    }

    // Clone node to insert copy
    const main = template.cloneNode(true);

    // Iterating through elements list
    for (let className in data['elements']) {
        // Checking if object has the property
        if (!data['elements'].hasOwnProperty(className)) {
            continue;
        }

        let item = data['elements'][className];
        // Getting element from DOM
        const element = main.querySelector(className);

        // Setting text of element if present
        if (item.text) {
            changeText(element, item.text);
        }

        // Setting eventListener if present
        if (item.eventListener) {
            element.addEventListener(item.eventListener.type, item.eventListener.func)
        }
    }

    // Appending classes to main element if they exist
    if (data.classes) {
        main.classList.add(...data.classes);
    }

    // Appending element to container
    container.appendChild(main);
};

// Change inner text of given element
const changeText = (element, text) => {
    // Checking presence of element attribute
    if (!element) {
        throw new Error('"element" is null');
    }

    // Checking if text is an object
    text = text['$t'] !== undefined ? text['$t'] : text;
    // Checking if object is empty
    text = Object.keys(text).length === 0 && text.constructor === Object ? '' : text;

    // Append text to the element
    element.textContent = text;
};