import './App.css'
import Dashboard from './components/Dashboard/Dashboard'
import { Button } from './components/Button'

function App() {

  return (
    <Dashboard >
      <div className="flex flex-col items-center justify-center gap-3">
        <Button>
          + Compose
        </Button>
        <Button variant={"outline"}>
          hi
        </Button>
        <Button size={"sm"}>
          + Compose
        </Button>
        <Button variant={"outline"} size={"sm"}>
          hi
        </Button>
      </div>
    </Dashboard>
  )
}

export default App
