const localStorageKeys = {
    'LOCAL_PLANS': 'local-plans'
};

const setLocalPlan = (plan) => {
    if (!localStorage.getItem(localStorageKeys.LOCAL_PLANS))
        return;

    let localPlans = JSON.parse(localStorage.getItem(localStorageKeys.LOCAL_PLANS));

    localPlans[plan['nazwa']] = plan;
    localStorage.setItem(localStorageKeys.LOCAL_PLANS, JSON.stringify(localPlans));
};

const getLocalPlans = (planName) => {
    if (!localStorage.getItem(localStorageKeys.LOCAL_PLANS))
        return;

    if (planName)
        return JSON.parse(localStorage.getItem(localStorageKeys.LOCAL_PLANS))[planName];

    return JSON.parse(localStorage.getItem(localStorageKeys.LOCAL_PLANS));
};

const removeLocalPlan = (planName) => {
    if (!localStorage.getItem(localStorageKeys.LOCAL_PLANS))
        return;

    let localPlans = getLocalPlans();
    delete localPlans[planName];
    localStorage.setItem(localStorageKeys.LOCAL_PLANS, JSON.stringify(localPlans));

    console.log(planName, localPlans);
};