import React, {useState} from 'react'
import Navbar from './Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { updateReplaceServerData, changePassword } from './Firebase'
import { setUserName } from './userReducer'
import '../Styles/ProfileSettings.css'

export default function ProfileSettings() {
  const offlineUser = useSelector(state => state.user) 
  const [updateUserName, setUpdateUserName] = useState(false)
  const [updatePasswordState, setUpdatePasswordState] = useState(false) 
  const [newName, setNewName] = useState(offlineUser.name)
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()

  const handleUpdateUsername = async () => {    
    await setUpdateUserName(!updateUserName)
    if (updateUserName && newName !== offlineUser.name) {
      updateReplaceServerData('users', offlineUser.uid, 'name', newName)
      dispatch(setUserName(newName))
    }
  }

  const handleUpdatePassword = async () => {
    setUpdatePasswordState(!updatePasswordState)
  
    if (updatePasswordState) {
      const result = await changePassword(newPassword)
      console.log(result)
      if (result) {
        setMessage('Password successfully changed')
      } else {
        setMessage(result)
      }
    }
  
    setNewPassword('')
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  return (

    // Delete infobox
    <div className='settings-outer' onClick={() => {setMessage('')}}>
      <Navbar/>
      <div className='d-flex justify-content-center align-items-center w-100 h-100'>
        <div className='d-flex flex-column justify-content-center align-items-center rounded settings-inner-container'>
          <div>

            {/* Username */}
            <div className='d-flex'>
              <p>Username:</p>
              { updateUserName
                ?   <input type="text" className='form-control' required value={newName} onChange={handleNameChange}/>
                :   <p className='mx-2'>{offlineUser.name}</p>
              }
            </div>

            {/* Password */}
            { updatePasswordState
              ? 
                <div className='d-flex'>
                  <p>New Password:</p>
                  <input type="password" className='mx-2 form-control' required value={newPassword} onChange={(e) => {setNewPassword(e.target.value)}} />
                </div>
              :
                <div className='d-flex'>
                  <p>Password:</p>
                  <p className='mx-2'>***********</p>
                </div>
            }

            {/* Change name/ password buttons */}
            <button className='btn btn-info' onClick={handleUpdateUsername}>Change Name</button>
            <button className='mx-3 btn btn-info' onClick={handleUpdatePassword}>Change Password</button>

            {/* Infobox message */}
            <div class="form-outline mb-4 text-danger profile-message">
              <p>{message}</p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}
