import { Link } from 'react-router'
import logo from '../../../assets/img/logo.svg'
import { appPaths } from '../../../router/paths'

function RecextPageHeader() {
  return (
    <Link to={appPaths.home}>
      <img src={logo} alt="PreviPost" className="mb-5 w-[126px] sm:w-[154px]" />
    </Link>
  )
}

export default RecextPageHeader
