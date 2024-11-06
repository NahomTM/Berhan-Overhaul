import Image from "next/image"
import { FaUserCircle } from "react-icons/fa"

const Navbar = () => {
  return (
    <div className='flex items-center justify-between p-4 h-16 bg-white mt-3 ml-4 mr-4 shadow-custom rounded-xl'>
      {/* SEARCH BAR */}
      <div className='hidden ml-4 md:flex items-center gap-2 text-xs rounded-lg ring-[1.5px] ring-gray-300 px-2'>
        <Image src="/search.png" alt="" width={14} height={14}/>
        <input type="text" placeholder="Search..." className="w-[200px] px-2 py-[7px] bg-transparent outline-none"/>
      </div>
      {/* ICONS AND USER */}
      <div className='flex items-center gap-6 justify-end w-full'>
        <div className='bg-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer'>
          <Image src="/message.png" alt="" width={20} height={20}/>
        </div>
        <div className='bg-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer relative'>
          <Image src="/announcement.png" alt="" width={20} height={20}/>
          <div className='absolute -top-2 -right-3 w-4 h-4 flex items-center justify-center bg-orange-500 text-white rounded-full text-xs'>1</div>
        </div>
        <div className='flex flex-col'>
          <span className="text-xs leading-3 font-medium">John Doe</span>
          <span className="text-[10px] text-gray-500 text-right">Admin</span>
        </div>
        <FaUserCircle size={35} color="orange" />
      </div>
    </div>
  )
}

export default Navbar