import './general.css'
import Board from './components/board';


function App() {
  return (
    <>
      <Board rows={9} cols={9} mines={10} />
    </>
  )
}

export default App
