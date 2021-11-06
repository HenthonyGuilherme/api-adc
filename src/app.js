const express = require('express')
const app = express()

require('dotenv').config()

const  cors = require('cors')

const PORT = process.env.PORT

const Post = require('./models/Posts')

app.use(express.json())

app.use(cors())

app.get('/hello_world', (req, res) => {
    res.send('aprendendo api')
})

app.post('/create', (req, res) => {
    const title = req.body.title

    res.send(`Titulo: ${title}`)
})

// Criar um poste (objeto)
app.post('/create_post', async (req, res) => {

    try {
        const { title, content } = req.body
    
        const post = await Post.create({ title, content })

        res.send(post)
    }catch(err){
        res.status(400).send(err)
    }   
})

// Lista os postes enviados 
app.get('/list_posts', async (req, res) => {
    try {
        const posts = await Post.find()

        res.send({ posts })
    }catch(err){
        res.status(400).send(err)
    } 
})

// Pega so um parametro pela URL
app.get('/show_post/:post_id', async (req, res) =>{
    try {

        const postId = req.params.post_id

        const post = await Post.findById(postId)
        // filtro no objeto | find({ _id: postId }) | podemos coloca mas cosnt

        res.send({ post })
    }catch(err) {
        res.status(400).send(err)
    }
})

// Atualizar o objeto | put : atualiza tudo | patch: atualiza parcialmente
app.patch('/update_post/:post_id', async (req, res) =>{
    try{
        const postId = req.params.post_id

        const { title, content } = req.body

        const post = await Post.findByIdAndUpdate(postId, { title, content }, { new: true })

        res.send({ post })

    } catch(err){
        res.status(400).send(err)
    }
})

// Deletar postaguem (objeto)
app.delete('/deleTe_post/:post_id', async (req, res) => {
    try{
        const postId = req.params.post_id

        await Post.findByIdAndDelete(postId)

        res.send({ msg: 'Deletado com sucesso' })
    } catch(err){
        res.status(400).send(err)
    }
})

app.listen(PORT, () => {
    console.log('Sever running on port: ' + PORT)
})