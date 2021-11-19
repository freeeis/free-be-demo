const config = require('./config');

module.exports = {
    config,
    data: {
        author: {
            Name: { type: "String", required: true, unique: true }
        },
        post: {
            Author: { type: "ID", ref: "author", required: true },
            Title: { type: "String", required: true },
            Content: { type: "String", required: true, default: '' }
        }
    },
    i18n: {
        'en-us': {
            'module-title': 'Demo module',
            'module-description': 'Some description content here.',
            hello: 'English Hello',
            Bye: '888'
        },
        'zh-cn': {
            'module-title': '演示模块',
            'module-description': '一些描述信息。',
            hello: '你好'
        }
    },
    hooks: {
    },
}