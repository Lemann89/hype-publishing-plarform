export const getTextFromHtml = (htmlString) => {
    const span = document.createElement('span');
    span.innerHTML = htmlString;
    return span.textContent || span.innerText;
};
