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

    name.innerHTML = data['nazwa'];
    saveButton.addEventListener('click', () => {
        document.querySelector('#search').value = data['id'];
    });

    if (container !== null)
        container.appendChild(planItem);
};