import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <>
    <nav className='min-w-screen p-1'>
        <div className='flex text-white float-left gap-2 pt-1'>
            <svg  xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-7">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
            </svg>
            <span id="logotext" className='font-bold text-xl'>Portfolio-Pro</span>
        </div>
        <ul className='flex float-right pt-1'>
            <li className="flex-shrink-0"><Link className="block px-4 py-.5 font-bold text-white" to="/orders">Order History</Link></li>
            <li className="flex-shrink-0"><Link className="block px-4 py-.5 font-bold text-white" to="/orders/new">New Order</Link></li>   
            <li className="flex-shrink-0"><span className="block px-4 py-.5 font-bold text-white">Welcome, {user.name}</span></li>
            <li className="flex-shrink-0"><Link  className="block px-4 py-.5 font-bold text-white" to="" onClick={handleLogOut}>Log Out</Link></li>
       </ul>
    </nav>

    </>
  );
}