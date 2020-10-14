import clone from '@/lib/clone'
import createId from '@/lib/createId'
import router from '@/router'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    recordList: [],
    createRecordError:null,
    createTagError: null,
    tagList:[],
    currentTag: undefined
  } as RootState,
  mutations:{
    fetchRecord(state){
      state.recordList = JSON.parse(window.localStorage.getItem('recordList')||'[]')
    },
    createRecord (state,record){
      const record2 = clone(record); //深拷贝
      record2.createdAt = new Date().toISOString()
      state.recordList.push(record2)
      store.commit('saveRecords')
    },
    saveRecords(state){
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList))
    },
    //之前是用的findTag方法，是有返回值的，但是mutations里面的函数没有返回值，所以就要定义一个currentTag的变量来接收，给外部使用
    setCurrentTag(state,id:string){
       state.currentTag = state.tagList.filter((t) => t.id === id)[0];
    },
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
      if(!state.tagList || state.tagList.length === 0) {
        store.commit('createTag', '衣');
        store.commit('createTag', '食');
        store.commit('createTag', '住');
        store.commit('createTag', '行');
      }
    },
    createTag(state,name: string) {
      state.createTagError = null;
      const names = state.tagList.map(item => item.name)  //如data={[id:"1",name:"1"]}，提取name组成一个新的数组
      if (names.indexOf(name) >= 0) {
        state.createTagError = new Error("Tag name duplicated")
        return;
      };
      const id = createId().toString();
      state.tagList.push({ id, name: name });
      store.commit('saveTag');
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
    }
  }
})
export default store;
