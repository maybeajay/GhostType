import { RegularText } from './TextStyles'

const Header = () => {
  return (
  <nav className='flex justify-between h-20 items-center'>
    {/* name */}
    <RegularText style={{fontSize: "2rem", color: "#", marginLeft: "5vh"}}>
      Your Typing Guru
    </RegularText>
  </nav>


  )
}

export default Header