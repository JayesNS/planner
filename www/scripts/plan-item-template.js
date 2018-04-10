const getPlanItemTemplate = () => {
    const planItemTemplate = document.querySelector('#plan-item-template');
    planItemTemplate.remove();
    planItemTemplate.removeAttribute('id');
    return planItemTemplate;
};

const insertPlanItemTemplate = (data, item, container, type) => {
    if (data === undefined)
        return;

    const planItem = item.cloneNode(true);
    const saveButton = planItem.querySelector('.plan-item-controls').children[0];
    const name = planItem.querySelector('.plan-item-name');

    if (type !== undefined)
        planItem.classList.add(`type-${type}`);

    name.innerHTML = data['nazwa'];

    planItem.addEventListener('click', (e) => {
        e.stopPropagation();

        document.location = 'plan.html?type='+data['typ']+'&id='+data['id'];
    });

    saveButton.addEventListener('click', (e) => {
        e.stopPropagation();
        // document.querySelector('#search').value = data['id'];
        console.log('saveButton');
    });

    if (container !== null)
        container.appendChild(planItem);
};