const EmploeeTable = `CREATE TABLE IF NOT EXISTS empdetails
    (
        empid integer NOT NULL,
        empname text,
        sal numeric,
        des text,
        city text,
        CONSTRAINT pk_emp PRIMARY KEY (empid)
    )`;


module.exports =  EmploeeTable ;