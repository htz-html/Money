const localStorageKeyName = 'tagList';
type TagListModel = {
    data: string[]
    fetch: ()=>string[]
    save: () => void //void就是什么都不返回

    //这是我们学的第一个不属于七大数据类型的其中一个。名为：联合类型。类似于枚举
    create: (name:string) => 'success' | 'duplicated' // 这属于联合类型。属于字符串下的子类型，就只返回这两个字符串。
}
const tagListModel: TagListModel = {
    data:[],
    fetch(){
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
        return this.data;
    },
    save(){
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data))
    },
    create(name:string) {
        if (this.data.indexOf(name) >= 0 ){ return 'duplicated'};
        this.data.push(name);
        this.save();
        return 'success';
    }
}
export default tagListModel;