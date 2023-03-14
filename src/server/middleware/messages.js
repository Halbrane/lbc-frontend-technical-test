const path = require('path')
const db = require(`${path.dirname(__filename)}/../db.json`)

// Need this middleware to catch some requests
// and return messages only if user is Sender or Recipient.

module.exports = (req, res, next) => {
    if (/messages/.test(req.url) && req.method === 'GET') {
        const conversationId = req.query?.conversationId
        const conversation = db?.conversations?.find(conv => conv.id == conversationId)

        const result = db?.messages?.filter(
            msg => msg.conversationId == conversationId &&
            (msg.authorId == conversation.senderId || msg.authorId == conversation.recipientId)
        )
        res.status(200).json(result)
        return
    }
    next()
}
