
const voteSocket = (io) => {
    
    const users = [];
    let liveVotes=[];
    io.sockets.emit('sendLiveVoteData','hello')
    const voteNsp = io.of('/socket-vote')
    voteNsp.on('connection',(socket) => {
        socket.on('createVote',(data) => {
            socket.broadcast.emit('sendLiveVoteDataClient',data);
            socket.emit('liveVoteDataOwner',{
                success:true,
                data
            })
            liveVotes.push(data)
        })
        socket.on('isLiveVote',() => {
            socket.emit('liveVotesClient',liveVotes);
        });
    })

    voteNsp.on('disconnect',(socket) => {
        console.log('Bir kullanıcı bağlantıyı kesti')
    })

}




const notificationSocket = (io) => {
    const notificationNsp = io.of('/notification');
    notificationNsp.on('connection',(socket) => {
        socket.on('sendNotification',(data) => {
            socket.broadcast.emit('liveNotification',data)
            socket.emit('liveNotificationOwner',data)
        })
    })
}


module.exports = {
    voteSocket,
    notificationSocket
}