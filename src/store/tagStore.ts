import createId from '@/lib/createId';
const localStorageKeyName = 'tagList';
const tagStore = {
  //tag store
  tagList: [] as Tag[],
  fetchTags() {
    this.tagList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.tagList;
  },
  findTag(id: string) {
    return this.tagList.filter((t) => t.id === id)[0];
  },
  createTag(name: string) {
    const names = this.tagList.map(item => item.name)  //如data={[id:"1",name:"1"]}，提取name组成一个新的数组
    if (names.indexOf(name) >= 0) {
      window.alert("标签重复")
      return 'duplicated'
    };
    const id = createId().toString();
    this.tagList.push({ id, name: name });
    this.saveTag();
    window.alert("新增标签成功")
    return 'success';
  },
  removeTag(id: string) {
    let index = -1;
    for (let i = 0; i < this.tagList.length; i++) {
      if (this.tagList[i].id === id) {
        index = i
        break;
      }
    }
    this.tagList.splice(index, 1)
    this.saveTag();
    return true
  },
  // window.updateTag(id:string, Tag){ 如要传多个参数，这里可以传一个Tag对象。Tag里面不能有id，除了id都可以传，可写成：Exclude<Tag,'id'>。意思是Tag里面的除了id所有的东西
  updateTag(id: string, name: string) {
    const idList = this.tagList.map(item => item.id);
    if (idList.indexOf(id) >= 0) {
      const names = this.tagList.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        return 'duplicated'
      } else {
        const tag = this.tagList.filter(item => item.id === id)[0]
        tag.name = name;
        this.saveTag();
        return 'success'
      }
    } else {
      return 'not found'
    }
  },
  saveTag() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.tagList))
  },
}

tagStore.fetchTags();

export default tagStore;