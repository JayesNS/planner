const tabButtonClass = '.tab-button';
const tabClass = '.tab';
const tabButtons = document.querySelectorAll(tabButtonClass);
const tabs = document.querySelectorAll(tabClass);
let activatedTab;
var onTabChange;

const activate = (element, elementClass) => {

    if (element === activatedTab) {
        return;
    }

    element.classList.add('active');


    if (element.classList.contains('tab')) {
        onTabChange(element, activatedTab);
        activatedTab = element;
    }

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
        activate(tabs[index], tabClass);

        setSessionItem(sessionKeys.RECENTLY_ACTIVED_TAB, index);
    });
});

const lastActiveTab = getSessionItem(sessionKeys.RECENTLY_ACTIVED_TAB) || 0;

activate(tabButtons[lastActiveTab], tabButtonClass);
activate(tabs[lastActiveTab], tabClass);
