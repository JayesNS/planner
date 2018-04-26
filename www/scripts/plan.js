const activityTemplate = getTemplate(document.querySelector('.activity'));
const activityGroupTemplate = getTemplate(document.querySelector('.activity-group'));
const noMoreElements = getTemplate(document.querySelector('#no-more-elements'));

let loadedData;
let loadedActivityGroups = 0;

const saveButton = document.querySelector('#save-button');

const formatWeekDay = (day) => {
    const WeekDays = {
        'Pn': 'Poniedziałek',
        'Wt': 'Wtorek',
        'Śr': 'Środa',
        'Cz': 'Czwartek',
        'Pt': 'Piątek',
        'Sb': 'Sobota',
        'Nd': 'Niedziela'
    };

    return WeekDays[day];
};

const formatDate = (date) => {
  const Months = {
      0: 'stycznia',
      1: 'lutego',
      2: 'marca',
      3: 'kwietnia',
      4: 'maja',
      5: 'czerwca',
      6: 'lipica',
      7: 'sierpnia',
      8: 'września',
      9: 'października',
      10: 'listopada',
      11: 'grudnia',
  };

  const datetime = new Date(date);
  return `${datetime.getDate()} ${Months[datetime.getMonth()]} ${datetime.getFullYear()}`;
};

document.querySelector('#back-button').addEventListener('click', (e) => {
    e.stopPropagation();

    history.back();
});

const groupBy = (array, by) => {
    let plan = [];

    if (array === undefined || array.length === undefined) {
        console.warn('"array" is empty');
        return plan;
    }

    array.forEach(elem => {
        if (!plan.some(val => val[by] === elem[by])) {
            plan.push({
                termin: elem['termin'],
                dzien: elem['dzien'],
                zajecia: []
            });
        }
        let day = plan.find(val => val[by] === elem[by]);

        day['zajecia'].push(elem);
    });
    return plan;
};

const loadActivities = (amount) => {
    let targetLoadedActivityGroups = loadedActivityGroups + amount;

    if (loadedData.length === 0)
        document.querySelector('main').appendChild(noMoreElements);

    for (loadedActivityGroups;
         loadedActivityGroups < targetLoadedActivityGroups && loadedActivityGroups < loadedData.length;
         ++loadedActivityGroups) {
        let acGroup = activityGroupTemplate.cloneNode(true);
        let acGroupData = loadedData[loadedActivityGroups];

        for (let acData of acGroupData['zajecia']) {
            let activity = activityTemplate.cloneNode(true);

            fillAndInsertTemplate(acGroup.querySelector('.activity-container'), activity, {
                elements: {
                    '.activity-name': {
                        text: acData['przedmiot']
                    },
                    '.activity-time': {
                        text: `${acData['od-godz']} - ${acData['do-godz']}`
                    },
                    '.activity-location': {
                        text: acData['sala'] || ''
                    },
                    '.activity-group-name': {
                        text: acData['grupa'] || ''
                    },
                    '.activity-organizer': {
                        text: acData['nauczyciel'] || ''
                    },
                    '.activity-type': {
                        text: acData['typ']
                    }
                }
            });
        }

        fillAndInsertTemplate(document.querySelector('main'), acGroup, {
            elements: {
                '.activity-date': {
                    text: formatDate(acGroupData['termin'])
                },
                '.activity-day': {
                    text: formatWeekDay(acGroupData['dzien'])
                }
            }
        });
    }

    if (loadedActivityGroups < loadedData.length)
        appendLoadMoreButton(document.querySelector('main'));
    else {
        deleteLoadMoreButton();
    }
};

const load = (range) => {
    const planParams = getSessionItem(sessionKeys.RECENTLY_OPENED_PLAN);

    const planRange = document.querySelector('#plan-range');
    const rangeName = planRange.children[planRange.value - 1].text;

    const url = prepareUrl(planParams['typ'], planParams['id'], range);
    console.debug(url);

    // Loading data from local storage or from remote server
    if (planParams['local']) {
        let data = getLocalPlans()[planParams['nazwa']];
        console.log(data);

        saveButton.querySelector('i').textContent = 'delete';
        saveButton.addEventListener('click', () => {
            console.log(planParams['nazwa']);
            removeLocalPlan(planParams['nazwa']);
            window.history.back();
        });

        loadedData = groupBy(data['zajecia'], 'termin');

        loadActivities(10);
    } else {
        getData(url).then(data => {
            loadedData = groupBy(data['zajecia'], 'termin');

            saveButton.addEventListener('click', () => {
                setLocalPlan(data);
            });

            loadActivities(10);
        }).catch(error => {
            console.error(error);
        });
    }
};

document.querySelector('#plan-range').addEventListener('change', (e) => {
    loadedActivityGroups = 0;
    const recentlyOpenedPlan = getSessionItem(sessionKeys.RECENTLY_OPENED_PLAN);
    recentlyOpenedPlan['nazwa-okresu'] = e.target.children[e.target.value-1].text;
    recentlyOpenedPlan['okres'] = e.target.value;

    setSessionItem(sessionKeys.RECENTLY_OPENED_PLAN, recentlyOpenedPlan);
    clearContainer(document.querySelector('main'));
    load(e.target.value);
});

load(document.querySelector('#plan-range').value);