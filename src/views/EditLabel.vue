<template>
  <Layout>
    <div class="edit-label">
      <div class="navBar">
        <span class="leftIcon"><Icon class="icon" name="left"  @click="goBack"/></span>
        <span class="title">编辑标签</span>
      </div>
      <div class="form-wrapper">
        <FormItem
          :value="currentTag.name"
          @update:value="updateTag"
          field-name="标签名"
          placeholder="请输入标签名"
        />
      </div>
      <div class="removeTag-btnBox">
        <Button class="removeTag" @click="remove">删除标签</Button>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch, Prop } from "vue-property-decorator";
import Layout from "@/components/Layout.vue";
import FormItem from "@/components/Money/FormItem.vue";
import Button from "@/components/Button.vue";

@Component({
  components: {
    FormItem,
  },
})
export default class EditLabel extends Vue {
  get currentTag(){
    return this.$store.state.currentTag;
  }
  created() {
    const id = this.$route.params.id
    this.$store.commit('fetchTags')
    this.$store.commit('setCurrentTag',id)
    if(!this.currentTag){
        this.$router.replace("/404");
    }
  }
  updateTag(name: string) {
    if(this.currentTag) {
      this.$store.commit('updateTag',{id:this.currentTag.id, name})
    }
  }
  remove(){
      if(this.currentTag) {
        this.$store.commit('removeTag',this.currentTag.id)
      }
  }
  goBack(){
      this.$router.back()
  }
}
</script>

<style lang="scss" scoped>
.edit-label {
  display: flex;
  flex-direction: column;
  .navBar {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 48px;
    background: white;
    font-size: 16px;
    > .leftIcon {
      position: absolute;
      left: 15px;
      > .icon {
        width: 24px;
      }
    }
  }
  .form-wrapper {
    margin-top: 10px;
    background: white;
    box-shadow: 0 1px 2px #0000001a;
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
