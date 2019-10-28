import { Button, message,Icon} from 'antd';
import {Table_new,Pagination_new} from 'component/table';
import {Spin_new,Popconfirm_new} from "component/antd";
import Common_search from 'component/common_search';
import {get_scroll_obj,refresh_fn} from "common_fn/common_fn";
import Edit_modal from './edit_modal';

import Detail_modal from './detail_modal';
import {connect} from 'react-redux';
import {edit_modal_fn} from "actions/power_manage/power/edit_modal";
import {list_fn,list_detail_fn} from "actions/power_manage/power/list";
import 'style/list.less';
import axios from 'axios';

class Power extends React.Component {
  constructor(props){
    super(props);
    this.state={
        loading_status:''
    }
    this.search_clear_fn=this.search_clear_fn.bind(this);
    this.list_fn=this.list_fn.bind(this);
  }
  componentWillMount(){
      refresh_fn(this);
  }
  componentDidMount() {
    this.props.ensureDidMount()
  }
  search_clear_fn(){
    this.setState({
      expandedRowKeys:[]
    })
  }
  list_fn(params,no_clear){
    if(!no_clear){
       this.search_clear_fn();
    }
    this.props.list_fn(params)
  }
  add_power = () => {
    this.props.edit_modal_fn({visible:true,params:{}})
 };
 edit_power = (id) => {
  this.props.list_detail_fn({id})
  this.props.edit_modal_fn({visible:true,params:{},is_edit:true})
};
edit_power_status = (id) => {
  let that=this;
  that.setState({
     loading_status:id
   })
   axios.delete("/role/updateRoleStatus")
   .then(function(response) {
        that.setState({
          loading_status:''
        })
         if(response.code=='0'){
            message.success('操作成功')
            that.get_fn()
         }
     }).catch(function (response) {
        that.setState({
          loading_status:''
        })
    })
};
detail_power = (id) => {
  this.props.list_detail_fn({id})
  this.props.edit_modal_fn({visible_detail:true,params:{}})
};
delete = (id) => {
   let that=this;
   axios.delete("/role/deleteRole")
   .then(function(response) {
         if(response.code=='0'){
            message.success('删除成功')
            that.get_fn()
         }
     })
   
};
onChange=(page)=>{
  let params=this.props.list.params;
  params={...params,pageNo:page}
  this.list_fn(params)
}
onShowSizeChange=(current, size)=>{
  let params=this.props.list.params;
  params={...params,pageSize:size}
  this.list_fn(params)
}
search_fn = (new_params,no_clear) => {
  let params={};
  if(this.props.list.params.pageSize){
      params['pageSize']=this.props.list.params.pageSize;
  }
  params={...params,...new_params,pageNo:1}
  this.list_fn(params,no_clear)
}
get_fn = (clear,params) => {
  params=params || this.props.list.params;
  this.list_fn(params,clear)
}
  render() {
      const columns = [
        {
          title: '权限ID',
          dataIndex: 'id',
          key: 'id',
          width:'10%'
        },
        {
          title: '权限名称',
          dataIndex: 'roleName',
          key: 'roleName',
          width:'18%'
        },
        {
          title: 'URI',
          dataIndex: 'roleDescribe',
          key: 'roleDescribe',
          width:'18%'
        },
        {
          title: '类型',
          dataIndex: 'type',
          key: 'type',
          width:'18%'
        },
        {
          title: '当前状态',
          dataIndex: 'roleStatus',
          key: 'roleStatus',
          render: (text, record, index) =>{
              return record.roleStatus==1?'禁用':'正常'
          },
          width:'18%'
        },
        
        {
          title: '操作',
          dataIndex: 'operation',
          key: 'operation',
          render: (text, record, index) =>{
              return <div className={'l_power_list_operation'+' l_power_list_operation'+record.id}>
                <span onClick={()=>this.edit_power(record.id)}>编辑</span>
                <Spin_new spinning={this.state.loading_status==record.id?true:false}><span onClick={()=>this.edit_power_status(record.id)}>正常</span></Spin_new>
                <span onClick={()=>this.detail_power(record.id)}>详情</span>
                <Popconfirm_new position={'l_power_list_operation'+record.id} placement="topLeft" title={'确认要删除吗？'} onConfirm={()=>this.delete(record.id)} okText="删除" cancelText="取消">
                     <span>删除</span>
                </Popconfirm_new>
                
              </div>
          },
          width:'18%'
        },
      ];
    let list=this.props.list;
    let params=this.props.list.params;
    let userInfo=this.props.list.userInfo;
    let data=userInfo.data || [];
    let total=userInfo.total || 0; 
    let {isLoading}=list;
    let current=params.pageNo || 1;
    let pageSize=params.pageSize || 20;
    let scroll_obj=get_scroll_obj({length:data.length},'.l_header',18,'.ant-tabs-bar','.l_common_search',24,'.ant-table-thead','.l_pagination');
    return (
        <div className='l_power'>
            <Common_search search={this.search_fn} types={['name_num','status']}/>
            <Button onClick={this.add_power}><Icon type="plus" />添加</Button>
            <Table_new {...scroll_obj} loading={isLoading} dataSource={data} columns={columns} />
            <Pagination_new params={params} search={this.get_fn} current={current} pageSize={pageSize} total={total} />
            <Edit_modal  search={this.get_fn}/>
            <Detail_modal/>
        </div>
    );
  }
}
export default connect((state) => ({list:state.power_list}), {edit_modal_fn,list_fn,list_detail_fn})(Power);
