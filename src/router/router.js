import zhCN from 'antd/es/locale/zh_CN';
// import {HashRouter, Route } from 'react-keeper';

import {Router, Route, Switch,withRouter} from 'react-router-dom';
import { ConfigProvider,Tabs } from 'antd';
import history from 'router/history';
import {Provider} from 'react-redux';
import store from '../redux/store';
import Header from 'pages/header/header';
import Sider from 'pages/left_menu/menu';
import Router_right from './router_right';

import 'style/router.less'




const getRouter = () => (
    <Provider store={store}>
                <ConfigProvider locale={zhCN}>
                    <Router history={history} >
                       <div>
                            <div className='l_router_div'>
                                <Header/>
                                <div className='l_router_div_left'>
                                    <Sider/>
                                </div> 
                                        
                                <Router_right/>
                            </div>
                             
                        </div>    
                    </Router>
                </ConfigProvider>
    </Provider>
    
    
);


export default getRouter;