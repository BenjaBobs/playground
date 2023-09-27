import { Kana, KanaRow, kanaRows } from "@src/japanese/KanaTable.data";
import "@src/japanese/KanaTable.scss";
import React, { CSSProperties } from "react";

const vowels = ["a", "i", "u", "e", "o"];

const columns = ["", ...vowels];

export function KanaTable() {
  return (
    <div className="kana-table">
      <div className="kana-grid">
        {columns.map((column) => (
          <div className="header cell" key={"header" + column}>
            {column}
          </div>
        ))}
        {kanaRows.map((row, rowIdx) => (
          <React.Fragment key={row.konsonant + rowIdx}>
            <RowFirst row={row} />
            {row.kana.map((kana, idx) => (
              <KanaCell
                key={row.konsonant + rowIdx + kana?.romaji + idx}
                index={rowIdx}
                kana={kana}
              />
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

function KanaCell(props: { kana?: Kana; index: number }) {
  if (!props.kana) return <div className="kana cell empty"></div>;

  const hue = (props.index * 360) / (kanaRows.length + 1);

  return (
    <div
      style={{ "--hue": hue } as CSSProperties}
      className={`kana cell row-${props.index} elevate`}
    >
      <div className="kana-row base-row">
        <div className="hiragana">
          {props.kana.hiragana} ({props.kana.romaji})
        </div>
        <div className="katakana">
          {props.kana.katakana} ({props.kana.romaji})
        </div>
      </div>
      {props.kana.dakuten && (
        <div className="kana-row dakuten-row">
          <div className="hiragana">
            {props.kana.hiragana + "゙"} ({props.kana.dakuten})
          </div>
          <div className="katakana">
            {props.kana.katakana + "゙"} ({props.kana.dakuten})
          </div>
        </div>
      )}
      {props.kana.handakuten && (
        <div className="kana-row handakuten-row">
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
