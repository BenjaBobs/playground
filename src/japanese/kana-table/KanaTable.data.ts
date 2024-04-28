export type Kana = {
  romaji: string;
  hiragana: string;
  katakana: string;
  dakuten?: string;
  handakuten?: string;
};

export type KanaRow = {
  konsonant: string;
  dakutenKonsonant?: string;
  handakutenKonsonant?: string;
  kana: (Kana | undefined)[];
};

export const kanaRows: KanaRow[] = [
  {
    konsonant: "",
    kana: [
      {
        romaji: "a",
        hiragana: "あ",
        katakana: "ア",
      },
      {
        romaji: "i",
        hiragana: "い",
        katakana: "イ",
      },
      {
        romaji: "u",
        hiragana: "う",
        katakana: "ウ",
      },
      {
        romaji: "e",
        hiragana: "え",
        katakana: "エ",
      },
      {
        romaji: "o",
        hiragana: "お",
        katakana: "オ",
      },
    ],
  },
  {
    konsonant: "k",
    dakutenKonsonant: "g",
    kana: [
      {
        romaji: "ka",
        dakuten: "ga",
        hiragana: "か",
        katakana: "カ",
      },
      {
        romaji: "ki",
        dakuten: "gi",
        hiragana: "き",
        katakana: "キ",
      },
      {
        romaji: "ku",
        dakuten: "gu",
        hiragana: "く",
        katakana: "ク",
      },
      {
        romaji: "ke",
        dakuten: "ge",
        hiragana: "け",
        katakana: "ケ",
      },
      {
        romaji: "ko",
        dakuten: "go",
        hiragana: "こ",
        katakana: "コ",
      },
    ],
  },
  {
    konsonant: "s",
    dakutenKonsonant: "z",
    kana: [
      {
        romaji: "sa",
        dakuten: "za",
        hiragana: "さ",
        katakana: "サ",
      },
      {
        romaji: "shi",
        dakuten: "ji",
        hiragana: "し",
        katakana: "シ",
      },
      {
        romaji: "su",
        dakuten: "zu",
        hiragana: "す",
        katakana: "ス",
      },
      {
        romaji: "se",
        dakuten: "ze",
        hiragana: "せ",
        katakana: "セ",
      },
      {
        romaji: "so",
        dakuten: "zo",
        hiragana: "そ",
        katakana: "ソ",
      },
    ],
  },
  {
    konsonant: "t",
    dakutenKonsonant: "d",
    kana: [
      {
        romaji: "ta",
        dakuten: "da",
        hiragana: "た",
        katakana: "タ",
      },
      {
        romaji: "chi",
        dakuten: "ji",
        hiragana: "ち",
        katakana: "チ",
      },
      {
        romaji: "tsu",
        dakuten: "zu",
        hiragana: "つ",
        katakana: "ツ",
      },
      {
        romaji: "te",
        dakuten: "de",
        hiragana: "て",
        katakana: "テ",
      },
      {
        romaji: "to",
        dakuten: "do",
        hiragana: "と",
        katakana: "ト",
      },
    ],
  },
  {
    konsonant: "n",
    kana: [
      {
        romaji: "na",
        hiragana: "な",
        katakana: "ナ",
      },
      {
        romaji: "ni",
        hiragana: "に",
        katakana: "ニ",
      },
      {
        romaji: "nu",
        hiragana: "ぬ",
        katakana: "ヌ",
      },
      {
        romaji: "ne",
        hiragana: "ね",
        katakana: "ネ",
      },
      {
        romaji: "no",
        hiragana: "の",
        katakana: "ノ",
      },
    ],
  },
  {
    konsonant: "h",
    dakutenKonsonant: "b",
    handakutenKonsonant: "p",
    kana: [
      {
        romaji: "ha",
        dakuten: "ba",
        handakuten: "pa",
        hiragana: "は",
        katakana: "ハ",
      },
      {
        romaji: "hi",
        dakuten: "bi",
        handakuten: "pi",
        hiragana: "ひ",
        katakana: "ヒ",
      },
      {
        romaji: "fu",
        dakuten: "bu",
        handakuten: "pu",
        hiragana: "ふ",
        katakana: "フ",
      },
      {
        romaji: "he",
        dakuten: "be",
        handakuten: "pe",
        hiragana: "へ",
        katakana: "ヘ",
      },
      {
        romaji: "ho",
        dakuten: "bo",
        handakuten: "po",
        hiragana: "ほ",
        katakana: "ホ",
      },
    ],
  },
  {
    konsonant: "m",
    kana: [
      {
        romaji: "ma",
        hiragana: "ま",
        katakana: "マ",
      },
      {
        romaji: "mi",
        hiragana: "み",
        katakana: "ミ",
      },
      {
        romaji: "mu",
        hiragana: "む",
        katakana: "ム",
      },
      {
        romaji: "me",
        hiragana: "め",
        katakana: "メ",
      },
      {
        romaji: "mo",
        hiragana: "も",
        katakana: "モ",
      },
    ],
  },
  {
    konsonant: "y",
    kana: [
      {
        romaji: "ya",
        hiragana: "や",
        katakana: "ヤ",
      },
      undefined,
      {
        romaji: "yu",
        hiragana: "ゆ",
        katakana: "ユ",
      },
      undefined,
      {
        romaji: "yo",
        hiragana: "よ",
        katakana: "ヨ",
      },
    ],
  },
  {
    konsonant: "r",
    kana: [
      {
        romaji: "ra",
        hiragana: "ら",
        katakana: "ラ",
      },
      {
        romaji: "ri",
        hiragana: "り",
        katakana: "リ",
      },
      {
        romaji: "ru",
        hiragana: "る",
        katakana: "ル",
      },
      {
        romaji: "re",
        hiragana: "れ",
        katakana: "レ",
      },
      {
        romaji: "ro",
        hiragana: "ろ",
        katakana: "ロ",
      },
    ],
  },
  {
    konsonant: "w",
    kana: [
      {
        romaji: "wa",
        hiragana: "わ",
        katakana: "ワ",
      },
      {
        romaji: "wi",
        hiragana: "ゐ",
        katakana: "ヰ",
      },
      undefined,
      {
        romaji: "we",
        hiragana: "ゑ",
        katakana: "ヱ",
      },
      {
        romaji: "wo",
        hiragana: "を",
        katakana: "ヲ",
      },
    ],
  },
  {
    konsonant: "n",
    kana: [
      {
        romaji: "n",
        hiragana: "ん",
        katakana: "ン",
      },
      undefined,
      undefined,
      undefined,
      undefined,
    ],
  },
] as const;
