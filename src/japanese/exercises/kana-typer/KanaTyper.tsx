import { ContentBox } from "@src/common/context-box/ContextBox";
import { KanaUtils } from "@src/japanese/utils/kana-utils";
import { makeAutoObservable } from "mobx";
import { SyntheticEvent, useEffect } from "react";
import { Dropdown } from "@src/common/windows/dropdown/Dropdown";
import { CheckBox } from "@src/common/input/checkbox/CheckBox";
import { Flex } from "@src/common/flex/flex";
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
	timeLimitMs: 30_000,
	finished: false,
	enabledKanas: [] as string[],
	dakuten: true,
	handakuten: true,

	reset(): void {
		this.currentInput = "";
		this.currentIdx = 0;
		if (!this.enabledKanas.length)
			this.enabledKanas = Object.values(kanaTables)
				.flatMap((it) => Object.values(it))
				.flatMap((it) => it);
		this.allTypedKanas = [];
		this.kanasPrev = [];
		this.kanas = this.generateKanas(0);
		this.kanasNext = this.generateKanas(this.kanas.last()!.idx + 1);
		clearInterval(this.timer?.handle);
		this.timer = undefined;
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
		if (!this.timer && !this.finished && this.timeLimitMs) {
			this.timer = {
				handle: setInterval(() => {
					this.tick();
				}, 100),
				startedAtMs: Date.now(),
				timeLeftMs: this.timeLimitMs,
			};
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
			setTimeout(
				() => document.getElementById("kana-typer-reset-button")?.focus(),
				1,
			);
		}
	},

	generateKanas(startingIdx: number): TypedKana[] {
		const result: TypedKana[] = [];

		if (!this.enabledKanas.length) return result;

		const pool = new Set([...this.enabledKanas]);

		if (this.dakuten) {
			for (const dakuten of [...pool.values()].map(KanaUtils.toDakuten))
				pool.add(dakuten);
		}

		if (this.handakuten) {
			for (const handakuten of [...pool.values()].map(KanaUtils.toHandakuten))
				pool.add(handakuten);
		}

		const poolArr = Array.from(pool);

		for (let i = 0; i < 10; i++) {
			const selectedKana = poolArr[Math.floor(Math.random() * poolArr.length)];

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
			<Flex itemsPlacement="center" gap={12}>
				<Dropdown trigger="click" content={<KanaTyperSettings />}>
					<span className="clickable">&#128736;</span>
				</Dropdown>
				<h1>Kana typer</h1>
			</Flex>
			<div>
				{!game.timer
					? "Type to start"
					: `Time left: ${(game.timer.timeLeftMs / 1000).toFixed(2)}`}
			</div>
			<br />
			<div className="kanas-to-type">
				{[game.kanasPrev, game.kanas, game.kanasNext].map((row, idx) => (
					<Flex
						key={idx}
						className={{ 0: "prev", 1: "cur", 2: "next" }[idx]}
						justify="space-between"
					>
						<span style={{ opacity: 0, width: 0, height: "2em" }}>|</span>
						{row.map((it) => (
							<Flex
								down
								itemsPlacement="center"
								key={it.idx}
								className={
									{ true: "correct", false: "incorrect", undefined: "" }[
										it.correct as any as string
									] + (it.idx === game.currentIdx ? " current" : "")
								}
							>
								<span>{it.kana}</span>
								<span
									style={{
										fontSize: "0.3em",
										opacity: it.correct != null ? 1 : 0,
									}}
								>
									{it.expected}
								</span>
							</Flex>
						))}
					</Flex>
				))}
			</div>
			<br />
			<input
				autoFocus
				id="kana-typer-input"
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
					<button
						id="kana-typer-reset-button"
						onClick={() => {
							game.reset();
							document.getElementById("kana-typer-input")?.focus();
						}}
					>
						Reset
					</button>
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
							(game.allTypedKanas.filter((it) => it.correct != undefined)
								.length /
								game.timeLimitMs) *
							60_000
						).toFixed(2)}
					</div>
				</>
			)}
		</ContentBox>
	);
}

function KanaTyperSettings() {
	return (
		<Flex
			down
			bg="white"
			pad={8}
			gap={8}
			border="1px solid black"
			style={{ minWidth: 350 }}
		>
			<h3>Selected Kana</h3>
			<Flex itemsPlacement="center">
				Time in seconds{" "}
				<input
					value={game.timeLimitMs / 1000}
					onChange={(evt) => {
						const parsed = Number.parseFloat(evt.target.value);
						if (parsed != null && !Number.isNaN(parsed)) {
							game.timeLimitMs = parsed * 1000;
						}
					}}
				/>
			</Flex>
			<Flex gap={8}>
				<CheckBox
					checked={game.dakuten}
					onChange={(val) => {
						game.dakuten = val;
						game.reset();
					}}
				>
					Dakuten
				</CheckBox>
				<CheckBox
					checked={game.handakuten}
					onChange={(val) => {
						game.handakuten = val;
						game.reset();
					}}
				>
					Handakuten
				</CheckBox>
			</Flex>
			<Flex gap={12}>
				<Flex down>
					{Object.entries(kanaTables.hiragana).map(([rowName, kanas]) => (
						<CheckBox
							key={rowName}
							onChange={() => {
								const arr = game.enabledKanas as any as string[] & {
									remove: (value: string) => boolean;
								};

								if (!kanas.every((it) => arr.remove(it))) {
									arr.push(...kanas);
								}

								game.reset();
							}}
							checked={kanas.every((k) => game.enabledKanas.includes(k))}
						>
							<div>{kanas.join(", ")}</div>
						</CheckBox>
					))}
				</Flex>

				<Flex down>
					{Object.entries(kanaTables.katakana).map(([rowName, kanas]) => (
						<CheckBox
							key={rowName}
							onChange={() => {
								const arr = game.enabledKanas as any as string[] & {
									remove: (value: string) => boolean;
								};

								if (!kanas.every((it) => arr.remove(it))) {
									arr.push(...kanas);
								}

								game.reset();
							}}
							checked={kanas.every((k) => game.enabledKanas.includes(k))}
						>
							<div>{kanas.join(", ")}</div>
						</CheckBox>
					))}
				</Flex>
			</Flex>
		</Flex>
	);
}

const kanaTables = {
	hiragana: {
		row1: ["あ", "い", "う", "え", "お"],
		row2: ["か", "き", "く", "け", "こ"],
		row3: ["さ", "し", "す", "せ", "そ"],
		row4: ["た", "ち", "つ", "て", "と"],
		row5: ["な", "に", "ぬ", "ね", "の"],
		row6: ["は", "ひ", "ふ", "へ", "ほ"],
		row7: ["ま", "み", "む", "め", "も"],
		row8: ["や", "ゆ", "よ"],
		row9: ["ら", "り", "る", "れ", "ろ"],
		row10: ["わ", "を", "ん"],
	},
	katakana: {
		row1: ["ア", "イ", "ウ", "エ", "オ"],
		row2: ["カ", "キ", "ク", "ケ", "コ"],
		row3: ["サ", "シ", "ス", "セ", "ソ"],
		row4: ["タ", "チ", "ツ", "テ", "ト"],
		row5: ["ナ", "ニ", "ヌ", "ネ", "ノ"],
		row6: ["ハ", "ヒ", "フ", "ヘ", "ホ"],
		row7: ["マ", "ミ", "ム", "メ", "モ"],
		row8: ["ヤ", "ユ", "ヨ"],
		row9: ["ラ", "リ", "ル", "レ", "ロ"],
		row10: ["ワ", "ヲ", "ン"],
	},
};
