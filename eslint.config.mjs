import globals from "globals";
import pluginJs from "@eslint/js";
import tslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import pluginPromise from "eslint-plugin-promise";
import pluginSecurity from "eslint-plugin-security";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
	{ files: ["**/*.{js,mjs,cjs,ts,json}"] },
	{
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
			globals: {
				...globals.browser,
				...globals.jest,
			},
		},
	},
	pluginJs.configs.recommended,
	...tslint.configs.recommended,
	eslintPluginPrettierRecommended,
	pluginSecurity.configs.recommended,
	pluginPromise.configs["flat/recommended"],
	importPlugin.flatConfigs.recommended,
	importPlugin.flatConfigs.typescript,
	{
		ignores: [
			"test",
			"node_modules",
			"build",
			"dist",
			"coverage",
			".github",
			".idea",
			".vscode",
			"eslint.config.mjs",
		],
		rules: {
			"import/no-dynamic-require": "warn",
			"import/no-nodejs-modules": "warn",
			"import/first": "error",
			"import/no-amd": "error",
			"@typescript-eslint/camelcase": "off",
			"@typescript-eslint/no-non-null-assertion": "off",
			"@typescript-eslint/interface-name-prefix": "off",
			"@typescript-eslint/explicit-function-return-type": "off",
			"@typescript-eslint/explicit-module-boundary-types": "off",
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-var-requires": "off",
			"@typescript-eslint/ban-ts-ignore": "off",
			"@typescript-eslint/ban-ts-comment": "off",
			"@typescript-eslint/no-empty-interface": "off",
			"@typescript-eslint/ban-types": "off",
			"security/detect-object-injection": "off",
			"prettier/prettier": [
				"error",
				{},
				{
					usePrettierrc: true,
				},
			],
		},
	},
];
