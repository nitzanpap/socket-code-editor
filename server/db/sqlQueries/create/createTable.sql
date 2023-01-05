CREATE TABLE public.code_blocks
(
    id serial NOT NULL,
    title text NOT NULL,
    code text,
    solution text,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.code_blocks
    OWNER to socket_code_editor_db_user;
