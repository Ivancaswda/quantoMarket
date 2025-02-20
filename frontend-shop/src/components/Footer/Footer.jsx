import React from 'react'

const Footer = () => {
    return (
        <div className=' bg-blue-500  text-white' style={{bgColor: '#b3c8ff', paddingTop: '10px'}}>
            <div
                className=' text-white flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-5 mt-40 text-sm text-center sm:text-start lg:text-start'>
                {/* -----Left Section----- */}
                <div className='flex flex-col items-center'>
                    <img className='mb-3 w-50 sm:w-30' src='https://static.tildacdn.com/tild3933-3862-4431-b333-346435313930/_.png' alt=""/>
                    <p className='w-full md:w-2/3 text-white leading-6  '>Lorem ipsum dolor sit amet, consectetur
                        adipisicing elit. Atque fugiat hic ipsa modi nam neque perferendis praesent Lorem ipsum dolor
                        sit amet, consectetur adipisicing elit. Repellendus, vitae. ium quam quasi ut?</p>
                </div>

                {/*===== Center Section-------- */}
                <div>
                    <p className='text-xl font-medium mb-3 text-white'>КОМПАНИЯ</p>
                    <ul className='flex flex-col gap-2 text-white'>
                        <li>Главная страница</li>
                        <li>О нас</li>
                        <li>Свяжитесь с нами</li>
                        <li>Политика сайта</li>
                    </ul>
                </div>


                {/*-----Right section */}
                <div>
                    <p className='text-xl font-medium mb-3'>СВЯЖИТЕСЬ С НАМИ</p>
                    <ul className='flex flex-col gap-2 text-white'>
                        <li>84235-12515-215125</li>
                        <li>docs@gmail.com</li>
                    </ul>
                </div>


            </div>
            {/* -----------Copyright Text---------- */}
            <div>
                <hr/>
                <p className='text-sm text-center'>Copyright &copy; 2026 by <b>aIvanius Katkovsky</b> Все права защищены
                </p>
            </div>
        </div>
    )
}
export default Footer
