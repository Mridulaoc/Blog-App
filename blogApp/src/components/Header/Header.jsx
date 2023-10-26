import {Container, LogoutBtn} from '../index'

const Header = () => {
  return (

    <Container>
      <header className='w-full border-b-2 border-blue-500'>
        <nav className='flex justify-between py-4'>
          <div>Logo</div>
          <div>
            <ul className='flex gap-2'>
              <li>home</li>
              <li>sign up</li>
              <li>login</li>
            </ul>
          </div>
          <div>
            <LogoutBtn/>
          </div>
        </nav>

      </header>
    </Container>
    
      
    
  )
}

export default Header
