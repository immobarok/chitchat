import React from 'react'
import {LoaderIcon} from 'lucide-react'

const Loader = () => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <LoaderIcon className="animate-spin size-10 text-purple-600"/>
    </div>
  )
}

export default Loader