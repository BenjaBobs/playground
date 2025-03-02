// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace KanaUtils {
	export function toRomaji(input: string) {
		return transpileLangSymbol(romajiLookup, 3, input);
	}
	export function toHiragana(input: string) {
		return transpileLangSymbol(hiraganaLookup, 3, input);
	}
	export function toKatakana(input: string) {
		return transpileLangSymbol(katakanaLookup, 3, input);
	}
	export function toAll(input: string) {
		return [toRomaji(input), toHiragana(input), toKatakana(input)];
	}
}

(window as any).KanaUtils = KanaUtils;

function transpileLangSymbol(
	lookup: Map<string, string>,
	lookahead: number,
	input: string,
): string {
	let idx = 0;
	let transpiled = "";

	while (idx < input.length) {
		let foundResult = false;

		for (
			let currentLookAhead = lookahead;
			currentLookAhead > 0;
			currentLookAhead--
		) {
			const result = lookup.get(input.slice(idx, idx + currentLookAhead));

			if (result) {
				foundResult = true;
				transpiled += result;
				idx += currentLookAhead - 1;
				break;
			}
		}

		if (!foundResult) {
			transpiled += input[idx];
		}

		idx++;
	}

	return transpiled;
}

const symbolGroupings: [string, string, string][] = [
	["あ", "ア", "a"],
	["い", "イ", "i"],
	["う", "ウ", "u"],
	["え", "エ", "e"],
	["お", "オ", "o"],
	["か", "カ", "ka"],
	["き", "キ", "ki"],
	["く", "ク", "ku"],
	["け", "ケ", "ke"],
	["こ", "コ", "ko"],
	["さ", "サ", "sa"],
	["し", "シ", "shi"],
	["す", "ス", "su"],
	["せ", "セ", "se"],
	["そ", "ソ", "so"],
	["た", "タ", "ta"],
	["ち", "チ", "chi"],
	["つ", "ツ", "tsu"],
	["て", "テ", "te"],
	["と", "ト", "to"],
	["な", "ナ", "na"],
	["に", "ニ", "ni"],
	["ぬ", "ヌ", "nu"],
	["ね", "ネ", "ne"],
	["の", "ノ", "no"],
	["は", "ハ", "ha"],
	["ひ", "ヒ", "hi"],
	["ふ", "フ", "fu"],
	["へ", "ヘ", "he"],
	["ほ", "ホ", "ho"],
	["ま", "マ", "ma"],
	["み", "ミ", "mi"],
	["む", "ム", "mu"],
	["め", "メ", "me"],
	["も", "モ", "mo"],
	["や", "ヤ", "ya"],
	["ゆ", "ユ", "yu"],
	["よ", "ヨ", "yo"],
	["ら", "ラ", "ra"],
	["り", "リ", "ri"],
	["る", "ル", "ru"],
	["れ", "レ", "re"],
	["ろ", "ロ", "ro"],
	["わ", "ワ", "wa"],
	["を", "ヲ", "wo"],
	["ん", "ン", "n"],
	["が", "ガ", "ga"],
	["ぎ", "ギ", "gi"],
	["ぐ", "グ", "gu"],
	["げ", "ゲ", "ge"],
	["ご", "ゴ", "go"],
	["ざ", "ザ", "za"],
	["じ", "ジ", "ji"],
	["ず", "ズ", "zu"],
	["ぜ", "ゼ", "ze"],
	["ぞ", "ゾ", "zo"],
	["だ", "ダ", "da"],
	["ぢ", "ヂ", "dji"],
	["づ", "ヅ", "dzu"],
	["で", "デ", "de"],
	["ど", "ド", "do"],
	["ば", "バ", "ba"],
	["び", "ビ", "bi"],
	["ぶ", "ブ", "bu"],
	["べ", "ベ", "be"],
	["ぼ", "ボ", "bo"],
	["ぱ", "パ", "pa"],
	["ぴ", "ピ", "pi"],
	["ぷ", "プ", "pu"],
	["ぺ", "ペ", "pe"],
	["ぽ", "ポ", "po"],
	["きゃ", "キャ", "kya"],
	["きゅ", "キュ", "kyu"],
	["きょ", "キョ", "kyo"],
	["しゃ", "シャ", "sha"],
	["しゅ", "シュ", "shu"],
	["しょ", "ショ", "sho"],
	["ちゃ", "チャ", "cha"],
	["ちゅ", "チュ", "chu"],
	["ちょ", "チョ", "cho"],
	["にゃ", "ニャ", "nya"],
	["にゅ", "ニュ", "nyu"],
	["にょ", "ニョ", "nyo"],
	["ひゃ", "ヒャ", "hya"],
	["ひゅ", "ヒュ", "hyu"],
	["ひょ", "ヒョ", "hyo"],
	["みゃ", "ミャ", "mya"],
	["みゅ", "ミュ", "myu"],
	["みょ", "ミョ", "myo"],
	["りゃ", "リャ", "rya"],
	["りゅ", "リュ", "ryu"],
	["りょ", "リョ", "ryo"],
	["ぎゃ", "ギャ", "gya"],
	["ぎゅ", "ギュ", "gyu"],
	["ぎょ", "ギョ", "gyo"],
	["じゃ", "ジャ", "ja"],
	["じゅ", "ジュ", "ju"],
	["じょ", "ジョ", "jo"],
	["びゃ", "ビャ", "bya"],
	["びゅ", "ビュ", "byu"],
	["びょ", "ビョ", "byo"],
	["ぴゃ", "ピャ", "pya"],
	["ぴゅ", "ピュ", "pyu"],
	["ぴょ", "ピョ", "pyo"],
	["っか", "ッカ", "kka"],
	["っき", "ッキ", "kki"],
	["っく", "ック", "kku"],
	["っけ", "ッケ", "kke"],
	["っこ", "ッコ", "kko"],
	["っさ", "ッサ", "ssa"],
	["っし", "ッシ", "sshi"],
	["っす", "ッス", "ssu"],
	["っせ", "ッセ", "sse"],
	["っそ", "ッソ", "sso"],
	["った", "ッタ", "tta"],
	["っち", "ッチ", "cchi"],
	["っつ", "ッツ", "ttsu"],
	["って", "ッテ", "tte"],
	["っと", "ット", "tto"],
	["っは", "ッハ", "hha"],
	["っひ", "ッヒ", "hhi"],
	["っふ", "ッフ", "ffu"],
	["っへ", "ッヘ", "hhe"],
	["っほ", "ッホ", "hho"],
	["っや", "ッヤ", "yya"],
	["っゆ", "ッユ", "yyu"],
	["っよ", "ッヨ", "yyo"],
	["っら", "ッラ", "rra"],
	["っり", "ッリ", "rri"],
	["っる", "ッル", "rru"],
	["っれ", "ッレ", "rre"],
	["っろ", "ッロ", "rro"],
	["っわ", "ッワ", "wwa"],
	["っを", "ッヲ", "wwo"],
	["っん", "ッン", "nn"],
	["っが", "ッガ", "gga"],
	["っぎ", "ッギ", "ggi"],
	["っぐ", "ッグ", "ggu"],
	["っげ", "ッゲ", "gge"],
	["っご", "ッゴ", "ggo"],
	["っざ", "ッザ", "zza"],
	["っじ", "ッジ", "jji"],
	["っず", "ッズ", "zzu"],
];

const hiraganaLookup = new Map<string, string>([
	...symbolGroupings.map(([hiragana, , romaji]) => [romaji, hiragana]),
	...symbolGroupings.map(([hiragana, katakana]) => [katakana, hiragana]),
] as [string, string][]);

const romajiLookup = new Map<string, string>([
	...symbolGroupings.map(([hiragana, , romaji]) => [hiragana, romaji]),
	...symbolGroupings.map(([, katakana, romaji]) => [katakana, romaji]),
] as [string, string][]);

const katakanaLookup = new Map<string, string>([
	...symbolGroupings.map(([hiragana, katakana]) => [hiragana, katakana]),
	...symbolGroupings.map(([, katakana, romaji]) => [romaji, katakana]),
] as [string, string][]);

console.log(katakanaLookup);
