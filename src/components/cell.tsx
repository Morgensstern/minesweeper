import './styles/cell.css';

interface Props {
  details: {cell: any, x: number, y: number},
  onRightClick: (e) => void
}

const Cell = ({details, onRightClick}: Props) => {
  return (
    <div onContextMenu={onRightClick} className="board-cell">
      {details.cell.revealed ? details.cell.value : details.cell.flagged ? "F" : ""}
    </div>
  );
}

export default Cell;
