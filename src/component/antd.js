import { Spin, Icon,Popconfirm,TreeSelect} from 'antd';
import axios from 'axios';
import {tree_transformation} from 'common_fn/tree_transformation';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class Spin_new extends React.Component {
  constructor(props) {
    super(props);
  }
    render() {
      return (
         <Spin {...this.props} indicator={antIcon} />
      );
    }
  }
class Popconfirm_new extends React.Component {
  constructor(props) {
    super(props);
  }
    render() {
      let position=this.props.position || '';
      let obj={
            getPopupContainer:()=>(position && document.getElementsByClassName(position)?document.getElementsByClassName(position)[0]:document.body)
        };
      return (
         <Popconfirm {...obj} {...this.props} />
      );
    }
  }
  class TreeSelect_new extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            gData:[{key:'1',value:'1',title:'第一个',children:[{key:'2',value:'2',title:'第一个子集1'},{key:'3',value:'3',title:'第一个子集2'}]},
            {key:'4',value:'4',title:'第er个',children:[{key:'5',value:'5',title:'第er个子集1'},{key:'6',value:'6',title:'第er个子集2'}]}],
            id_all:['1','2','3','4','5','6']
        }
    }
    componentWillMount(){
        let that=this;
        let url=this.props.url ||'';
        if(url){
            axios.get(url) 
                  .then(function(response) {
                      if(response.code=='0'){
                        let gData_obj=tree_transformation(this.state.gData,{'key':'id','title':'name','children':'childrens','value':'value'})
                        let gData=gData_obj.data;
                        let id_all=gData_obj.id_all;
                          that.setState({
                              gData,
                              id_all
                          })
                      }
            })
        }
    }
    filterTreeNode(inputValue,treeNode){
      let title=treeNode.props.title;
      if(title.indexOf(inputValue)>=0){
          return true
      }else{
          return false
      }
    }
    render() {
      let position=this.props.position || '';
      let obj={
            getPopupContainer:()=>(position && document.getElementsByClassName(position)?document.getElementsByClassName(position)[0]:document.body)
        };
      let gData=this.props.treeData || this.state.gData; 
      return (
        <TreeSelect
          {...obj}
          value={this.props.value}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          treeData={gData}
          placeholder="请选择"
          treeDefaultExpandAll
          showSearch
          filterTreeNode={this.filterTreeNode}
          onChange={this.props.onChange}
        />
      );
    }
  } 
export {Spin_new,Popconfirm_new,TreeSelect_new};