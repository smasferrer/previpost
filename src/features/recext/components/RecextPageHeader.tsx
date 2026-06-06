import { Link } from 'react-router'
import { appPaths } from '../../../router/paths'
import AppLogo from '../../../shared/components/brand/AppLogo'

function RecextPageHeader() {
  return (
    <Link to={appPaths.home}>
      <AppLogo className="mb-5 w-[126px] sm:w-[154px]" />
    </Link>
  )
}

export default RecextPageHeader
