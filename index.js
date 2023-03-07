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
        onLoadRouters: async (app) => {
            // 确保菜单存在
            const coreModules = app.modules['core-modules'];
            if (coreModules) {
                if ((await app.models.menu.countDocuments({})) <= 0) {
                    await coreModules.ensureMenu('后台主菜单');

                    await app.models.menu.create({
                        "Category": "后台主菜单",
                        "Label": "首页",
                        "Icon": "home",
                        "Enabled": true,
                        "Deleted": false,
                        "Index": 0,
                        "Route": "/home",
                        "Saved": true
                    });

                    const sysConfigMenu = await app.models.menu.create({
                        "Category": "后台主菜单",
                        "Label": "系统管理",
                        "Icon": "settings",
                        "Enabled": true,
                        "Deleted": false,
                        "Index": 100,
                        "Saved": true,
                    });

                    if (sysConfigMenu && sysConfigMenu.id) {
                        await app.models.menu.create({
                            "Category": "后台主菜单",
                            "Label": "菜单管理",
                            "Icon": "",
                            "Enabled": true,
                            "Deleted": false,
                            "Parent": sysConfigMenu.id,
                            "Route": "/admin/menu",
                            "Index": 1,
                            "Saved": true,
                            "Permission": { "menu": { "has": true } },
                        });

                        const loadedModules = Object.keys(app.modules) || [];
                        for (let i = 0; i < loadedModules.length; i += 1) {
                            const lmdl = loadedModules[i];

                            switch (lmdl) {
                                case 'account':
                                    await app.models.menu.create({
                                        "Category": "后台主菜单",
                                        "Label": "账号管理",
                                        "Icon": "",
                                        "Enabled": true,
                                        "Deleted": false,
                                        "Parent": sysConfigMenu.id,
                                        "Route": "/admin/account",
                                        "Index": 2,
                                        "Saved": true,
                                        "Permission": { "account": { "has": true } },
                                    });

                                    await app.models.menu.create({
                                        "Category": "后台主菜单",
                                        "Label": "组织机构管理",
                                        "Icon": "",
                                        "Enabled": true,
                                        "Deleted": false,
                                        "Parent": sysConfigMenu.id,
                                        "Route": "/admin/org",
                                        "Index": 4,
                                        "Saved": true,
                                        "Permission": { "org": { "has": true } },
                                    });

                                    await app.models.menu.create({
                                        "Category": "后台主菜单",
                                        "Label": "权限定义管理",
                                        "Icon": "",
                                        "Enabled": true,
                                        "Deleted": false,
                                        "Parent": sysConfigMenu.id,
                                        "Route": "/admin/perm",
                                        "Index": 80,
                                        "Saved": true,
                                        "Permission": { "perm": { "has": true } },
                                    });

                                    await app.models.menu.create({
                                        "Category": "后台主菜单",
                                        "Label": "权限标签管理",
                                        "Icon": "",
                                        "Enabled": true,
                                        "Deleted": false,
                                        "Parent": sysConfigMenu.id,
                                        "Route": "/admin/plabel",
                                        "Index": 81,
                                        "Saved": true,
                                        "Permission": { "plabel": { "has": true } },
                                    });
                                    break;
                                case 'core-modules':
                                    await app.models.menu.create({
                                        "Category": "后台主菜单",
                                        "Label": "字典管理",
                                        "Icon": "",
                                        "Enabled": true,
                                        "Deleted": false,
                                        "Parent": sysConfigMenu.id,
                                        "Route": "/admin/dict",
                                        "Index": 3,
                                        "Saved": true,
                                        "Permission": { "dict": { "has": true } },
                                    });
                                    
                                    await app.models.menu.create({
                                        "Category": "后台主菜单",
                                        "Label": "错误代码管理",
                                        "Icon": "",
                                        "Enabled": true,
                                        "Deleted": false,
                                        "Parent": sysConfigMenu.id,
                                        "Route": "/admin/errcode",
                                        "Index": 100,
                                        "Saved": true,
                                        "Permission": { "error": { "has": true } },
                                    });

                                    await app.models.menu.create({
                                        "Category": "后台主菜单",
                                        "Label": "系统配置",
                                        "Icon": "",
                                        "Enabled": true,
                                        "Deleted": false,
                                        "Parent": sysConfigMenu.id,
                                        "Route": "/admin/config",
                                        "Index": 1000,
                                        "Saved": true,
                                        "Permission": { "system": { "has": true } },
                                    });
                                    break;
                                default:
                                    break;
                            }

                        }
                    }
                }

                // init system config
                await coreModules.setSystemConfig('系统名称', "", null, '基础设置', '', '', {
                    Type: 'String',
                    Name: 'Value',
                    Warning: '',
                    "Index": 1,
                    "Label": "系统名称",
                });
            }
        },
        onRoutersReady: () => {
        }
    },
}