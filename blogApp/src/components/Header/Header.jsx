import { useSelector } from 'react-redux'
import {Container, LogoutBtn} from '../index'
// import Container from '../container/Container';
import {useNavigate} from 'react-router-dom'

const Header = () => {

    const authStatus =useSelector((state)=>state.auth.status);
    const navigate =useNavigate();

    const navItems = [
      {
        name: 'Home',
        url:'/login',
        active: true,
      },     
      {
          name: 'Login',
          url:'/login',
          active: !authStatus,
      },
      
      {
          name: 'Signup',
          url:'/signUp',
          active: !authStatus,
      },

      {
          name: 'All Posts',
          url:'/all-posts',
          active: authStatus,
      },

      {
          name:'Add Post',
          url:'/add-post',
          active: authStatus,
      }
    ]

  

  return (

    
      <header className='border-b border-blue-500 py-5'>
        <Container>
        <nav className='flex py-4 justify-between align-middle'>
          <div>Logo</div>
          <div>
            <ul className='flex gap-5 ml-auto'>
              {navItems.map((item)=>
              item.active ? (
                <li key={item.name}>
                  <button onClick={()=> navigate(item.url)}>
                  {item.name}
                  </button>                  
                </li>
              ) : null)
              }
              <li>
              {authStatus && <LogoutBtn/>}
              </li>
            </ul>
          </div>         
        </nav>
      </Container>
      </header>
    
    
      
    
  )
}

export default Header
