const localStorageKeys = {
    'LOCAL_PLANS': 'local-plans'
};

const localPlanRange = {
    1: "Aktualny",
    2: "Pełny",
    3: "Poprzedni"
};

// Setting plan to local storage
const setLocalPlan = (plan) => {
    // Obtaining local plan list
    let localPlans = getLocalPlans() || {};

    const name = `${plan['nazwa']} - ${localPlanRange[plan['okres']]}`;

    // Appending new plan to list
    localPlans[name] = plan;

    // Saving updated list to localStorage
    localStorage.setItem(localStorageKeys.LOCAL_PLANS, JSON.stringify(localPlans));
};

// Getting specified plan or all plans if parameter not given
const getLocalPlans = (planName) => {
    const localPlans = localStorage.getItem(localStorageKeys.LOCAL_PLANS);

    // Checking if local plans exist
    if (!localPlans)
        return;

    // If planName is given and if it exists in localStorage
    if (planName && localPlans[planName])
        return JSON.parse(localPlans)[planName];

    // If parameter is not given return all local plans
    return JSON.parse(localPlans);
};

const updateLocalPlan = (planName) => {
    let localPlans = getLocalPlans();

    for (let planName in localPlans) {
        if (!localPlans.hasOwnProperty(planName)) {
            continue;
        }

        const plan = localPlans[planName];

        getData(prepareUrl(plan['typ'], plan['id'], plan['okres'])).then(data => {
            setLocalPlan(data);
        });
    }
};

// Remove plan with given name
const removeLocalPlan = (planName) => {
    let localPlans = getLocalPlans();

    // Checking if local plans exist
    if (!localPlans)
        return;

    // Deleting plan with given name
    delete localPlans[planName];

    // Setting updated plan list without removed plan
    localStorage.setItem(localStorageKeys.LOCAL_PLANS, JSON.stringify(localPlans));
};