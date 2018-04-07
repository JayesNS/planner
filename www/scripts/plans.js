const planItemTemplate = getPlanItemTemplate();
let planList;
let filteredPlanList;
let planItemIndex;
let type;
let container;

const search = document.querySelector('#search');

onTabChange = (element, previousContainer) => {
    planItemIndex = 0;
    container = element;

    cleanContainer(previousContainer);

    // Preparing type for API request
    type = container.getAttribute('id').replace('tab-', '');

    getData(prepareUrl(type)).then(data => {
        planList = data['zasob'];
        filterPlanList(search.value);

        console.log(data);

        for (planItemIndex; planItemIndex < 100; ++planItemIndex) {
            if (planItemIndex < planList.length)
                insertPlanItemTemplate(filteredPlanList[planItemIndex], planItemTemplate, container, type.slice(0, -1));
        }
    });
};

const cleanContainer = (container) => {
    // Cleaning previous container
    if (container !== undefined) {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }
};

const loadMore = () => {
    let last = planItemIndex + 100;

    for (planItemIndex; planItemIndex < last; ++planItemIndex) {
        if (planItemIndex < planList.length)
            insertPlanItemTemplate(filteredPlanList[planItemIndex], planItemTemplate, container, type.slice(0, -1));
    }
};

const filterPlanList = (substr) => {
    let regex = new RegExp(`${substr}`, 'i');
    filteredPlanList = planList.filter((value) => regex.test(value['nazwa']));
    return filteredPlanList;
};

const updatePlanList = () => {

    insertPlanItemTemplate(filteredPlanList[planItemIndex], planItemTemplate, container, type.slice(0, -1))
};

search.addEventListener('keyup', (event) => {
     //console.log(event);
    planItemIndex = 0;
    cleanContainer(container);
    filterPlanList(event.target.value);
    loadMore();
    console.log(filteredPlanList);
    //updatePlanList();
});