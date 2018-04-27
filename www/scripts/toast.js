// Creating new toast or changing existing one
const createToast = (text) => {
    return new Promise((resolve, reject) => {

        let toast;
        // If toast already exists, change text
        if (document.querySelector('.toast')) {
            toast = document.querySelector('.toast');
            toast.querySelector('div').textContent = text;
            resolve(toast);
        } else { // or create new with given text and then insert
            toast = document.createElement('div');
            toast.classList.add('toast');

            const toastBody = document.createElement('div');
            toastBody.textContent = text;

            toast.appendChild(toastBody);
            resolve(document.body.appendChild(toast));
        }
    });
};

const showToast = (text, time) => {

    // Making sure that given time is integer
    if (!Number.isInteger(time))
        return;

    createToast(text).then((toast) => {
        // Waiting a tick to make sure that css will handle class change
        setTimeout(() => {
            toast.classList.add('active');

            // Hiding toast given time passes
            setTimeout(() => {
                toast.classList.remove('active');
            }, time);
        }, 1);
    });
};

// Creating Toast at the beginning
(() => {
    createToast('');
})();