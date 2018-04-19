// Clear given element from all its content
const clearContainer = (container) => {
    // Checking if container exists
    if (container === undefined)
        return;

    // Iterating through all children and removing each of them
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
};

// Function to get nth ascendant of element (1 is element's parent)
const getAscendant = (element, generation) => {
    return generation > 0 ? getAscendant(element.parentElement, generation-1) : element.parentElement;
};