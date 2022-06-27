const { Pool } = require("pg");
const config = require("../config.js");
const pool = new Pool(config.db);

pool.connect((error) => {
    if(error) {
        console.log(config.db)
        console.log(error)
    } else {
        console.log("Database connected");
    }
})

const list = async(table, selects, inner, limit, offset) => {
    let selectQuery = selects[0];
    for (let i = 1; i < (selects.length); i ++) {
        selectQuery = selectQuery + ` ,${selects[i]}`;
    }

    const innerColumns = Object.keys(inner);
    const innerValues = Object.values(inner);

    let addInner = "";
    for(let i = 0; i < innerColumns.length; i ++){
        addInner = addInner + ` INNER JOIN ${innerColumns[i]} ON ${table}.${innerValues[i]} = ${innerColumns[i]}.${innerValues[i]}`
    }

    const query = `SELECT ${selectQuery} FROM ${table} ${addInner} LIMIT ${limit} OFFSET ${offset}`

    const result = await pool.query(query);
    return result.rows;
}

const getOne = async(table, id) => {
    const column = Object.keys(id)[0];
    const value = Object.values(id)[0];
    const result = await pool.query(`SELECT * FROM ${table} WHERE ${column}='${value}'`);
    return result.rows;
}

const count = async(table) => {
    const result = await pool.query(`SELECT COUNT(*) FROM ${table}`);
    return result.rows[0].count;
}

const add = async(table, data) => {
    const columns = Object.keys(data);
    const values = Object.values(data);
    for (let i = 0; i < values.length; i++) {
        values[i] = "'" + values[i] + "'";
    }
    await pool.query(`INSERT INTO ${table} (${columns}) VALUES (${values})`);
}

const update = async(table, id, data) => {
    const columnID = Object.keys(id)[0];
    const valueID = Object.values(id)[0];
    let newData = "";
    for (let i = 0; i < Object.keys(data).length; i++) {
        newData = newData + Object.keys(data)[i] + "=" + "'" + Object.values(data)[i] + "'";
        if (i < (Object.keys(data)).length - 1) {
            newData = newData + ", ";
        }
    }
    const query = `UPDATE ${table} SET ${newData} WHERE ${columnID}='${valueID}'`
    await pool.query(query)
}

const remove = async(table, id) => {
    const column = Object.keys(id)[0];
    const value = Object.values(id)[0];
    await pool.query(`DELETE FROM ${table} WHERE ${column}='${value}'`)
}

const getInnerJoin = async(table, id, inner) => {

    const innerColumns = Object.keys(inner);
    const innerValues = Object.values(inner);

    let addInner = "";
    for(let i = 0; i < innerColumns.length; i ++){
        addInner = addInner + ` FULL JOIN ${innerColumns[i]} ON ${table}.${innerValues[i]} = ${innerColumns[i]}.${innerValues[i]}`
    }

    const idColumn = Object.keys(id)[0];
    const idValue = Object.values(id)[0];
    const query = `SELECT * FROM ${table}` + addInner + ` WHERE ${idColumn}='${idValue}' `;

    const result = await pool.query(query);
    return result.rows;
}

module.exports = {
    list,
    getOne,
    update,
    count,
    add,
    remove,
    getInnerJoin
}