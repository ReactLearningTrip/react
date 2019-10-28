import getRouter from 'router/router';
import 'router/axios_intercept_manage'
// import 'antd/dist/antd.css'; // 引入antd样式表
import 'style/common.less';
import 'style/antd_change.less';


if (module.hot) {
    module.hot.accept();
}

ReactDom.render(
    getRouter(), document.getElementById('app'));