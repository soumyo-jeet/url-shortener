import React from 'react'

export default function CardLoader() {
  return (
 <div className="p-4 text-center">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg">
        <div className="animate-pulse space-y-4">
          <div className="h-8 rounded bg-gray-200 w-full mx-auto"></div>
          <div className="h-16 rounded bg-gray-200 w-full mx-auto"></div>
          <div className="h-16 rounded bg-gray-200 w-full mx-auto"></div>
        </div>
      </div> 
    </div>
  )
}