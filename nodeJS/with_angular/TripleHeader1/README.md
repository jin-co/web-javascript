# Introduction

Conestoga College ACSIT needs a way to track and quickly match the client IT capstone project proposals to student teams. <br />
The IT Capstone Project Approval (ITCPA) app will help facilitate the approval of student capstone projects proposed by clients. <br />
The application aims to resolve any inefficiencies and streamline the end-to-end capstone project approval process

# Lastest release

Jan 2022 Created
April 2022 first deployment

# Build with

Node.js <br />
Nodemon <br />
Express.js <br />
Angular <br />
Bootstrap <br />
Mocha + Chai (Testing) <br />
Istanbul (Testing) <br />
MySQL <br />
Azure App Service <br />

# Getting Started

1. Installation process - how to run the program

   1. Clone the repo
   2. Open visual studio code and open terminal
   3. cd backend -> npm i
   4. cd frontend -> npm i
   5. cd backend -> nodemon index.js
   6. Run in Backend server only with dist file: npm run dev
   7. cd frontend -> ng serve -o

2. API references
   index.js

3. DB creation in local MySQL
   1. In this project file:folder backend, see db_schema folder and find the db scripts
   2. Run the script in MySQL
   3. Change the db connection part in index.js
      const db = mysql.createPool({
      host:'localhost',
      user:'root',
      password:'your password',
      database:'db name in the script',
      port:3306)}
   4. Save

# For deployment

1. In index.js, use the code for using dist file <br />
   app.use(express.static(process.cwd()+"/frontend/")); <br />
   app.get('/', (req,res) => {
   res.sendFile(process.cwd()+"/frontend/index.html")
   });
2. In proxy.conf.json file in frontend folder, add below <br />  
   "/api": {
   "target": "http://localhost:3000",
   "secure": false
   }
   }
3. In frontend-> app-> apiservice.service.ts <br />
   change rootURL = '/api';
4. In frontend-> npm run build <br />
   copy the dist folder to backend folder

# For development

1. In index.js, do not use the dist file (comment the lines above)
2. Delete content in proxy.conf.json
3. Change frontend-> app-> apiservice.service.ts -> change rootURL = 'http://localhost:3000/api';
4. cd backend -> nodemon index.js
5. cd frontend -> ng serve -o

# Test

1. open terminal
2. cd backend
3. npm install mocha --save-dev
4. npm install chai --save-dev
5. npm install chai-http --save-dev
6. npm test

# Contribute

Contributions are what make the open source community such an amazing place to learn, inspire, and create.
Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request.

1. Fork the Project
2. Create your Feature Branch (git checkout -b new-branch)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin new-branch)
5. Open a Pull Request

# Contact

Yumi Lee <br />
Jeonghwan Ju <br />
Kwangjin Baek
