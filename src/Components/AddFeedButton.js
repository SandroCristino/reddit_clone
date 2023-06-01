import React from 'react'
import '../Styles/AddFeedButton.css'
import { useSelector } from 'react-redux';


export default function AddFeedButton() {
  const showCreateFeed = useSelector((state) => state.user.showCreateFeed)

  return (
    <div className='addButton'>
      {showCreateFeed
        ? <span className='plusIcon'>-</span>
        : <span className='plusIcon'>+</span>
      }
    </div>
  )
}
