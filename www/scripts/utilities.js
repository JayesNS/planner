const cleanContainer = (container) => {
    // Cleaning previous container
    if (container !== undefined) {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }
};