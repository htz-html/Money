const localStorageKeyName = 'recordList'
const model = {
    clone(data: RecordItem[] | RecordItem){
        return JSON.parse( JSON.stringify(data));
    },
    fetch(){
        // return JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]'); 给fetch的返回值一个类型
        return JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    },
    save(data: RecordItem[]){
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(data))
    }
}
export default model;