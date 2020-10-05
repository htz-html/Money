import EditLabel from '@/views/EditLabel.vue';
<template>
    <div>
        11
    </div>
</template>

<script lang = "ts">
import Vue from 'vue'
import {Component, Watch} from 'vue-property-decorator'
import tagListModel from '../models/tagListModel';

@Component
export default class EditLabel extends Vue {
//获取后面的id信息
created() {
    const id = this.$route.params.id
    tagListModel.fetch()
    const tags = tagListModel.data
    const tag = tags.filter(t=>t.id === id)[0]
    if(tag){
        console.log(tag)
    } else {
        this.$router.replace('/404')
    }
}
}
</script>

<style lang="scss" scoped>

</style>