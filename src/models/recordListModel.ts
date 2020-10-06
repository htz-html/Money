const localStorageKeyName = 'recordList'
const recordListModel = {
    data:[] as RecordItem[],//as表示我断言这是一个RecordItem数组。就不报错了
    clone(data: RecordItem[] | RecordItem){
        return JSON.parse( JSON.stringify(data));
    },
    fetch(){
        // return JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]'); 给fetch的返回值一个类型
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
        return this.data
    },
    save(){
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data))
    }
}
export default recordListModel;