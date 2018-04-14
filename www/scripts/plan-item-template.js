const insertPlanItemTemplate = (data, item, container, type) => {
    if (data === undefined)
        return;

    const planItem = item.cloneNode(true);
    const name = planItem.querySelector('.plan-item-name');

    if (type !== undefined)
        planItem.classList.add(`type-${type}`);

    name.innerHTML = data['nazwa'];

    planItem.addEventListener('click', (e) => {
        e.stopPropagation();

        document.location = 'plan.html?type='+data['typ']+'&id='+data['id'];
    });

    if (container !== null)
        container.appendChild(planItem);
};