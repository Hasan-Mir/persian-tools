// <Reference path='https://fa.wikipedia.org/wiki/الگو:عدد_به_حروف/توضیحات' />
// https://fa.wikipedia.org/wiki/۱۰۰۰۰۰۰۰۰۰_(عدد)

import { addCommas } from "../commas";
import { replaceArray } from "../../helpers";
import { digitsEnToAr, digitsEnToFa, digitsFaToEn } from "../digits";
import removeOrdinalSuffix from "../removeOrdinalSuffix";
import { UNITS, TEN, MAGNITUDE, TYPO_LIST, JOINERS, PREFIXES } from "./constants";
import { fuzzy } from "./fuzzy";

/**
 *
 * @category Number conversion
 */
export interface WordsToNumberOptions {
	digits?: "en" | "fa" | "ar";
	addCommas?: boolean;
	/**
	 * @description Fuzzy persian typo fixer
	 * @since v1.5.0
	 * @type boolean
	 */
	fuzzy?: boolean;
}

function compute(tokens: string[]): number {
	let sum = 0;
	let isNegative = false;

	tokens.forEach((token) => {
		token = digitsFaToEn(token)!;

		if (token === PREFIXES[0]) {
			isNegative = true;
		} else if (UNITS[token] != null) {
			sum += UNITS[token];
		} else if (TEN[token] != null) {
			sum += TEN[token];
		} else if (!isNaN(Number(token))) {
			sum += parseInt(token, 10);
		} else {
			sum = sum === 0 ? MAGNITUDE[token] : sum * MAGNITUDE[token];
		}
	});
	return isNegative ? sum * -1 : sum;
}

function tokenize(words: string): string[] {
	words = replaceArray(words, TYPO_LIST);

	const result: string[] = [];
	const slittedWords: string[] = words.split(" ");
	slittedWords.forEach((word) => {
		return word === JOINERS[0] ? "" : result.push(word);
	});

	return result;
}

/**
 *
 * Convert to numbers
 *
 * @category Number conversion
 * @return Converted words to number. e.g: 350000
 */
export default function wordsToNumber<TResult extends string | number>(
	words: string,
	{ digits = "en", addCommas: shouldAddCommas = false, fuzzy: isEnabledFuzzy = false }: WordsToNumberOptions = {},
): TResult {
	if (!words) return "" as TResult;

	// Remove ordinal suffixes
	words = removeOrdinalSuffix(words)!;
	// Fix Persian typo's if enabled is this option is enabled
	const classified = isEnabledFuzzy ? fuzzy(words) : words;
	const computeNumbers = compute(tokenize(classified!));
	const addCommasIfNeeded: string | number = shouldAddCommas ? addCommas(computeNumbers) : (computeNumbers as number);

	if (digits === "fa") {
		return digitsEnToFa(addCommasIfNeeded) as TResult;
	} else if (digits === "ar") {
		return digitsEnToAr(addCommasIfNeeded) as TResult;
	} else {
		return addCommasIfNeeded as TResult;
	}
}
