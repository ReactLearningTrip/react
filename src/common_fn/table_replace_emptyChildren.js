function loop_fn(data){
    for(let i=0;i<data.length;i++){
           data[i]={
               ...data[i],
               'children':!!data[i]['children'] &&(data[i]['children'].length>0)?data[i]['children']:null,
           }
         if(data[i]['children']){
               loop_fn(data[i]['children'])
         }
    } 
}
function table_replace_emptyChildren(data){
   data=data||[];
   let data_new=JSON.parse(JSON.stringify(data));
   loop_fn(data_new);
   return data_new;
}
export {table_replace_emptyChildren}