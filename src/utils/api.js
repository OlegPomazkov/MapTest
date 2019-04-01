import DATA from './mockData'

export default {
	getData(method, options) {
		let data = new Promise((res, rej) => {
			switch(method) {
				case 'list':
					res(DATA.allPoints)
					break
				case 'description':
					res(DATA.pointDefs.filter(i => i.id === options.id)[0])
					break
				default:
					rej('Incorrect API method')
			}
		})

		return data
	}
}