create table if not exists usuarios (
    id serial primary key,
    nome text not null,
    email text not null unique,
    nome_loja text not null unique,
    senha text not null
);

create table if not exists carros (
    id serial primary key,
    nome text not null,
    marca text not null,
    modelo text not null,
    preco integer not null,
    foto text,
    usuario_id integer not null references usuarios(id)
);