import tagListModel from '@/models/tagListModel';

export default {
    //tag store
  tagList : tagListModel.fetch(),
  createTag: (name:string)=>{
    const message = tagListModel.create(name);
      if(message === 'success'){
        alert("新增标签成功")
      }else if(message === 'duplicated'){
        alert( "标签重复")
      }
  },
  removeTag:(id:string)=>{
    return tagListModel.remove(id)
  },
  // window.updateTag(id:string, Tag){ 如要传多个参数，这里可以传一个Tag对象。Tag里面不能有id，除了id都可以传，可写成：Exclude<Tag,'id'>。意思是Tag里面的除了id所有的东西
  updateTag:(id:string, name:string)=>{
    return tagListModel.update(id,name)
  },
  findTag(id:string){
    return this.tagList.filter((t) => t.id === id)[0];
  }
}