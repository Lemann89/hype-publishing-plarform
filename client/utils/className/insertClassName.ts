const insertClassName = (rule, className) => {
    if (rule) {
        return ' ' + className;
    }
    return '';
};

export { insertClassName };
