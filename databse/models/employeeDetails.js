const EmploeeTable = `CREATE TABLE IF NOT EXISTS empdetails
    (
        empid SERIAL,
        empname text,
        sal numeric,
        des text,
        city text,
        CONSTRAINT pk_emp PRIMARY KEY (empid)
    )`;


module.exports =  EmploeeTable ;