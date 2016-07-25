module.exports = {
    "parser": "babel-eslint",
    "extends": "airbnb",
    "plugins": [
        "flow-vars",
        "flowtype"
    ],
    "env": {
        jasmine: true,
        jest: true
    },
    "rules": {
        "react/jsx-no-bind": 0,
        "flow-vars/define-flow-type": 2,
        "flow-vars/use-flow-type": 2,
        "flowtype/require-parameter-type": 0,
        "flowtype/require-return-type": [
            2,
            "always",
            {
                "annotateUndefined": "never"
            }
        ],
        "flowtype/space-after-type-colon": [
            2,
            "always"
        ],
        "flowtype/space-before-type-colon": [
            2,
            "never"
        ],
        "flowtype/type-id-match": 0,
        "flowtype/require-valid-file-annotation": [
            2,
            "always"
        ]
    }
};
