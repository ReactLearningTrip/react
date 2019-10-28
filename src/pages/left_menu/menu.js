import { Menu, Icon, Switch } from 'antd';
import {connect} from 'react-redux';
import history from 'router/history';
import {edit_menu_fn} from "actions/left_menu/menu";

const { SubMenu } = Menu;

class Sider extends React.Component {
  constructor(props){
      super(props);
      this.onSelect=this.onSelect.bind(this);
  }
  componentWillMount(){
     let pathname=window.location.pathname;
     
     let left_menu=this.props.left_menu;
     let paths=left_menu.all_tabs.map(ele=>ele.path);
     let default_pathname=paths[0];
     let index=paths.indexOf(pathname);
     let index_default=paths.indexOf(default_pathname);
     
     let activeKey=index>=0?index+1+'':index_default+1+'';
     let show_tabs=[activeKey];
     console.log('paths===')
     console.log(paths)
     console.log(pathname)
     console.log(index)
     console.log(activeKey)
     console.log(show_tabs)
     this.props.edit_menu_fn({
        activeKey,
        show_tabs
     });
  }
  onSelect(params){
       let activeKey=params.key;
       let left_menu=this.props.left_menu;
       let show_tabs=left_menu.show_tabs;
       if(!show_tabs.includes(activeKey)){
          show_tabs.push(activeKey);
       }
       this.props.edit_menu_fn({
            activeKey,
            show_tabs
       });
       let paths=left_menu.all_tabs.map(ele=>ele.path);
       let path=paths[parseInt(activeKey)-1]
       history.push(path)
  }
  render() {
    let left_menu=this.props.left_menu;
    let all_power_tabs=left_menu.all_power_tabs;
    return (
        <Menu
          style={{ width: 200,height:'100%'}}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode={'inline'}
          theme={'light'}
          selectedKeys={[this.props.left_menu.activeKey]}
          onSelect={this.onSelect}
        >
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="appstore" />
                <span>权限管理</span>
              </span>
            }
          >
            {all_power_tabs.filter(ele=>!ele.disable).map(ele=>{
              return <Menu.Item key={ele.key}>{ele.title}</Menu.Item>
            })}
            
          </SubMenu>
          
        </Menu>
    );
  }
}
export default connect((state) => ({left_menu:state.left_menu}), {edit_menu_fn})(Sider);