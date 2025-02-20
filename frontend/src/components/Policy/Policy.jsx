import React from 'react'

const Policy = () => {
    return (
        <div
            className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-black'>

            <div className='flex flex-col gap-2'>
                <svg className='m-auto mb-5' width='32' height='32' xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 640 512">
                    <path
                        d="M48 0C21.5 0 0 21.5 0 48L0 368c0 26.5 21.5 48 48 48l16 0c0 53 43 96 96 96s96-43 96-96l128 0c0 53 43 96
                        96 96s96-43 96-96l32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-64 0-32 0-18.7c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7L416 96l0-48c0-26.5-21.5-48-48-48L48 0zM416 160l50.7 0L544 237.3l0 18.7-128 0 0-96zM112 416a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm368-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
                </svg>
                <p className='font-semibold'>Надежный и регулярный поставщик</p>
                <p className='text-gray-400'>Мы имеем хорошого поставщика присылающего качественные товары!</p>
            </div>

            <div className='flex flex-col gap-2'>
                <svg className='ml-auto mr-auto mb-2' xmlns="http://www.w3.org/2000/svg" width='32' height='32'
                     viewBox="0 0 512 512">
                    <path
                        d="M48.5 224L40 224c-13.3 0-24-10.7-24-24L16 72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8L48.5 224z"/>
                </svg>
                <p className='font-semibold'>Безпроблемный и быстрый возврат</p>
                <p className='text-gray-400'>Мы предлагаем быстрый возврат дененежных средств без никаких задержек!</p>
            </div>

            <div className='flex flex-col gap-2'>
                <svg className='m-auto mb-5' width='32' height='32' xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 448 512">
                    <path
                        d="M96 0C43 0 0 43 0 96L0 416c0 53 43 96 96 96l288 0 32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-64c17.7 0 32-14.3 32-32l0-320c0-17.7-14.3-32-32-32L384 0 96 0zm0 384l256 0 0 64L96 448c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16l192 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16zm16 48l192 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/>
                </svg>
                <p className='font-semibold'>Легкая и терпимая политика</p>
                <p className='text-gray-400'>Мы предлагаем легкую политику компании которую примут все потребители!</p>
            </div>

        </div>
    )
}
export default Policy
