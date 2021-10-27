import req from '../../utils/req.js';
import {SETINDEXDATAMUTATION} from '../mutation-types.js'
const state={
	indexData:{}
}

const mutations={
	[SETINDEXDATAMUTATION](state,indexData){
		// console.log(SETINDEXDATAMUTATION)
		state.indexData = indexData
	}
}

const actions={
	async getIndexData(store){
		let result = await req("/getIndexData");
		// console.log('result',result)
		store.commit(SETINDEXDATAMUTATION,result);
	}
}

const getters={
	
}

export default{
	state,
	mutations,
	actions,
	getters
}