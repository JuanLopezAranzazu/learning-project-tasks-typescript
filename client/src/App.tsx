import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Missing } from "./pages/Missing";
import { PrivatePage } from "./components/PrivatePage";
// tasks
import { Tasks } from "./pages/tasks/Tasks";
import { TaskAdd } from "./pages/tasks/TaskAdd";
import { TaskEdit } from "./pages/tasks/TaskEdit";
// auth
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { PublicPage } from "./components/PublicPage";

// Componente principal
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* rutas publicas */}
        <Route element={<PublicPage />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        {/* rutas privadas */}
        <Route element={<PrivatePage />}>
          <Route path="" element={<Tasks />} />
          <Route path="/tasks/add" element={<TaskAdd />} />
          <Route path="/tasks/edit/:id" element={<TaskEdit />} />
        </Route>
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
