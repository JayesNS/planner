const planItemTemplate = getTemplate(document.querySelector('.plan-item'));
const container = document.querySelector('main');

const Type = {'g': 'group', 'n': 'teacher', 's': 'classroom'};

const plans = getLocalPlans();

const getAscendant = (element, generation) => {
    return generation > 0 ? getAscendant(element.parentElement, generation-1) : element.parentElement;
};

for (let planId in plans) {
    const plan = plans[planId];

    fillAndInsertTemplate(container, planItemTemplate, {
        classes: [`type-${Type[plan['typ'].toLowerCase()]}`],
        elements: {
            '.plan-item-container': {
                eventListener: {
                    type: 'click',
                    func: (e) => {
                        e.stopPropagation();

                        setSessionItem(sessionKeys.RECENTLY_OPENED_PLAN, {
                            nazwa: plan['nazwa'],
                            local: true
                        });
                        document.location = 'plan.html';
                    }
                }
            },
            '.plan-item-controls': {
                eventListener: {
                    type: 'click',
                    func: (e) => {
                        e.stopPropagation();

                        removeLocalPlan(plan['nazwa']);
                        getAscendant(e.target, 3).remove();
                    }
                }
            },
            '.plan-item-name': {
                text: plan['nazwa']
            }
        }
    });
}