import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'





function App() {

  const themeMode = useSelector(state => state.themeStore.mode)

  return(
    <div className={`${themeMode == 'light' ? 'bg-white' : "bg-[url('./assests/dark_bg.jpg')] bg-cover bg-no-repeat bg-fixed"} ${themeMode == 'light' ? 'text-black' : 'text-white'}`}>
      <Outlet />
    </div>
  )
  
}

export default App

//bg-[url('./assests/dark_bg.jpg')]