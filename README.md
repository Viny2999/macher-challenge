# Macher Challenge

## Instructions to Run Locally
* Use Docker Compose to create the mysql database:
  ```
  docker-compose up
  ``` 
* Install the application:
  ```
  npm install
  npm run setup // To run migrations and seeders 
  npm start
  ``` 

## Tests
To start jest unit tests run:
```
npm test
```

## Using the application
We have two users registered in the application:
```json
{
  "username": "test",
  "password": "test"
}
```

```json
{
  "username": "admin",
  "password": "admin"
}
```

Do the login:
```shell
curl --location 'http://localhost:3000/v1/auth/login' \
--header 'Content-Type: application/json' \
--data '{
    "username": "test",
    "password": "test"
}'
```

The login will return the token to use in another routes:
```json
{
    "token": "<JWT TOKEN>"
}
```

About the User CRUD:
* Creation
  ```shell
  curl --location 'http://localhost:3000/v1/user' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer <token>' \
  --data '{
    "cpf": "123.456.789-02",
    "name": "João da Silva",
    "birth_date": "1990-01-01",
    "street": "Rua Principal",
    "house_number": "123",
    "complement": "Apartamento 4",
    "neighborhood": "Centro",
    "city": "Cidade A",
    "state": "CA",
    "zip_code": "12345-678"
  }'
  ```
* Find All
  ```shell
  curl --location 'http://localhost:3000/v1/user' \
  --header 'Authorization: Bearer <token>'
  ```
* Find One
  ```shell
  curl --location 'http://localhost:3000/v1/user/<USER_ID>' \
  --header 'Authorization: Bearer <token>'
  ```
* Update
  ```shell
  curl --location --request PUT 'http://localhost:3000/v1/user/<USER_ID>' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer <token>' \
  --data '{
    "name": "Other Name",
    "birth_date": "1998-01-01"
  }'
  ```
* Logical Delete
  ```shell
  curl --location --request DELETE 'http://localhost:3000/v1/user/<USER_ID>' \
  --header 'Authorization: Bearer <token>'
  ```