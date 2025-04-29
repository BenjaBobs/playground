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
	hints: string[];
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
	enabledKanas: [] as string[],
	dakuten: true,
	handakuten: true,
	saveInLocalStorage: false,
	kanaLikelyhood: {} as { [key: string]: number },
	kanaLikelyhoodCorrectDecrease: 1,
	kanaLikelyhoodWrongIncrease: 10,
	hintDelayMs: 4000,

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

		const likelyhoodDiff = kana.correct
			? -this.kanaLikelyhoodCorrectDecrease
			: this.kanaLikelyhoodWrongIncrease;

		const undakutened = KanaUtils.fromHandakuten(
			KanaUtils.fromDakuten(kana.kana),
		);

		this.kanaLikelyhood[undakutened] =
			(this.kanaLikelyhood[undakutened] || 0) + likelyhoodDiff;

		this.currentInput = "";
		this.currentIdx++;

		if (kana === this.kanas.last()) {
			this.kanasPrev = [...this.kanas];
			this.kanas = [...this.kanasNext];
			this.kanasNext = this.generateKanas(this.kanas.last()!.idx + 1);
		}

		this.allTypedKanas.push(kana);
		this.save();
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

		const minLikelyhood = this.enabledKanas
			.map((k) => this.kanaLikelyhood[k] || 0)
			.reduce((result, next) => Math.min(next, result), 0);

		const pool = this.enabledKanas.flatMap((k) =>
			k.repeat((this.kanaLikelyhood[k] || 1) - minLikelyhood).split(""),
		);

		for (let i = 0; i < 10; i++) {
			const kanaCandidate = pool.random()!;

			const drawPool = [kanaCandidate];
			if (this.dakuten) drawPool.push(KanaUtils.toDakuten(kanaCandidate));
			if (this.handakuten) drawPool.push(KanaUtils.toHandakuten(kanaCandidate));

			const selectedKana = drawPool.random()!;

			const expectedInput = KanaUtils.toRomaji(selectedKana);

			result.push({
				idx: startingIdx + i,
				kana: selectedKana,
				expected: expectedInput,
				hints:
					expectedInput.length === 1
						? [expectedInput]
						: [
								expectedInput.slice(0, Math.ceil(expectedInput.length / 2)),
								expectedInput.slice(Math.ceil(expectedInput.length / 2)),
							],
			});
		}

		return result;
	},

	load() {
		const saved = localStorage.getItem("kanaTyper");
		if (saved) {
			const json = JSON.parse(saved);
			this.saveInLocalStorage = json.saveInLocalStorage;
			this.timeLimitMs = json.timeLimitMs;
			this.enabledKanas = json.enabledKanas || [];
			this.dakuten = json.dakuten;
			this.handakuten = json.handakuten;
			this.kanaLikelyhood = json.kanaLikelyhood || {};
			this.kanaLikelyhoodCorrectDecrease = json.kanaLikelyhoodCorrectDecrease;
			this.kanaLikelyhoodWrongIncrease = json.kanaLikelyhoodWrongIncrease;
			this.hintDelayMs = json.hintDelayMs;

			const minLikelyhood = Object.values(this.kanaLikelyhood).min() || 0;
			for (const kana of Object.keys(this.kanaLikelyhood))
				this.kanaLikelyhood[kana] -= minLikelyhood;

			this.save();
		}
	},

	save() {
		if (this.saveInLocalStorage) {
			localStorage.setItem(
				"kanaTyper",
				JSON.stringify({
					saveInLocalStorage: this.saveInLocalStorage,
					timeLimitMs: this.timeLimitMs,
					enabledKanas: this.enabledKanas,
					dakuten: this.dakuten,
					handakuten: this.handakuten,
					kanaLikelyhood: this.kanaLikelyhood,
					kanaLikelyhoodCorrectDecrease: this.kanaLikelyhoodCorrectDecrease,
					kanaLikelyhoodWrongIncrease: this.kanaLikelyhoodWrongIncrease,
					hintDelayMs: this.hintDelayMs,
				}),
			);
		} else {
			localStorage.removeItem("kanaTyper");
		}
	},
});
game.load();
(window as any).kanaTyper = game;

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
			<div
				className="kanas-to-type"
				style={{ "--hint-delay-ms": game.hintDelayMs } as any}
			>
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
										opacity:
											it.idx === game.currentIdx || it.correct != null ? 1 : 0,
									}}
								>
									{it.idx === game.currentIdx ? (
										<span>
											{it.hints.map((hint, hintIdx) => (
												<span key={hint} className={`hint-${hintIdx}`}>
													{hint}
												</span>
											))}
										</span>
									) : (
										it.expected
									)}
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
	game.save();

	return (
		<Flex
			down
			bg="white"
			pad={8}
			gap={8}
			border="1px solid black"
			style={{ minWidth: 350 }}
		>
			<CheckBox
				checked={game.saveInLocalStorage}
				onChange={(val) => {
					game.saveInLocalStorage = val;
				}}
			>
				Save settings in localStorage
			</CheckBox>
			<h3>Selected Kana</h3>
			<Flex itemsPlacement="center">
				Time in seconds{" "}
				<input
					value={game.timeLimitMs / 1000}
					onChange={(evt) => {
						const parsed = Number.parseFloat(evt.target.value);
						if (parsed != null && !Number.isNaN(parsed)) {
							game.timeLimitMs = parsed * 1000;
						} else {
							game.timeLimitMs = 0;
						}
					}}
				/>
			</Flex>
			<Flex itemsPlacement="center">
				Hint delay in seconds{" "}
				<input
					value={game.hintDelayMs / 1000}
					onChange={(evt) => {
						const parsed = Number.parseFloat(evt.target.value);
						if (parsed != null && !Number.isNaN(parsed)) {
							game.hintDelayMs = parsed * 1000;
						} else {
							game.hintDelayMs = 0;
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
			<h3>Kana likelyhood</h3>
			<Flex itemsPlacement="center">
				Correct decrease
				<input
					value={game.kanaLikelyhoodCorrectDecrease}
					onChange={(evt) => {
						const parsed = Number.parseFloat(evt.target.value);
						if (parsed != null && !Number.isNaN(parsed)) {
							game.kanaLikelyhoodCorrectDecrease = parsed;
						} else {
							game.kanaLikelyhoodCorrectDecrease = 0;
						}
					}}
				/>
			</Flex>
			<Flex itemsPlacement="center">
				Wrong increase
				<input
					value={game.kanaLikelyhoodWrongIncrease}
					onChange={(evt) => {
						const parsed = Number.parseFloat(evt.target.value);
						if (parsed != null && !Number.isNaN(parsed)) {
							game.kanaLikelyhoodWrongIncrease = parsed;
						} else {
							game.kanaLikelyhoodWrongIncrease = 0;
						}
					}}
				/>
			</Flex>

			<button onClick={() => (game.kanaLikelyhood = {})}>
				Reset kana kanaLikelyhood
			</button>
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
