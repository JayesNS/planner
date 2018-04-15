let params = new URL(window.location.href).searchParams;
const activityTemplate = getTemplate(document.querySelector('.activity'));
const activityGroupTemplate = getTemplate(document.querySelector('.activity-group'));

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

const fillRangeSelect = (rangeArray, element) => {
    const array = [...element.children];

    array.forEach((option, index) => {
        console.log(rangeArray[index]);
    });
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

    if (array === undefined) {
        throw new Error('"array" is undefined');
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

const loadActivities = (data) => {
    let acGroups = groupBy(data, 'termin');

    for (let acGroupData of acGroups) {
        let acGroup = activityGroupTemplate.cloneNode(true);

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
};

// todo loading batches of activities instead of loading all at onnce
const load = (range) => {
    console.debug(prepareUrl(params.get('type'), params.get('id'), range));

    // Loading data from local storage
    //loadActivities(loadFromLocalStorage()['zajecia']);

    getData(prepareUrl(params.get('type'), params.get('id'), range)).then(data => {
        document.querySelector('#save-button').addEventListener('click', () => {
            saveToLocalStorage(data);
        });

        loadActivities(data['zajecia']);
    }).catch(error => {
        console.error(error);
    });
};

document.querySelector('#plan-range').addEventListener('change', (e) => {
    cleanContainer(document.querySelector('main'));
    load(e.target.value);
});

load(document.querySelector('#plan-range').value);