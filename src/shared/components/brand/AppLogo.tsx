import { themeLogos } from '../../theme/themeLogos'
import { useThemeContext } from '../../theme/useThemeContext'

interface AppLogoProps {
  className?: string
}

function AppLogo({ className }: AppLogoProps) {
  const { theme } = useThemeContext()

  return <img alt="PreviPost" className={className} src={themeLogos[theme]} />
}

export default AppLogo
