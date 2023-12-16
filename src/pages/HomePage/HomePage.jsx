

export default function HomePage (){
    return(
    <div className='flex items-center justify-center min-h-screen w-full'>
        <article className='w-1/2 pl-3'>
            <h1 className='text-white font-bold text-xl p-2'>Welcome to Portfolio-Pro</h1>
            <p className='text-white text-md pl-10 pr-10'>Empower your financial journey with PortfolioPro – your all-in-one solution for seamless stock tracking and investment management. Whether you're a seasoned investor or just getting started, PortfolioPro provides the tools you need to make informed decisions, manage your portfolio effortlessly, and stay ahead in the dynamic world of finance.</p>
        </article>
        <article id='imgbox' className='flex ml-auto'>
            <img id='stocksimg' src="https://media.warriortrading.com/2019/08/shutterstock_775889491.jpg" alt=""  className='max-w-full'/>
    </article>
    </div>
    )
}