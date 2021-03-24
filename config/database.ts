import { DatabaseConfig } from '@Typetron/Framework'
import { MysqlDriver } from '@Typetron/Database/Drivers'

export default new DatabaseConfig({

    driver: new MysqlDriver({host: 'localhost', user: 'root', password: 'root', database: 'typetron_twitter_clone'}),

    entities: './Entities',

    synchronizeSchema: true,

    migrationsDirectory: 'migrations'
})
