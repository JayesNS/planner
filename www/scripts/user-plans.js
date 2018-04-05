const planItemTemplate = getPlanItemTemplate();
const container = document.querySelector('main');

const types = ['group', 'teacher', 'classroom'];

for (let i = 0; i < 10; ++i) {
    let type = Math.floor(Math.random()*3);
    insertPlanItemTemplate({name: 'grupa'+i, id: i}, planItemTemplate, container, types[type]);
}