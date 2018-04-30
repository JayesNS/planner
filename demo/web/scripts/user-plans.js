// Extracting templates from DOM
const planItemTemplate = getTemplate(document.querySelector('.plan-item'));
const noMoreElements = getTemplate(document.querySelector('#no-more-elements'));
const container = document.querySelector('main');

// Extending shortcuts of names to full names of groups
const Type = {'g': 'group', 'n': 'teacher', 's': 'classroom'};

// Assigning plans from local storage and iterating through them
const plans = getLocalPlans();

const localPlansEmpty = () => {
    return Object.keys(plans).length === 0;
};

const showNoMoreElementsText = (container) => {
    container.appendChild(noMoreElements);
};

if (localPlansEmpty()) {
    showNoMoreElementsText(container);
}

for (let planName in plans) {
    // Checking if object has the property
    if (!plans.hasOwnProperty(planName)) {
        continue;
    }

    const plan = plans[planName];
    // Setting class for styling purposes
    const planTypeClass = `type-${Type[plan['typ'].toLowerCase()]}`;

    fillAndInsertTemplate(container, planItemTemplate, {
        classes: [planTypeClass],
        elements: {
            '.plan-item-container': {
                eventListener: {
                    type: 'click',
                    func: (e) => {
                        e.stopPropagation();

                        // Changing displayed plan
                        setSessionItem(sessionKeys.RECENTLY_OPENED_PLAN, {
                            nazwa: planName,
                            local: true
                        });
                        // Navigating to plan view
                        document.location = 'plan.html';
                    }
                }
            },
            '.plan-item-controls': {
                eventListener: {
                    type: 'click',
                    func: (e) => {
                        e.stopPropagation();

                        // Remove plan from local storage
                        removeLocalPlan(planName);

                        delete plans[planName];

                        // Remove plan from list
                        getAscendant(e.target, 3).remove();
                        showToast('Usunięto lokalny plan', 2000);

                        if (localPlansEmpty()) {
                            showNoMoreElementsText(container);
                        }
                    }
                }
            },
            '.plan-item-name': {
                text: planName
            }
        }
    });
}