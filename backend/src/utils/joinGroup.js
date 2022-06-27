const joinGroup = (data) => {

  let columns = Object.keys(data);
  const newColumns = columns.map(prop => {
    const indice = prop.indexOf("_");
    return prop.substring(0, indice)
  })

  tables = new Set(newColumns);
  tables = [...tables];

  let result = {};
  for (let i=0; i < tables.length; i++) {
    const component = join(tables[i]+"_", data);
    result[tables[i]] = component;
  }

  return result;
};

const join = (table, rows) => {

  const columns = Object.keys(rows);
  const newColumns = columns.filter((column) => {
    if (column.includes(table)) {
      return column;
    }
  });

  let order = {};
  for (let i = 0; i < newColumns.length; i++) {
    order[newColumns[i]] = rows[newColumns[i]];
  }

  return order;
};

module.exports = joinGroup;
