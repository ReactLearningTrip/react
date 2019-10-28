import { Tabs, Button } from 'antd';
import {connect} from 'react-redux';
import history from 'router/history';
import {edit_menu_fn} from "actions/left_menu/menu";
import 'style/router_switch.less'


const { TabPane } = Tabs;

class Router_switch extends React.Component {
  constructor(props) {
    super(props);
  }

  onChange = (activeKey,...arr) => {
    let left_menu=this.props.left_menu;
    this.props.edit_menu_fn({
         activeKey
    });
    let paths=left_menu.all_tabs.map(ele=>ele.path);
    let path=paths[parseInt(activeKey)-1]
    history.push(path)
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  remove = targetKey => {
    let left_menu=this.props.left_menu;
    let activeKey=left_menu.activeKey;
    let old_show_tabs=left_menu.show_tabs;
    let index=old_show_tabs.indexOf(targetKey);
    let show_tabs=[...old_show_tabs.slice(0,index),...old_show_tabs.slice(index+1)];
    if(activeKey==targetKey){
        activeKey=show_tabs[show_tabs.length-1] || '';
        let route_path='';
        if(!activeKey){
            route_path=left_menu.all_power_tabs[0].path;
            activeKey=left_menu.all_power_tabs[0].key;
            history.push(route_path);
            show_tabs=[activeKey]
            this.props.edit_menu_fn({
                  activeKey,
                  show_tabs
            })
        }else{
            route_path=left_menu.all_tabs.filter(ele=>(ele.key==activeKey))[0].path;
            history.push(route_path)
            this.props.edit_menu_fn({
                  activeKey,
                  show_tabs
            })
        }
    }else{
      this.props.edit_menu_fn({
            activeKey,
            show_tabs
      })
    }
    
    
  };
  get_show_tabs_menu_fn(all_power_tabs,show_tabs){
       let show_tabs_menu=[];
       let all_power_tabs_obj={};
       for(let i=0;i<all_power_tabs.length;i++){
          all_power_tabs_obj[all_power_tabs[i]['key']]=all_power_tabs[i];
       }
       show_tabs_menu=show_tabs.map(ele=>all_power_tabs_obj[ele]);
       return show_tabs_menu;
  }
  render() {
    let left_menu=this.props.left_menu;
    let activeKey=left_menu.activeKey;
    let show_tabs=left_menu.show_tabs;
    let show_tabs_menu=this.get_show_tabs_menu_fn(left_menu.all_power_tabs,show_tabs);
    return (
      <div>
        {show_tabs_menu && show_tabs_menu.length>0?(<Tabs
          hideAdd
          onChange={this.onChange}
          activeKey={activeKey}
          type="editable-card"
          onEdit={this.onEdit}
          className='l_top_tabs_menu'
        >
          {show_tabs_menu.map(pane => {
              pane=pane || {};
              return  <TabPane tab={pane.title} key={pane.key} path={pane.path}>
              {pane.content}
            </TabPane>
          })}
        </Tabs>):null}
      </div>
    );
  }
}
export default connect((state) => ({left_menu:state.left_menu}), {edit_menu_fn})(Router_switch);