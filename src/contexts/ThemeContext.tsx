import React, { useState, useContext, createContext } from 'react'
import { ThemeProvider } from 'styled-components'
import { darkBg, lightBg, lightColor, darkText } from '../vars'
import { IThemeContext } from '../types'

const ThemeContext = createContext(null as IThemeContext)

const darkTheme = {
  isLight: false,
  backgroundColor: darkBg,
  color: lightColor,
  transition: `color 0.3s ease, background-color 0.3s ease`,
  grayText: '#7e7f80',
  scrollLooper: '#222',
  subtleBackground: '#222',
}
const lightTheme = {
  isLight: true,
  backgroundColor: lightBg,
  color: darkText,
  transition: `color 0.3s ease, background-color 0.3s ease`,
  grayText: '#7e7f80',
  scrollLooper: '#f3f3f3',
  subtleBackground: '#f5f5f5',
}

const ThemeContextProvider = ({ children }: { children: JSX.Element }) => {
  const [selected, setSelected] = useState('dark')
  const toggleTheme = () => setSelected(selected === 'light' ? 'dark' : 'light')

  return (
    <ThemeContext.Provider value={{ selected, toggleTheme }}>
      <ThemeProvider theme={selected === 'light' ? lightTheme : darkTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

const useThemeContext = (): IThemeContext => useContext(ThemeContext)

export { ThemeContextProvider, useThemeContext, ThemeContext }
