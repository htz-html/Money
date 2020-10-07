import clone from '@/lib/clone';

const localStorageKeyName = 'recordList'

const recordStore = {
  //record store
  count:0,
  addCount(){
    this.count += 1
  },
  recordList: [] as RecordItem[],
  fetchRecords(){
    this.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    return this.recordList
  },
  saveRecords(){
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList))
  },
  createRecord (record:RecordItem){
    const record2:RecordItem = clone(record); //深拷贝
    record2.createdAt = new Date()
    this.recordList && this.recordList.push(record2) //同下
    // this.recordList?.push(record2)  // 同上。这是ts新语法，叫可选链语法，es6都不包含
    this.saveRecords()
  }
}
recordStore.fetchRecords()
export default recordStore;