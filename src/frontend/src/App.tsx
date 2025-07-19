import { BrowserRouter, Route, Routes } from "react-router"
import { ExampleAuth } from "./components/example-auth"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ExampleAuth />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
