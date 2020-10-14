<template>
  <Layout>
    <div class="tag-all">
      <router-link
        class="tag"
        v-for="tag in tags"
        :key="tag.id"
        :to="`/labels/edit/${tag.id}`"
      >
        <span>{{ tag.name }}</span>
        <span class="icon">
          <Icon name="right" />
        </span>
      </router-link>
    </div>
    <div class="createTag-btnBox">
      <Button @click="createTag">新建标签</Button>
    </div>
  </Layout>
</template>

<script lang="js">
import Vue from 'vue'
import {Component, Watch} from 'vue-property-decorator'
import Button from '@/components/Button.vue'
import store from '@/store';
import { TagHelper } from '@/mixins/TagHelper';
import {mixins} from 'vue-class-component'
@Component({
  components:{Button},
})
export default class Labels extends mixins(TagHelper) {
  get tags(){
    return this.$store.state.tagList;
  }
  created() {
    this.$store.commit('fetchTags');
  }
};
</script>
<style lang="scss" scoped>
.tag-all {
  padding-left: 14px;
  background: white;
  > .tag {
    display: flex;
    min-height: 44px;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    align-items: center;
    svg {
      width: 16px;
      color: #888;
      margin-right: 14px;
    }
  }
}
.createTag {
  &-btnBox {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
}
</style>
