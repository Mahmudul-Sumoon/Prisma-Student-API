# PRISMA WITH MONGODB (USER MANUAL)

Prisma currently supports

- MySQL
- MSSQL
- SQLITE
- POSTGRES
- MONGODB

## Steps (INSTALLATION)

<hr>
- Install **Prisma** and **Prisma - Insider** extension in VS Code.
- Install Prima in globally

```js
npm i -g -D prisma
```

- Install Prisma/Client

```js
npm i - @prisma/client
```

- Install dotenv

```js
npm i dotenv
```

Then create a **.env** file inside root.

- Install fsevents as optional dependencies for overcoming with chokidar error.

```js
npm i - fsevents@latest -f --save-optional
```

## (PRISMA INSIDE CODE)

<hr>
- Initial Prisma

```js
npx prisma init
```

That should create a file named **schema.prisma** in **prisma** folder.

Then you can navigate to this file, and create your model as your wish!

> # For MongoDB

```js
generator client {
  provider = "prisma-client-js"
  previewFeatures = ["mongoDb"]
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}
```

you just add the name of your database inside provider.

> Preview feature is only for MongoDB

_Example for sqlite & rest of the database_

```js
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"//define your DB name
  url      = env("DATABASE_URL")
}
```

Then define your model

> # For SQLITE and OTHERS

```js
model Student{
  id Int @id @default(autoincrement())
  roll  Int @unique
  reg Int @unique
  name  String
  teacher Teacher @relation(fields: [teacherId],references: [id])
  teacherId Int
}
model Teacher{
  id  Int @id @default(autoincrement())
  name String
  students Student[]
}
```

The model defines, the table.

One table for Student and One for Teacher.
Each student may hold a teacher as well as  
a teacher may hold multiple students.

_You can use many to many relationship also_

Then run the command to generate the migrations.

```js
npx prisma generate dev
```

That should create your SQLITE format code inside prisma/migrations and also in prisma/dev.db and the database dev.db is generated from DATABASE_URL which is from .env file

```
DATABASE_URL = "file:./dev.db"
```

You can also define cloud url inside DATABASE_URL, just replace the "file:./dev.db" with the cloud url.

> # For MONGODB
>
> Add MongoDB cloud url to the .env file's DATABASE_URL.

As, mongodb has some lackings, which is defined here.
https://www.prisma.io/docs/concepts/database-connectors/mongodb

MongoDB can't generate id, so we have to do some extra work.

We have to write id as like

```js
  id String @id @default(dbgenerated()) @map("_id") @db.ObjectId
```

The whole schema would be look like this,

```js
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema


generator client {
  provider = "prisma-client-js"
  previewFeatures = ["mongoDb"]
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}
model Student{
  id String @id @default(dbgenerated()) @map("_id") @db.ObjectId
  roll  Int
  reg Int
  @@unique([roll], map: "roll should be Unique")
  @@unique([reg], map: "reg should be Unique")
  name  String
  teacher Teacher @relation(fields: [teacheId],references: [id])
  teacheId String
}
model Teacher{
  id String @id @default(dbgenerated()) @map("_id") @db.ObjectId
  name String
  @@unique([name],map: "Name should be Unique")
  students Student[]
}

```

**EXTRA STEP : **
Then run

```
prisma generate
```

and

```
prisma db push
```

# Deploy

Now deploy the whole code to the [Heroku](https://www.heroku.com/), don't forget to add .env file's DATABASE_URL in heroku.
