
import './App.css'
import MainComp from './components/MainComp';
import useUnlockAudioContext from './hooks/useUnlockAudioContext';
function App() {
  useUnlockAudioContext();
  return(
    <MainComp />
  )

}

export default App
