const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const path = require('path');

////////////////////////////////////////////////////////////
// file upload
const multer  = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    }
})
  
const upload = multer({ storage });

// const upload = multer({ dest: 'uploads' })
// app.use('/uploads', express.static('uploads'))
// file upload
////////////////////////////////////////////////////////////

app.use(cors());
app.use(bodyparser.json());

/////Important: this is for deployment, for development (using dist) , should comment this line below
//app.use(express.static(process.cwd()+"/../frontend/dist/frontend/"));
app.use(express.static(process.cwd()+"/frontend/"));

// database connection 
const db = mysql.createPool({

//    //Yumi
//    host:'localhost',
//    user:'root',
//    password:'1234',
//    database:'simpledb',
//    port:3306

   //Jeonghwan
//    host:'localhost',
//    user:'root',
//    password:'root',
//    database:'tripleheader1',
//    port:3306

   //For site4now shared db
host:'mysql5043.site4now.net',
user:'a82319_tripleh',
password:'w22itcpa',
database:'db_a82319_tripleh',
port:3306

//For Azure cloud yumi account
// host:'itcpacapstonedb.mysql.database.azure.com',
// user:'tripleheader@itcpacapstonedb',
// password:'W22itcpa',
// database:'simpledb',
// port:3306 
//// ssl: {ca: fs.readFileSync("./BaltimoreCyberTrustRoot.crt.pem")}  <- currently doesn't work with this line

});


/////Important: this is for deployment (using dist), for development , should comment this line below 
app.get('/', (req,res) => {
    res.sendFile(process.cwd()+"/frontend/index.html")
    //res.sendFile(process.cwd()+"/../frontend/dist/frontend/index.html")
  });


//get all student data -tested
app.get('/api/add-student-team', (req,res)=>{

    let qr = `select * from student`;
    
    db.query(qr, (err,result)=>{
        if(err){
            console.log(err,'errs');
        }
        if(result.length>0){
            res.send({
                message:'all student data',
                data:result
            });
        }
    });
    //console.log('get users');
});

//get all student data per team -tested
app.get('/api/add-student-team-all-student-per-team/:id', (req,res)=>{

    let gID = req.params.id;

    let qr = `select * from student where teamId = '${gID}'`;
    
    db.query(qr, (err,result)=>{
        if(err){
            console.log(err,'errs');
        }
        if(result.length>0){
            res.send({
                message:'all student data per term',
                data:result
            });
        }
    });
    //console.log('get users');
});

//get team data -tested
app.get('/api/add-student-team-teamData/:id', (req,res)=>{

    let gID = req.params.id;

    let searchSameTeamNameQr = `select * from team where teamName = '${gID}' LIMIT 1`;

    db.query(searchSameTeamNameQr, (err,result)=>{

        if(err){
            console.log(err,'errs');
        }
        if(result.length>0){
            res.send({
                message:'selected a team data already exists',
                data:result
            });
        }
        else{
            let qr = `select * from team order by teamId DESC LIMIT 1`;
            db.query(qr, (err,result)=>{
                if(err){
                    console.log(err,'errs');
                }
                if(result.length>0){
                    res.send({
                        message:'Newly generated team data',
                        data:result
                    });
                }
            });

        }
    });
});

//get all school term data -tested
app.get('/api/add-student-team-schoolterm', (req,res)=>{
    let qr = `select * from schoolterm order by schoolTermId desc`;
    db.query(qr, (err,result)=>{
        if(err){
            console.log(err,'errs');
        }
        if(result.length>0){
            res.send({
                message:'all schoolterm data',
                data:result
            });
        }
    });
});

//set current schoolTerm
app.delete('/api/set-current-schoolterm/:id',(req,res)=>{
    let qID = req.params.id;

    // set 'N' all schoolterm first
    let qr = `UPDATE schoolterm SET isCurrentTerm = 'N'`;
    db.query(qr, (err, result) => {

        // set 'Y' on selected schoolterm
        qr = `UPDATE schoolterm SET isCurrentTerm = 'Y' WHERE schoolTermId = '${qID}'`;
        db.query(qr, (err, result) => {
            if (err) {
                console.log(err);
            }
        });

        res.status(200).send({
            message: 'data updated'
        });

    });
});

//get all course code data -tested
app.get('/api/add-student-team-coursecode', (req,res)=>{
    let qr = `select * from course`;
    db.query(qr, (err,result)=>{
        if(err){
            console.log(err,'errs');
        }
        if(result.length>0){
            res.send({
                message:'all coursecode data',
                data:result
            });
        }
    });
});


//create a team -tested
app.post('/api/add-student-team',(req,res)=>{


    let studentTeamNamet = req.body.studentTeamName;
    let searchSameTeamNameQr = `select teamId as teamId from team where teamName = '${studentTeamNamet}'`;

    db.query(searchSameTeamNameQr, (err,result)=>{
        if(result.length <= 0){

            let schoolTermt = req.body.schoolTerm;
            let courseCodet = req.body.courseCode;
        
            // get teamId
            let maxQr = `select Max(teamIdNo) as maxId from team where schoolTermId = '${schoolTermt}' AND courseId = '${courseCodet}'`;
            let teamIdG;
            db.query(maxQr, (err,result)=>{
        
                if (result.length > 0) {
                    console.log(result[0].maxId);
                    teamIdG = result[0].maxId + 1;
                }
                else {
                    teamIdG = 1;
                }
        
                let schoolTerm = req.body.schoolTerm;
                let courseCode = req.body.courseCode;
                let studentTeamName = req.body.studentTeamName;
        
                let qr=`insert into team(teamName, courseId,schoolTermId,teamIdNo,teamIdGenerated) 
                values('${studentTeamName}','${courseCode}','${schoolTerm}','${teamIdG}',CONCAT((select schoolTermName from schoolterm where schoolterm.schoolTermId = ${schoolTerm}),'_',(select programCode from course where course.courseId = ${courseCode}),'_','${teamIdG.toString()}'))`;
                
                console.log(qr,'qr');
        
                db.query(qr,(err,result)=>{
        
                    if(err){console.log(err);}
                    console.log(result,'result')
                    res.status(200).send({
                        message:'data inserted'
                    });
                });
        
            });
        }
            
    });

});

//update student data with team name -tested
app.post('/api/add-student-team-to-student',(req,res)=>{

    let studentTeam = req.body.teamIdFormControl;
    let studentId = req.body.student1FormControl;

    let qr=`update student set teamId = '${studentTeam}' where studentId = '${studentId}'`;

    console.log(qr,'qr');

    db.query(qr,(err,result)=>{

        if(err){console.log(err);}
        console.log(result,'result')
        res.status(200).send({
            message:'data inserted'
        });
    });
});



////////////////////////////////////////////////////////////////////////////////
// Program

// get all program (ex. CP, CPA, ...)
app.get('/api/program', (req, res) => {
    let qr = `SELECT * FROM program ORDER BY programCode`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err, 'errors');
        }

        if (result.length > 0) {
            res.status(200).send({
                message: 'get all data',
                count: result.length,
                data: result
            });
        }
        else {
            res.status(200).send({
                message: 'no data found',
                count: result.length,
                data: result
            });
        }
    });
})


////////////////////////////////////////////////////////////////////////////////
// Adviser

// get adviser list data
app.get('/api/adviser', (req, res) => {
    let qr = `SELECT * FROM adviser ORDER BY firstName, lastName `;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err, 'errors');
        }

        if (result.length > 0) {
            res.status(200).send({
                message: 'get all data',
                count: result.length,
                data: result
            });
        }
        else {
            res.status(200).send({
                message: 'no data found',
                count: result.length,
                data: result
            });
        }
    });
})


////////////////////////////////////////////////////////////////////////////////
// Client

// get all client -tested
app.get('/api/client', (req, res) => {    
    let qr = `SELECT * FROM client`;
    db.query(qr, (err,result)=>{
        if (err) {
            console.log(err,'errs');
        }

        if (result.length > 0) {
            res.status(200).send({
                message: 'get all data',
                count: result.length,
                data: result
            });
        }
        else {
            res.status(200).send({
                message: 'No data found'
            });
        }
    });    
});

// get single client -tested
app.get('/api/client/:id', (req, res) => {
    let gID = req.params.id;
    let qr = `SELECT * from client WHERE clientId = '${gID}'`;
    db.query(qr, (err, result) => {
        if (err) { 
            console.log(err); 
        }
        else {
            if (result.length > 0) {
                res.status(200).send({
                    message:'get single data',
                    count: result.length,
                    data:result
                });
            }
            else{
                res.status(200).send({
                    message:'data not found',
                    count: result.length,
                });
            }
        }   
    });
});

// create client -tested
app.post('/api/client', (req, res) => {
    //console.log('postdata');
    console.log(req.body,'create data');

    let clientName = req.body.clientName;
    let email = req.body.email;
    
    let data = req.body.password;
    let buff = new Buffer(data);
    let password = buff.toString('base64');

    console.log(req.body.password,'req.body.password');
    console.log(password,'password');

    let streetAddress = req.body.streetAddress;
    let streetAddress2 = req.body.streetAddress2;
    let city = req.body.city;
    let provinceCode = req.body.provinceCode;
    let postalCode = req.body.postalCode;
    let website = req.body.website;

    let created = new Date().toISOString().replace('T', ' ').substr(0, 19);
    let updated = new Date().toISOString().replace('T', ' ').substr(0, 19);
    
    // query
    qr = `INSERT INTO client (
        clientName, email, password, streetAddress, streetAddress2,
        city, provinceCode, postalCode, website, created,
        updated
    ) VALUES (
        '${clientName}', '${email}', '${password}', '${streetAddress}', '${streetAddress2}', 
        '${city}', '${provinceCode}', '${postalCode}', '${website}', '${created}', 
        '${updated}'
    )`;

    console.log(qr,'qr');

    db.query(qr,(err,result)=>{

        if(err){console.log(err);}
        console.log(result,'result')
        res.status(200).send({
            message:'data inserted',
            data: result
        });
    });
    /*
    db.query( qr, (err, result) => {
        if (err) { 
            console.log(err); 
            
            res.status(501).send({
                message: 'Failed inserting data',
                error: err.sqlMessage
            });            
        }
        else {
            console.log(result,'result');
            res.status(200).send({
                message: 'data inserted',
                data: result
            });
        }
    });   
    */
});

// update client -tested
app.put('/api/client/:id', (req, res) => {

    console.log(req.body,'updatedata');

    let gID = req.params.id;
    // let clientName = req.body.clientName;
    // let email = req.body.email;
    // let password = encrypt(req.body.password);  // encryption with crypto

    let streetAddress = req.body.streetAddress;
    let streetAddress2 = req.body.streetAddress2;
    let city = req.body.city;
    let provinceCode = req.body.provinceCode;
    let postalCode = req.body.postalCode;
    let website = req.body.website;

    // let created = new Date().toISOString().replace('T', ' ').substr(0, 19);
    let updated = new Date().toISOString().replace('T', ' ').substr(0, 19);

    // query
    let qr = `UPDATE client SET 
        streetAddress = '${streetAddress}', 
        streetAddress2 = '${streetAddress2}',
        city = '${city}',
        provinceCode = '${provinceCode}',
        postalCode = '${postalCode}',
        website = '${website}',
        updated = '${updated}'
        where clientId = '${gID}'
        LIMIT 1`;

    console.log(qr,'qr');

    db.query( qr, (err, result) => {
        if (err) { 
            console.log(err); 
            res.status(501).send({
                message: 'Failed updating data',
                error: err.sqlMessage
            });
        }
        else {
            console.log(result,'result');
            res.status(201).send({
                message: 'data updated',
                data: result
            });
        }
    });
})

// delete client -tested
app.delete('/api/client/:id', (req, res) => {
    let qID = req.params.id;
    let qr = `DELETE FROM client WHERE clientId = '${qID}' LIMIT 1`;

    db.query( qr, (err, result) => {
        if (err) { 
            console.log(err); 
            res.status(501).send({
                message: 'Failed deleting data',
                error: err.sqlMessage
            });
        }
        else {
            console.log(result,'result');
            res.status(201).send({
                message: 'data deleted',
                data: result
            });
        }
    });
});



////////////////////////////////////////////////////////////////////////////////
// Project

// get all project -tested
app.get('/api/project', (req, res) => {    

    let qr = `SELECT * FROM project p
        LEFT OUTER JOIN schoolterm ct
        ON p.schoolTermId = ct.schoolTermId
    `;
    
    if (req.query.clientId) {
        qr += ` WHERE clientId = ${req.query.clientId}`;
    }

    qr += ` ORDER BY projectId DESC`;

    db.query(qr, (err,result)=>{
        if (err) {
            console.log(err,'errs');
        }

        if (result.length > 0) {
            res.status(200).send({
                message: 'get all data',
                count: result.length,
                data: result
            });
        }
        else {
            res.status(200).send({
                message: 'No data found'
            });
        }
    });    
});

// get single project-tested
app.get('/api/project/:id', (req, res) => {
    let gID = req.params.id;
    let qr = `SELECT * FROM project p
        LEFT OUTER JOIN schoolterm ct
        ON p.schoolTermId = ct.schoolTermId
        LEFT OUTER JOIN client c
        ON p.clientId = c.clientId
        WHERE p.projectId = '${gID}' LIMIT 1`;
    db.query(qr, (err, result) => {
        if (err) { 
            console.log(err); 
        }
        else {
            if (result.length > 0) {
                res.status(200).send({
                    message:'get single data',
                    count: result.length,
                    data:result
                });
            }
            else{
                res.status(200).send({
                    message:'data not found',
                    count: result.length,
                });
            }
        }   
    });
});

// get all project by current school term
app.get('/api/project-list-current-term', (req, res) => {   
    
    // const projectStatus = req.query.projectStatus;
    // const teamId = req.query.teamId;

    let query = `SELECT
        p.projectId,
        p.projectName,
        p.projectShortName,
        p.description,
        p.businessGoals,
        p.prerequisites,
        p.additionalNotes,
        p.projectStatus,
        p.programCode,
        p.contactName,
        p.contactEmail,
        p.contactPhone,  
        p.created,      

        c.clientId,
        c.clientName,
        c.email,
        c.password,
        c.streetAddress,
        c.streetAddress2,
        c.city,
        c.provinceCode,
        c.postalCode,
        c.website,

        ct.schoolTermName

    FROM project p 
        
    INNER JOIN client c 
    ON p.clientId = c.clientId

    INNER JOIN schoolterm ct
    ON p.schoolTermId = ct.schoolTermId
    AND ct.isCurrentTerm = 'Y'

    ORDER BY projectId DESC `;

    db.query(query, (err,result)=>{
        if (err) {
            console.log(err); 
        }

        if (result.length > 0) {
            res.status(200).send({
                message: 'get all project list',
                count: result.length,
                data: result
            });
        }
        else {
            res.status(200).send({
                message: 'No data found',
                count: result.length,
                data: null
            });
        }
    });    
});

// get all assigned project by adviser
app.get('/api/project-list-adviser', (req, res) => {    

    let adviserId = req.query.adviserId;

    let qr = `SELECT
        p.projectId,
        p.projectName,
        p.projectShortName,
        p.description,
        p.businessGoals,
        p.prerequisites,
        p.additionalNotes,
        p.projectStatus,
        p.programCode,
        p.contactName,
        p.contactEmail,
        p.contactPhone,  
        p.created,      

        c.clientId,
        c.clientName,
        c.email,
        c.password,
        c.streetAddress,
        c.streetAddress2,
        c.city,
        c.provinceCode,
        c.postalCode,
        c.website,

        ct.schoolTermName,

        sa.studentApplicationId,
        sa.adviserId,

        t.teamName

        FROM project p 
            
        INNER JOIN client c 
        ON p.clientId = c.clientId

        INNER JOIN schoolterm ct
        ON p.schoolTermId = ct.schoolTermId
        AND ct.isCurrentTerm = 'Y'

        INNER JOIN studentapplication sa
        ON p.projectId = sa.projectId

        INNER JOIN team t
        ON sa.teamId = t.teamId

        WHERE sa.adviserId = '${adviserId}'

        ORDER BY p.projectId DESC `;

    db.query(qr, (err,result)=>{
        if (err) {
            console.log(err,'errs');
        }

        if (result.length > 0) {
            res.status(200).send({
                message: 'get all data',
                count: result.length,
                data: result
            });
        }
        else {
            res.status(200).send({
                message: 'No data found'
            });
        }
    });    
});

// get all project list by project status (for 'proposal application' menu) -tested
app.get('/api/project-list-by-project-status', (req, res) => {   
    
    /* projectStatus
    -- 1: Registered
    -- 2: Available
    -- 3: InProgress
    -- 4: Matched
    -- 5: Taken
    */
    const projectStatus = req.query.projectStatus;
    const teamId = req.query.teamId;

    let query = `SELECT
        p.projectId,
        p.projectName,
        p.description,
        p.businessGoals,
        p.prerequisites,
        p.additionalNotes,
        p.projectStatus,
        p.programCode,
        p.contactName,
        p.contactEmail,
        p.contactPhone,        

        c.clientId,
        c.clientName,
        c.email,
        c.password,
        c.streetAddress,
        c.streetAddress2,
        c.city,
        c.provinceCode,
        c.postalCode,
        c.website

    FROM project p 
        
    INNER JOIN client c 
    ON p.clientId = c.clientId

    WHERE 1 = 1 `;

    if (projectStatus == '123') {
        query += `AND p.projectStatus IN (1, 2, 3) `;
    }
    else if (projectStatus != '') {
        query += `AND p.projectStatus = ${projectStatus} `;
    }    

    query += `ORDER BY p.projectId DESC `;

    db.query(query, (err,result)=>{
        if (err) {
            console.log(err); 
        }

        if (result.length > 0) {
            res.status(200).send({
                message: 'get all project list with client info',
                count: result.length,
                data: result
            });
        }
        else {
            res.status(200).send({
                message: 'No data found',
                count: result.length,
                data: null
            });
        }
    });    
});

//get all applied teams per project data -tested
app.get('/api/project-all-applied-teams/:id', (req,res)=>{

    let gID = req.params.id;

    let getAllAppliedTeamsQr = `select
    st.studentapplicationId studentapplicationId, 
    st.applicationTitle applicationTitle, 
    st.description description, 
    st.applicationStatus applicationStatus, 
    st.projectId projectId, 
    st.teamId teamId, 
    te.teamName teamName,
    te.teamIdGenerated, 
    pr.projectName projectName,
    ad.adviserId adviserId,
    ad.firstName firstName,
    ad.lastName lastName
    from studentapplication st    
    join team te
    on te.teamId = st.teamId    
    join project pr
    on pr.projectId = st.projectId
    left outer join adviser ad
    on st.adviserId = ad.adviserId
    where st.projectId = '${gID}'`;

    db.query(getAllAppliedTeamsQr, (err,result)=>{

        if (err) { 
            console.log(err); 
        }
        else {
            if (result.length > 0) {
                res.status(200).send({
                    message:'all applied teams by project',
                    count: result.length,
                    data:result
                });
            }
            else{
                res.status(200).send({
                    message:'data not found',
                    count: result.length,
                });
            }
        }   
    });
});

//update selected project-tested
app.delete('/api/project-update-selected-team/:id',(req,res)=>{
    let qID = req.params.id;
    let qr = `update studentapplication set applicationStatus = 2 where studentapplicationId='${qID}'`;
    db.query(qr, (err,result)=>{
        if(err){console.log(err);}
        res.status(200).send({
            message:'application selected'
        })
    });
});

//update selected project as cancel-tested
app.delete('/api/project-cancel-selected-team/:id',(req,res)=>{
    let qID = req.params.id;
    let qr = `update studentapplication set applicationStatus = 1 where studentapplicationId='${qID}'`;
    db.query(qr, (err,result)=>{
        if(err){console.log(err);}
        res.status(200).send({
            message:'application cancelled'
        })
    });
});

// update Assigned Faculty on the student application
app.put('/api/application-adviser/:id',(req,res)=>{
    let gID = req.params.id;

    let adviserId = req.body.adviserId;

    // query
    let qr = `UPDATE studentapplication SET 
        adviserId = '${adviserId}'
        where studentApplicationId = '${gID}'
        LIMIT 1`;

    db.query(qr, (err,result)=>{
        if(err){console.log(err);}
        res.status(200).send({
            message:'Faculty assigned'
        })
    });
});

// get application status to project-tested
app.get('/api/project-team-application-status', (req,res)=>{

    const projectId = req.query.projectId;
    const teamId = req.query.teamId;

    let query = `SELECT
        sa.applicationStatus
    FROM project p 

    INNER JOIN studentapplication sa 
    ON p.projectId = sa.projectId

    WHERE p.projectId = ${projectId}
    AND sa.teamId = ${teamId}`;

    db.query(query, (err,result)=>{
        if (err) {
            console.log(err); 
        }

        if (result.length > 0) {
            res.status(200).send({
                message: 'get application status to project',
                count: result.length,
                data: result
            });
        }
        else {
            res.status(200).send({
                message: 'No application data found',
                count: result.length,
                data: null
            });
        }
    }); 
});

// create project -test failed
app.post('/api/project', upload.single('uploadFile'), (req, res) => {
    console.log(req.file);
    //console.log(req.body,'create data');

    let projectName = req.body.projectName;
    let projectShortName = req.body.projectShortName;
    let description = req.body.description;
    let businessGoals = req.body.businessGoals;
    let prerequisites = req.body.prerequisites;
    let additionalNotes = req.body.additionalNotes;

    let projectStatus = 1;
    let schoolTermId = req.body.schoolTermId;
    let programCode = req.body.programCode;

    let contactName = req.body.contactName;
    let contactEmail = req.body.contactEmail;
    let contactPhone = req.body.contactPhone;
    let clientId = req.body.clientId;
    
    let created = new Date().toISOString().replace('T', ' ').substr(0, 19);
    let updated = new Date().toISOString().replace('T', ' ').substr(0, 19);

    // upload file
    let uploadFileId = req.body.uploadFileId || '';
    
    // query
    let qr = `INSERT INTO project (
        projectName, projectShortName, description, businessGoals, prerequisites, 
        additionalNotes, projectStatus, schoolTermId, programCode, contactName, 
        contactEmail, contactPhone, clientId, created, updated
    ) VALUES (
        '${projectName}', '${projectShortName}', '${description}', '${businessGoals}', '${prerequisites}', 
        '${additionalNotes}', '${projectStatus}', '${schoolTermId}', '${programCode}', '${contactName}', 
        '${contactEmail}', '${contactPhone}', '${clientId}', '${created}', '${updated}'
    )`;

    console.log(qr,'qr');

    db.query(qr,(err,result)=>{

        if(err){console.log(err);}
        console.log(result,'result');

        const projectId = result.insertId;
        
        ////////////////////////////////////////////////////////////
        // upload file
        if (uploadFileId !== '') {
            const connectTableName = 'project';
            const connectTableId = result.insertId;

            qr = `UPDATE uploadFile SET 
                connectTableId = '${connectTableId}'
                WHERE uploadFileId = '${uploadFileId}'
                AND connectTableName = '${connectTableName}'
                LIMIT 1`;

            db.query(qr, (err, result) => {
                if (err) {
                    console.log(err);
                }
            });
        }
        // upload file
        ////////////////////////////////////////////////////////////
        
        res.status(200).send({
            message: 'data inserted',
            insertId: projectId,
            data: result
        });
    });   
    
});

// update project -tested
app.put('/api/project/:id', (req, res) => {

    console.log(req.body,'updatedata');

    let gID = req.params.id;
    
    let projectName = req.body.projectName;
    let projectShortName = req.body.projectShortName;
    let description = req.body.description;
    let businessGoals = req.body.businessGoals;
    let prerequisites = req.body.prerequisites;
    let additionalNotes = req.body.additionalNotes;

    // let projectStatus = 1;
    let schoolTermId = req.body.schoolTermId;
    let programCode = req.body.programCode;

    let contactName = req.body.contactName;
    let contactEmail = req.body.contactEmail;
    let contactPhone = req.body.contactPhone;
    
    let updated = new Date().toISOString().replace('T', ' ').substr(0, 19);

    // query
    let qr = `UPDATE project SET 
        projectName = '${projectName}',
        projectShortName = '${projectShortName}', 

        description = '${description}',
        businessGoals = '${businessGoals}',
        prerequisites = '${prerequisites}',
        additionalNotes = '${additionalNotes}',
        
        schoolTermId = '${schoolTermId}',
        programCode = '${programCode}',

        contactName = '${contactName}',
        contactEmail = '${contactEmail}',
        contactPhone = '${contactPhone}',
        
        updated = '${updated}'
        where projectId = '${gID}'
        LIMIT 1`;

    console.log(qr,'qr');

    db.query( qr, (err, result) => {
        if (err) { 
            console.log(err); 
            res.status(501).send({
                message: 'Failed updating data',
                error: err.sqlMessage
            });
        }
        else {
            console.log(result,'result');
            res.status(201).send({
                message: 'data updated',
                data: result
            });
        }
    });
})

// delete project-tested
app.delete('/api/project/:id', (req, res) => {
    let qID = req.params.id;
    let qr = `DELETE FROM project WHERE projectId = '${qID}' LIMIT 1`;

    db.query( qr, (err, result) => {
        if (err) { 
            console.log(err); 
            res.status(501).send({
                message: 'Failed deleting data',
                error: err.sqlMessage
            });
        }
        else {
            console.log(result,'result');
            res.status(201).send({
                message: 'data deleted',
                data: result
            });
        }
    });
});

////////////////////////////////////////////////////////////

// Student application

// get single application -tested
app.get('/api/application/:id', (req, res) => {
    let gID = req.params.id;
    let qr = `SELECT * from studentapplication WHERE studentApplicationId = '${gID}' LIMIT 1`;
    db.query(qr, (err, result) => {
        if (err) { 
            console.log(err); 
        }
        else {
            if (result.length > 0) {
                res.status(200).send({
                    message:'get single data',
                    count: result.length,
                    data: result
                });
            }
            else{
                res.status(200).send({
                    message:'data not found',
                    count: result.length,
                    data: null
                });
            }
        }   
    });
});

// get student application details
app.get('/api/application-details/:id', (req, res) => {
    let gID = req.params.id;

    let qr = `SELECT
        p.projectId,
        p.projectName,
        p.projectShortName,
        p.description,
        p.businessGoals,
        p.prerequisites,
        p.additionalNotes,
        p.projectStatus,
        p.programCode,
        p.contactName,
        p.contactEmail,
        p.contactPhone,  
        p.created,      

        c.clientId,
        c.clientName,
        c.email,
        c.password,
        c.streetAddress,
        c.streetAddress2,
        c.city,
        c.provinceCode,
        c.postalCode,
        c.website,

        ct.schoolTermName,

        sa.studentApplicationId,
        sa.adviserId

    FROM project p 
        
    INNER JOIN client c 
    ON p.clientId = c.clientId

    INNER JOIN schoolterm ct
    ON p.schoolTermId = ct.schoolTermId

    INNER JOIN studentapplication sa
    ON p.projectId = sa.projectId

    WHERE sa.studentApplicationId = '${gID}' `;

    db.query(qr, (err, result) => {
        if (err) { 
            console.log(err); 
        }
        else {
            if (result.length > 0) {
                res.status(200).send({
                    message:'get single data',
                    count: result.length,
                    data: result
                });
            }
            else{
                res.status(200).send({
                    message:'data not found',
                    count: result.length,
                    data: null
                });
            }
        }   
    });
});

// create application -tested
app.post('/api/application', upload.single('uploadFile'), (req, res) => {

    const applicationTitle = req.body.applicationTitle;
    const description = req.body.description;
    const applicationStatus = 1;    // applicationStatus (1: Draft, 2: Registered, 3: Approved, 4: Assinged)
    const projectId = req.body.projectId;
    const teamId = req.body.teamId;

    // upload file
    let uploadFileId = req.body.uploadFileId || '';

    // query
    let query = `INSERT INTO studentapplication (
        applicationTitle, description, applicationStatus, projectId, teamId
    ) VALUES (
        '${applicationTitle}', '${description}', '${applicationStatus}', '${projectId}', '${teamId}'
    )`;

    db.query(query,(err,result)=>{

        if(err){console.log(err);}
        console.log(result,'result');

        const studentApplicationId = result.insertId;
        
        ////////////////////////////////////////////////////////////
        // upload file
        if (uploadFileId !== '') {
            const connectTableName = 'studentapplication';
            const connectTableId = result.insertId;

            qr = `UPDATE uploadFile SET 
                connectTableId = '${connectTableId}'
                WHERE uploadFileId = '${uploadFileId}'
                AND connectTableName = '${connectTableName}'
                LIMIT 1`;

            db.query(qr, (err, result) => {
                if (err) {
                    console.log(err);
                }
            });
        }
        // upload file
        ////////////////////////////////////////////////////////////
        
        res.send({
            message: 'data inserted',
            insertId: studentApplicationId,
            data: result
        });
    });   

});

// get application list by team -tested
app.get('/api/application-by-team/:teamId', (req, res) => {
    let teamId = req.params.teamId;
    let query = `
        SELECT 
            *
        FROM studentapplication sa 

        INNER JOIN project p 
        ON sa.projectId = p.projectId 

        INNER JOIN client c
        ON p.clientId = c.clientId 

        WHERE sa.teamId = ${teamId}
        ORDER BY p.projectId DESC, sa.studentApplicationId DESC
    `;

    db.query(query, (err, result) => {
        if (err) { 
            console.log(err); 
        }
        else {
            if (result.length > 0) {
                res.status(200).send({
                    message:'get all data',
                    count: result.length,
                    data: result
                });
            }
            else{
                res.status(200).send({
                    message:'data not found',
                    count: result.length,
                    data: null
                });
            }
        }   
    });
});


////////////////////////////////////////////////////////////

// Coordinator Menus

// get student team list with join tables
app.get('/api/student-team-list-for-coorinator/:termName', (req, res) => {

    const _termName = req.params.termName;

    let query = `
        SELECT
            *
        FROM team t

        INNER JOIN course c 
        ON t.courseId = c.courseId 

        INNER JOIN schoolterm st 
        ON t.schoolTermId = st.schoolTermId         
    `;

    // Ex. WHERE st.schoolTermName = 'W22'
    if (_termName != '') {
        query += `WHERE st.schoolTermName = '${_termName}' `;
    }    

    query += `ORDER BY st.schoolTermId DESC, t.teamId DESC`;

    db.query(query, (err, result) => {
        if (err) { 
            console.log(err); 
        }
        else {
            if (result.length > 0) {
                res.status(200).send({
                    message:'get all data',
                    count: result.length,
                    data: result
                });
            }
            else{
                res.status(200).send({
                    message:'data not found',
                    count: result.length,
                    data: null
                });
            }
        } 
    });
});


////////////////////////////////////////////////////////////

// Login (client, student, adviser, coordinator)

// client-login-tested
app.post('/api/client-login', (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    const buff = Buffer.from(password);
    const passwordEncoding = buff.toString('base64');

    // query
    const query = `SELECT * FROM client WHERE email = '${email}' AND password = '${passwordEncoding}'`;
    // console.log(query); 

    db.query(query, (err, result) => {
        if (err) { 
            console.log(err); 
        }
        else {
            if (result.length > 0) {
                res.status(200).send({
                    message: 'Client is logged in.',
                    status: true,
                    data: result
                });
            }
            else{
                res.status(200).send({
                    message:'Client login failed.',
                    status: false,
                    data: ''
                });
            }
        }   
    });
});


// student-login-tested
app.post('/api/student-login', (req, res) => {

    const studentFirstName = req.body.studentFirstName;
    const studentLastName = req.body.studentLastName;
    const teamName = req.body.teamName;
    
    // query
    const query = `SELECT        
        s.studentId,
        s.studentFirstName,
        s.studentLastName,
        t.teamId,
        t.teamName
    FROM student s

    INNER JOIN team t
    ON s.teamId = t.teamId
    AND t.teamName = '${teamName}'

    WHERE s.studentFirstName = '${studentFirstName}'
    AND s.studentLastName = '${studentLastName}'`;    
    console.log(query); 

    db.query(query, (err, result) => {
        if (err) { 
            console.log(err); 
        }
        else {
            if (result.length > 0) {
                res.status(200).send({
                    message: 'Student is logged in.',
                    status: true,
                    data: result
                });
            }
            else{
                res.status(200).send({
                    message:'Student login failed.',
                    status: false,
                    data: ''
                });
            }
        }   
    });
});


// adviser-login
app.post('/api/adviser-login', (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    const buff = Buffer.from(password);
    const passwordEncoding = buff.toString('base64');

    // query
    const query = `SELECT * FROM adviser WHERE email = '${email}' AND password = '${passwordEncoding}'`;
    // console.log(query); 

    db.query(query, (err, result) => {
        if (err) { 
            console.log(err); 
        }
        else {
            if (result.length > 0) {
                res.status(200).send({
                    message: 'Adviser is logged in.',
                    status: true,
                    data: result
                });
            }
            else{
                res.status(200).send({
                    message:'Adviser login failed.',
                    status: false,
                    data: ''
                });
            }
        }   
    });
});


// coordinator-login
app.post('/api/coordinator-login', (req, res) => {

    const coordinatorEmail = req.body.coordinatorEmail;
    const password = req.body.password;
    const buff = Buffer.from(password);
    const passwordEncoding = buff.toString('base64');

    // query
    const query = `SELECT * FROM coordinator WHERE coordinatorEmail = '${coordinatorEmail}' AND password = '${passwordEncoding}'`;
    // console.log(query); 

    db.query(query, (err, result) => {
        if (err) { 
            console.log(err); 
        }
        else {
            if (result.length > 0) {
                res.status(200).send({
                    message: 'Coordinator is logged in.',
                    status: true,
                    data: result
                });
            }
            else{
                res.status(200).send({
                    message:'Coordinator login failed.',
                    status: false,
                    data: ''
                });
            }
        }   
    });
});


////////////////////////////////////////////////////////////

// get all uploadFile -tested
app.get('/api/uploadfile', (req, res) => {    

    let qr = `SELECT * FROM uploadFile WHERE 1 = 1 `;

    if (req.query.projectId) {
        qr += `AND connectTableName = 'project' `;
        qr += `AND connectTableId = '${req.query.projectId}' `;
    }

    if (req.query.studentApplicationId) {
        qr += `AND connectTableName = 'studentApplication' `;
        qr += `AND connectTableId = '${req.query.studentApplicationId}' `;
    }

    if (req.query.teamId) {
        qr += `AND connectTableName = 'team' `;
        qr += `AND connectTableId = '${req.query.teamId}' `;
    }

    db.query(qr, (err,result)=>{
        if (err) {
            console.log(err,'errs');
        }

        if (result.length > 0) {
            res.status(200).send({
                message: 'get all data',
                count: result.length,
                data: result
            });
        }
        else {
            res.status(200).send({
                message: 'No data found'
            });
        }
    });    
});

// upload file
app.post('/api/upload-file', upload.single('uploadFile'), (req, res) => {
    
    const file = req.file;

    if (file) {

        const connectTableName = req.body.connectTableName;
        const connectTableId = req.body.connectTableId || 0;
        const originalFileName = req.file.originalname;
        const filePath = req.file.path;
        const fileName = req.file.filename;
        const fileSize = req.file.size;
        const created = new Date().toISOString().replace('T', ' ').substr(0, 19);
        const updated = new Date().toISOString().replace('T', ' ').substr(0, 19);

        // query
        qr = `INSERT INTO uploadFile (
            connectTableName, connectTableId, originalFileName, filePath, fileName,
            fileSize, created, updated
        ) VALUES (
            '${connectTableName}', '${connectTableId}', '${originalFileName}', '${filePath}', '${fileName}', 
            '${fileSize}', '${created}', '${updated}'
        )`;

        console.log(qr,'qr');

        db.query(qr, (err, result) => {
            if (err) { console.log(err); }

            console.log(result);

            res.status(200).send( {
                message: 'file uploaded',
                uploadFileId: result.insertId,
                file: file
            });
        });
    } else {
        throw new Error("File upload is unsuccessful");
    }
});

// download file - test failed
app.post('/api/downloadfile', (req, res) => {
    let qID = req.body.uploadFileId;
    let qr = `SELECT * from uploadfile WHERE uploadFileId = '${qID}' LIMIT 1`;
    console.log(qr);

    db.query(qr, (err, result) => {
        if (err) { 
            console.log(err); 
        }
        else {
            if (result.length > 0) {
                // filepath
                filePath = path.join(__dirname, './uploads') + '/' + result[0].fileName;
                res.sendFile(filePath);
            }
            else{
                res.status(200).send({
                    message:'data not found',
                    count: result.length,
                });
            }
        }   
    });
});

//////////////////////////////////////////////////////

//get all data -tested
app.get('/api/user', (req,res)=>{
    let qr = `select * from user`;
    db.query(qr, (err,result)=>{
        if(err){
            console.log(err,'errs');
        }
        if(result.length>0){
            res.send({
                message:'all user data',
                data:result
            });
        }
    });
    //console.log('get users');
});


//get single data -tested
app.get('/api/user/:id', (req,res)=>{

    let gID = req.params.id;
    let qr = `select * from user where id = ${gID}`;
    db.query(qr,(err,result)=>{
        if(err){console.log(err);}
        if(result.length>0){
            res.send({
                message:'get single data',
                data:result
            });
        }
        else{
            res.send({
                message:'data not found'
            });
        }
    })
    //console.log(req.params.id,'getid==>')
    //console.log('get single data');


});

//create data -tested
app.post('/api/user',(req,res)=>{
    //console.log('postdata');
    console.log(req.body,'creat data');

    let fullName = req.body.fullname;
    let eMail = req.body.email;
    let mb = req.body.mobile;

    let qr=`insert into user(fullname,email,mobile) 
    values('${fullName}','${eMail}','${mb}')`;

    console.log(qr,'qr');

    db.query(qr,(err,result)=>{

        if(err){console.log(err);}
        console.log(result,'result')
        res.status(200).send({
            message:'data inserted'
        });

        // if(result.length>0){
        //     res.send({
        //         message:'data inserted'
        //     });
        // }
        // else{
        //     res.send({
        //         message:'error'
        //     });
        // }
    });
});

//update single data -tested

app.put('/api/user/:id',(req, res)=>{

    console.log(req.body,'updatedata');

    let gID = req.params.id;
    let fullName = req.body.fullname;
    let eMail = req.body.email;
    let mb = req.body.mobile;

    let qr = `update user set fullname = '${fullName}', email='${eMail}', mobile='${mb}' where id = ${gID}`;

    db.query(qr,(err,result)=>{
        if(err){console.log(err);}
        res.status(200).send({
            message:'data updated'
        });
    })
})

//user delete tested
app.delete('/api/user/:id',(req,res)=>{
    let qID = req.params.id;
    let qr = `delete from user where id='${qID}'`;
    db.query(qr, (err,result)=>{
        if(err){console.log(err);}
        res.status(200).send({
            message:'data deleted'
        })
    });
});

// app.listen(3000, ()=> {
//     console.log('server running..');
// });


const port = process.env.PORT || 3000;
module.exports = app.listen(port, () => console.log(`Listening on port ${port}...`));
