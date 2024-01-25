// i18n: {
//     localeDetection: false,
//         locales: ['fr', 'en'],
//         defaultLocale: 'en',
//         domains: [
//         {
//             domain: 'andy-cinquin.fr',
//             defaultLocale: 'fr',
//         },
//         {
//             domain: 'andy-cinquin.com',
//             defaultLocale: 'en',
//         },
//     ],
// },

const i18nConfig = {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    localeDetection: false,
    domains: [
        {
            domain: 'andy-cinquin.fr',
            defaultLocale: 'fr',
        },
        {
            domain: 'andy-cinquin.com',
            defaultLocale: 'en',
        },
    ],
};

module.exports = i18nConfig;