import { Tree ,Button} from 'antd';
import axios from 'axios';
import './style/edit_tree.less';
import {tree_transformation} from 'common_fn/tree_transformation'

const { TreeNode } = Tree;

class Edit_tree extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          gData:[{key:'1',title:'第一个',children:[{key:'2',title:'第一个子集1'},{key:'3',title:'第一个子集2'}]},
          {key:'4',title:'第er个',children:[{key:'5',title:'第er个子集1'},{key:'6',title:'第er个子集2'}]}],
          id_all:['1','2','3','4','5','6']
      };
      this.all_check_fn=this.all_check_fn.bind(this);
  }
  
  componentWillMount(){
      let that=this;
      let url=this.props.url ||'';
      if(url){
          axios.get(url) 
                .then(function(response) {
                    if(response.code=='0'){
                      let gData_obj=tree_transformation(this.state.gData,{'key':'id','title':'name','children':'childrens'})
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
  onClick(id){
    let value=this.props.value || [];
    let index=0;
    if(value.includes(id)){
      index=value.indexOf(id);
      value=[...value.slice(0,index),...value.slice(index+1)]
    }else{
       value=[...value,id]
    }
    this.props.onChange(value)
  }
  all_check_fn(){
      let id_all=this.state.id_all;
      this.props.onChange(id_all)
  }
  render() {
    let obj={};
    let value=this.props.value || [];
    const loop = data =>
      data.map(item => {
        if(value.includes(item.key)){
            obj={type:'primary',onClick:()=>this.onClick(item.key)}
        }else{
            obj={onClick:()=>this.onClick(item.key)}
        }
        if (item.children && item.children.length) {
          return (
            <TreeNode key={item.key} title={<p style={{margin:0}}>{item.title}<Button {...obj}>赋权</Button></p>}>
              {loop(item.children)}
            </TreeNode>
          );
        }

        return <TreeNode key={item.key} title={<p style={{margin:0}}>{item.title}<Button {...obj}>赋权</Button></p>}/>;
      });
    return (
       <div style={{maxHeight:'360px',overflow:'auto'}}>
            <Button onClick={this.all_check_fn}>全选</Button>
            <Tree
            className="l_power_modal_tree"
            defaultExpandAll={true}
            selectedKeys={[]}
            blockNode
          >
            {loop(this.state.gData)}
          </Tree>
          <div className='clear'></div>
       </div>
    );
  }
}

export default Edit_tree;