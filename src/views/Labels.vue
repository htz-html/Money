<template>
  <Layout>
    <LabelTitle />
    <Label :label-source = "labels" />
  </Layout>
</template>

<script lang="js">
import Label from '@/components/Labels/Label.vue'
import LabelTitle from '@/components/Labels/LabelTitle.vue'
export default {
  name: "Labels",
  components:{Label,LabelTitle},
  data(){
    return{
      labels:['衣','食','住','行']
    }
  }
};
</script>
<style lang="scss" scoped>

</style>
