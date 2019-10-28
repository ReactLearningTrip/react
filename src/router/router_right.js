import {Router,Redirect , Route, Switch,withRouter} from 'react-router-dom';
import NotLiveRoute from 'react-live-route';
import {connect} from 'react-redux';
import Router_switch from './router_switch';
import loadable from './loadable';

const Router_empty = loadable(()=>import('./router_empty'))
const Power = loadable(()=>import('pages/power_manage/power/list'))
const User = loadable(()=>import('pages/power_manage/user/list'))
const Role = loadable(()=>import('pages/power_manage/role/list'))



const LiveRoute = withRouter(NotLiveRoute)
const cache_router={
    "/power_manage/power":Power,
    "/power_manage/user":User,
    "/power_manage/role":Role,
}


class Router_right extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        let left_menu=this.props.left_menu;
        let all_power_tabs=left_menu.all_power_tabs;
        let show_tabs=left_menu.show_tabs;
        let paths=left_menu.all_tabs.map(ele=>ele.path);
        let default_pathname=paths[0];
        console.log('show_tabs===')
        console.log(show_tabs)
        return <div className='l_router_div_right'>
                    <Router_switch/>
                    
                    <Switch>
                        <Route exact path="/power_manage/power" />   
                        <Route exact path="/power_manage/user" />   
                        <Route exact path="/power_manage/role" />  
                        
                        <Redirect to={default_pathname}/>
                    </Switch>
                    
                        {all_power_tabs.map(ele=>{
                            return <LiveRoute path={ele.path} name={ele.path} livePath={"/"} component={ show_tabs.includes(ele.key)?cache_router[ele.path]:Router_empty } />
                        })}
                        
                            
                </div>   
    }
}


export default connect((state) => ({left_menu:state.left_menu}), {})(Router_right);