export const getImagePreview = (image) => {
    return new Promise((resolve) => {
        const reader = new FileReader();

        reader.readAsDataURL(image);

        reader.onloadend = () => {
            resolve(reader.result);
        };
    });
};
