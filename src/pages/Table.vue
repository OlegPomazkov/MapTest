<template>
  <div class="table">
  	<div class="table__header">
  		ТАБЛИЦА КООРДИНАТ	
  	</div>
  	 
  	<table-component
  		:points="points"
  		@rowClicked="handleRowClicked"/>
  	<dialog-component
  		:showDialog="isDialogVisible"
  		:pointData="selectedPoint"
  		@dialogClosed="handleDialogClosed"/>
  </div>
</template>

<script>
import Api from '../utils/api'
import { mapGetters } from 'vuex' 
import TableComponent from '../components/TableComponent' 
import DialogComponent from '../components/DialogComponent'

export default {
	components: {
		TableComponent,
		DialogComponent
	},
  data () {
    return { 
    	isDialogVisible: false,
    	selectedPoint: {}
    }
  },
  computed: {
	  ...mapGetters([
	    'points',
	    'pointDescriptions'
	  ])
	},
  created() {
  	let query = this.$route.query

  	if (this.points.length === 0) {
  		this.getData(query)
  	} else {
  		this.openRowOnUrlQuery(query)
  	}
  },
  methods: {
  	async getData(query) {
  		try {
	  		const list = await Api.getData('list')

	  		this.$store.dispatch('setAllPoints', list)
	  		this.openRowOnUrlQuery(query)
  		} catch(err) {
  			console.error(err)
  		}
  	},
  	openRowOnUrlQuery(query) {
  		if(query.open) {
  			let currentRow = this.points.filter( i => i.id === +query.open)[0]

  			this.handleRowClicked(currentRow)			
  		}
  	},
  	async handleRowClicked(row) {
  		let desc = this.pointDescriptions.filter( i => i.id === row.id)

  		this.$router.push({ path: `/?open=${row.id}` })
  		if(desc.length) {
  			this.selectedPoint = Object.assign( row, desc[0])
  			this.isDialogVisible = true

  			return
  		}
  		try {
  			const selection =  await Api.getData('description', {id: row.id})

  			this.$store.dispatch('setDescription', selection)
  			this.selectedPoint = Object.assign( row, selection)
  			this.isDialogVisible = true	  		
  		} catch(err) {
  			console.error(err)
  		}
  	},
  	handleDialogClosed() {
  		this.isDialogVisible = false
  		this.$router.push({ path: `/` })

  	}
  }
}
</script>

<style lang="stylus" scoped>
	.table
		display flex
		flex-direction column
		justify-content flex-start
		align-items center

		&__header
			font-size 24px
			font-weight bold
			color #555
			margin-top 15px
			margin-bottom 15px
</style>