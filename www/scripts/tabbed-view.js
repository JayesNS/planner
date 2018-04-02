const tabButtonClass = '.tab-button';
const tabClass = '.tab';
const tabButtons = document.querySelectorAll(tabButtonClass);
const tabs = document.querySelectorAll(tabClass);
let activatedTab;

const activate = (element, elementClass) => {
    element.classList.add('active');

    if (element.classList.contains('tab'))
        activatedTab = element;

    // console.log(element, elementClass);
    if (elementClass !== undefined) {
        const elementArray = [...document.querySelectorAll(elementClass)];

        elementArray.forEach((value) => {
            if (value !== element && value.classList.contains('active'))
                value.classList.remove('active');
        });
    }
};

tabButtons.forEach((tabButton, index) => {
    tabButton.addEventListener('click', (event) => {
        let element = event.target;

        activate(element, tabButtonClass);
        activate(tabs[index], tabClass)
    });
});

activate(tabButtons[0], tabButtonClass);
activate(tabs[0], tabClass);