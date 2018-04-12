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

const changeText = (element, text) => {

    if (element === null) {
        throw new Error('"element" is null');
    }

    // Checking if text is an object
    text = text['$t'] !== undefined ? text['$t'] : text;
    // Checking if object is empty
    text = Object.keys(text).length === 0 && text.constructor === Object ? '' : text;

    // If text not set delete element
    if (!text) {
        element.remove();
        return;
    }

    // Append text to element
    element.textContent = text;
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
        delete elem['termin'];
        delete elem['dzien'];

        day['zajecia'].push(elem);
    });
    return plan;
};

const loadActivities = (data) => {
    let acGroups = groupBy(data, 'termin');

    for (let acGroupData of acGroups) {
        let acGroup = activityGroupTemplate.cloneNode(true);

        changeText(acGroup.querySelector('.activity-date'), formatDate(acGroupData['termin']));
        changeText(acGroup.querySelector('.activity-day'), formatWeekDay(acGroupData['dzien']));

        for (let acData of acGroupData['zajecia']) {
            let activity = activityTemplate.cloneNode(true);

            changeText(activity.querySelector('.activity-name'), acData['przedmiot']);
            changeText(activity.querySelector('.activity-time'), `${acData['od-godz']} - ${acData['do-godz']}`);
            changeText(activity.querySelector('.activity-location'), acData['sala'] || '');
            changeText(activity.querySelector('.activity-group-name'), acData['grupa'] || '');
            changeText(activity.querySelector('.activity-organizer'), acData['nauczyciel'] || '');
            changeText(activity.querySelector('.activity-type'), acData['typ']);

            acGroup.querySelector('.activity-container').appendChild(activity);
        }
        document.querySelector('main').appendChild(acGroup);
    }
};

// todo loading batches of activities instead of loading all at onnce
const load = (range) => {
    console.debug(prepareUrl(params.get('type'), params.get('id'), range));

    getData(prepareUrl(params.get('type'), params.get('id'), range)).then(data => {
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