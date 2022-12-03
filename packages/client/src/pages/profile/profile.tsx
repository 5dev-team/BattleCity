import React, { FormEvent, useState } from 'react'
import styles from './profile.module.scss'
import NesButton from '@/components/UI/nes-button'
import NesInput from '@/components/UI/nes-input'

type UserTransferredType = {
  id: number
  login: string
  firstName: string
  secondName: string
  displayName: string
  avatar: string
  phone: string
  email: string
}

const Profile: React.FC = () => {
  const avatarStub =
    'https://avatars.mds.yandex.net/i?id=0e6644a6305695c3ca917c26fe2f87f8_l-5281542-images-thumbs&n=13'

  const user: UserTransferredType = {
    id: 1,
    login: 'login',
    firstName: 'Evgeniy',
    secondName: 'Sokolovskiy',
    displayName: 'TaNkIsT',
    avatar: avatarStub,
    phone: '686283721',
    email: 'sokol-rc@yandex.ru',
  }

  const [mode, setMode] = useState('view')
  const [form, setForm] = useState({
    id: 1,
    login: '',
    firstName: '',
    secondName: '',
    displayName: '',
    phone: '',
    email: '',
    password: '',
    newPassword: '',
  })
const [firstName, setFirstName] = useState(user.firstName)
  
  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    console.log(form)
  }

  const renderFormButton = () => {
    if (mode === 'view') {
      return <NesButton onClick={() => setMode('edit')}>edit profile</NesButton>
    } else if (mode === 'edit') {
      return (
        <NesButton onClick={() => console.log('asd')} variant="success">
          save
        </NesButton>
      )
    }
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
                    <td rowSpan={4} colSpan={2}>
                      <img
                        src={user.avatar}
                        alt={`аватар пользователя ${user.login}`}
                        className={`nes-avatar ${styles['profile-avatar']}`}
                      />
                    </td>
                    <td>First name:</td>
                    <td>
                      <NesInput
                        name={'first_name'}
                        label="First name"
                        labelHidden
                        readOnly={mode==='view'}
                        plainText={mode==='view'}
                        value={firstName}
                        onChange={e =>
                          setFirstName(e.target.value)
                        }
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
                        value={form.secondName}
                        onChange={e =>
                          setForm({ ...form, secondName: e.target.value })
                        }
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
                        value={form.displayName}
                        onChange={e =>
                          setForm({ ...form, displayName: e.target.value })
                        }
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
                        value={form.login}
                        onChange={e =>
                          setForm({ ...form, login: e.target.value })
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Password</td>
                    <td>
                      <NesInput
                        name={'old_password'}
                        label="Password"
                        fullWidth
                        labelHidden
                        value={form.password}
                        onChange={e =>
                          setForm({ ...form, password: e.target.value })
                        }
                      />
                    </td>
                    <td>Email:</td>
                    <td>
                      <NesInput
                        name={'email'}
                        label="Email"
                        fullWidth
                        labelHidden
                        value={form.email}
                        onChange={e =>
                          setForm({ ...form, email: e.target.value })
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>NewPassword</td>
                    <td>
                      <NesInput
                        name={'new_password'}
                        label="Email"
                        fullWidth
                        labelHidden
                        value={form.newPassword}
                        onChange={e =>
                          setForm({ ...form, newPassword: e.target.value })
                        }
                      />
                    </td>
                    <td>Phone:</td>
                    <td>
                      <NesInput
                        name={'phone'}
                        label="Phone"
                        fullWidth
                        labelHidden
                        value={form.phone}
                        onChange={e =>
                          setForm({ ...form, phone: e.target.value })
                        }
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <NesButton type="submit" variant="success">
                save
              </NesButton>
            </form>
          </div>
        </div>
        {renderFormButton()}
      </div>
    </div>
  )
}

export default Profile
