import React, { ChangeEvent, DragEvent, FormEvent, useState } from 'react'
import styles from './profile.module.scss'
import NesButton from '@/components/UI/nes-button'
import NesInput from '@/components/UI/nes-input'
import { useNavigate } from 'react-router-dom'
import NesFileInput from '@/components/UI/nes-file-input'
import avatarPlaceholder from '@/assets/avatarPlaceholder.png'

type UserTransferredType = {
  id: number
  login: string
  firstName: string
  secondName: string
  displayName: string
  avatar: string
  phone: string
  email: string
  password: string
  newPassword: string
}

const Profile: React.FC = () => {
  const navigate = useNavigate()

  const user: UserTransferredType = {
    id: 1,
    login: 'login',
    firstName: 'Evgeniy',
    secondName: 'Sokolovskiy',
    displayName: 'TaNkIsT',
    avatar: avatarPlaceholder,
    phone: '686283721',
    email: 'sokol-rc@yandex.ru',
    password: '',
    newPassword: '',
  }

  const [mode, setMode] = useState('view')
  const [isDragOver, setIsDragOver] = useState(false)

  const [avatar, setAvatar] = useState(user.avatar)
  const [firstName, setFirstName] = useState(user.firstName)
  const [secondName, setSecondName] = useState(user.secondName)
  const [displayName, setDisplayName] = useState(user.displayName)
  const [phone, setPhone] = useState(user.phone)
  const [login, setLogin] = useState(user.login)
  const [email, setEmail] = useState(user.email)
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    if (mode === 'view') {
      return
    }

    console.log({
      firstName,
      secondName,
      displayName,
      phone,
      login,
      email,
      password,
      newPassword,
    })
    setMode('view')
  }

  const renderFormButton = () => {
    if (mode === 'view') {
      return (
        <>
          <NesButton onClick={() => setMode('edit')} type="button">
            edit profile
          </NesButton>
          <input className={'visually-hidden'} type="submit" />
        </>
      )
    } else if (mode === 'edit') {
      return (
        <NesButton type="submit" variant="success">
          save
        </NesButton>
      )
    }
  }

  const handleChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length !== 0) {
      changeAvatar(e.target.files[0])
    }
  }

  const changeAvatar = (file: File) => {
    if (file) {
      setAvatar(URL.createObjectURL(file))
    }
  }

  const removeAvatar = () => {
    setAvatar('')
  }

  const handleDragStart = (e: DragEvent<HTMLInputElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (mode === 'view') {
      return
    }

    setIsDragOver(true)
  }
  const handleDragLeave = (e: DragEvent<HTMLInputElement>) => {
    e.preventDefault()
    e.stopPropagation()
  
    if (mode === 'view') {
      return
    }

    setIsDragOver(false)
  }
  const handleDrop = (e: DragEvent<HTMLInputElement>) => {
    e.preventDefault()
    e.stopPropagation()
  
    if (mode === 'view') {
      return
    }

    const file = e.dataTransfer.files[0]

    changeAvatar(file)
    setIsDragOver(false)
  }

  return (
    <div className={styles['profile']}>
      <div className="wrapper">
        <div className={`nes-container with-title ${styles['container']}`}>
          <h3 className="title is-dark" style={{ backgroundColor: '#000' }}>
            Profile
          </h3>
          <div className="nes-table-responsive">
            <form onSubmit={onSubmit}>
              <table
                className={`nes-table is-bordered is-centered is-dark`}
                style={{ backgroundColor: '#000' }}>
                <tbody>
                  <tr>
                    <td rowSpan={8} colSpan={2}>
                      <NesFileInput
                        src={avatar}
                        label="Аватар"
                        login={login}
                        accept="image/*"
                        plain={mode === 'view'}
                        readOnly={mode === 'view'}
                        isDragOver={isDragOver}
                        onDrop={e => handleDrop(e)}
                        onDragOver={e => handleDragStart(e)}
                        onDragStart={e => handleDragStart(e)}
                        onDragLeave={e => handleDragLeave(e)}
                        onChange={e => handleChangeAvatar(e)}
                        removeFile={() => removeAvatar()}
                        alt={`аватар пользователя ${login}`}
                      />
                    </td>
                    <td>First name:</td>
                    <td>
                      <NesInput
                        name={'first_name'}
                        label="First name"
                        labelHidden
                        readOnly={mode === 'view'}
                        plain={mode === 'view'}
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Second name:</td>
                    <td>
                      <NesInput
                        name={'second_name'}
                        label="Second name"
                        fullWidth
                        labelHidden
                        readOnly={mode === 'view'}
                        plain={mode === 'view'}
                        value={secondName}
                        onChange={e => setSecondName(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Display name:</td>
                    <td>
                      <NesInput
                        name={'display_name'}
                        label="Display name"
                        fullWidth
                        labelHidden
                        readOnly={mode === 'view'}
                        plain={mode === 'view'}
                        value={displayName}
                        onChange={e => setDisplayName(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Login:</td>
                    <td>
                      <NesInput
                        name={'login'}
                        label="Login"
                        fullWidth
                        labelHidden
                        readOnly={mode === 'view'}
                        plain={mode === 'view'}
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Email:</td>
                    <td>
                      <NesInput
                        name={'email'}
                        label="Email"
                        type="email"
                        fullWidth
                        labelHidden
                        readOnly={mode === 'view'}
                        plain={mode === 'view'}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Phone:</td>
                    <td>
                      <NesInput
                        name={'phone'}
                        label="Phone"
                        fullWidth
                        labelHidden
                        readOnly={mode === 'view'}
                        plain={mode === 'view'}
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Password</td>
                    <td>
                      <NesInput
                        name={'old_password'}
                        label="Password"
                        type="password"
                        fullWidth
                        labelHidden
                        readOnly={mode === 'view'}
                        plain={mode === 'view'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>NewPassword</td>
                    <td>
                      <NesInput
                        name={'new_password'}
                        label="Email"
                        type="password"
                        fullWidth
                        labelHidden
                        readOnly={mode === 'view'}
                        plain={mode === 'view'}
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className={styles['control-page-buttons']}>
                {renderFormButton()}
                <NesButton
                  variant="primary"
                  onClick={() => navigate('/')}
                  type="button">
                  exit
                </NesButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
