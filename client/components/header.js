import Link from "next/link";

const header = ({ currentUser }) => {
  console.log(currentUser);
  return (
    <nav className="navbar navbar-light bg-light d-flex flex-row justify-content-between">
      <Link href="/">
        <h4 className="navbar-brand">GITX</h4>
      </Link>
      <div className="d-flex justify-content-end">
        {currentUser?.message?.name ? (
          <ul className="nav d-flex align-item-center">
            <li>
              <Link href="/auth/signout">SignOut</Link>
            </li>
          </ul>
        ) : (
          <ul className="nav d-flex justify-content-around">
            <li className="me-3">
              <Link href="/auth/signup">Signup</Link>
            </li>
            <li>
              <Link href="/auth/signin">SignIn</Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default header;
