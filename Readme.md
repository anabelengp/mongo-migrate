MongoDB migrate
===============
This project aims to be an agnostic migration system for mongodb. Sometimes when you add attributes, you need to give a value for existing documents. Doing this frequently, this tool can help, since it has a straightforward syntax and simplicity.

Dependencies
------------
MongoDB client - the bin file that comes with mongodb. I will soon create an installation script to make things easier. For now you need to download it from mongodb website. - <http://www.mongodb.org/downloads>

Instalation
-----------
    $ git clone git://github.com/emerleite/mongo-migrate.git
    $ cd mongo-migrate
    $ cp config-sample.cfg config.cfg
    
Edit *config.cfg* with your database information

### Basic information
By convention, mongo migrate uses the directory db/migrate when generating and running migrations. You can change it, by editing the MIGRATION_DIR configuration at config.cfg. See config.sample.cfg for details.

### Configuration
MongoDB migrate uses a configuration file called config.cfg. It has the following options:

*  *MONGO_HOST*      - The database host. Default is localhost
*  *MONGO_DATABASE*  - Required. Do not have default value
*  *MIGRATION_DIR*   - Where to find migrations. Default is ./db/migrate/
*  *MONGO_USR*       - Username. Default is empty
*  *MONGO_PWD*       - Password. Default is empty
*  *PROJECT*         - Set a project name to allow executing mongo-migrate for different projects with different versions using the same database.

Note: When you use MONGO_USR and not MONGO_PWD you'll be prompted for password.

Usage
-----
Mongo migrate has two modes. `generate` and `run`. The syntax is pretty straightforward as explained above:

### Generate
Mongo migrate generates migration in the following format: 

YYYMMDDhhmmssmm_name.js. Ex: 20111209002426_add_person.js

    $ ./mongo_migrate -gf [migration_name]

This will generate the following file:

```js
var migration = {
  up: function() {
  
  },
  down: function() {

  }
};

migration[target].call();
```

Put the code for the changes on up and the code for rollback on down.

### Running
Mongo migrate has 2 modes of running. Up and Down. The first make things happen and the second is a rollback. For these 2 modes, we call run one specific migration or all migrations. Mongo migrate controls the current migration, to enable run only the last migrations or just run all.

### Options
-g   generate
-r   run
-t   target (up|down)
-f   file_name
-c   configuration file

### One migration
    $ ./mongo_migrate -rt up   -f [file_name]
    $ ./mongo_migrate -rt down -f [file_name]

The name can be the full name or partial name. Ex: 20111209002426_add_person.js or only add_person. Mongo migrate will first look for a full name and after will fallback to find the file based on the partial name.

### All migrations
    $ ./mongo_migrate -rt up
    $ ./mongo_migrate -rt down

### Configuration file
If you want to pass the configuration file path and not use the convention (i.e ./config.cfg), just use the -c option parameter:

    $ ./mongo_migrate -rt up -f migration_file -c /path/to/config/file
    $ ./mongo_migrate -rt down -c /path/to/config/file
    $ ./mongo_migrate -gf migration_name -c /path/to/config/file

When running all migrations, mongo migrate will run only the new migrations, because it controls which is the last one.

To-Do
-----
* see (<https://github.com/emerleite/mongo-migrate/issues>)

Author
------

* Emerson Macedo (<http://codificando.com/>)

License:
--------

(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
