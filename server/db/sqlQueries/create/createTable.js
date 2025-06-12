const createTableQueryStr = `CREATE TABLE public.code_blocks
    (
        id serial NOT NULL,
        title text NOT NULL,
        code text,
        solution text,
        PRIMARY KEY (id)
    );`;

export default createTableQueryStr;
