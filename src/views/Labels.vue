<template>
  <Layout>
    <div class="tag-all">
            <router-link 
              class="tag"
              v-for="tag in tags"
              :key="tag.id"
              :to="`/labels/edit/${tag.id}`"
            >
                <span>{{tag.name}}</span>
                <span class="icon">
                  <Icon name = "right"/>
                </span>
            </router-link>
      </div>
      <div class="createTag-btnBox">
        <!-- 点击按钮是没有效果的，因为此处点击的是Button，只有点击button才会触发事件。所以要在Button组件中加上：@click="$emit('click',$event)" -->
        <!-- 如果不在Button组件中加上：@click="$emit('click',$event)" ，则在下面标签中加上@click.native="createTag"，也是可以的-->
        <Button @click="createTag">新建标签</Button>
      </div>
  </Layout>
</template>

<script lang="js">
import Vue from 'vue'
import {Component, Watch} from 'vue-property-decorator'
import Button from '@/components/Button.vue'
import store from '@/store';

// tagListModel.fetch() //一开始就fetch()一下
@Component({
  components:{Button}
})
export default class Labels extends Vue {
  tags = this.$store.state.tagList;
  createTag(){
    const name = window.prompt("请输入标签名")
    if(name){
      this.$store.commit('createTag',name)
      // const message = tagListModel.create(name);
      // if(message === 'success'){
      //   alert(message,"新增标签成功")
      // }else if(message === 'duplicated'){
      //   alert( message,"标签重复")
      // }
    } 
  }
};
</script>
<style lang="scss" scoped>
.tag-all {
  padding-left:14px;
  background: white;
  > .tag {
    display: flex;
    min-height: 44px;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    align-items: center;
    svg{
      width: 16px;
      color: #888;
      margin-right: 14px;
    }
  }
}
.createTag{
  &-btnBox {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
}
</style>
