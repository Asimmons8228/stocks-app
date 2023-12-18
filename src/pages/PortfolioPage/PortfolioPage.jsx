import { checkToken } from '../../utilities/users-service';

export default function OrderHistoryPage({user, setUser}) {
  async function handleCheckToken() {
    const expDate = await checkToken();
    console.log(expDate);
  }
  
  return (
    <>
      <div className='portfolio-container flex flex-col'>
        <div className='flex items-start flex-col mt-10'>
      <h1 id='welcometext' className='text-white font-bold mb-4'>Welcome, {user.name}</h1>
      <div id='text-box' className='mb-3 mt-3'><h1 className='text-white font-bold p-2'>Current Portfolio</h1></div>
      </div>
      <div id='table-container'>
        <table id='portfolio-table' className="table table-bordered  bg-white">
     <thead>
        <tr>
          <th className=''>Stock Ticker</th>
          <th className='pr-2'>Shares Amount</th>
          <th className='pr-2'>Purchase Price</th>
          <th className='pr-2'>Current Valuation</th>
          <th className='pr-2'>Profit/Loss</th>
        </tr>
      </thead>
      <tbody>

      </tbody>
    </table>
      </div>
      </div>
      <div>
        
      </div>
    </>
  );
}