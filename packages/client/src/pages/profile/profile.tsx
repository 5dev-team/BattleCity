import React, { ChangeEvent, DragEvent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { getPattern } from '@/utils/validation'
import NesButton from '@/components/UI/nes-button'
import NesInput from '@/components/UI/nes-input'
import NesFileInput from '@/components/UI/nes-file-input'
import { fetchLogout, fetchUser } from '@/store/slices/auth'
import { IUserDTO, IUser } from '@/store/slices/auth/auth.models'
import { fetchProfileUpdate } from '@/store/slices/profile'
import styles from './profile.module.scss'
import ErrorBoundary from '@/components/error-boundary'

type ProfileInputs = {
  passwords: {
    newPassword: string
    oldPassword: string
  }
  profile: Omit<IUserDTO, 'id' | 'avatar'>
  avatar: FileList
}

type InputName<T> = {
  [K in keyof ProfileInputs]: T extends K ? keyof ProfileInputs[K] : never
}[keyof ProfileInputs]

type InputVariant = 'basic' | 'error' | 'success'

enum ProfileMode {
  View,
  Edit,
}

const Profile: React.FC = () => {
  const user =
    useAppSelector(state => state.auth.user) ?? ({} as Partial<IUser>)
  const responseError = useAppSelector(state => state.profile.fetchError)

  const defaultValues = {
    profile: {
      first_name: user.firstName,
      second_name: user.secondName,
      display_name: user.displayName,
      login: user.login,
      email: user.email,
      phone: user.phone,
    },
    passwords: {
      newPassword: '',
      oldPassword: '',
    },
  } as ProfileInputs

  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, dirtyFields },
  } = useForm<ProfileInputs>({
    defaultValues,
    mode: 'onChange',
  })

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser())
    } else {
      reset(defaultValues)
    }
  }, [user])

  const [avatarSrc, setAvatarSrc] = useState<string>()
  const [isDragOver, setIsDragOver] = useState(false)
  const [mode, setMode] = useState<ProfileMode>(ProfileMode.View)

  const onSubmit = (data: ProfileInputs): void => {
    const profileData = dirtyFields.profile ? data.profile : undefined
    const passwordData = dirtyFields.passwords ? data.passwords : undefined
    const avatarData = dirtyFields.avatar ? { avatar: data.avatar } : undefined

    dispatch(
      fetchProfileUpdate({
        profileData,
        passwordData,
        avatarData,
      })
    )

    setMode(ProfileMode.View)
    reset(defaultValues)
  }

  const handleChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      setAvatarSrc(URL.createObjectURL(e.target.files[0]))
    } else {
      setAvatarSrc(user.avatar)
    }
  }

  const isEditingDragEvent = (e: DragEvent) => {
    if (mode === ProfileMode.Edit) {
      e.preventDefault()
      e.stopPropagation()

      return true
    }

    return false
  }

  const handleDragStart = (e: DragEvent<HTMLInputElement>) => {
    if (isEditingDragEvent(e)) setIsDragOver(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLInputElement>) => {
    if (isEditingDragEvent(e)) setIsDragOver(false)
  }

  const handleDrop = (e: DragEvent<HTMLInputElement>) => {
    if (isEditingDragEvent(e)) {
      const file = e.dataTransfer.files[0]

      setAvatarSrc(URL.createObjectURL(file))
      setIsDragOver(false)
    }
  }

  const dragHandlers = {
    onDrop: (e: React.DragEvent<HTMLInputElement>) => handleDrop(e),
    onDragOver: (e: React.DragEvent<HTMLInputElement>) => handleDragStart(e),
    onDragStart: (e: React.DragEvent<HTMLInputElement>) => handleDragStart(e),
    onDragLeave: (e: React.DragEvent<HTMLInputElement>) => handleDragLeave(e),
  }

  const commonProps = {
    labelHidden: true,
    plain: mode === ProfileMode.View,
  }

  function inputVariant<T = keyof ProfileInputs>(
    name: InputName<T>
  ): InputVariant {
    const isDirtyOrError = (fields: Record<string, unknown>) =>
      Object.values(fields).find(
        val =>
          Object.keys(val as object).find(key => key === name) !== undefined
      )

    const isDirtyField = isDirtyOrError(dirtyFields)
    const isErrorField = isDirtyOrError(errors)

    return isDirtyField ? (isErrorField ? 'error' : 'success') : 'basic'
  }

  const editBtn = (
    <NesButton
      onClick={e => {
        e.preventDefault()
        setMode(ProfileMode.Edit)
      }}
    >
      edit profile
    </NesButton>
  )

  const isFormDirty = Object.keys(dirtyFields).length > 0

  const saveBtn = (
    <NesButton
      type='submit'
      variant={isValid && isFormDirty ? 'success' : 'disabled'}
      disabled={!isValid || !isFormDirty}
    >
      save
    </NesButton>
  )

  const cancelBtn = (
    <NesButton
      variant='error'
      onClick={e => {
        e.preventDefault()
        reset(defaultValues)
        setAvatarSrc(user.avatar)
        setMode(ProfileMode.View)
      }}
    >
      cancel
    </NesButton>
  )

  return (
    <div className={styles['profile']}>
      <div className={styles['profile__body']}>
        <div className={`nes-container with-title ${styles['container']}`}>
          <h3 className='title is-dark' style={{ backgroundColor: '#000' }}>
            Profile <span className='error-text'>{responseError}</span>
          </h3>
          <ErrorBoundary
            FallbackComponent={() => <div>Something went wrong :(</div>}
          >
            <div className='nes-table-responsive'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <table
                  className={`nes-table is-bordered is-centered is-dark`}
                  style={{ backgroundColor: '#000' }}
                >
                  <thead>
                    <tr>
                      <th colSpan={2} rowSpan={6}>
                        <NesFileInput
                          control={control}
                          src={avatarSrc ?? user.avatar ?? ''}
                          label='Avatar'
                          accept='image/*'
                          alt={`your avatar ${user.login}`}
                          plain={mode === ProfileMode.View}
                          plainText={'No Avatar'}
                          isDragOver={isDragOver}
                          {...dragHandlers}
                          {...register('avatar')}
                          onChange={e => {
                            handleChangeAvatar(e)
                          }}
                        />
                      </th>
                      <td>First name:</td>
                      <th>
                        <NesInput
                          label='First name'
                          variant={inputVariant<'profile'>('first_name')}
                          {...commonProps}
                          {...register('profile.first_name', {
                            pattern: getPattern('firstName'),
                            required: true,
                          })}
                        />
                      </th>
                    </tr>
                    <tr>
                      <td>Second name:</td>
                      <th>
                        <NesInput
                          label='Second name'
                          variant={inputVariant<'profile'>('second_name')}
                          {...commonProps}
                          {...register('profile.second_name', {
                            pattern: getPattern('secondName'),
                            required: true,
                          })}
                        />
                      </th>
                    </tr>
                    <tr>
                      <td>Display name:</td>
                      <th>
                        <NesInput
                          label='Display name'
                          variant={inputVariant<'profile'>('display_name')}
                          {...commonProps}
                          {...register('profile.display_name', {
                            pattern: getPattern('displayName'),
                            required: true,
                          })}
                        />
                      </th>
                    </tr>
                    <tr>
                      <td>Login:</td>
                      <th>
                        <NesInput
                          label='Login'
                          variant={inputVariant<'profile'>('login')}
                          {...commonProps}
                          {...register('profile.login', {
                            pattern: getPattern('login'),
                            required: true,
                          })}
                        />
                      </th>
                    </tr>
                    <tr>
                      <td>Email:</td>
                      <th>
                        <NesInput
                          label='Email'
                          type='email'
                          variant={inputVariant<'profile'>('email')}
                          {...commonProps}
                          {...register('profile.email', {
                            pattern: getPattern('email'),
                            required: true,
                          })}
                        />
                      </th>
                    </tr>
                    <tr>
                      <td>Phone:</td>
                      <th>
                        <NesInput
                          label='Phone'
                          variant={inputVariant<'profile'>('phone')}
                          {...commonProps}
                          {...register('profile.phone', {
                            pattern: getPattern('phone'),
                            required: true,
                          })}
                        />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Old Password:</td>
                      <td colSpan={3}>
                        <NesInput
                          label='Old Password'
                          type='password'
                          fullWidth
                          variant={inputVariant<'passwords'>('oldPassword')}
                          {...commonProps}
                          {...register('passwords.oldPassword', {
                            pattern: getPattern('password'),
                          })}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>New Password:</td>
                      <td colSpan={3}>
                        <NesInput
                          label='New Password'
                          type='password'
                          fullWidth
                          variant={inputVariant<'passwords'>('newPassword')}
                          {...commonProps}
                          {...register('passwords.newPassword', {
                            pattern: getPattern('password'),
                            validate: () =>
                              dirtyFields.passwords !== undefined ||
                              dirtyFields.profile !== undefined ||
                              dirtyFields.avatar !== undefined,
                          })}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className={styles['control-page-buttons']}>
                  {mode === ProfileMode.View && editBtn}
                  {mode === ProfileMode.Edit && (
                    <>
                      {saveBtn}
                      {cancelBtn}
                    </>
                  )}
                </div>
              </form>
            </div>
          </ErrorBoundary>
        </div>
      </div>
      <div className={styles['profile__footer']}>
        <NesButton
          fullWidth
          variant='primary'
          onClick={() => navigate('/')}
          type='button'
        >
          menu
        </NesButton>
        <NesButton
          fullWidth
          variant='warning'
          onClick={() => dispatch(fetchLogout())}
          type='button'
        >
          logout
        </NesButton>
      </div>
    </div>
  )
}

export default Profile
