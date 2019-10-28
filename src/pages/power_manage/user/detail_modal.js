import { Modal, Button,Form,Input,Radio} from 'antd';
import {Table_new} from 'component/table';
import {connect} from 'react-redux';
import {edit_modal_fn} from "actions/power_manage/user/edit_modal";
import MyTags from 'component/tags';
import 'style/edit_modal.less';

const { TextArea } = Input;
const columns=[
  {
    title: '用户名称',
    dataIndex: 'id',
    key: 'id',
    width:'30%'
  },
  {
    title: '操作时间',
    dataIndex: 'id',
    key: 'id',
    width:'30%'
  },
  {
    title: '操作记录',
    dataIndex: 'id',
    key: 'id',
    width:'40%'
  },
]
class Detail_modal1 extends React.Component {
  state = {  };
  handleCancel = e => {
     this.props.edit_modal_fn({visible_detail:false,params:{}})
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
          labelCol: { span: 6 },
          wrapperCol: { span: 18 },
      };
    let {visible_detail,params}=this.props.edit_modal; 
    let {userInfo_detail}=this.props.list;
    let roleName= userInfo_detail.roleName || '';
    let roleDescribe= userInfo_detail.roleDescribe || '';
    let roleStatus= userInfo_detail.roleStatus=='1'?'禁用':'正常';
    let jurisdictionId= userInfo_detail.jurisdictionId || [];
    return (
        <Modal
          title="用户详情"
          wrapClassName='l_edit_power_modal'
          visible={visible_detail}
          onCancel={this.handleCancel}
          footer={null}
          width={700}
          maskClosable={false}
        >
          <Form autoComplete='off' {...formItemLayout}>
                <Form.Item label='用户名称'>
                     <span>{roleName}</span>
                </Form.Item> 
                <Form.Item label='用户邮箱'>
                     <span>{roleDescribe}</span>
                </Form.Item>
                <Form.Item label='用户手机'>
                     <span>{roleStatus}</span>
                </Form.Item>
                <Form.Item label='用户角色'>
                     <MyTags is_tags={true} list={jurisdictionId}/>
                </Form.Item>
                <Form.Item label='操作记录'>
                     <Table_new columns={columns} dataSource={[]} size={'small'}/>
                </Form.Item>
                <div className='clear'></div>
          </Form>  
        </Modal>
    );
  }
}

const Detail_modal = Form.create({ name: 'detail_modal' })(Detail_modal1);
export default connect((state) => ({edit_modal: state.user_edit_modal,list:state.user_list}), {edit_modal_fn})(Detail_modal);