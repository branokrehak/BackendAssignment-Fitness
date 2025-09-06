import http from 'http'
import express from 'express'

import { sequelize } from './db'
import ProgramRouter from './routes/programs'
import ExerciseRouter from './routes/exercises'
import RegisterRouter from './routes/register'
import LoginRouter from './routes/login'

import AdminExerciseCreateRouter from './routes/admin/exercises/create'
import AdminExerciseDeleteRouter from './routes/admin/exercises/delete'
import AdminExerciseUpdateRouter from './routes/admin/exercises/update'
import AdminUserDetailRouter from './routes/admin/user/detail'
import AdminUserListRouter from './routes/admin/user/list'
import AdminUserUpdateRouter from './routes/admin/user/update'

import ExerciseRemoveRouter from './routes/user/exercise/remove'
import ExerciseTrackRouter from './routes/user/exercise/track'
import ProfileRouter from './routes/user/profile'
import UsersRouter from './routes/user/users'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/programs', ProgramRouter())
app.use('/exercises', ExerciseRouter())
app.use('/register', RegisterRouter())
app.use('/login', LoginRouter())

app.use('/admin/exercise/create', AdminExerciseCreateRouter())
app.use('/admin/exercise/delete', AdminExerciseDeleteRouter())
app.use('/admin/exercise/update', AdminExerciseUpdateRouter())
app.use('/admin/user/detail', AdminUserDetailRouter())
app.use('/admin/user/list', AdminUserListRouter())
app.use('/admin/user/update', AdminUserUpdateRouter())

app.use('/user/exercise/remove', ExerciseRemoveRouter())
app.use('/user/exercise/track', ExerciseTrackRouter())
app.use('/user/profile', ProfileRouter())
app.use('/user/users', UsersRouter())

const httpServer = http.createServer(app)

try {
    sequelize.sync()
} catch (error) {
    console.log('Sequelize sync error')
}

httpServer.listen(8000).on('listening', () => console.log(`Server started at port ${8000}`))

export default httpServer
