import React from 'react'
import facebookIcon from '../assets/facebook.png'
import instagramIcon from '../assets/instagram.png'

const Footer = () => {
  return (
    <div className='py-20 px-10 '>
      <div className="flex h-80 p-10 border border-gray-300 shadow-2xl gap-40  rounded-3xl">
          <ul className='flex flex-col gap-2'>
              <li>Бидэнтэй холбогдох:</li>
              <li>Утасны дугаар: +976 80744042</li>
              <li>    </li>

          </ul> 
          <ul className='flex flex-col gap-2'>
            <li>Сошиал хаягууд:</li>
            <li className='flex gap-4'><img src={facebookIcon} alt="Facebook" className='h-6'/><a href="https://www.facebook.com/profile.php?id=61587903984341">NextGen Store</a></li>
            <li className='flex gap-4'><img src={instagramIcon} alt="Instagram" className='h-6' /><a href="https://www.instagram.com/nextgenstore/">NextGen Store</a></li>
          </ul>
      </div>
    </div>
  )
}

export default Footer
