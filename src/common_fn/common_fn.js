import {message} from 'antd';
function form_error_fn(form,message_data){
    // let err={}
    message.error(message_data,5)
    // message=message|| {};
    // let values=form.getFieldsValue();
    // for(let key of message){
    //     err[key]={
    //         value:values[key],
    //         errors:message[key]
    //     }
    // }
    // form.setFields(err)
}
function get_scroll_obj(...arr){
    let length=arr[0].length;
    let height=arr[0].height || 54;
    let always_scroll=arr[0].always_scroll || false;
    let table_body_height=length*height;
    let class_name=arr.slice(1);
    let all_height=$('body').outerHeight(true);
    let class_name_height=0;
    for(let i=0;i<class_name.length;i++){
        if((typeof class_name[i])=='number'){
            class_name_height+=class_name[i];
        }else{
            if((class_name[i]=='.l_header') && !$(class_name[i]).outerHeight(true)){
                class_name_height+=60;
            }else if((class_name[i]=='.ant-tabs-bar') && !$(class_name[i]).outerHeight(true)){
                class_name_height+=56;
            }else if((class_name[i]=='.ant-table-thead') && !$(class_name[i]).outerHeight(true)){
                class_name_height+=54;
            }else if((class_name[i]=='.l_common_search') && !$(class_name[i]).outerHeight(true)){
                class_name_height+=32;
            }else if((class_name[i]=='.l_pagination') && !$(class_name[i]).outerHeight(true)){
                class_name_height+=64;
            }else{
                class_name_height+=$(class_name[i]).outerHeight(true) || 0;
            }
            
        }
    }
    let obj={};
    if(always_scroll){
        obj={
            scroll:{'y':all_height-class_name_height}
        }
    }else if((class_name_height+table_body_height)>all_height){
        obj={
            scroll:{'y':all_height-class_name_height}
        }
    }
    return obj;
}
function refresh_fn(that){
    
    let refresh_status=Math.random();
    let timeout=null;
    window.addEventListener("resize",()=>{
        if(!timeout){
            timeout=setTimeout(() => {
                that.setState({
                    refresh_status
                })
            }, 300);
        }else{
            clearTimeout(timeout);
            timeout=null;
            timeout=setTimeout(() => {
                that.setState({
                    refresh_status
                })
            }, 300);
        }
        
    })
}
export {form_error_fn,get_scroll_obj,refresh_fn}