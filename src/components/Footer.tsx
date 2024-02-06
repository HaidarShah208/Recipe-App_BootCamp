import React from 'react';
import coffee from '../assests/Ico.png'
import youtube from '../assests/Youtube Icon (1).png'
import twi from '../assests/Pinterest Icon.png'
import borw from '../assests/Twitter Icon.png'
import pin from '../assests/Youtube Icon.png'

const Footer: React.FC = () => {
  return (
    <section className="py-12 bg-yellow text-gray-900 mt-12 h-[273px] ">
      <div className="container mx-auto flex flex-col justify-around p-4 text-center md:p-10 lg:flex-row">
        <div className="flex lg:flex my-auto justify-center lg:text-left">
          <p className="">
          <img src={coffee} className='mt-2' alt="cofee-Icon" />
          </p>
          <h1 className="my-1 sm:block hidden ps-3 text-3xl font-medium leading-tight title-font">
          Delicias a Meta
          </h1> 
        </div>
        <div className="flex flex-col md:flex-col my-auto items-center justify-center flex-shrink-0 mt-6 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 lg:ml-4 lg:mt-0 lg:justify-end">
      <p className=' sm:py-2 font-medium'>Redes Socials:</p>
      <div className='flex'>
      <div className='mx-1'><img src={youtube} alt="" /></div>
      <div><img src={twi} alt="" /></div>
      <div className='mx-1'><img src={borw} alt="" /></div>
      <div><img src={pin} alt="" /></div>
      </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
