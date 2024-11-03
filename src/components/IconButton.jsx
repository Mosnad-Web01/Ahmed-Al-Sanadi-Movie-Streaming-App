import React from 'react'



const IconButton = ({ onClick, isActive, activeClass, inactiveClass, Icon, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-full transition-all duration-300 shadow-md ${
        isActive ? activeClass : inactiveClass
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      disabled={disabled}
    >
      <Icon className="w-5 h-5" />
    </button>
  )
}

export default IconButton



