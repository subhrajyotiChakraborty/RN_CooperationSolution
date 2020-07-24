const Cloudant = require("@cloudant/cloudant");

const cloudant_id = process.env.CLOUDANT_ID || "<cloudant_id>";
const cloudant_apikey = process.env.CLOUDANT_IAM_APIKEY || "<cloudant_apikey>";

// UUID creation
const uuidv4 = require("uuid/v4");
const bcrypt = require("bcrypt");

const saltRounds = 8;

var cloudant = new Cloudant({
  account: cloudant_id,
  plugins: {
    iamauth: {
      iamApiKey: cloudant_apikey,
    },
  },
});

// Cloudant DB reference
let db;
let db_name = "user_db";

/**
 * Connects to the Cloudant DB, creating it if does not already exist
 * @return {Promise} - when resolved, contains the db, ready to go
 */
const dbCloudantConnect = () => {
  return new Promise((resolve, reject) => {
    Cloudant(
      {
        // eslint-disable-line
        account: cloudant_id,
        plugins: {
          iamauth: {
            iamApiKey: cloudant_apikey,
          },
        },
      },
      (err, cloudant) => {
        if (err) {
          console.log(
            "Connect failure: " +
              err.message +
              " for Cloudant ID: " +
              cloudant_id
          );
          reject(err);
        } else {
          cloudant.db
            .list()
            .then((body) => {
              if (!body.includes(db_name)) {
                console.log("DB Does not exist..creating: " + db_name);
                cloudant.db.create(db_name).then(() => {
                  if (err) {
                    console.log(
                      "DB Create failure: " +
                        err.message +
                        " for Cloudant ID: " +
                        cloudant_id
                    );
                    reject(err);
                  }
                });
              }
              let db = cloudant.use(db_name);
              console.log("Connect success! Connected to DB: " + db_name);
              resolve(db);
            })
            .catch((err) => {
              console.log(err);
              reject(err);
            });
        }
      }
    );
  });
};

// Initialize the DB when this module is loaded
(function getDbConnection() {
  console.log("Initializing Cloudant connection...", "getDbConnection() user");
  dbCloudantConnect()
    .then((database) => {
      console.log("Cloudant connection initialized.", "getDbConnection() user");
      db = database;
    })
    .catch((err) => {
      console.log(
        "Error while initializing DB: " + err.message,
        "getDbConnection()"
      );
      throw err;
    });
})();

/**
 * Get user that match the specified email and password.
 *
 * @param {String} email
 * @param {String} password
 *
 * @return {Promise} Promise -
 *  resolve(): user that contain the email and password, or an empty array if nothing
 *          could be located that matches.
 *  reject(): the err object from the underlying data store
 */
function login(email, password) {
  return new Promise((resolve, reject) => {
    let selector = {};
    if (email) {
      selector["email"] = email;
    }

    db.find(
      {
        selector: selector,
      },
      (err, documents) => {
        if (err) {
          reject(err);
        } else {
          if (
            documents &&
            documents.docs &&
            documents.docs[0] &&
            documents.docs[0].password
          ) {
            bcrypt.compare(password, documents.docs[0].password, function (
              bcryptErr,
              result
            ) {
              if (result) {
                resolve({
                  data: JSON.stringify(documents.docs),
                  statusCode: 200,
                });
              } else {
                console.log(bcryptErr);
                reject("Please use correct credentials");
              }
            });
          } else {
            reject("Please use correct credentials");
          }
        }
      }
    );
  });
}

/**
 * Create a user with the specified attributes
 *
 * @param {String} role - the role of the user
 * @param {String} name - the name of the user
 * @param {String} address - the address of the user
 * @param {String} phone - the phone number of the user
 * @param {String} location - the GPS location of the user
 * @param {String} email - the contact info
 * @param {String} mobileID - the ID of the user
 * @param {String} password - the password of the user
 *
 * @return {Promise} - promise that will be resolved (or rejected)
 * when the call to the DB completes
 */
function register(
  role,
  name,
  address,
  phone,
  location,
  email,
  mobileID,
  password
) {
  return new Promise((resolve, reject) => {
    let itemId = uuidv4();
    let whenCreated = Date.now();
    let item = {
      _id: itemId,
      id: itemId,
      role,
      name,
      address,
      phone,
      location,
      email,
      mobileID,
      whenCreated: whenCreated,
    };
    bcrypt.hash(password, saltRounds, function (bcryptErr, hash) {
      if (bcryptErr) {
        reject(bcryptErr);
      } else {
        item["password"] = hash;
        db.insert(item, (err, result) => {
          if (err) {
            console.log("Error occurred: " + err.message, "create()");
            reject(err);
          } else {
            resolve({
              data: { createdId: result.id, createdRevId: result.rev },
              statusCode: 201,
            });
          }
        });
      }
    });
  });
}

function userDbInfo() {
  return cloudant.db.get(db_name).then((res) => {
    console.log(res);
    return res;
  });
}

module.exports = {
  register,
  login,
  userDbInfo,
};
