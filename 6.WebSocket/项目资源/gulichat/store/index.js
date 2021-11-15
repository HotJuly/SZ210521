import Vue from 'vue'
import VueX from 'vuex'

Vue.use(VueX);
export default new VueX.Store({
	state:{
		newMessages:{},
		userInfo:uni.getStorageSync("userInfo")||{},
		currentToken:""
	},
	mutations:{
		ADDNEWMESSAGEMUTATION(state,{chatToken,data}){
			const list = state.newMessages[chatToken];
			if(list){
				list.push(data)
			}else{
				Vue.set(state.newMessages,chatToken,[data]);
			}
			// console.log('newMessages',state.newMessages)
		},
		CLEARMESSAGEMUTATION(state,chatToken){
			state.newMessages[chatToken].length=0;
		},
		SETCURRENTTOKENMUTATION(state,chatToken){
			state.currentToken = chatToken
		},
		CLEARCURRENTTOKENMUTATION(state,chatToken){
			state.currentToken = ""
		},
		SETUSERINFOMUTATION(state,userInfo){
			state.userInfo=userInfo
		}
	},
	actions:{
		
	},
	getters:{
		
	}
})