<template>
  <el-dialog
    class="dialog" 
    title="ОПИСАНИЕ ТОЧКИ" 
    :visible="showDialog"
    @close="handleClose">

      <div
        class="dialog__item"
        v-for="item in config"
        :key="item.id">
          <span class="dialog__item__label">
            {{item.label}}
          </span>
          <span 
            class="dialog__item__content"
            v-if="item.type !== 'image'">
              {{pointData[item.name]}}
          </span>
          <img 
            class="dialog__item__image"
            v-if="item.type === 'image'" 
            :src="pointData[item.name]"/> 
      </div>
  
  </el-dialog>
</template>

<script>
import DATA_CONFIG from '../utils/dataConfig'

export default {
  props: {
    showDialog:{
      type: Boolean,
      required: true,
      default: ()=>false 
    },
    pointData:{
      required: true 
    },
  },
  data() {
    const config = DATA_CONFIG
    
    return{
      config: config
    }
  },
  methods: {
    handleClose() {
      this.$emit('dialogClosed')
    }
  }
}
</script>

<style lang="stylus" scoped>
.dialog
  font-size 20px
  font-weight bold

  &__item
    display flex
    flex-direction row
    justify-content flex-start
    align-items center

    &__label
      width 150px
      font-size 16px
      font-style italic

    &__content
      font-size 17px
      font-weight normal
</style>
