import {openDatabase, enablePromise} from 'react-native-sqlite-storage';

const tableName = 'user';
const dbName = 'user.db';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase(
    {name: dbName, location: 'default'},
    () => {
      console.log('Connection success!');
    },
    error => {
      console.log(error);
    },
  );
};

export const createTable = async db => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
          name TEXT NOT NULL, age TEXT NOT NULL
      );`;

  await db.executeSql(query);
};
export const updateUser = async ({name, age, id}) => {
  const db = await getDBConnection();
  const insertQuery = `UPDATE ${tableName} set name = '${name}', age = ${age} where rowid = '${id}'`;

  await db.executeSql(insertQuery);
};

export const getUsers = async db => {
  try {
    const users = [];

    const results = await db.executeSql(
      `SELECT rowid as id, name, age FROM ${tableName}`,
    );
    results?.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        users.push(result.rows.item(index));
      }
    });
    return users;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get user !!!');
  }
};

export const saveUser = async (db, user) => {
  try {
    const insertQuery = `INSERT INTO ${tableName} (name,age) values ('${user.name}' ,'${user.age}') ;`;
    return db.executeSql(insertQuery);
  } catch (err) {
    console.error(err);
  }
};

export const deleteUser = async (db, id) => {
  const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
  await db.executeSql(deleteQuery);
};

export const deleteTable = async db => {
  const query = `drop table ${tableName}`;

  await db.executeSql(query);
};
