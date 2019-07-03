// Import MySQL connection.
const connection = require("../config/connection.js");

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  const arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (let key in ob) {
    let value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// Object for all our SQL statement functions.
const orm = {
  selectAll: function (tableName, cb) {
    const queryString = "SELECT * FROM " + tableName + ";";
    connection.query(queryString, (err, result) => {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  insertOne: function (tableName, col, val, cb) {
    connection.query("INSERT INTO ?? (??) VALUES (?)",
      [ tableName, col, val ],
      (err, result) => {
        if (err) {
          throw err;
        }

        cb(result);
      });
  },

  updateOne: function (tableName, objColVals, condition, cb) {

    let queryString = "UPDATE " + tableName;
    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, (err, result) => {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },


};

// Export the orm object for the model (cat.js).
module.exports = orm;
