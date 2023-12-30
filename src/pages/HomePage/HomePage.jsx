import kevinImage from '../../assets/images/Kevin-image.png'
import davidImage from '../../assets/images/T0351JZQ0-U01AVS70Z9B-d7d3a5c4df44-512.jpeg'
import aaronImage from '../../assets/images/IMG_0511.jpg'
import chukImage from '../../assets/images/Chuk-Image.jpeg'

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
        <h1 id="header" className="font-bold text-xl text-white">Testimonials</h1>
        <p className="text-white font-bold p-4">Don't believe us? Check out our happy users</p>
        <div className="flex justify-between items-center" >
        <div className='m-8 flex flex-col items-center'>
            <img id='testimonialimg' src={kevinImage} alt="Kevin's Image" className="w-20. h-20 rounded-full mb-4"/>
            <article id='testimonial-box'>
                <p className='mt-2 p-2'>As a seasoned investor, I've tried various platforms, and Portfolio-Pro stands out. The accuracy of its analytics tools is impressive, providing valuable insights that have positively impacted my decision-making. It's an essential tool for anyone serious about their financial success.<br></br><strong>-Kevin</strong></p>
            </article>
        </div>
        <div className='m-8 flex flex-col items-center'>
            <img id='testimonialimg' src={chukImage} alt="" className='w-20. h-20 rounded-full mb-4'/>
            <article id='testimonial-box'>
                <p className='mt-2 p-2'>Portfolio-Pro has transformed the way I manage my investments. The intuitive interface and powerful tools make tracking stocks and analyzing performance a breeze. I've seen significant improvements in my portfolio management since using Portfolio-Pro. Highly recommended!<br></br><strong>-Chuk</strong></p>
            </article>
        </div>
        <div className='m-8 flex flex-col items-center'>
            <img id='testimonialimg' src={aaronImage} className='w-20. h-20 rounded-full mb-4' alt="" />
            <article id='testimonial-box'>
                <p className='mt-2 p-2'>Portfolio-Pro is a game-changer for both beginners and experienced investors. The user-friendly design makes it easy to navigate, and the educational resources have helped me understand the stock market better. Managing my investments has never been this seamless.<br></br><strong>-Aaron</strong></p>
            </article> 
        </div>
        <div className='m-8 flex flex-col items-center'>
            <img id='testimonialimg' src={davidImage} alt="" className='w-20. h-20 rounded-full mb-4'/>
            <article id='testimonial-box'>
                <p className='mt-2 p-2'>I've been using Portfolio-Pro for over a year, and it has exceeded my expectations. The real-time updates and comprehensive reports have given me a holistic view of my portfolio's performance. The platform's reliability and innovative features make it an indispensable tool for any investor.<br></br><strong>-David</strong></p>
            </article>
        </div>
        </div>
    </section>
    </>
    )
}