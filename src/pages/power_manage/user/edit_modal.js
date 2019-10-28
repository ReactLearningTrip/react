import { Modal, Button,Form,Input,Radio,message} from 'antd';
import {connect} from 'react-redux';
import {edit_modal_fn} from "actions/power_manage/user/edit_modal";
import {form_error_fn} from "common_fn/common_fn";
import {Spin_new} from "component/antd";
import MyTags from 'component/tags';
import 'style/edit_modal.less';
import axios from 'axios';

const { TextArea } = Input;

class Edit_modal1 extends React.Component {
  state = { loading: false };
  handleCancel = e => {
     this.props.edit_modal_fn({visible:false,params:{}})
  };
  handleSubmit = e => {
    let that=this;
    e.preventDefault();
    let {is_edit}=this.props.edit_modal;  
    this.props.form.validateFields((err, values) => {
        if (!err) {
            that.setState({
                loading:true
            })
            let detail=is_edit?that.props.list.userInfo_detail : {};
            let message_data='添加成功'
            if(!!is_edit){
                values={...values,id:detail.id||''};
                message_data='编辑成功'
            }
            axios.post("/product/brand/insert",values) 
            .then(function(response) {
                that.setState({
                    loading:false
                })
                if(response.code=='0'){
                    message.success(message_data)
                    that.handleCancel()
                    that.props.search()
                }else{
                    form_error_fn(that.props.form,response.msg)
                }
            }).catch(function (response) {
                that.setState({
                    loading:false
                })
            })
            
        }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 10 },
        };
    const formItemLayout_special = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
    };  
    let {visible,params,is_edit}=this.props.edit_modal;  
    let detail=is_edit?this.props.list.userInfo_detail : {};
    return (
        <Modal
          title={is_edit?"用户编辑":"用户添加"}
          wrapClassName='l_edit_power_modal'
          visible={visible}
          onCancel={this.handleCancel}
          footer={null}
          width={700}
          maskClosable={false}
        >
          {visible?(<Form autoComplete='off' {...formItemLayout}>
                <Form.Item label='用户名称'>
                    {getFieldDecorator('roleName', {
                        rules: [{ required: true, message:'必填'}],
                        initialValue:detail.roleName || ''
                    })(
                        <Input placeholder=''/>
                    )}
                </Form.Item> 
                <Form.Item label='用户邮箱'>
                    {getFieldDecorator('roleName', {
                        rules: [{ required: true, message:'必填'}],
                        initialValue:detail.roleName || ''
                    })(
                        <Input placeholder=''/>
                    )}
                </Form.Item>
                <Form.Item label='用户手机'>
                    {getFieldDecorator('roleName', {
                        rules: [{ required: true, message:'必填'}],
                        initialValue:detail.roleName || ''
                    })(
                        <Input placeholder=''/>
                    )}
                </Form.Item>
                <Form.Item label='用户密码'>
                    {getFieldDecorator('roleName', {
                        rules: [{ required: true, message:'必填'}],
                        initialValue:detail.roleName || ''
                    })(
                        <Input placeholder=''/>
                    )}
                </Form.Item>
                <Form.Item label='确认密码'>
                    {getFieldDecorator('roleName', {
                        rules: [{ required: true, message:'必填'}],
                        initialValue:detail.roleName || ''
                    })(
                        <Input placeholder=''/>
                    )}
                </Form.Item>
                <Form.Item label='赋予角色' {...formItemLayout_special}>
                    {getFieldDecorator('jurisdictionId', {
                        initialValue:detail.jurisdictionId || []
                    })(
                        <MyTags url={''}/>
                    )}
                </Form.Item>
                <div className='l_edit_power_modal_footer'>
                      <Button onClick={this.handleCancel}>取消</Button>
                      <Spin_new spinning={this.state.loading}><Button type='primary' onClick={this.handleSubmit}>保存</Button></Spin_new>
                      
                </div>
                <div className='clear'></div>
          </Form>):null}  
        </Modal>
    );
  }
}

const Edit_modal = Form.create({ name: 'edit_modal' })(Edit_modal1);
export default connect((state) => ({edit_modal: state.user_edit_modal,list:state.user_list}), {edit_modal_fn})(Edit_modal);