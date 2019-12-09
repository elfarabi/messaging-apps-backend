import Sequelize from 'sequelize';

const Op = Sequelize.Op;
const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col,
  $or: Op.or,
  $and: Op.and,
  $order: Op.order,
  $limit: Op.limit,
};

export const sequelize = new Sequelize('new_database', 'postgres', process.env.PSQL_PASSWORD, {
  host: process.env.PSQL_HOST,
  dialect: 'postgres',
  operatorsAliases,
});

sequelize.authenticate().then(() => {
  sequelize.sync();
  console.log('Connection has been established successfully');
})
.catch(err => {
  console.error('Unable to connect to the database', err);
});
