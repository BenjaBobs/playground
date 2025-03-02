import { ContentBox } from "@src/common/context-box/ContextBox";
import { KanaUtils } from "@src/japanese/utils/kana-utils";
import { makeAutoObservable } from "mobx";
import { SyntheticEvent, useEffect } from "react";
import "./KanaTyper.scss";

type TypedKana = {
	idx: number;
	kana: string;
	expected: string;
	typed?: string;
	correct?: boolean;
};

const game = makeAutoObservable({
	currentIdx: 0,
	currentInput: "",
	kanasPrev: [] as TypedKana[],
	kanas: [] as TypedKana[],
	kanasNext: [] as TypedKana[],
	allTypedKanas: [] as TypedKana[],
	timer: undefined as
		| undefined
		| { handle: number; startedAtMs: number; timeLeftMs: number },
	timeLimitMs: 0,
	finished: false,

	reset(): void {
		this.currentInput = "";
		this.currentIdx = 0;
		this.kanasPrev = [];
		this.kanas = this.generateKanas(0);
		this.kanasNext = this.generateKanas(this.kanas.last()!.idx + 1);
		clearInterval(this.timer?.handle);
		this.timer = undefined;
		this.timeLimitMs = 30_000;
		this.finished = false;
	},

	submit(): void {
		const currentText = this.currentInput;
		const currentIdx = this.currentIdx;

		const kana = this.kanas.find((it) => it.idx === currentIdx)!;
		kana.typed = currentText.trim().toLowerCase();
		kana.correct = kana.typed === kana.expected;

		this.currentInput = "";
		this.currentIdx++;

		if (kana === this.kanas.last()) {
			this.kanasPrev = [...this.kanas];
			this.kanas = [...this.kanasNext];
			this.kanasNext = this.generateKanas(this.kanas.last()!.idx + 1);
		}

		this.allTypedKanas.push(kana);
	},

	onInput(evt: SyntheticEvent<HTMLInputElement>): void {
		if (!this.timer && !this.finished) {
			this.timer = {
				handle: setInterval(() => {
					this.tick();
				}, 100),
				startedAtMs: Date.now(),
				timeLeftMs: this.timeLimitMs,
			};

			console.log("started timer", this.timer);
		}

		const inputElem = evt.target as HTMLInputElement;

		if (inputElem.value.endsWith(" ")) this.submit();
		else this.currentInput = inputElem.value;
	},

	tick(): void {
		if (!this.timer) return;

		const msSinceStart = Date.now() - this.timer.startedAtMs;
		this.timer.timeLeftMs = this.timeLimitMs - msSinceStart;

		if (this.timer.timeLeftMs <= 0) {
			clearInterval(this.timer.handle);
			this.timer = undefined;
			this.finished = true;
		}
	},

	generateKanas(startingIdx: number): TypedKana[] {
		const result: TypedKana[] = [];

		for (let i = 0; i < 10; i++) {
			const table = hiraganas;
			const selectedKana = table[Math.floor(Math.random() * table.length)];
			result.push({
				idx: startingIdx + i,
				kana: selectedKana,
				expected: KanaUtils.toRomaji(selectedKana),
			});
		}

		return result;
	},
});

export function KanaTyper() {
	useEffect(() => {
		game.reset();
	}, []);

	return (
		<ContentBox>
			<h1>Kana typer</h1>
			<div>
				{!game.timer
					? "Type to start"
					: `Time left: ${(game.timer.timeLeftMs / 1000).toFixed(2)}`}
			</div>
			<br />
			<div className="kanas-to-type">
				{[game.kanasPrev, game.kanas, game.kanasNext].map((row, idx) => (
					<div key={idx} className={{ 0: "prev", 1: "cur", 2: "next" }[idx]}>
						<span style={{ opacity: 0 }}>|</span>
						{row.map((it) => (
							<span
								key={it.idx}
								className={
									{ true: "correct", false: "incorrect", undefined: "" }[
										it.correct as any as string
									] + (it.idx === game.currentIdx ? " current" : "")
								}
							>
								{it.kana}
							</span>
						))}
					</div>
				))}
			</div>
			<br />
			<input
				autoFocus
				disabled={game.finished}
				value={game.currentInput}
				onKeyDown={(evt) => {
					if (evt.key === "Enter") game.submit();
				}}
				onInput={(evt) => game.onInput(evt)}
			/>
			{game.finished && (
				<>
					<br />
					<button onClick={() => game.reset()}>Reset</button>
					<br />
					<div>
						Correct:{" "}
						{game.allTypedKanas.filter((it) => it.correct === true).length}
					</div>
					<div>
						Incorrect:{" "}
						{game.allTypedKanas.filter((it) => it.correct === false).length}
					</div>
					<div>
						Kana/minute:{" "}
						{(
							game.allTypedKanas.filter((it) => it.correct != undefined)
								.length /
							60_000 /
							game.timeLimitMs
						).toFixed(2)}
					</div>
				</>
			)}
		</ContentBox>
	);
}

const hiraganas = [
	"あ",
	"い",
	"う",
	"え",
	"お",
	"か",
	"き",
	"く",
	"け",
	"こ",
	"さ",
	"し",
	"す",
	"せ",
	"そ",
	"た",
	"ち",
	"つ",
	"て",
	"と",
	"な",
	"に",
	"ぬ",
	"ね",
	"の",
	"は",
	"ひ",
	"ふ",
	"へ",
	"ほ",
	"ま",
	"み",
	"む",
	"め",
	"も",
	"や",
	"ゆ",
	"よ",
	"ら",
	"り",
	"る",
	"れ",
	"ろ",
	"わ",
	"を",
	"ん",
	"が",
	"ぎ",
	"ぐ",
	"げ",
	"ご",
	"ざ",
	"じ",
	"ず",
	"ぜ",
	"ぞ",
	"だ",
	"ぢ",
	"づ",
	"で",
	"ど",
	"ば",
	"び",
	"ぶ",
	"べ",
	"ぼ",
	"ぱ",
	"ぴ",
	"ぷ",
	"ぺ",
	"ぽ",
];
