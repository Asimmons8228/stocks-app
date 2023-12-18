
import { Link } from 'react-router-dom';

export default function PortfolioPage({user, setUser}) {

  
  
  return (
    <>
    <div className='flex'>
      <div id='portfolio-container' className='portfolio-container flex flex-col'>
        <div className='flex items-start flex-col mt-10'>
      <h1 id='welcometext' className='text-white font-bold mb-4'>Welcome, {user.name}</h1>
      <div id='text-box' className='mb-3 mt-2'><h1 className='text-white font-bold p-2'>Current Portfolio</h1></div>
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
        <tr>
         <td>AAPL</td>
         <td>100</td>
         <td>$150.00</td>
         <td>$15,000.00</td>
         <td>$2,500.00</td>
        </tr>
        <tr>
          <td>GOOGL</td>
          <td>50</td>
          <td>$2,000.00</td>
          <td>$100,000.00</td>
          <td>-$5,000.00</td>
        </tr>
        <tr>
          <td>MSFT</td>
          <td>75</td>
          <td>$180.00</td>
          <td>$13,500.00</td>
          <td>$1,500.00</td>
        </tr>
      </tbody>
    </table>
      </div>
          <div  className='flex'>
        <h1 className='text-white font-bold mr-3 mt-3 mb-3 p-1' id='assetbutton'><Link to={'/asset/new'}>Add Asset</Link></h1>
        <h1 className='text-white font-bold m-3 p-1' id='assetbutton'><Link to={'/asset/edit'}>Edit Assets</Link></h1>
        </div>
  </div>
      <div id='stock-data-container'className='ml-auto mt-11'>
        <div className='flex'>
        <input type="text" id='searchbox' />
        </div>
        <div className='flex-col'>
        <div id='graph-container'></div>
        </div>
        <div id='actions' className='flex'>
          <h1 className='font-bold'>Recommended Actons: </h1>
        </div>
        <div  className='flex'>
        <h1 id='buyticker'>Buy/Sell </h1>
        </div>
        <div id='actions' className='flex'>
          <h1>Potential profit/loss based upon 52-week high/low</h1>
        </div>
        <div  className='flex'>
        <h1 id='buyticker'>60% profit </h1>
        </div>
      </div>
      </div>
    </>
  );
}