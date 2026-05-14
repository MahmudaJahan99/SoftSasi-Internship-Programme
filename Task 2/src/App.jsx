import './App.css'
import Card from './components/Card/Card'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <main>
      <Card />

      <ToastContainer
        position="top-right"
        autoClose={2000}
      />
    </main>
  )
}

export default App
