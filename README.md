This project is build with React js ( frontend ) and Django ( backend ).

\*\* BACKEND:

1. Enter in the backend folder and create an virtual environment with the command "python -m venv <your env name>".
2. Then activate the environment by running the command "<your env name>\Script\activate"
3. Then install Django by running "pip install django".
4. You can check the installed django version by running "py -m django --version".
5. After installing the django, create a project by running 'django-admin startproject <your project name>'. This will create a folder with the name of your project with the required files.
6. Navigate to your project root dir where manage.py exists and run 'python .\manage.py migrate'. This will apply all the migration required such as admin,auth,sessions etc.
7. Then create a superuser by running 'py .\manage.py createsuperuser' and follow the steps. Store the credentials for future use.
8. After that you can start your server by running "py .\manage.py runserver" command. It will start your server at 8000(default port). You can also specify another port by "py .\manage.py runserver <your port>".If all ok, you can see a default django screen at "http://127.0.0.1:8000/".
9. Create a views.py at the level of urls.py.
10. Configure the views.py as per your requirement.
11. Configure your urls as per your requirement in urls.py.

\*\* To set up CORS in Django please follow the steps: https://pypi.org/project/django-cors-headers/

\*\* How to set up MySQL database with Django:

1. Install MySQL on your system. Note the username and password.
2. Start MYSQL server from command prompt by 'mysql -u <username> -p'
3. Enter the password.
4. If successful, it will start the server.
5. Create a database.
6. Then navigate to the setting.py and enter the following details:
   DATABASES = {
   'default': {
   'ENGINE': 'django.db.backends.mysql',
   'NAME': 'your database name',  
    'USER': 'username',  
    'PASSWORD': 'database password',  
    'HOST': 'localhost',  
    'PORT': '3306',  
    }
7. Then run 'python .\manage.py migrate' and it will create the defaults table as required.
8. The database is successfully migrated with your project now.
