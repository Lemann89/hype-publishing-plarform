const HTMLParser = require('node-html-parser');
const uploadImageToStorage = require('../utils/uploadImageToStorage');

const normalizePostData = async (data, file, userId) => {
    const postData = {
        ...data,
        articlePreview: HTMLParser.parse(data.articleMarkup).text.substring(0, 450),
        tags: JSON.parse(data.tags),
        author: userId,
    };

    if (file) {
        postData.img = await uploadImageToStorage(file);
    }

    return postData;
};

module.exports = normalizePostData;
