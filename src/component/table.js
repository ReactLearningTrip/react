import { Table,Pagination,Icon} from 'antd';
import './style/table.less';

function CustomExpandIcon(props,children) {
  let isHasChildren=props.record[children] && (props.record[children].length>0)?true:false;
  return (
    <div 
    role="button"
    onClick={e => props.onExpand(props.record, e)}
    tabindex="0" className={"ant-table-row-expand-icon "+(isHasChildren?(props.expanded?"ant-table-row-expanded":"ant-table-row-collapsed"):'ant-table-row-spaced')} 
    aria-label="展开行">

    </div>
    
  );
}

class Table_new extends React.Component {
  constructor(props) {
    super(props);
  }
    render() {
     let childrenColumnName=this.props.childrenColumnName || 'To_reason_childrenColumnName_no_one_to_use_it';
     let className=this.props.className || '';
     className=this.props.childrenColumnName?className+' table_has_children':className;
      return (
         <Table 
          childrenColumnName='To_reason_childrenColumnName_no_one_to_use_it'
          pagination={false} 
          rowKey={record=>record.id}
          expandIcon={(props)=>CustomExpandIcon(props,childrenColumnName)}
          {...this.props}
          className={className}
          />
      );
    }
  }
  class Pagination_new extends React.Component {
    constructor(props) {
      super(props);
    }
    onChange=(page)=>{
      let params=this.props.params||{};
      params={...params,pageNo:page}
      if(this.props.search){
        this.props.search(true,params)
      }
    }
    
    onShowSizeChange=(current, size)=>{
      let params=this.props.list.params||{};
      params={...params,pageSize:size}
      if(this.props.search){
        this.props.search(true,params)
      }
    }
    render() {
      return (
          <div className='l_pagination'>
             <Pagination 
             showQuickJumper 
             showSizeChanger 
             pageSizeOptions={['20','50','100','200']} 
             showTotal={(total, range) => '共'+total+'条'}
             onShowSizeChange={this.onShowSizeChange}
             onChange={this.onChange}
             {...this.props}/>
          </div>
      );
    }
  }
export {Table_new,Pagination_new}