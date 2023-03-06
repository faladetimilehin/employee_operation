import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmployeeCreate from "./EmployeeCreate";
import EmployeeDetail from "./EmployeeDetail";
import EmployeeEdit from "./EmployeeEdit";
import EmployeeListing from "./EmployeeListing";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {

  return (
    <div className="App">
      <h1>React JS CRUD Operations </h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EmployeeListing />}>
          </Route>
          <Route path="/employee/create" element={<EmployeeCreate />}>
          </Route>
          <Route path="/employee/edit/:id" element={<EmployeeEdit />}>
          </Route>
          <Route path="/employee/detail/:id" element={<EmployeeDetail />}>
          </Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer></ToastContainer>
    </div>
  );

}

export default App;
