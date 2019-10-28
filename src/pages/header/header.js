import { Menu, Icon, Switch } from 'antd';
import './header.less'
const { SubMenu } = Menu;

class Header extends React.Component {
  state = {
  };

 
  render() {
    return (
        <div className='l_header'>
            <span>RunWaygo管理后台</span>
        </div>
    );
  }
}

export default Header;