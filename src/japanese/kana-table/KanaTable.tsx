import { ContentBox } from "@src/common/context-box/ContextBox";
import { Flex } from "@src/common/flex/flex";
import { JapaneseSettings } from "@src/japanese/japanese-sitemap";
import {
  Kana,
  KanaRow,
  kanaRows,
} from "@src/japanese/kana-table/KanaTable.data";
import "@src/japanese/kana-table/KanaTable.scss";
import React, { CSSProperties } from "react";

const vowels = ["a", "i", "u", "e", "o"] as const;

const columns = ["", ...vowels] as const;
type ColumnType = (typeof columns)[number];

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
  return (
    <ContentBox>
      <KanaTable
        hiragana={JapaneseSettings.hiragana}
        romaji={JapaneseSettings.romaji}
        katakana={JapaneseSettings.katakana}
      />
    </ContentBox>
  );
}

export function KanaTable(props: {
  rotate?: boolean;
  hiragana?: boolean;
  katakana?: boolean;
  romaji?: boolean;
  style?: CSSProperties;
  className?: string;
  ghostColStyle?: (column: ColumnType) => CSSProperties | undefined;
  ghostCellStyle?: (kana: Kana | undefined) => CSSProperties | undefined;
}) {
  return (
    <div
      style={props.style}
      className={`kana-table ${props.className || ""} ${
        props.hiragana || "no-hiragana"
      } ${props.romaji || "no-romaji"} ${props.katakana || "no-katakana"}`}
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
              {column ? column + "♫" : ""}
            </div>
            <div
              style={{
                gridArea: positionToGridArea(
                  props.rotate,
                  0,
                  columnIdx,
                  kanaRows.length + 1
                ),
                ...props.ghostColStyle?.(column),
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
                ghostStyle={props.ghostCellStyle?.(kana)}
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
  ghostStyle?: CSSProperties;
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
        <Flex down className="hiragana">
          {props.kana.hiragana}{" "}
          <span className="romaji">({props.kana.romaji})</span>
        </Flex>
        <Flex down className="katakana">
          {props.kana.katakana}{" "}
          <span className="romaji">({props.kana.romaji})</span>
        </Flex>
      </div>
      {props.kana.dakuten && (
        <div className={`kana-row dakuten-row kana-${props.kana.dakuten}`}>
          <Flex down className="hiragana">
            {props.kana.hiragana + "゙"}{" "}
            <span className="romaji">({props.kana.dakuten})</span>
          </Flex>
          <Flex down className="katakana">
            {props.kana.katakana + "゙"}{" "}
            <span className="romaji">({props.kana.dakuten})</span>
          </Flex>
        </div>
      )}
      {props.kana.handakuten && (
        <div
          className={`kana-row handakuten-row kana-${props.kana.handakuten}`}
        >
          <Flex down className="hiragana">
            {props.kana.hiragana + "゚"}{" "}
            <span className="romaji">({props.kana.handakuten})</span>
          </Flex>
          <Flex down className="katakana">
            {props.kana.katakana + "゚"}{" "}
            <span className="romaji">({props.kana.handakuten})</span>
          </Flex>
        </div>
      )}
      <div className="kana-cell-ghost" style={props.ghostStyle} />
    </div>
  );
}
