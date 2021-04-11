const monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const getFormattedDate = (d) => {
    const date = new Date(d);
    return `${monthShortNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};
