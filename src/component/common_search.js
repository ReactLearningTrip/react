import { Input, Form ,Select,Button} from 'antd';
import './style/common_search.less'
const { Search } = Input;
const { Option  } = Select;
class Common_search1 extends React.Component {
  constructor(props){
      super(props);
      this.search_fn=this.search_fn.bind(this);
      this.clear=this.clear.bind(this);
  }
  componentWillMount(){
    this.props.search({})
  }
  search_fn(){
      let values=this.props.form.getFieldsValue() || {};
      this.props.search(values)
  }
  clear(){
      this.props.form.resetFields();
      this.props.search({})
  }
  get_list(types,getFieldDecorator){
      let list_all={
            'versionNumber':<Form.Item>
                            {getFieldDecorator('version', {
                                initialValue:''
                            })(
                                <Input placeholder='版本号'/>
                            )}
                        </Form.Item>,
            'applicationType':<div className='l_common_search_list'>
                                  <span>应用类型</span>
                                  <Form.Item>
                                        {getFieldDecorator('app_type', {
                                            initialValue:''
                                        })(
                                          <Select style={{width:'120px'}}>
                                              <Option value="">不限</Option>
                                              <Option value="1">Android</Option>
                                              <Option value="2">IOS</Option>
                                          </Select> 
                                        )}
                                    </Form.Item>
              </div>,            
            'name_num':<Form.Item>
                            {getFieldDecorator('key', {
                                initialValue:''
                            })(
                                <Input placeholder='名称/编号'/>
                            )}
                        </Form.Item>,
            'name_phone_email':<Form.Item>
                                    {getFieldDecorator('name_phone_email', {
                                        initialValue:''
                                    })(
                                        <Input placeholder='用户名电话/邮箱'/>
                                    )}
                                </Form.Item>, 
             'supply_num':<Form.Item>
                        {getFieldDecorator('supplierNo', {
                            initialValue:''
                        })(
                            <Input placeholder='供应商编号'/>
                        )}
                    </Form.Item>,
              'supply_name':<Form.Item>
                    {getFieldDecorator('supplierName', {
                        initialValue:''
                    })(
                        <Input placeholder='供应商名称'/>
                    )}
                </Form.Item>,   
                'cooperate_status':<div className='l_common_search_list'>
                                    <span>合作状态</span>
                                    <Form.Item>
                                        {getFieldDecorator('supplierStatus', {
                                            initialValue:''
                                        })(
                                            <Select style={{width:'120px'}}>
                                                <Option value="">不限</Option>
                                                <Option value="1">合作中</Option>
                                                <Option value="0">停止合作</Option>
                                            </Select> 
                                        )}
                                    </Form.Item>
                                </div>,   
                 'supply_rank':<div className='l_common_search_list'>
                                        <span>供应等级</span>
                                        <Form.Item>
                                            {getFieldDecorator('supplierGrade', {
                                                initialValue:''
                                            })(
                                                <Select style={{width:'120px'}}>
                                                <Option value="">不限</Option>
                                                <Option value="A">A</Option>
                                                <Option value="B">B</Option>
                                                <Option value="C">C</Option>
                                            </Select> 
                                            )}
                                        </Form.Item>
                                    </div>,   
                   'relatedCategories':<div className='l_common_search_list'>
                                  <span>是否已关联品类</span>
                                  <Form.Item>
                                      {getFieldDecorator('supplierGrade', {
                                          initialValue:''
                                      })(
                                          <Select style={{width:'120px'}}>
                                          <Option value="">不限</Option>
                                          <Option value="1">未关联</Option>
                                          <Option value="2">已关联</Option>
                                      </Select> 
                                      )}
                                  </Form.Item>
                              </div>,                                                                   
               'status':<div className='l_common_search_list'>
                            <span>状态</span>
                            <Form.Item>
                                {getFieldDecorator('status', {
                                    initialValue:''
                                })(
                                    <Select style={{width:'120px'}}>
                                    <Option value="">不限</Option>
                                    <Option value="1">正常</Option>
                                    <Option value="2">禁用</Option>
                                </Select> 
                                )}
                            </Form.Item>
                        </div>,            

      }
      let list=types.map(ele=>{
          return list_all[ele]
      })
      return list;
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    let types=this.props.types || [];
    let list=this.get_list(types,getFieldDecorator)
    return (
        <div className='l_common_search'>
                <Form autoComplete='off' >
                    {list}
                    <Form.Item style={{margin:'0 10px 0 20px'}}>
                         <Button type='primary' onClick={(value)=>this.search_fn()}>查询</Button>
                    </Form.Item>
                    <Form.Item>
                         <Button onClick={this.clear}>清空</Button>
                    </Form.Item>
                </Form>
                
        </div>
    );
  }
}
const Common_search = Form.create({ name: 'common_search' })(Common_search1);
export default Common_search;