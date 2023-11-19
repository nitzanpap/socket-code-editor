const createCodeBlockQueryStr = `INSERT INTO public.code_blocks (id, title, code, solution)
    VALUES (DEFAULT, $1, $2, $3)
    RETURNING title, code;
    `;

export default createCodeBlockQueryStr;
