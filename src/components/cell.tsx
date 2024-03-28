import './styles/cell.css';

interface Props {
  details: {cell: any, x: number, y: number},
  onRightClick: () => void,
  onLeftClick: () => void,
  status: string
}

const colorPalette = [
  "#0000FF",
  "#ffc107",
  "#FF0000",
  "#000099",
  "#964B00",
  "#00FFFF",
  "#000000",
  "#808080"
]

const Cell = ({status, details, onRightClick, onLeftClick}: Props) => {
  return (
    <div style={details.cell.value === "X" && status === "X" ? {"backgroundColor": "red"} : details.cell.value != 0 && details.cell.revealed ? {"color": colorPalette[details.cell.value]} : { "color": "black"} } onClick={() => onLeftClick()} onContextMenu={(e) => { onRightClick(); e.preventDefault(); }} className={"board-cell " + (details.cell.revealed ? details.cell.value != "X" ? "cell-active" : "" : "")}>
      {details.cell.revealed ? (details.cell.value === 0 ? "" : (details.cell.value === "X" ? "💣" : details.cell.value)) : (details.cell.flagged ? "🏳️" : "")}
    </div>
  );
}

export default Cell;
