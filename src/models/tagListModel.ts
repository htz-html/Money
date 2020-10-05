import createId from '@/lib/createId';
const localStorageKeyName = 'tagList';

type Tag = {
    id:string
    name: string
}

type TagListModel = {
    data: Tag[]
    fetch: ()=>Tag[]
    save: () => void //void就是什么都不返回
    update: (id:string, name:string)=> 'success' | 'duplicated' | 'not found'
    //这是我们学的第一个不属于七大数据类型的其中一个。名为：联合类型。类似于枚举
    create: (name:string) => 'success' | 'duplicated' // 这属于联合类型。属于字符串下的子类型，就只返回这两个字符串。
    remove: (id:string) => boolean
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
    update(id:string,name:string){
        const idList = this.data.map(item=>item.id);
        if(idList.indexOf(id)>=0){
            const names = this.data.map(item=>item.name);
            if(names.indexOf(name)>=0){
                return 'duplicated'
            }else {
                const tag = this.data.filter(item=>item.id === id)[0]
                tag.name = name;
                this.save();
                return 'success'
            }
        }else{
            return 'not found'
        }
    },
    create(name:string) {
        const names = this.data.map(item=>item.name)  //如data={[id:"1",name:"1"]}，提取name组成一个新的数组
        if (names.indexOf(name) >= 0 ){ return 'duplicated'};
        const id = createId().toString();
        this.data.push({id,name:name});
        this.save();
        return 'success';
    },
    remove(id:string) {
        let index = -1;
        for(let i=0;i<this.data.length;i++){
            if(this.data[i].id === id){
            index = i
            break;
          }
        }
        this.data.splice(index, 1)
        this.save();
        return true
    }
}
export default tagListModel;