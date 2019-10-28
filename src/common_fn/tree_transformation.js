function loop_fn(data,id_all,key,title,children,value){
     for(let i=0;i<data.length;i++){
            data[i]={
                ...data[i],
                'key':data[i][key],
                'value':data[i][value],
                'title':data[i][title],
                'children':data[i][children] || [],
            }
            id_all.push(data[i][key])
          if(data[i][children]){
                loop_fn(data[i][children],id_all,key,title,children,value)
          }
     } 
}
function tree_transformation(data,params){
    let params_new=params || {};
    let key=params_new.key || 'key';
    let title=params_new.title || 'title';
    let children=params_new.children || 'children';
    let value=params_new.value || 'value';
    let data_new=JSON.parse(JSON.stringify(data));
    let id_all=[];
    loop_fn(data_new,id_all,key,title,children,value);
    return {data:data_new,id_all};
}
export {tree_transformation}