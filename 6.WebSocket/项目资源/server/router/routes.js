const jwt = require("jsonwebtoken");
const {
    wsConnects
} = require('../ws');

const {
    usersModel,
    chatsModel,
    ucmapsModel,
    friendsModel
} = require('../mongoDB');

const randomString = require("../utils/randomString");

const users = require('../datas/users.json');
const ucmaps = require('../datas/ucmaps.json');
const chats = require('../datas/chats.json');
const friends = require('../datas/friends.json');

const routes = {
    get: {
        async initData() {
            await usersModel.create(users);
            await chatsModel.create(chats);
            await ucmapsModel.create(ucmaps);
        },
        async initFriends(ctx) {
            const result = await friendsModel.create(friends);
            ctx.body = result;
        },
        async findUsers(ctx, next) {
            // console.log("/getIndexData success");
            const userIds = ctx.query.userIds;
            const userIdArr = userIds.split(',');
            let result;
            if (userIdArr.length > 1) {
                result = await usersModel.find({
                    userId: {
                        $in: userIdArr
                    }
                })
            } else {
                result = await usersModel.findOne({
                    userId: userIds
                })
                result=[result]
            }
            ctx.body = result;
        },
        async login(ctx, next) {
            // console.log("/getIndexData success");
            const {
                phone,
                password
            } = ctx.query;
            let {
                userId,
                nickName,
                avatarUrl,
                age,
                gender,
                birthday,
                provide,
                city,
                token
            } = await usersModel.findOne({
                phone: phone * 1,
                password
            })


            if (!token) {
                const salt = randomString(6);
                token = jwt.sign(userId, salt);
                const tokenCreate = Date.now();

                await usersModel.updateOne({
                    userId
                }, {
                    $set: {
                        salt,
                        token,
                        tokenCreate
                    }
                });
            }


            ctx.body = {
                userId,
                nickName,
                avatarUrl,
                age,
                gender,
                birthday,
                provide,
                city,
                token
            };
        },
        async getMessageList(ctx, next) {
            let {
                token
            } = ctx.headers;
            // const user = await usersModel.findOne({token});
            // console.log('user',user,token)
            const {
                userId
            } = await usersModel.findOne({
                token
            });
            let myChats = await ucmapsModel.find({
                userId
            });
            // console.log('myChats',myChats)
            // myChats = myChats.map(async (uchat)=>{
            //     console.log(111,uchat)
            //     const chat = await chatsModel.findOne({chatToken:uchat.chatToken});
            //     console.log(222,chat)
            //     return chat;
            // });
            let newChats = []
            for (let i = 0; i < myChats.length; i++) {
                let uchat = myChats[i];
                const chat = await chatsModel.findOne({
                    chatToken: uchat.chatToken
                });
                newChats.push(chat)
            }
            // console.log(3333,myChats)
            // myChats.sort((m1,m2)=>m2.lastModify - m1.lastModify);
            ctx.body = newChats
        },
        async getFriendList(ctx, next) {
            const {
                token
            } = ctx.header;
            const {
                userId
            } = await usersModel.findOne({
                token
            });
            const {
                friends
            } = await friendsModel.findOne({
                userId
            });
            const result = await usersModel.find({
                userId: {
                    $in: friends
                }
            }, {
                _id: 0,
                password: 0,
                tokenCreate: 0,
                salt: 0,
                token: 0,
                _v: 0
            });
            ctx.body = result;
        }
    },
    post: {
        async createUser(ctx, next) {
            const {
                phone,
                password
            } = ctx.request.body;
            const result = await usersModel.create({
                userId: (Date.now().toString().substring(3) + Math.ceil(Math.random() * 1000)) * 1,
                phone,
                password
            })
            ctx.body = result;
        },
        async createChat(ctx,next) {
            const {
                my,
                friend
            } = ctx.request.body;
            // let {
            //     chatToken
            // } = await chatsModel.findOne({
            //     $where: function () {
            //         const chatUsers = this.chatUsers;
            //         console.log('my',my)
            //         return chatUsers.length === 2 && chatUsers.includes(my.userId, friend.userId);
            //     }
            // })
            const query = chatsModel.find();
            const whereStr = `this.chatUsers.length === 2 && this.chatUsers.includes("${my.userId}")&&this.chatUsers.includes("${friend.userId}")`;
            let result =await query.$where(whereStr);
            let chatInfo = result[0];
            if (!chatInfo) {
                let chatToken = (Date.now().toString().substring(3) + Math.ceil(Math.random() * 1000)) * 1;
                chatInfo = {
                    chatToken,
                    chatUsers: [
                        my.userId,
                        friend.userId
                    ],
                    chatName: `${my.nickName}<->${friend.nickName}`,
                    chatType: "single",
                    userFace: `${my.avatarUrl}<->${friend.avatarUrl}`
                };
                chatsModel.create(chatInfo);
            }
            ctx.body = chatInfo;
        },
        async sendMsg(ctx, next) {
            const {
                msg,
                chatToken
            } = ctx.request.body;
            const {
                token
            } = ctx.request.headers;

            const user = await usersModel.findOne({
                token
            });
            let {
                chatUsers
            } = await chatsModel.findOne({
                chatToken
            });

            const lastModify = Date.now();
            const lastText = msg;
            const lastUserId = user.userId;

            await chatsModel.updateOne({
                chatToken
            }, {
                $set: {
                    lastModify,
                    lastText,
                    lastUserId
                }
            });

            const index = chatUsers.findIndex((chatUser) => chatUser === user.userId);
            chatUsers.splice(index, 1);
            chatUsers.forEach((userToken) => {
                const connection = wsConnects[userToken];
                connection && connection.sendUTF(JSON.stringify({
                    chatToken,
                    data: {
                        msg: lastText,
                        userId: user.userId,
                        sendTime: lastModify
                    }
                }));
            })
            ctx.body = {
                code: 200
            }
        },
    },
    put: {},
    delete: {}
}

module.exports = routes;