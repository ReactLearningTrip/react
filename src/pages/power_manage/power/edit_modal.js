import { Modal, Button,Form,Input,Radio,message} from 'antd';
import {connect} from 'react-redux';
import {edit_modal_fn} from "actions/power_manage/power/edit_modal";
import {form_error_fn} from "common_fn/common_fn";
import {Spin_new,TreeSelect_new} from "component/antd";
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
          title={is_edit?"权限编辑":"权限添加"}
          wrapClassName='l_edit_power_modal l_edit_power_modal_position'
          visible={visible}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
          width={700}
        >
          {visible?(<Form autoComplete='off' {...formItemLayout}>
                <Form.Item label='模块名称' extra='控制字符在1~50字以内'>
                    {getFieldDecorator('roleName', {
                        rules: [{ required: true, message:'必填'}],
                        initialValue:detail.roleName || ''
                    })(
                        <Input placeholder=''/>
                    )}
                </Form.Item>
                <Form.Item label='状态'>
                    {getFieldDecorator('roleName', {
                        rules: [{ required: true, message:'必填'}],
                        initialValue:detail.roleName || ''
                    })(
                        <Input placeholder=''/>
                    )}
                </Form.Item>
                <Form.Item label='类型'>
                    {getFieldDecorator('roleStatus', {
                        initialValue:is_edit?(detail.roleStatus=='1'?'1':'0'):'0'
                    })(
                        <Radio.Group>
                            <Radio value={'0'}>菜单</Radio>
                            <Radio value={'1'}>页面</Radio>
                            <Radio value={'2'}>按钮</Radio>
                        </Radio.Group> 
                    )}
                </Form.Item>
                <Form.Item label='选择父源资源'>
                    {getFieldDecorator('roleStatus', {
                        initialValue:is_edit?(detail.roleStatus=='1'?'1':'0'):''
                    })(
                        <TreeSelect_new position='l_edit_power_modal_position'/> 
                    )}
                </Form.Item>
                <Form.Item label='URI' extra='页面展示地址（格式为：mvc-action//+访问地址）'>
                    {getFieldDecorator('roleName', {
                        rules: [{ required: true, message:'必填'}],
                        initialValue:detail.roleName || ''
                    })(
                        <Input placeholder=''/>
                    )}
                </Form.Item>
                <Form.Item label='资源描述' {...formItemLayout_special}>
                    {getFieldDecorator('roleDescribe', {
                        initialValue:detail.roleDescribe || ''
                    })(
                        <TextArea
                        placeholder=""
                        autosize={{ minRows: 4, maxRows: 6 }}
                      />
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
export default connect((state) => ({edit_modal: state.power_edit_modal,list:state.power_list}), {edit_modal_fn})(Edit_modal);