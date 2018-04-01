const tabButtonClass = '.tab-button';
const tabClass = '.tab';
const tabButtons = document.querySelectorAll(tabButtonClass);
const tabs = document.querySelectorAll(tabClass);

const activate = (element, elementClass) => {
    element.classList.add('active');

    // console.log(element, elementClass);
    if (elementClass !== undefined) {
        const elementArray = [...document.querySelectorAll(elementClass)];

        elementArray.forEach((value) => {
            if (value !== element && value.classList.contains('active'))
                value.classList.remove('active');
        });
    }
};

const getPlanItemTemplate = () => {
    const planItemTemplate = document.querySelector('#plan-item-template');
    planItemTemplate.remove();
    planItemTemplate.removeAttribute('id');
    return planItemTemplate.cloneNode(true);
};

const insertPlanItemTemplate = (data, item, container) => {
    const planItem = item.cloneNode(true);
    const saveButton = planItem.querySelector('.plan-item-controls').children[0];
    const name = planItem.querySelector('.plan-item-name');

    name.innerHTML = data.name;
    saveButton.addEventListener('click', () => {
        document.querySelector('#search').value = data.id;
    });

    container.appendChild(planItem);
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

const planItemTemplate = getPlanItemTemplate();
const planList = document.querySelector('#tab-groups');
console.log(new Date().getTime());
for (let i = 0; i < 100; ++i) {
    insertPlanItemTemplate({name: 'KrDZIs'+i, id: i}, planItemTemplate, planList);
}
console.log(new Date().getTime());