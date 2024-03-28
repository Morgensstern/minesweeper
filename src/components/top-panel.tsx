import { useEffect, useState } from 'react';
import './styles/top-panel.css'

interface Props {
  status: string,
  bombsLeft: number,
  boardRestart: () => void,
  isTimerActive: boolean,
}

const TopPanel = ({ status, bombsLeft, boardRestart, isTimerActive }: Props) => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: number;
    if (isTimerActive) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive]);
  
  return (
    <div className="panel">
      <p className="panel-element">{bombsLeft}</p>
      <button onClick={() => {
        setTimer(0);
        boardRestart(); 
      }} 
        className={'panel-status' + 
          (status ==="W" && " board-status-win" || 
           status === "X" && " board-status-go" || 
           '')}>
            {status === "X" && "💀" || 
            (status === "W" && "😎" || "🙂")}
      </button>
      <p className='panel-element'>{timer}</p>
    </div>
  );
}

export default TopPanel;
