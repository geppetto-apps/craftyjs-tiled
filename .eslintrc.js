module.exports = {
    "parser": "babel-eslint",
    "extends": "airbnb",
    "plugins": [
        "flow-vars",
        "react",
        "flowtype"
    ],
    "env": {
        jasmine: true,
        jest: true
    },
    "rules": {
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
        "flowtype/type-id-match": [
            2,
            "^([A-Z][a-z0-9]+)+Type$"
        ],
        "flowtype/require-valid-file-annotation": [
            2,
            "always"
        ]
    }
};
