const  Chat = require('../../data/chat')

const chat1 = new Chat()

chat1.add({name: "mung1", chat: "test1"})
chat1.add({name: "mung2", chat: "test2"})
chat1.add({name: "mung3", chat: "test3"})
chat1.add({name: "mung4", chat: "test4"})

console.log(chat1.msgs)