import req from '../utils/req.js';

export const reqLogin = (phone,password)=>{
	return req("/login",{phone,password})
}

export const findUsers = (userIds)=>{
	return req("/findUsers",{userIds})
}

export const reqMessageList = ()=>{
	return req("/getMessageList")
}

export const sendMsg = (msgData)=>{
	return req("/sendMsg",msgData,"POST")
}

export const reqFriendList = ()=>{
	return req("/getFriendList")
}

export const createChat = (chatInfo)=>{
	return req("/createChat",chatInfo,"POST")
}


