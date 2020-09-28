<template>
  <Layout class-prefix="layout">
    <NumberPad />
    <Types :toFather="123" />
    <Notes />
    <Tags :data-source.sync="tags" />
  </Layout>
</template>
<script lang="js">
import Tags from '@/components/Money/Tags.vue'
import Notes from '@/components/Money/Notes.vue'
import Types from '@/components/Money/Types.vue'
import NumberPad from '@/components/Money/NumberPad.vue'
export default {
  name: "Money",
  data(){
    return {
      tags:['衣','食','住','行']
    }
  },
  components:{ Tags, Notes, Types, NumberPad },

};
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>