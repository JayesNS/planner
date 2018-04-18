const planItemTemplate = getTemplate(document.querySelector('.plan-item'));
const noMoreElements = getTemplate(document.querySelector('#no-more-elements'));
let planList;
let planItemIndex;
let container;

const search = document.querySelector('#search');
if (getSessionItem(sessionKeys.RECENTLY_SEARCHED_VALUE))
    search.value = getSessionItem(sessionKeys.RECENTLY_SEARCHED_VALUE);

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

    if (filteredPlanList.length === 0) {
        container.appendChild(noMoreElements);
        return;
    }

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

                            setSessionItem(sessionKeys.RECENTLY_OPENED_PLAN, {
                                nazwa: item['nazwa'],
                                typ: item['typ'],
                                id: item['id'],
                                local: false
                            });
                            document.location = 'plan.html';
                        }
                    }
                }
            }
        });
    }

    if (filteredPlanList.length > planItemIndex)
        appendLoadMoreButton(container);
    else {
        deleteLoadMoreButton();
    }
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
    // Setting last searched value to session
    setSessionItem(sessionKeys.RECENTLY_SEARCHED_VALUE, search.value);
    // Loading filtered elements
    loadMore(100, search.value);
});