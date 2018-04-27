const sessionKeys = {
    'RECENTLY_ACTIVED_TAB': 'recently-actived-tab',
    "RECENTLY_SEARCHED_VALUE": 'recently-searched-value',
    "RECENTLY_OPENED_PLAN": 'recently-opened-plan'
};

const setSessionItem = (key, data) => {
    sessionStorage.setItem(key, JSON.stringify(data));
};

const getSessionItem = (key) => {
    return JSON.parse(sessionStorage.getItem(key));
};

const removeSessionItem = (key) => {
    sessionStorage.removeItem(key);
};

const addToSessionItem = (key, data) => {
    let object = getSessionItem(key);

    if (object.length !== undefined) {
        object.push(data);
    } else {

    }
    setSessionItem(key, object);
};

const createSession = () => {
    for (const key in sessionKeys) {
        if (!sessionKeys.hasOwnProperty(key))
            return;

        setSessionItem(sessionKeys[key], null);
    }
};

const isSessionCreated = () => {
  return sessionStorage.length > 0;
};

const removeFromSessionItem = (key, data) => {
    console.log(getSessionItem(key));
    setSessionItem(key, getSessionItem(key).filter(val => JSON.stringify(val) !== JSON.stringify(data)));
};

