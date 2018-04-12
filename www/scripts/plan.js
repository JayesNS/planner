let params = new URL(window.location.href).searchParams;

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

const activityTemplate = getTemplate(document.querySelector('.activity'));
const activityGroupTemplate = getTemplate(document.querySelector('.activity-group'));
const container = document.querySelector('main');

document.querySelector('#back-button').addEventListener('click', (e) => {
    e.stopPropagation();

    history.back();
});

console.debug(prepareUrl(params.get('type'), params.get('id'), 1));
getData(prepareUrl(params.get('type'), params.get('id'), 1)).then(data => {
    let acGroups = groupBy(data['zajecia'], 'termin');

    console.debug(acGroups);
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
            changeText(activity.querySelector('.activity-organizer'), acData['nauczyciel'] || acData['grupa']);
            changeText(activity.querySelector('.activity-type'), acData['typ']);

            acGroup.querySelector('.activity-container').appendChild(activity);
        }
        container.appendChild(acGroup);
    }

   //document.querySelector('main').innerHTML = JSON.stringify(groupBy(data['zajecia'], 'termin'));
}).catch(error => {
   console.error(error);
});

const groupBy = (array, groupBy) => {
    let plan = [];

    if (array === undefined) {
        throw new Error('"array" is undefined');
    }

    array.forEach(elem => {
        if (!plan.some(val => val['termin'] === elem['termin'])) {
            plan.push({
                termin: elem['termin'],
                dzien: elem['dzien'],
                zajecia: []
            });
        }

        let day = plan.find(val => val['termin'] === elem['termin']);
        delete elem['termin'];
        delete elem['dzien'];

        day['zajecia'].push(elem);
    });
    return plan;
};