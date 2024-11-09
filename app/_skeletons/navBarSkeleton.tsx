import '@/styles/skeletons/navbar-menu.scss';

const NavBarSkeleton = () => {
  return (
    <div className='s-navbar-menu'>
      <div className='s-navbar-menu__option'></div>
      <div className='s-navbar-menu__option'></div>
      <div className='s-navbar-menu__option'></div>
      <div className='s-navbar-menu__avatar'></div>
      <div className='s-navbar-menu__option'></div>
    </div>
  )
}

export default NavBarSkeleton