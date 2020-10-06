type RecordItem = {
    tags:string[]
    notes: string
    type: string
    amount: number
    createdAt?:Date
}

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

interface Window {
    tagList: Tag[]
}