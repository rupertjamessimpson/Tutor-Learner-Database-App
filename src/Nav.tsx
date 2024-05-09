import { Link, useLocation } from "react-router-dom";
function Nav() {
  const { pathname } = useLocation();
  return (
    <nav className="nav nav-tabs mt-2">
      <Link to="/tutors"
            className={`nav-link ${pathname.includes("tutors") ? "active" : ""}`}>Tutors</Link>
      <Link to="/learners"
            className={`nav-link ${pathname.includes("learners") ? "active" : ""}`}>Learners</Link>
    </nav>
);}

export default Nav;