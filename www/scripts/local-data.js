const saveToLocalStorage = (data) => {
    const key = 'plans';

    let planArray = {};
    if (localStorage.getItem(key)) {
        planArray = JSON.parse(localStorage.getItem('plans'));
    }

    planArray[data['nazwa']] = data;
    console.log(planArray);
    localStorage.setItem(key, JSON.stringify(planArray));
};

const loadFromLocalStorage = (key) => {
    const mainKey = 'plans';

    if (localStorage.getItem(mainKey)) {
        return JSON.parse(localStorage.getItem(mainKey))[key] || JSON.parse(localStorage.getItem(mainKey));
    }
};