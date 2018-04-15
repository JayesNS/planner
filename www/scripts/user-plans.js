const planItemTemplate = getTemplate(document.querySelector('.plan-item'));
const container = document.querySelector('main');

const Type = {'g': 'group', 'n': 'teacher', 's': 'classroom'};

const plans = loadFromLocalStorage();

for (let planId in plans) {
    const plan = plans[planId];

    fillAndInsertTemplate(container, planItemTemplate, {
        classes: [`type-${Type[plan['typ'].toLowerCase()]}`],
        elements: {
            '.plan-container': {
                eventListener: {
                    type: 'click',
                    func: (e) => {
                        e.stopPropagation();

                        document.location = 'plan.html?type='+plan['typ']+'&id='+plan['id'];
                    }
                }
            },
            '.plan-item-name': {
                text: plan['nazwa']
            }
        }
    });
}