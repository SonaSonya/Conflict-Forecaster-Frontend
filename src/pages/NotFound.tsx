import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <h2>Page is not found!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default NotFound;
