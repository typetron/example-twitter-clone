import { Controller, Post } from '@Typetron/Router'
import { RegisterForm } from 'App/Forms/RegisterForm'
import { User } from 'App/Entities/User'
import { User as UserModel } from 'App/Models/User'
import { LoginForm } from 'App/Forms/LoginForm'
import { Inject } from '@Typetron/Container'
import { Auth } from '@Typetron/Framework/Auth'
import { AuthConfig } from '@Typetron/Framework'

@Controller()
export class AuthController {

    @Inject()
    auth: Auth

    @Inject()
    authConfig: AuthConfig

    @Post('register')
    async register(form: RegisterForm) {
        let user = await User.where('email', form.email).orWhere('username', form.username).first()
        if (user) {
            throw new Error('User already exists')
        }

        if (form.password !== form.passwordConfirmation) {
            throw new Error('Passwords don\'t match')
        }

        return UserModel.from(this.auth.register(form.email, form.password))
    }

    @Post('login')
    async login(form: LoginForm) {
        const token = await this.auth.login(form.username, form.password)
        const user = await this.auth.user<User>()
        await user.loadCount('followers', 'following')
        return {
            token: token,
            user: UserModel.from(user),
        }
    }
}
