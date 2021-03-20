const path = require('path');

module.exports = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    async headers() {
        return [
            {
                source: '/(.*).jpg',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'cache-control: public, max-age=31536000, immutable',
                    },
                ],
            },
            {
                source: '/(.*).png',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'cache-control: public, max-age=31536000, immutable',
                    },
                ],
            },
        ];
    },
};
