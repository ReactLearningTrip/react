import { Select} from 'antd';
import axios from 'axios';

const {Option}=Select;
const types={
    'brand':{key:'',label:'',search:''},
    'currency':{key:'currencyId',label:'currencyName',search:'search',url:'/supplier/of/currency'},
}
class Select_common extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        list:[]
    }
    this.search=this.search.bind(this);
  }
  
  search(input, option){
        //需要过滤数据，过滤成key,label的形式
        input=input||'';
        let that=this;
        let url=that.props.url ||'';
        let l_key=that.props.l_key||'id';
        let l_label=that.props.l_label||'name';
        let l_search=that.props.l_search||'search';
        let l_type=that.props.l_type||'';
        if(l_type){
            url=types[l_type].url;
            l_key=types[l_type].key;
            l_label=types[l_type].label;
            l_search=types[l_type].search;
        }
        let params={
            [l_search]:input
        }
        if(url){
            axios.post(url,params) 
                    .then(function(response) {
                        let list=[];
                        if(response.code=='0'){
                            list=response.content.data || [];
                        }
                        list=list.map(ele=>({...ele,key:ele[l_key],label:ele[l_label]}))
                        that.setState({
                            list    
                        })
            })
        }
  }
  get_list_fn(that){
    let list=that.state.list;
    let value=that.props.value;
    let list_arr=list.map(ele=>ele.key);
    let value_arr=[];
    let list_new=[];
    if(that.props.mode=='multiple'){
        value=value||[];
        value_arr=value.map(ele=>ele.key);
    }else{
        value=value?[value]:[];
        value_arr=value.map(ele=>ele.key);
    }
    for(let i=0;i<list_arr.length;i++){
        if(!value_arr.includes(list_arr[i])){
            list_new.push(list[i])
        }
    }
    list=[...value,...list_new]
    list=list.length==0?[{key:'','label':'无数据','disabled_selected':true}]:list;
    list=list.map(ele=><Option value={ele.key} disabled={!!ele.disabled_selected}>{ele.label}</Option>)
    return list
  }
    render() {
      let list=this.get_list_fn(this);
      let position=this.props.position||'';
      return (
          <Select
          showSearch
          allowClear={true}
          getPopupContainer={position?(()=>document.getElementsByClassName(position)[0]):(()=>document.body)}
          labelInValue={true}
          onFocus={this.search}
          placeholder={'--请选择--'}
          filterOption={(input, option) =>{
              this.search(input, option)
              return true;
          }}
          {...this.props}
          >
              {list}
          </Select>    
      );
    }
  }

  export default Select_common;