import React, { ChangeEvent, DragEvent, useEffect, useState } from 'react'
import styles from './profile.module.scss'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { useInputVariant } from '@/hooks/useInputVariant';
import { Control, useForm } from 'react-hook-form'
import NesButton from '@/components/UI/nes-button'
import NesInput from '@/components/UI/nes-input'
import NesFileInput from '@/components/UI/nes-file-input'
import ErrorBoundary from '@/components/error-boundary'
import { fetchLogout } from '@/store/slices/auth'
import { IUser } from '@/store/slices/auth/auth.models'
import { fetchProfileUpdate, profileSlice } from '@/store/slices/profile'
import { selectProfile } from '@/store/slices/profile/select-profile'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { zodValidation } from '@/utils/validation'

enum ProfileMode {
  View,
  Edit,
}

const Profile: React.FC = () => {
  const profileSchema = z.object({
    passwords: z.object({
      newPassword: zodValidation.password,
      oldPassword: zodValidation.password,
    }),
    profile: z.object({
      first_name: zodValidation.name,
      second_name: zodValidation.name,
      display_name: zodValidation.name,
      login: zodValidation.login,
      email: zodValidation.email,
      phone: zodValidation.phone,
    }),
    avatar: z.instanceof(FileList),
  })

  type ProfileSchema = z.infer<typeof profileSchema>

  const user = useAppSelector(selectProfile) ?? ({} as Partial<IUser>)
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
  } as ProfileSchema

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isValid, dirtyFields },
  } = useForm<ProfileSchema>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(profileSchema),
  })

  const getInputVariant = useInputVariant<ProfileSchema>(dirtyFields, errors)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    return () => {
      dispatch(profileSlice.actions.clearError())
    }
  }, [])

  const [avatarSrc, setAvatarSrc] = useState<string>()
  const [isDragOver, setIsDragOver] = useState(false)
  const [mode, setMode] = useState<ProfileMode>(ProfileMode.View)

  const onSubmit = (data: ProfileSchema): void => {
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
      const files = e.dataTransfer.files

      setValue('avatar', files, { shouldDirty: true, shouldValidate: true })
      setAvatarSrc(URL.createObjectURL(files[0]))
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
    fullWidth: true,
    plain: mode === ProfileMode.View,
  }

  const editBtn = (
    <NesButton
      onClick={e => {
        e.preventDefault()
        setMode(ProfileMode.Edit)
      }}>
      edit profile
    </NesButton>
  )

  const isFormDirty = Object.keys(dirtyFields).length > 0

  const saveBtn = (
    <NesButton
      type="submit"
      variant={isValid && isFormDirty ? 'success' : 'disabled'}
      disabled={!isValid || !isFormDirty}>
      save
    </NesButton>
  )

  const cancelBtn = (
    <NesButton
      variant="error"
      onClick={e => {
        e.preventDefault()
        reset(defaultValues)
        setAvatarSrc(user.avatar)
        setMode(ProfileMode.View)
      }}>
      cancel
    </NesButton>
  )

  return (
    <div className={styles['profile']}>
      <div className={styles['profile__body']}>
        <div className={`nes-container with-title ${styles['container']}`}>
          <h3 className="title is-dark" style={{ backgroundColor: '#000' }}>
            Profile <span className="error-text">{responseError}</span>
          </h3>
          <ErrorBoundary
            FallbackComponent={() => <div>Something went wrong :(</div>}>
            <div className="nes-table-responsive">
              <form onSubmit={handleSubmit(onSubmit)}>
                <table
                  className={`nes-table is-bordered is-centered is-dark`}
                  style={{ backgroundColor: '#000' }}>
                  <thead>
                    <tr>
                      <th colSpan={2} rowSpan={6}>
                        <NesFileInput
                          //TODO: fix types
                          control={control as unknown as Control}
                          src={avatarSrc ?? user.avatar ?? ''}
                          label="Avatar"
                          accept="image/*"
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
                      <td>
                        <NesInput
                          label="First name"
                          errorText={errors.profile?.first_name?.message}
                          variant={getInputVariant<'profile'>('first_name', 'profile')}
                          {...commonProps}
                          {...register('profile.first_name')}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <NesInput
                          label="Second name"
                          errorText={errors.profile?.second_name?.message}
                          variant={getInputVariant<'profile'>('second_name', 'profile')}
                          {...commonProps}
                          {...register('profile.second_name')}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <NesInput
                          label="Display name"
                          errorText={errors.profile?.display_name?.message}
                          variant={getInputVariant<'profile'>('display_name', 'profile')}
                          {...commonProps}
                          {...register('profile.display_name')}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <NesInput
                          label="Login"
                          errorText={errors.profile?.login?.message}
                          variant={getInputVariant<'profile'>('login', 'profile')}
                          {...commonProps}
                          {...register('profile.login')}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <NesInput
                          label="Email"
                          type="email"
                          errorText={errors.profile?.email?.message}
                          variant={getInputVariant<'profile'>('email', 'profile')}
                          {...commonProps}
                          {...register('profile.email')}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <NesInput
                          label="Phone"
                          errorText={errors.profile?.phone?.message}
                          variant={getInputVariant<'profile'>('phone', 'profile')}
                          {...commonProps}
                          {...register('profile.phone')}
                        />
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={4}>
                        <NesInput
                          label="Old Password"
                          type="password"
                          errorText={errors.passwords?.oldPassword?.message}
                          variant={getInputVariant<'passwords'>('oldPassword', 'passwords')}                          
                          {...commonProps}
                          {...register('passwords.oldPassword')}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3}>
                        <NesInput
                          label="New Password"
                          type="password"
                          errorText={errors.passwords?.newPassword?.message}
                          variant={getInputVariant<'passwords'>('newPassword', 'passwords')}
                          {...commonProps}
                          {...register('passwords.newPassword')}
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
          variant="primary"
          onClick={() => navigate('/')}
          type="button">
          menu
        </NesButton>
        <NesButton
          fullWidth
          variant="warning"
          onClick={() => dispatch(fetchLogout())}
          type="button">
          logout
        </NesButton>
      </div>
    </div>
  )
}

export default Profile
