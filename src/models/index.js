import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import databaseConfig from '../config/config';

const basename = path.basename(__filename);
let configEnv;
let sequelize;
const db = {};

if (process.env.NODE_ENV === 'production') {
  configEnv = databaseConfig.production;
  sequelize = new Sequelize(process.env[configEnv.use_env_variable]);
} else {
  configEnv = process.env.NODE_ENV === 'test' ? databaseConfig.test
    : databaseConfig.development;
  sequelize = new Sequelize(
    configEnv.database, configEnv.username, configEnv.password, configEnv
  );
}

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0)
    && (file !== basename)
    && (file.slice(-3) === '.js'))
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
