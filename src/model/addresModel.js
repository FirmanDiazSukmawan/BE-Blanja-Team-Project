const db = require("../config/db");

const getAddresM = (data) => {
  let { searchBy, search, sortBy, sort, limit, offset } = data;
  return db.query(`SELECT *
  FROM addres WHERE addres.${searchBy} ILIKE '%${search}%' ORDER BY addres.${sortBy} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const getAddresId = (addres_id) => {
  return db.query(`SELECT * FROM addres WHERE addres.addres_id =${addres_id}`);
};

const getAddresByUsersId = (users_id) => {
  return db.query(`SELECT * FROM addres WHERE addres.users_id =${users_id}`);
};

const getAddresUsersIdByAddresId = (users_id, limit) => {
  return db.query(
    `SELECT * FROM addres  WHERE addres.users_id =${users_id} LIMIT ${limit}`
  );
};

const createAddresM = (data) => {
  const {
    home_addres,
    recipients_name,
    phone,
    addres,
    postal_code,
    city,
    users_id,
  } = data;
  return db.query(
    `INSERT INTO addres (home_addres,recipients_name,phone,addres,postal_code,city,users_id) VALUES ('${home_addres}','${recipients_name}','${phone}','${addres}',${postal_code},'${city}',${users_id})`
  );
};

const updateAddresM = (data, addres_id) => {
  const { home_addres, recipients_name, phone, addres, postal_code, city } =
    data;
  return db.query(
    `UPDATE addres SET home_addres='${home_addres}',recipients_name='${recipients_name}',phone='${phone}',addres='${addres}',postal_code='${postal_code}',city='${city}' WHERE addres.addres_id = ${addres_id}`
  );
};

const deleteAddresM = (addres_id) => {
  return db.query(`DELETE FROM addres WHERE addres.addres_id = ${addres_id}`);
};

module.exports = {
  getAddresM,
  getAddresId,
  getAddresByUsersId,
  createAddresM,
  updateAddresM,
  deleteAddresM,
  getAddresUsersIdByAddresId,
};
