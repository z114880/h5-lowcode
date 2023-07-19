/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "jquery": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "eslint:recommended", "prettier"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "prettier"
    ],
    "rules": {
        "prettier/prettier": "warn", // 不符合 prettier 规则的代码，要进行错误提示（黄线）
        "@typescript-eslint/no-explicit-any": "off",
        '@typescript-eslint/explicit-module-boundary-types': "off",
        "no-unused-vars": [2, {
            // 允许声明未使用变量
            "vars": "local",
            // 参数不检查
            "args": "none"
        }],
        "react/prop-types": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-namespace": "off",
        "@typescript-eslint/no-extra-semi": "off",
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/ban-ts-comment": "off"
    },
    "globals": {
        "JSX": true,
        "BaseFunction": true,
        "BasePromiseFunction": true,
        "process": true,
        "axios": true,
        "Nodejs": 'readonly'
    }
};
