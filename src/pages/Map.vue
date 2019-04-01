<template>
	<div class="map">
		<div class="map__header"> 
			КАРТА 
		</div>

		<div v-if="!isDataReady"> 
			Данные не готовы 
		</div>
	  
	  <map-component
	  	v-if="isDataReady"
	  	:placemarks="points"
	  	:balloons="descriptions"
	  	:center="centerCoords"/>
  </div>
</template>

<script>
import Api from '../utils/api'
import { mapGetters } from 'vuex' 
import MapComponent from '../components/MapComponent' 

export default {
	components: {
		MapComponent
	},
	data() {
		return {
		}
	},
  computed: {
	  ...mapGetters([
	    'points',
	    'pointDescriptions'
	  ]),
	  descriptions() {
	  	let arr = []

	  	this.pointDescriptions.forEach( i => {
	  		let obj = Object.assign({}, i)
	  		let name = this.points.filter( innerI => innerI.id === i.id)[0].name

	  		obj.name = name
	  		arr.push(obj)
	  	})

	  	return arr
	  },
	  isDataReady() {
	  	if (this.points.length === 0) return false

	  	return this.points.length === this.pointDescriptions.length? true: false
	  },
	  centerCoords() {
	  	if (this.points.length === 0) return [0, 0]

	  	return [this.points[0].latitude, this.points[0].longitude] 
	  }
	},
	created() {
		if (this.points.length === 0) {
		 	this.getData()

		 	return
		}	
		this.checkPointsDescriptions()
  },
  methods: {
  	async getData() {
  		try {
	  		const list = await Api.getData('list')

	  		this.$store.dispatch('setAllPoints', list)
  			this.checkPointsDescriptions()
  		} catch(err) {
  			console.error(err)
  		}
  	},
  	checkPointsDescriptions() {
  		let indArr = this.pointDescriptions.map(i => i.id)

  		this.points.forEach( i => {
  			if(indArr.indexOf(i.id) === -1) {
		  		Api.getData('description', {id: i.id})
		  			.then((res) => {this.$store.dispatch('setDescription', res)})
		  		  .catch((err) => {console.error(err)})
  			}
  		})
  	}
  }
}
</script>

<style lang="stylus" scoped>
	.map
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