import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <>
      <nav className='min-w-screen p-1 flex justify-between items-center'>
        <Link to="/" className='text-white font-bold text-xl px-8'>
          Portfolio-Pro
        </Link>
        <ul className='flex gap-2'>
            {user ? (
              <>
                <li className="flex-shrink-0"><Link className="block px-4 py-.5 font-bold text-white" to="/orders">Order History</Link></li>
                <li className="flex-shrink-0"><Link className="block px-4 py-.5 font-bold text-white" to="/orders/new">New Order</Link></li>   
                <li className="flex-shrink-0"><span className="block px-4 py-.5 font-bold text-white">Welcome, {user.name}</span></li>
                <li className="flex-shrink-0"><Link className="block px-4 py-.5 font-bold text-white" to="" onClick={handleLogOut}>Log Out</Link></li>
              </>
            ) : (
              <>
                <li className="flex-shrink-0"><Link className="block px-4 py-.5 font-bold text-white" to="/login">Log In</Link></li>
                <li className="flex-shrink-0"><Link className="block px-4 py-.5 font-bold text-white" to="/signup">Sign Up</Link></li>
              </>
            )}

      <nav className='min-w-screen p-1'>
          <div className='flex text-white float-left gap-2 pt-1'>
          </div>
          <ul className='flex float-right pt-1'>
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
    </>
  );
}
