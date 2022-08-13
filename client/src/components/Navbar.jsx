import { useContext } from 'react';
import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';

import { TransactionContext } from '../context/TransactionContext';

import Logo from '../../images/logo.png'
import React from 'react';

const NavbarItem = ({title, classProps}) => {
   return (
    <li className={`mx-4 cursor-pointer ${classProps}`}>
        {title}
    </li>
   )
}

const Navbar = () => {

    const [toggleMenu, setToggleMenu] = React.useState(false);

    const { promptWallet }  = useContext(TransactionContext);

    return (
        <nav className='w-full flex md:px-24 justify-between items-center px-4'>
            <div className='md:flex-[0.5] flex-initial justify-center items-center'>
                <img src={Logo} alt="logo" className="w-32 cursor-pointer"/>
             </div>

             <ul className='text-white md:flex hidden list-none flex-row justify-between items-center flex-initial'>
                {["Reliable","Cryptocurrency","Exchange","Guaranteed"].map((item,index) =>(
                    <NavbarItem key={item+index} title={item}/>
                ))}

                <li>
                <button
                        type="button"
                        onClick={promptWallet}
                        className="flex flex-row justify-center items-center bg-[#2952e3] py-2 px-4 rounded-full cursor-pointer hover:bg-[#2546bd]"
                        >
                        <p className="text-white text-base font-semibold">
                            Accounts
                        </p>
                        </button>
                </li>
             </ul>
            
            <div className='flex relative'>
                    {
                        toggleMenu? 
                        <AiOutlineClose fontSize={28} className=" text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)}/> 
                        :
                        <HiMenuAlt4 fontSize={28} className=" text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)}/>
                    }
                    {
                        toggleMenu && (
                            <ul className=' z-10 fixed top-0 -right-2 p-8 w-[70vw] h-screen shadow-2xl md:hidden list-none
                                flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in'
                            
                            >
                                <li className='text-xl w-full'>
                                    <AiOutlineClose onClick={() => setToggleMenu(false)}/>
                                </li>
                                
                                <li>
                                <button
                                        type="button"
                                        onClick={promptWallet}
                                        className="flex flex-row justify-center items-center bg-[#2952e3] py-2 my-6 px-12 rounded-full cursor-pointer hover:bg-[#2546bd]"
                                        >
                                        <p className="text-white text-base font-semibold">
                                            Accounts
                                        </p>
                                        </button>
                                </li>

                                {["Reliable","Cryptocurrency","Exchange","Guaranteed"].map((item,index) =>(
                                    <NavbarItem key={item+index} title={item} classProps="my-2 text-lg"/>
                                ))}
                                
                            </ul>

                        )
                    }
            </div>

        </nav>
    )
}

export default Navbar;