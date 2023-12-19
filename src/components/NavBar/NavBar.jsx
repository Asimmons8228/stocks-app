import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav className='min-w-screen p-1 flex justify-between items-center'>

      <Link to="/" className='text-white font-bold text-xl px-8 flex gap-2 justify-center items-center'>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" dataSlot="icon" className="w-7 h-7 text-white">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
    </svg>
        Portfolio-Pro
      </Link>
      <ul className='flex gap-2'>
        {user ? (
          <>
            <li className="flex-shrink-0"><Link className="block px-4 py-.5 font-bold text-white" to="/portfolio">Portfolio</Link></li>
            <li className="flex-shrink-0"><Link className="block px-4 py-.5 font-bold text-white" to="/asset/new">New Asset</Link></li>
            <li className="flex-shrink-0"><span className="block px-4 py-.5 font-bold text-white">Welcome, {user.name}</span></li>
            <li className="flex-shrink-0"><Link className="block px-4 py-.5 font-bold text-white" to="" onClick={handleLogOut}>Log Out</Link></li>
          </>
        ) : (
          <>
            <li className="flex-shrink-0"><Link className="block px-4 py-.5 font-bold text-white" to="/login">Log In</Link></li>
            <li className="flex-shrink-0"><Link className="block px-4 py-.5 font-bold text-white" to="/signup">Sign Up</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}
