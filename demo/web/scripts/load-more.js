const loadMoreButton = getTemplate(document.querySelector('#load-more'));

const appendLoadMoreButton = (container) => {
    container.appendChild(loadMoreButton);
};

const deleteLoadMoreButton = () => {
    if (document.querySelector('#load-more'))
        document.querySelector('#load-more').remove();
};