import { ContentBox } from "@src/common/context-box/ContextBox";
import { Flex } from "@src/common/flex/flex";
import {
  Kana,
  KanaRow,
  kanaRows,
} from "@src/japanese/kana-table/KanaTable.data";
import "@src/japanese/kana-table/KanaTable.scss";
import React, { CSSProperties } from "react";

const vowels = ["a", "i", "u", "e", "o"];

const columns = ["", ...vowels];

function positionToGridArea(
  rotated: boolean | undefined,
  row: number,
  col: number,
  rowCount = 1,
  colCount = 1
) {
  const rowStart = 1 + (rotated ? col : row);
  const rowEnd = rowStart + rowCount;
  const colStart = 1 + (rotated ? row : col);
  const colEnd = colStart + colCount;

  return `${rowStart} / ${colStart} / ${rowEnd} / ${colEnd}`;
}

export function KanaTablePage() {
  const [romaji, setRomaji] = React.useState(true);
  const [katakana, setKatakana] = React.useState(true);

  return (
    <ContentBox>
      <div>
        <Flex right justify="center" gap={40}>
          <div>
            <input
              id="romaji-checkbox"
              checked={romaji}
              onChange={() => setRomaji(!romaji)}
              type="checkbox"
            />
            <label htmlFor="romaji-checkbox">Romaji</label>
          </div>
          <div>
            <input
              id="katakana-checkbox"
              checked={katakana}
              onChange={() => setKatakana(!katakana)}
              type="checkbox"
            />
            <label htmlFor="katakana-checkbox">Katakana</label>
          </div>
        </Flex>
        <KanaTable romaji={romaji} katakana={katakana} />
      </div>
    </ContentBox>
  );
}

export function KanaTable(props: {
  rotate?: boolean;
  size?: number;
  katakana?: boolean;
  romaji?: boolean;
}) {
  return (
    <div
      style={{ fontSize: props.size }}
      className={`kana-table ${props.romaji || "no-romaji"} ${
        props.katakana || "no-katakana"
      }`}
    >
      <div className="kana-grid">
        {columns.map((column, columnIdx) => (
          <React.Fragment key={"column-" + column}>
            <div
              className="header cell"
              style={{
                gridArea: positionToGridArea(props.rotate, 0, columnIdx),
              }}
            >
              {column}
            </div>
            <div
              style={{
                gridArea: positionToGridArea(
                  props.rotate,
                  0,
                  columnIdx,
                  kanaRows.length + 1
                ),
              }}
              className={`kana-column-ghost col-${column}`}
            />
          </React.Fragment>
        ))}
        {kanaRows.map((row, rowIdx) => (
          <React.Fragment key={row.konsonant + rowIdx}>
            <RowFirst row={row} rowIdx={rowIdx + 1} />
            {row.kana.map((kana, idx) => (
              <KanaCell
                key={row.konsonant + rowIdx + kana?.romaji + idx}
                rowIndex={rowIdx}
                kana={kana}
                kanaIndex={idx}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
      {}
    </div>
  );
}

function RowFirst(props: { rotate?: boolean; row: KanaRow; rowIdx: number }) {
  return (
    <div
      className="konsonant cell"
      style={{ gridArea: positionToGridArea(props.rotate, props.rowIdx, 0) }}
    >
      <div>{props.row.konsonant}-</div>
      {props.row.dakutenKonsonant && <div>{props.row.dakutenKonsonant}-</div>}
      {props.row.handakutenKonsonant && (
        <div>{props.row.handakutenKonsonant}-</div>
      )}
    </div>
  );
}

function KanaCell(props: {
  rotate?: boolean;
  kana?: Kana;
  rowIndex: number;
  kanaIndex: number;
}) {
  const gridArea = positionToGridArea(
    props.rotate,
    props.rowIndex + 1,
    props.kanaIndex + 1
  );
  if (!props.kana)
    return (
      <div style={{ gridArea: gridArea }} className="kana cell empty"></div>
    );

  const hue = (props.kanaIndex * 360) / (5 + 1);
  const vowel = vowels[props.kanaIndex];

  return (
    <div
      style={
        {
          "--hue": hue,
          gridArea: gridArea,
        } as CSSProperties
      }
      className={`kana cell row-${props.rowIndex} col-${vowel} elevate`}
    >
      <div className={`kana-row base-row kana-${props.kana.romaji}`}>
        <div className="hiragana">
          {props.kana.hiragana}{" "}
          <span className="romaji">({props.kana.romaji})</span>
        </div>
        <div className="katakana">
          {props.kana.katakana}{" "}
          <span className="romaji">({props.kana.romaji})</span>
        </div>
      </div>
      {props.kana.dakuten && (
        <div className={`kana-row dakuten-row kana-${props.kana.dakuten}`}>
          <div className="hiragana">
            {props.kana.hiragana + "゙"}{" "}
            <span className="romaji">({props.kana.dakuten})</span>
          </div>
          <div className="katakana">
            {props.kana.katakana + "゙"}{" "}
            <span className="romaji">({props.kana.dakuten})</span>
          </div>
        </div>
      )}
      {props.kana.handakuten && (
        <div
          className={`kana-row handakuten-row kana-${props.kana.handakuten}`}
        >
          <div className="hiragana">
            {props.kana.hiragana + "゚"}{" "}
            <span className="romaji">({props.kana.handakuten})</span>
          </div>
          <div className="katakana">
            {props.kana.katakana + "゚"}{" "}
            <span className="romaji">({props.kana.handakuten})</span>
          </div>
        </div>
      )}
      <div className="kana-cell-ghost" />
    </div>
  );
}
