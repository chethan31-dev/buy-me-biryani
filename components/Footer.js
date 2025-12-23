import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='glass border-t border-white/5 h-20 flex items-center justify-center relative overflow-hidden'>
      {/* Subtle glow */}
      <div className='absolute inset-0 bg-gradient-to-t from-orange-500/5 to-transparent'></div>

      <div className='container mx-auto px-6 flex flex-col md:flex-row items-center justify-between relative z-10'>
        <p className='text-xs font-mono text-gray-500 uppercase tracking-widest'>
          Grid Protocol Active &copy; {currentYear}
        </p>

        <div className='flex items-center gap-2 mt-2 md:mt-0'>
          <span className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></span>
          <span className='text-[10px] font-black text-white px-2 py-1 bg-white/5 rounded border border-white/10 uppercase tracking-tighter'>
            Buy Me a <span className='text-orange-500'>Biryani</span> 🥘
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
