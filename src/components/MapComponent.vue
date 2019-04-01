<template>
  <div>
    <yandex-map
	  :coords="center"
	  zoom="10"
	  style="width: 600px; height: 550px;"
    :controls="['zoomControl']"
	  map-type="map">
	 
	    <ymap-marker
	    	v-for="placemark in placemarks"
	      :key="placemark.id"
	      :marker-id="placemark.id"
	      marker-type="placemark"
	      :coords="[placemark.latitude, placemark.longitude]"
	      :icon="{color: 'green'}"
	      :balloonTemplate = "balloonsObj[placemark.id]"/>
    
    </yandex-map>
  </div>
</template>

<script>
// :balloon="balloon"	
import { yandexMap, ymapMarker } from 'vue-yandex-maps'

export default {
	components: {
		yandexMap, 
		ymapMarker
	},
	props: {
		placemarks: {
			type: Array,
			required: true
		},
  	balloons: {
			type: Array,
			required: true
		},
		center: {
			type: Array,
			required: true
		}, 
	},
	computed:{
		balloonsObj() {
			let obj={}

			this.balloons.forEach( i => {
				obj[i.id] = `
					<h3>${i.name}</h3>
					<img src="${i.image}">
					<p>${i.description}</p>`
			})

			return obj
		}
	}
}
</script>
