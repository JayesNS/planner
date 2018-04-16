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
        if (planItemIndex >= filteredPlanList.length)
            break;

        const item = filteredPlanList[planItemIndex];

        fillAndInsertTemplate(container, planItemTemplate, {
            classes: [`type-${getPlanType().slice(0, -1)}`],
            elements: {
                '.plan-item-name': {
                    text: item['nazwa'],
                    eventListener: {
                        type: 'click',
                        func: (e) => {
                            e.stopPropagation();
                            document.location = 'plan.html?type='+item['typ']+'&id='+item['id'];
                        }
                    }
                }
            }
        });
    }

    if (filteredPlanList.length > planItemIndex)
        appendLoadMoreButton(container);
};

// Return filtered plan list items
const filterPlanList = (filter) => {
    // Every string containing given substring
    let regex = new RegExp(`${filter}`, 'i');
    // Filter elements which name contains value
    return planList.filter((value) => regex.test(value['nazwa']));
};

// User is searching for new value
search.addEventListener('keyup', () => {
    // Start counting from 0
    planItemIndex = 0;
    // Clean container to prevent duplicates
    cleanContainer(container);
    // Loading filtered elements
    loadMore(100, search.value);
});