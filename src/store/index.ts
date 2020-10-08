import clone from '@/lib/clone'
import createId from '@/lib/createId'
import router from '@/router'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

type RootState = {
  recordList: RecordItem[],
  tagList: Tag[],
  currentTag?: Tag
}

const store =  new Vuex.Store({
  state: {
    recordList: [],
    tagList:[],
    currentTag: undefined
  } as RootState,
  mutations:{
    createRecord (state,record){
      const record2:RecordItem = clone(record); //深拷贝
      record2.createdAt = new Date()
      state.recordList.push(record2)
      store.commit('saveRecords')
    },
    saveRecords(state){
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList))
    },
    setCurrentTag(state,id:string){
       state.currentTag = state.tagList.filter((t) => t.id === id)[0];
    },
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
    },
    createTag(state,name: string) {
      const names = state.tagList.map(item => item.name)  //如data={[id:"1",name:"1"]}，提取name组成一个新的数组
      if (names.indexOf(name) >= 0) {
        window.alert("标签重复")
        return
      };
      const id = createId().toString();
      state.tagList.push({ id, name: name });
      store.commit('saveTag');
      window.alert("新增标签成功")
    },
    saveTag(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList))
    },
    removeTag(state,id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i
          break;
        }
      }
      if(index >= 0) { 
        state.tagList.splice(index, 1)
        store.commit('saveTag');
        router.back();
      }else {
        window.alert("删除失败")
      }
    },
    updateTag(state,object: {id:string, name:string}) {
      const {id,name} = object;
      const idList = state.tagList.map((item: { id: any }) => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map((item: { name: any }) => item.name);
        if (names.indexOf(name) >= 0) {
          window.alert("名字重复不能修改")
        } else {
          const tag = state.tagList.filter((item: { id: string }) => item.id === id)[0]
          tag.name = name;
          store.commit('saveTag');
        }
      } 
    },





















  }
})
export default store;
