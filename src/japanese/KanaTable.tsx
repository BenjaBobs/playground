import { Kana, KanaRow, kanaRows } from "@src/japanese/KanaTable.data";
import "@src/japanese/KanaTable.scss";
import React from "react";

const vowels = ["a", "i", "u", "e", "o"];

const columns = ["", ...vowels];

export function KanaTable() {
  return (
    <div className="kana-table">
      <h1>Kana table</h1>
      <div className="kana-grid">
        {columns.map((column) => (
          <div className="header cell" key={column}>
            {column}
          </div>
        ))}
        {kanaRows.map((row) => (
          <React.Fragment key={row.konsonant}>
            <RowFirst row={row} />
            {row.kana.map((kana, idx) => (
              <KanaCell key={kana?.romaji ?? idx} kana={kana} />
            ))}
          </React.Fragment>
        ))}
      </div>
      {}
    </div>
  );
}

function RowFirst(props: { row: KanaRow }) {
  return (
    <div className="konsonant cell">
      <div>{props.row.konsonant}-</div>
      {props.row.dakutenKonsonant && <div>{props.row.dakutenKonsonant}-</div>}
      {props.row.handakutenKonsonant && (
        <div>{props.row.handakutenKonsonant}-</div>
      )}
    </div>
  );
}

function KanaCell(props: { kana?: Kana }) {
  if (!props.kana) return <div className="kana cell empty"></div>;

  return (
    <div className="kana cell">
      <div className="kana cell-row">
        <div className=" hiragana">
          {props.kana.hiragana} ({props.kana.romaji})
        </div>
        <div className=" katakana">
          {props.kana.katakana} ({props.kana.romaji})
        </div>
      </div>
      {props.kana.dakuten && (
        <div className="kana cell-row">
          <div className=" hiragana">
            {props.kana.hiragana + "゙"} ({props.kana.dakuten})
          </div>
          <div className=" katakana">
            {props.kana.katakana + "゙"} ({props.kana.dakuten})
          </div>
        </div>
      )}
      {props.kana.handakuten && (
        <div className="kana cell-row">
          <div className="hiragana">
            {props.kana.hiragana + "゚"} ({props.kana.handakuten})
          </div>
          <div className="katakana">
            {props.kana.katakana + "゚"} ({props.kana.handakuten})
          </div>
        </div>
      )}
    </div>
  );
}
