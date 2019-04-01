<template>
  <div>
  	<el-table
      height="500"
      :highlight-current-row="true"
      :data="points"
      @row-click="handleRowClick">
      
      <el-table-column
        v-for="(item, k) in tableConfig" 
        :width="item.width"
        :label="item.label" 
        :prop="item.name"
        :key="item.id"/>
    </el-table>
  </div>
</template>

<script>
import DATA_CONFIG from '../utils/dataConfig'

export default {
	props: {
		points: {
			type: Array,
			required: true
		}
	},
	data() {
		const config = DATA_CONFIG

		return {
			tableConfig: config.filter(i => i.tableView)
		}
	},
	methods: {
		handleRowClick(row) {
			this.$emit('rowClicked', row)
		}
	}

}
</script>
