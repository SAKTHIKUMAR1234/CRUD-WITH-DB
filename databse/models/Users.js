const Users = `CREATE TABLE IF NOT EXISTS users
(
    usrid SERIAL,
    fname text NOT NULL,
    lname text,
    email text NOT NULL unique,
    pwd text NOT NULL,
    CONSTRAINT pk_usr PRIMARY KEY (usrid)
)`;

module.exports=Users;