<template>
  <el-menu 
    class="nav_wrapper"
    :default-active="defaultActive"
    mode="horizontal">
      
      <el-menu-item index="1">
        <router-link 
          class="nav_wrapper__link"
          to="/">
            ТАБЛИЦА
        </router-link>
      </el-menu-item>
      
      <el-menu-item index="2">
        <router-link 
          class="nav_wrapper__link"
          to="/map">
            КАРТА
        </router-link>
      </el-menu-item>
    
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      defaultActive: '1'
    }
  },
  created() {
    let path = this.$route.path

    this.defaultActive = path === '/'? '1':'2'
  }
}
</script>

<style lang="stylus" scoped>
.nav_wrapper
  width 100%
  
  &__link
    text-decoration none
    font-size 18px
    font-weight bold
</style>