import { Routes, Route, Outlet, Link } from "react-router-dom";
import Home from "./pages/Home";
import Update from "./pages/Update";
import Initialize from "./pages/Initialize";
import Predict from "./pages/Predict";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="predict" element={<Predict />} />
          <Route path="update" element={<Update />} />
          <Route path="initialize" element={<Initialize />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/predict" className="nav-link">
                  Predict
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/update" className="nav-link">
                  Update
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/initialize" className="nav-link">
                  Initialize
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}
