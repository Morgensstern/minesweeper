import { MouseEventHandler } from 'react';
import './styles/cell.css';

interface Props {
  details: {cell: any, x: number, y: number},
  onRightClick: (e: MouseEventHandler) => void,
  onLeftClick: (e: MouseEventHandler) => void
}

const colorPalette = [
  "#0000FF",
  "#00DD00",
  "#FF0000",
  "#000099",
  "#964B00",
  "#00FFFF",
  "#000000",
  "#808080"
]

const Cell = ({details, onRightClick, onLeftClick}: Props) => {
  return (
    <div style={details.cell.value != "X" && details.cell.value != 0 && details.cell.revealed ? {"color": colorPalette[details.cell.value]} : { "color": "black"} } onClick={() => onLeftClick} onContextMenu={() => onRightClick} className={"board-cell " + (details.cell.revealed ? "cell-active" : "")}>
      {details.cell.revealed ? (details.cell.value === 0 ? "" : details.cell.value) : (details.cell.flagged ? "F" : "")}
    </div>
  );
}

export default Cell;
