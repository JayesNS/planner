const getTemplate = (templateElement) => {
    // If there isn't template, return
    if (!templateElement)
        return;

    // Delete template from DOM and return
    templateElement.remove();
    return templateElement;
};

const fillAndInsertTemplate = (container, template, classesAndValues) => {
    // Clone node
    const element = template.cloneNode(true);

    for (let className in classesAndValues.elements) {
        let item = classesAndValues.elements[className];

        if (item.text) {
            changeText(element.querySelector(className), item.text);
        }

        if (item.eventListener) {
            element.addEventListener(item.eventListener.type, item.eventListener.func)
        }
    }

    if (classesAndValues.classes) {
        for (let className of classesAndValues.classes) {
            element.classList.add(className);
        }
    }

    if (container !== null)
        container.appendChild(element);
};

const changeText = (element, text) => {

    if (element === null) {
        throw new Error('"element" is null');
    }

    // Checking if text is an object
    text = text['$t'] !== undefined ? text['$t'] : text;
    // Checking if object is empty
    text = Object.keys(text).length === 0 && text.constructor === Object ? '' : text;

    // Append text to element
    element.textContent = text;
};