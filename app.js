import express from 'express'
import userRouter  from './routes/User.js'
import statsRouter  from './routes/Stats.js'

const app = express()

app.use(express.json())
app.use('/usuarios', userRouter)
app.use('/stats', statsRouter)


app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' })
})

const PORT = process.env.PORT ?? 1235

app.listen(PORT, () => {
  console.log(` Servidor escuchando en http://localhost:${PORT}`)
})
