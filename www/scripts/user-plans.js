const planItemTemplate = getTemplate(document.querySelector('.plan-item'));
const container = document.querySelector('main');

const types = ['group', 'teacher', 'classroom'];

const plans = loadFromLocalStorage();

for (let planId in plans) {
    const plan = plans[planId];
    let type = Math.floor(Math.random()*3);
    console.log(plan);
    insertPlanItemTemplate({nazwa: plan['nazwa'], typ: plan['typ'], id: plan['id']}, planItemTemplate, container, types[type]);
}