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

const planItemTemplate = getPlanItemTemplate();
const planList = document.querySelector('#tab-groups');
console.log(new Date().getTime());
for (let i = 0; i < 100; ++i) {
    insertPlanItemTemplate({name: 'KrDZIs'+i, id: i}, planItemTemplate, planList);
}
console.log(new Date().getTime());