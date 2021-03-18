import React from 'react';

interface IIcon {
    viewbox: string;
    markup: any;
}

const Search: IIcon = {
    viewbox: '0 0 16 16',
    markup: (<path xmlns="http://www.w3.org/2000/svg" clipRule="evenodd" fill="black" fillRule="evenodd" d="M 11.5684 10.449 L 15.7656 14.6328 C 15.8379 14.7053 15.8936 14.7885 15.9326 14.8772 C 16.0615 15.1704 16.0049 15.5251 15.7646 15.7656 C 15.6074 15.9221 15.4014 16 15.1953 16 C 14.9902 16 14.7842 15.9221 14.627 15.7656 L 10.4238 11.5753 C 9.33008 12.415 7.96484 12.9205 6.48047 12.9205 C 2.90723 12.9205 0 10.0223 0 6.46021 C 0 2.89819 2.90723 0 6.48047 0 C 10.0537 0 12.9609 2.89819 12.9609 6.46021 C 12.9609 7.9657 12.4375 9.34924 11.5684 10.449 Z M 6.48145 1.60254 C 3.79492 1.60254 1.6084 3.78186 1.6084 6.46033 C 1.6084 9.13867 3.79492 11.318 6.48145 11.318 C 9.16797 11.318 11.3545 9.13867 11.3545 6.46033 C 11.3545 3.78186 9.16797 1.60254 6.48145 1.60254 Z" />)
};

const Clock: IIcon = {
    viewbox: '0 0 20 20',
    markup: (
        <g xmlns="http://www.w3.org/2000/svg">
            <path d="M13.3054 1.42329H11.1191V0.850032C11.1191 0.380814 10.7318 0 10.2545 0C9.77729 0 9.38996 0.380814 9.38996 0.850032V1.42329H5.24969V1.02684C5.24969 0.557621 4.86236 0.176807 4.38512 0.176807C3.90787 0.176807 3.52054 0.557621 3.52054 1.02684V1.42329H1.69456C0.760133 1.42329 0 2.17064 0 3.08936V13.3339C0 14.2527 0.760133 15 1.69456 15H13.3054C14.2399 15 15 14.2527 15 13.3339V3.08936C15 2.17064 14.2399 1.42329 13.3054 1.42329ZM3.52054 3.12336V3.23964C3.52054 3.70886 3.90787 4.08967 4.38512 4.08967C4.86236 4.08967 5.24969 3.70886 5.24969 3.23964V3.12336H9.38996V3.23964C9.38996 3.70886 9.77729 4.08967 10.2545 4.08967C10.7318 4.08967 11.1191 3.70886 11.1191 3.23964V3.12336H13.2709V4.58065H1.72915V3.12336H3.52054ZM1.72915 13.2999V6.28071H13.2709V13.2999H1.72915Z" />
            <rect x="3.1582" y="7.89471" width="0.789474" height="0.789474" />
            <rect x="3.15771" y="9.47388" width="0.789474" height="0.789474" />
            <rect x="3.15771" y="11.0528" width="0.789474" height="0.789474" />
            <rect x="6.31543" y="7.8949" width="0.789474" height="0.789474" />
            <rect x="6.31543" y="9.47388" width="0.789474" height="0.789474" />
            <rect x="6.31543" y="11.0528" width="0.789474" height="0.789474" />
            <rect x="9.47363" y="7.8949" width="0.789474" height="0.789474" />
            <rect x="9.47363" y="9.47388" width="0.789474" height="0.789474" />
            <rect x="9.47363" y="11.0528" width="0.789474" height="0.789474" />
            <rect x="4.73682" y="7.8949" width="0.789474" height="0.789474" />
            <rect x="4.73682" y="9.47388" width="0.789474" height="0.789474" />
            <rect x="4.73682" y="11.0528" width="0.789474" height="0.789474" />
            <rect x="7.89453" y="7.8949" width="0.789474" height="0.789474" />
            <rect x="7.89453" y="9.47388" width="0.789474" height="0.789474" />
            <rect x="7.89453" y="11.0528" width="0.789474" height="0.789474" />
            <rect x="11.0522" y="7.8949" width="0.789474" height="0.789474" />
            <rect x="11.0522" y="9.47388" width="0.789474" height="0.789474" />
            <rect x="11.0522" y="11.0528" width="0.789474" height="0.789474" />
        </g>
    ),
};

export enum Icons {
    Search,
    Clock
}

const icons = new Map<Icons, IIcon>();

icons.set(Icons.Search, Search);
icons.set(Icons.Clock, Clock);

export default icons;
