const localStorageKeys = {
    'LOCAL_PLANS': 'local-plans'
};

// Setting plan to local storage
const setLocalPlan = (plan) => {
    // Obtaining local plan list
    let localPlans = getLocalPlans();

    // Appending new plan to list
    localPlans[plan['nazwa']] = plan;

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