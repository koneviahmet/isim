import { Menu } from 'semantic-ui-react'
import Link from 'next/link'

const Header = () => {
    return(
        <Menu stackable>
        <Menu.Item>
          <img src='https://react.semantic-ui.com/logo.png' />
        </Menu.Item>

        <Menu.Item name='features' >
            <Link href='/'>Ana Sayfa</Link>
        </Menu.Item>

        <Menu.Item name='features' >
            <Link href='/kalanlar'>Kalanlar</Link>
        </Menu.Item>


      </Menu>
    )
}


export default Header;