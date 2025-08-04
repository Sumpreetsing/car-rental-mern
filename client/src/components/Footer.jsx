import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className='px-6 md:px-16 lg:px-24  xl:px-32 mt-40 text-sm text-gray-500 bg-light'>

            <div className='flex flex-wrap items-start justify-between gap-8 pb-6
            border-borderColor border-b'>
                <div className='mt-4'>
                    <img src={assets.logo} alt="logo" className='h-8 md:h-9' />
                    <p className='max-w-80 mt-3'>
                        Premium car rentel service with a wide selection of luxury 
                        and everyday vehicals for all your needs
                    </p>
                    <div className='flex items-center gap-3 mt-6'>
                        <a href="#">
                            <img src={assets.facebook_logo} alt="facebook" className='w-5 h-5'/>
                        </a>

                         <a href="#">
                            <img src={assets.instagram_logo} alt="instagram" className='w-5 h-5'/>
                        </a>

                         <a href="#">
                            <img src={assets.twitter_logo} alt="twitter" className='w-5 h-5'/>
                        </a>

                         <a href="#">
                            <img src={assets.gmail_logo} alt="gmail" className='w-5 h-5'/>
                        </a>
                    </div>
                </div>

                <div>
                    <h2 className='text-base font-medium uppercase text-gray-800 mt-4'>Quick links</h2>
                    <ul className='mt-3 flex flex-col gap-1.5'>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Browse your car</a></li>
                        <li><a href="#">List your car</a></li>
                        <li><a href="#">About US</a></li>
                    </ul>
                </div>

                <div>
                    <h2 className='text-base font-medium uppercase text-gray-800 mt-4'>Resourses</h2>
                    <ul className='mt-3 flex flex-col gap-1.5'>
                        <li><a href="#">Help center</a></li>
                        <li><a href="#">Terms of Service</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Insurance</a></li>
                    </ul>
                </div>

                
                <div>
                    <h2 className='text-base font-medium uppercase text-gray-800 mt-4'>Contact</h2>
                    <ul className='mt-3 flex flex-col gap-1.5'>
                        <li>1234 Luxury Drive</li>
                        <li>San Francisco, CA 94120</li>
                        <li>+91 7896453214</li>
                        <li>infoexample@gmail.com</li>
                    </ul>
                </div>
                
            </div>
            
            <div className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
                <p>© {new Date().getFullYear()} <a href="https://prebuiltui.com">PrebuiltUI</a>. All rights reserved.</p>
                <ul className='flex items-center gap-4'>
                    <li><a href="#">Privacy</a></li>
                    <li>|</li>
                    <li><a href="#">Terms</a></li>
                    <li>|</li>
                    <li><a href="#">Cookies</a></li>
                </ul>
            </div>
        </div>
  );
}

export default Footer;
