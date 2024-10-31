import { Routes, Route } from "react-router-dom"
import LogInPage from "./pages/LogInPage/LogInPage"
import CabinetPage from "./pages/CabinetPage/CabinetPage"
function App() {
  
  return (
    <Routes>
      <Route path="/" element={<LogInPage />}></Route>
      <Route path="/cabinet" element={<CabinetPage />}></Route>
    </Routes>
  )
}

export default App
