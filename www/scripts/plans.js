const planItemTemplate = getTemplate(document.querySelector('.plan-item'));
let planList;
let planItemIndex;
let container;

const search = document.querySelector('#search');

onTabChange = (element, previousContainer) => {
    planItemIndex = 0;
    container = element;

    cleanContainer(previousContainer);

    getData(prepareUrl(getPlanType())).then(data => {
        planList = data['zasob'];

        loadMore(100, search.value);
    });
};

const getPlanType = () => {
  return container.getAttribute('id').replace('tab-', '');
};

const loadMore = (amount) => {
    let last = planItemIndex + amount;
    let filteredPlanList = filterPlanList(search.value);

    for (planItemIndex; planItemIndex < last; ++planItemIndex) {
        if (planItemIndex < planList.length)
            insertPlanItemTemplate(filteredPlanList[planItemIndex], planItemTemplate, container, getPlanType().slice(0, -1));
    }
};

// Return filtered plan list items
const filterPlanList = (filter) => {
    // Every string containing given substring
    let regex = new RegExp(`${filter}`, 'i');
    // Filter elements which name contains value
    return planList.filter((value) => regex.test(value['nazwa']));
};

// Updating plan list with new values
const updatePlanList = (amount) => {
    // Clean container to prevent duplicates
    cleanContainer(container);
    // Loading filtered elements
    loadMore(amount, search.value);
};

// User is searching for new value
search.addEventListener('keyup', () => {
    // Start counting from 0
    planItemIndex = 0;
    // Update plan list with 100 elements and filtered by searched value
    updatePlanList(100);
});