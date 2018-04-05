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