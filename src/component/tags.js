import { Tag } from 'antd';
import './style/tags.less'
import axios from 'axios';

const { CheckableTag } = Tag;

class MyTag extends React.Component {
  constructor(props){
    super(props);
    this.handleChange=this.handleChange.bind(this);
  }

  handleChange = checked => {
     let value=this.props.value || [];
     let id=this.props.id || '';
     let index=value.indexOf(id);
     if(!this.props.no_click || this.props.is_tags){
         if(value.includes(id)){
            value=[...value.slice(0,index),...value.slice(index+1)]
            this.props.onChange(value)
         }else{
            this.props.onChange([...value,id])
         }
     }
  };
  render() {
    let checked=false;
    let value=this.props.value || [];
    let id=this.props.id || '';
    if(this.props.is_tags || (value.includes(id))){
       checked=true;
    }
    return (
      <CheckableTag {...this.props} checked={checked} onChange={this.handleChange} />
    );
  }
}
class MyTags extends React.Component {
    
  constructor(props){
    super(props)
    this.state={
        list:[]
    }
  }
  componentWillMount(){
      let that=this;
      let url=this.props.url ||'';
      if(url){
        axios.get(url) 
                .then(function(response) {
                    if(response.code=='0'){
                        that.setState({
                          list:response.content
                       })
                    }
          })
      }
  }
    render() {
      let list=this.props.list || this.state.list;
      let obj={
          no_click:this.props.no_click || false,
          is_tags:this.props.is_tags || false,
          value:this.props.value || [],
          onChange:this.props.onChange
      }
      list=list.map((ele,index)=>{
          return ele.id?(<MyTag key={index} {...obj} id={ele.id}>{ele.name}</MyTag>):(<MyTag key={index} {...obj} id={index}>{ele}</MyTag>)
      })
      return (
        <div className='l_common_tags'>
            {list}
        </div>
      );
    }
  }

  export default MyTags;