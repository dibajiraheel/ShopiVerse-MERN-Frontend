import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChangeTheme } from '@/slices/ThemeSlice'
import Switch from '../ui components/Switch'
import { getCookie, setCookie } from 'react-use-cookie'
import { LogIn } from 'lucide-react'


const ThemeSwitcher = () => {

    const themeMode = useSelector(state => state.themeStore.mode)
    const dispatch = useDispatch()

    const ChangeMode = (e) => {
        if (e.target.checked) {
          dispatch(ChangeTheme('dark'))
          localStorage.setItem('themeMode', 'dark')
          return
        }
        dispatch(ChangeTheme('light'))
        localStorage.setItem('themeMode', 'light')
    }

    const themeSwitchReference = useRef()
    useEffect(() => {
      console.log('THEME SWITCH REFERENCE', themeSwitchReference.current.checked);
      const userThemeMode = localStorage.getItem('themeMode')
      console.log('FOUND THEME MODE FORM LOCAL STORAGE', userThemeMode);
      
      if (userThemeMode) {
        if (userThemeMode == 'dark') {
          dispatch(ChangeTheme('dark'))
          themeSwitchReference.current.checked = true
          localStorage.setItem('themeMode', 'dark')
        }
        else if (userThemeMode == 'light') {
          dispatch(ChangeTheme('light'))
          themeSwitchReference.current.checked = false
          localStorage.setItem('themeMode', 'light')
        }
      }
    }, [])

  return (
    <div className='flex flex-row items-center justify-center'>
        <Switch themeSwitchReference={themeSwitchReference} onChange={ChangeMode} defaultChecked={true}/>
    </div>
  )
}

export default ThemeSwitcher