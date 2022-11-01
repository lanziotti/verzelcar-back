# API RESTful para um catálogo web de venda de veículos
Projeto feito para processo seletivo.

## Tecnologias
- NodeJS
  - Express
  - Nodemon
  - PG
  - Dotenv
  - Cors
  - Knex
  - Bcrypt
  - Jsonwebtoken
  - Joi
  - Multer
  - aws-sdk
- JavaScript
- PostgreSQL
  
## Features
- Cadastrar Usuário
- Fazer Login 
- Autentificação do Usuário Logado
- Validações do token
- Listar carros do usuário logado 
- Detalhar um carro do usuário logado 
- Cadastrar um carro do usuário logado 
- Editar um carro do usuário logado 
- Editar a foto de um carro do usuário logado
- Remover um carro do usuário logado 
- Remover a foto de um carro do usuário logado

## Endpoints
#### `POST` `/usuarios`
Essa é a rota que será utilizada para cadastrar um novo usuario no sistema.

Input:
```javascript
{
    "nome": "José",
    "email": "jose@email.com",
    "nome_loja": "Loja do José",
    "senha": "123456"
}
```

Output:
```javascript
{
    mensagem: "Usuário cadastrado com sucesso!"
}
```

Output inválido:
```javascript
{
    "mensagem": "Esse e-mail já existe cadastrado."
}
```

#### `POST` `/login`
Essa é a rota que permite o usuario cadastrado realizar o login no sistema.

Input:
```javascript
{
    "email": "jose@email.com",
    "senha": "123456"
}
```

Output:
```javascript
{
    "usuario": {
        "id": 1,
        "nome": "José",
        "email": "jose@email.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMjQ5NjIxLCJleHAiOjE2MjMyNzg0MjF9.KLR9t7m_JQJfpuRv9_8H2-XJ92TSjKhGPxJXVfX6wBI"
}
```

Output inválido:
```javascript
{
    "mensagem": "Usuário e/ou senha inválido(s)."
}
```


## **OBS**: Todas os endpoints a seguir, a partir desse ponto, exigem o token de autenticação do usuário logado, recebendo no header com o formato Bearer Token. Portanto, em cada funcionalidade há a validação do token informado.



#### `GET` `/carros`
Essa é a rota que será chamada quando o usuario logado quiser listar todos os carros cadastrados.

Input:
```javascript
// Sem conteúdo no corpo (body) da requisição
```

Output (exemplos):
```javascript
[
	{
		"id": 4,
		"nome": "Fusca",
		"marca": "Volkswagen",
		"modelo": "1.3",
		"preco": 500000,
		"foto": "https://verzelcar.s3.us-west-004.backblazeb2.com/carros/4/fusca.jpg",
		"usuario_id": 1
	},
	{
		"id": 5,
		"nome": "Fusca",
		"marca": "Volkswagen",
		"modelo": "1.3",
		"preco": 500000,
		"foto": "https://verzelcar.s3.us-west-004.backblazeb2.com/carros/5/fusca.jpg",
		"usuario_id": 1
	},
	{
		"id": 6,
		"nome": "Fusca",
		"marca": "Volkswagen",
		"modelo": "1.3",
		"preco": 500000,
		"foto": "https://verzelcar.s3.us-west-004.backblazeb2.com/carros/6/fusca.jpg",
		"usuario_id": 1
	},
	{
		"id": 3,
		"nome": "Fusca",
		"marca": "Volkswagen",
		"modelo": "1.3",
		"preco": 500000,
		"foto": "https://verzelcar.s3.us-west-004.backblazeb2.com/carros/3/fuca-azul.jpg",
		"usuario_id": 1
	}
]
```

```javascript
[]
```


#### `GET` `/carros/:id`
Essa é a rota que será chamada quando o usuario logado quiser obter um de seus carros cadastrados.

Input:
```javascript
// Sem conteúdo no corpo (body) da requisição
```

Output:
```javascript
{
	"id": 3,
	"nome": "Fusca",
	"marca": "Volkswagen",
	"modelo": "1.3",
	"preco": 500000,
	"foto": "https://verzelcar.s3.us-west-004.backblazeb2.com/carros/3/fuca-azul.jpg",
	"usuario_id": 1
}
```

Output inválido:
```javascript
{
    "mensagem": "Carro não encontrado."
}
```

#### `POST` `/carros`
Essa é a rota que será utilizada para cadastrar um carro associado ao usuário logado.

Input (Multipart Form):
```javascript
{
	"nome": "Fusca",
	"marca": "Volkswagen",
	"modelo": "1.3",
	"preco": 500000,
	"foto": "fusca.jpg",
	"usuario_id": 2
}
```

Output:
```javascript
{
	"id": 7,
	"nome": "Fusca",
	"marca": "Volkswagen",
	"modelo": "1.3",
	"preco": 500000,
	"foto": "https://verzelcar.s3.us-west-004.backblazeb2.com/carros/7/fusca.jpg",
	"usuario_id": 2
}
```

Output inválido (exemplos):
```javascript
{
    "mensagem": "Por favor, preencha todos os campos."
}
```

```javascript
{
    "mensagem": "O carro não foi cadastrado."
}
```

#### `PUT` `/carros/:id`
Essa é a rota que será chamada quando o usuario logado quiser atualizar um de seus carros cadastrados. 

Input:
```javascript
{
	"nome": "Fusca Azul",
	"marca": "Volkswagen",
	"modelo": "1.6",
	"preco": 650000
}
```

Output:
```javascript
{
	"mensagem": "Carro atualizado com sucesso."
}
```

Output inválido (exemplos):
```javascript
{
    "mensagem": "Por favor, preencha todos os campos."
}
```

```javascript
{
    "mensagem": "Carro não encontrado."
}
```

#### `PUT` `/carros/:id/foto`
Essa é a rota que será chamada quando o usuario logado quiser atualizar a foto de um de seus carros cadastrados. 

Input (Multipart Form):
```javascript
{
	"foto": "fusca.jpg"
}
```

Output:
```javascript
// Sem conteúdo no corpo (body) da requisição
```

Output inválido (exemplos):
```javascript
{
    "mensagem": "Carro não encontrado."
}
```
```javascript
{
    "mensagem": "O carro não foi atualizado."
}
```

#### `DELETE` `/carros/:id`
Essa é a rota que será chamada quando o usuario logado quiser excluir um de seus carros cadastrados.

Input:
```javascript
// Sem conteúdo no corpo (body) da requisição
```

Output:
```javascript
{
	"mensagem": "Carro excluído com sucesso."
}
```

Output inválido (exemplos):
```javascript
{
    "mensagem": "Carro não encontrado."
}
```
```javascript
{
    "mensagem": "O carro não foi excluído."
}
```

#### `DELETE` `/carros/:id/foto`
Essa é a rota que será chamada quando o usuario logado quiser excluir a foto de um de seus carros cadastrados. 

Input:
```javascript
// Sem conteúdo no corpo (body) da requisição
```

Output:
```javascript
// Sem conteúdo no corpo (body) da requisição
```

Output inválido (exemplos):
```javascript
{
    "mensagem": "Carro não encontrado."
}
```
```javascript
{
    "mensagem": "O carro não foi excluído."
}
```


## Links
- Deploy Heroku: 
- Repositório: https://github.com/lanziotti/verzelcar/tree/master/Backend

## Contatos
- Email: rodrigolanziotti@yahoo.com.br
- LinkedIn: https://www.linkedin.com/in/rodrigo-lanziotti-16a64966/

## Versão
1.0.0

## Autor
**Rodrigo Lanziotti de Freitas**

#

Obrigado por visitar meu repositório...😎

...fique a vontade para entrar em contato quando quiser! 😉
