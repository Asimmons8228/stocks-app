

export default function HomePage (){
    return(
    <>
    <section id="home-section-1">
    <div className='flex items-center justify-center min-h-screen w-full'>
        <article className='w-1/2 pl-3'>
            <h1 className='text-white font-bold text-xl p-2'>Welcome to Portfolio-Pro</h1>
            <p className='text-white font-bold text-md pl-10 pr-10'>Empower your financial journey with PortfolioPro – your all-in-one solution for seamless stock tracking and investment management. Whether you're a seasoned investor or just getting started, PortfolioPro provides the tools you need to make informed decisions, manage your portfolio effortlessly, and stay ahead in the dynamic world of finance.</p>
        </article>
        <article id='imgbox' className='flex ml-auto'>
            <img id='stocksimg' src="https://media.warriortrading.com/2019/08/shutterstock_775889491.jpg" alt=""  className='max-w-full'/>
    </article>
    </div>
    </section>
    <section id="home-section-2">
        <h1 id='header' className="text-white font-bold text-xl">Financial Success with a 90% accurcy rate!</h1>
        <div className="flex justify-between items-center">
        <div id="infobox" className="flex-grow ml-8"></div>
        <div id="infobox" className="flex-grow ml-8 mr-8"></div>
        <div id="infobox" className="flex-grow mr-8">
            <img src="https://www.spreadsheetweb.com/wp-content/uploads/2019/05/Stock-Chart-1080x675.jpg" style={{width:'100%', maxHeight:'100%', height:'100%'}} alt="" />
        </div>
        </div>
    </section>
    <section id="home-section-3">

    </section>
    </>
    )
}