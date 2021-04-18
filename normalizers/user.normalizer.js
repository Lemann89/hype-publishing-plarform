const uploadImageToStorage = require("../utils/uploadImageToStorage");

const normalizeUserData = async (data, file) => {
    const userData = {
        ...data,
    };

    if (file) {
        userData.img = await uploadImageToStorage(file);
    }

    return userData;
};

module.exports = normalizeUserData;
