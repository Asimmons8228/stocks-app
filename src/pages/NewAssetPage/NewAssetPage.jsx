import { Link } from "react-router-dom";

export default function NewAssetPage() {
  return (
      <div id='signupform' className='flex flex-col items-center justify-center'>
        
        <div className="signupform-container">
            <h1 className='text-white font-bold text-xl mb-2'>Add Asset to your Portfolio</h1>
          <form autoComplete="off">
            <label className='font-bold text-white'>Stock Name</label>
            <input id='signupinput' type="text" name="name" />
            <label  className='font-bold text-white'>Stock Ticker</label>
            <input id='signupinput' type="email" name="email" />
            <label className='font-bold text-white'>Share Balance</label>
            <input id='signupinput' type="password" name="password"/>
            <label className='font-bold text-white'>Purchase Price</label>
            <input id='signupinput' type="integer" name="confirm"  />
            <button id='signupbtn' type="submit">SUBMIT</button>
          </form>
        </div>
      </div>
  );
}