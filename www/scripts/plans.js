const getPlanItemTemplate = () => {
    const planItemTemplate = document.querySelector('#plan-item-template');
    planItemTemplate.remove();
    planItemTemplate.removeAttribute('id');
    return planItemTemplate.cloneNode(true);
};

const insertPlanItemTemplate = (data, item, container, type) => {
    const planItem = item.cloneNode(true);
    const saveButton = planItem.querySelector('.plan-item-controls').children[0];
    const name = planItem.querySelector('.plan-item-name');

    if (type !== undefined)
        planItem.classList.add(`type-${type}`);

    name.innerHTML = data.name;
    saveButton.addEventListener('click', () => {
        document.querySelector('#search').value = data.id;
    });

    container.appendChild(planItem);
};

const planItemTemplate = getPlanItemTemplate();

let planList = document.querySelector('#tab-groups');
for (let i = 0; i < 10; ++i) {
    insertPlanItemTemplate({name: 'KrDZIs'+i, id: i}, planItemTemplate, planList, 'group');
}

planList = document.querySelector('#tab-teachers');
for (let i = 0; i < 5; ++i) {
    insertPlanItemTemplate({name: 'KrDZIs'+i, id: i}, planItemTemplate, planList, 'teacher');
}

planList = document.querySelector('#tab-classrooms');
for (let i = 0; i < 7; ++i) {
    insertPlanItemTemplate({name: 'KrDZIs'+i, id: i}, planItemTemplate, planList, 'classroom');
}