const getTemplate = (templateElement) => {
    const template = templateElement;
    template.remove();
    template.removeAttribute('id');
    return template;
};