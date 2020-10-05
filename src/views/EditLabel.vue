import EditLabel from '@/views/EditLabel.vue';
<template>
  <Layout>
    <div class="edit-label">
        <div class="removeTag-btnBox">
        <button class="removeTag">删除标签</button>
      </div>
      <div class="content">
        <div class="header">
          <Icon name="left" />
          <span class="title">编辑标签</span>
        </div>
        <div class="edit">
            <Notes field-name = "标签名" placeholder = "请输入标签名" />  
        </div>
      </div>
      
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch, Prop } from "vue-property-decorator";
import tagListModel from "../models/tagListModel";
import Layout from "@/components/Layout.vue";
import Notes from '@/components/Money/Notes.vue';


@Component({
    components:{
        Notes
    }
})
export default class EditLabel extends Vue {
    
  //获取后面的id信息
  created() {
    const id = this.$route.params.id;
    tagListModel.fetch();
    const tags = tagListModel.data;
    const tag = tags.filter((t) => t.id === id)[0];
    if (tag) {
      console.log(tag);
    } else {
      this.$router.replace("/404");
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-label {
  display: flex;
  justify-content: space-between;
  flex-direction: column-reverse;
  .content {
    flex-grow: 1;
  }
  .edit{
      margin-top: 10px;
      background: white;
  }
}
.header {
  display: flex;
  align-items: center;
  min-height: 44px;
  background: white;
  > .title {
  }
}

.removeTag {
  padding: 0 20px;
  min-height: 40px;
  border: none;
  background: #aaa;
  border-radius: 5px;
  color: white;
  &-btnBox {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
}
</style>
