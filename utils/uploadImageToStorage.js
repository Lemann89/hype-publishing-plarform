const {Storage} = require('@google-cloud/storage');
const {uuid} = require('uuidv4');

const storage = new Storage({
    keyFilename: "./config/service-account.json"
});

const bucket = storage.bucket("hype-blog-storage.appspot.com");

const uploadImageToStorage = (file) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject('No image file');
        }

        const newFileName = `${file.originalname}_${Date.now()}`;

        const fileUpload = bucket.file(newFileName);

        const accessToken = uuid();

        const blobStream = fileUpload.createWriteStream({
            metadata: {
                contentType: file.mimetype,
                metadata :{
                    firebaseStorageDownloadTokens: accessToken,
                }
            },
            public: true
        });

        blobStream.on('error', (error) => {
            reject(error ,'Something is wrong! Unable to upload at the moment.');
        });

        blobStream.on('finish', () => {
            const url = encodeURI(`https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${fileUpload.name}?alt=media&token=${accessToken}`);
            resolve(url);
        });

        blobStream.end(file.buffer);
    });
};

module.exports = uploadImageToStorage;
