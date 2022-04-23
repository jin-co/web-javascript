const { expect } = require("chai");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");


//Assertion style
chai.should();

chai.use(chaiHttp);

///////////////////////////////////Test get
//get all student data
describe("Get /add-student-team", () => {
    it("get all school term data", (done) => {
        chai.request(server)
        .get("/add-student-team")
        .end((err, response) => {
            expect(response).to.have.status(200);
            expect(response).to.be.an('object');
        done();
        })
    })
});

//get all school term data
describe("Get /add-student-team-schoolterm", () => {
    it("get all school term data", (done) => {
        chai.request(server)
        .get("/add-student-team-schoolterm")
        .end((err, response) => {
            expect(response).to.have.status(200);
            expect(response).to.be.an('object');
        done();
        })
    })
});

//get all course code data
describe("Get /add-student-team-coursecode", () => {
    it("get all school term data", (done) => {
        chai.request(server)
        .get("/add-student-team-coursecode")
        .end((err, response) => {
            expect(response).to.have.status(200);
            expect(response).to.be.an('object');
        done();
        })
    })
});

    //get all client
    describe("Get /client", () => {
        it("get all client", (done) => {
            chai.request(server)
            .get("/client")
            .end((err, response) => {
                expect(response).to.have.status(200);
                expect(response).to.be.an('object');
            done();
            })
        })
    });

    //get all project
    describe("Get /project", () => {
        it("get all project", (done) => {
            chai.request(server)
            .get("/project")
            .end((err, response) => {
                expect(response).to.have.status(200);
                expect(response).to.be.an('object');
            done();
            })
        })
    });

    //get all project list by project status
    describe("Get /project-list-by-project-status", () => {
        it("get all project list by project status", (done) => {
            chai.request(server)
            .get("/project-list-by-project-status/?projectStatus=123")
            .end((err, response) => {
                expect(response).to.have.status(200);
                expect(response).to.be.an('object');
            done();
            })
        })
    });

    //get application status to project
    describe("Get /project-team-application-status", () => {
        it("get application status to project", async () => {
            chai.request(server)
            .get("/project-team-application-status/?projectId=1&teamId=1")
            .end((err, response) => {
                expect(response).to.have.status(200);
                expect(response).to.be.an('object');
            //done();
            })
        })
    });

    //get all uploadFile
    describe("Get /uploadfile", () => {
        it("get all uploadFile", async () => {
            chai.request(server)
            .get("/uploadfile")
            .end((err, response) => {
                expect(response).to.have.status(200);
                expect(response).to.be.an('object');
            //done();
            })
        })
    });
    

describe('api test', () => {

    //test get route
    describe("Get /user", () => {
        it("it should get all users", (done) => {
            chai.request(server)
            .get("/user")
            .end((err, response) => {
                expect(response).to.have.status(200);
                expect(response).to.be.an('object');
            done();
            })
        })
    });

/////////////////////////////////////Get with id

    //get all student data per team
    describe("Get /add-student-team-all-student-per-team/:id", () => {
        it("it should get a user by id", async() => {
            const id = 1;
            chai.request(server)
            .get("/add-student-team-all-student-per-team/:id" + id)
            .end((err, response) => {
                expect(response).to.have.status(200);
                // expect(response).to.be.an('object');
                //done();
            });
        })
    });

        //get single client
        describe("Get /client/:id", () => {
            it("it should get a user by id", (done) => {
                const id = 1;
                chai.request(server)
                .get("/client/:id" + id)
                .end((err, response) => {
                    expect(response).to.have.status(200);
                    // expect(response).to.be.an('object');
                done();
                });
            })
        });

        //get application-by-team/:teamId
    describe("Get /application-by-team/:teamId", () => {
        it("application-by-team/:teamId", async () => {
            const teamId = 1;
            chai.request(server)
            .get("/application-by-team/:teamId" + teamId)
            .end((err, response) => {
                expect(response).to.have.status(200);
                // expect(response).to.be.an('object');
            //done();
            });
        })
    });


    //get single application
    describe("Get /application/:id", () => {
        it("get single application", (done) => {
            const gID = 1;
            chai.request(server)
            .get("/application/:id" + gID)
            .end((err, response) => {
                expect(response).to.have.status(200);
                // expect(response).to.be.an('object');
            done();
            });
        })
    });

    //get single project
    describe("Get /project/:id", () => {
        it("get single project", (done) => {
            const gID = 1;
            chai.request(server)
            .get("/project/:id" + gID)
            .end((err, response) => {
                expect(response).to.have.status(200);
                // expect(response).to.be.an('object');
            done();
            });
        })
    });

    //get all applied teams per project data
    describe("Get /project-all-applied-teams/:id", () => {
        it("get all applied teams per project data", (done) => {
            const gID = 1;
            chai.request(server)
            .get("/project-all-applied-teams/:id" + gID)
            .end((err, response) => {
                expect(response).to.have.status(200);
                // expect(response).to.be.an('object');
            done();
            });
        })
    });

    //get team data
    describe("Get /add-student-team-teamData/:id", () => {
        it("get team data", (done) => {
            const gID = 1;
            chai.request(server)
            .get("/add-student-team-teamData/:id" + gID)
            .end((err, response) => {
                expect(response).to.have.status(200);
                // expect(response).to.be.an('object');
            done();
            });
        })
    });


    describe("Get /user/:id", () => {
        it("it should get a user by id", (done) => {
            const id = 1;
            chai.request(server)
            .get("/user/" + id)
            .end((err, response) => {
                expect(response).to.have.status(200);
                // expect(response).to.be.an('object');
            done();
            })
        })
    });

    //////////////////////////////////////////////////////Test post

        //test client-login
        describe("Post /client-login", () => {
            it("client-login", (done) => {
                chai.request(server)
                .post("/client-login")
                .send({"email":"b@b.com","password":"1234"})
                .end((err, response) => {
                    expect(response).to.have.status(200);
                    // expect(response).to.be.an('object');
                done();
                })
            })
        });

    //test student-login
    describe("Post /student-login", () => {
        it("student-login", (done) => {
            chai.request(server)
            .post("/student-login")
            .send({"studentFirstName":"Sfirst1","studentLastName":"Slast1","teamName":"CCCCteam"})
            .end((err, response) => {
                expect(response).to.have.status(200);
                // expect(response).to.be.an('object');
            done();
            })
        })
    });


    //update student data with team name
    describe("Post /add-student-team-to-student", () => {
        it("update student data with team name", (done) => {
            chai.request(server)
            .post("/add-student-team-to-student")
            .send({"studentTeam":"1","studentId":"1"})
            .end((err, response) => {
                expect(response).to.have.status(200);
                // expect(response).to.be.an('object');
            done();
            })
        })
    });

        //create application
        describe("Post /application", () => {
            it("create application", (done) => {
                chai.request(server)
                .post("/application")
                .send({"applicationTitle":"test","description":"test","projectId":"test","teamId":"test"})
                .end((err, response) => {
                    expect(response).to.have.status(200);
                    // expect(response).to.be.an('object');
                done();
                })
            })
        });

        //create client
        describe("Post /client", () => {
            it("create client", (done) => {
                chai.request(server)
                .post("/client")
                .send({"clientName":"test","email":"test","data":"test","password":"test","streetAddress":"test", 
                "city":"test", "provinceCode":"test", "postalCode":"test","website":"test"})
                .end((err, response) => {
                    expect(response).to.have.status(200)
                    // expect(response).to.be.an('object');
                done();
                })
            })
        });

            //create a team
            describe("Post /add-student-team", () => {
                it("create a team", async () => {
                    chai.request(server)
                    .post("/add-student-team")
                    .send({"studentTeamNamet":"test","schoolTermt":"test","courseCodet":"test","schoolTerm":"test","courseCode":"test", 
                    "studentTeamName":"test"})
                    .end((err, response) => {
                        expect(response).to.have.status(200)
                        // expect(response).to.be.an('object');
                    //done();
                    })
                })
            });




        // // //create project
        // describe("Post /project", () => {
        //     it("create project", (done) => {
        //         chai.request(server)
        //         .post("/project")
        //         .send({"projectName":"test","description":"test","businessGoals":"test","prerequisites":"test","insertId":"999999"})
        //         .end((err, response) => {
        //             expect(response).to.have.status(404);
        //             // expect(response).to.be.an('object');
        //         done();
        //         })
        //     })
        // });

    //download file
    describe("Post /downloadfile'", () => {
        it("download file", (done) => {
            chai.request(server)
            .post("/downloadfile'")
            .send({"qID":"999999"})
            .end((err, response) => {
                expect(response).to.have.status(404);
                // expect(response).to.be.an('object');
            done();
            })
        })
    });


    describe("Post /post/", () => {
        it("it should post a user", (done) => {
            chai.request(server)
            .post("/user")
            .send({"fullname":"apitest","email":"a@a.com","mobile":"1231231231"})
            .end((err, response) => {
                expect(response).to.have.status(200);
                // expect(response).to.be.an('object');
            done();
            })
        })
    });


    /////////////////////////////////////////////////////////Test Put

    //update client
    describe("Put /client/:id", () => {
        it("update client", (done) => {
            const gID = 1;
            chai.request(server)
            .put("/client/:id" + gID)
            .send({"streetAddress":"test","streetAddress2":"test"})
            .end((err, response) => {
                expect(response).to.have.status(201);
                // expect(response).to.be.an('object');
            done();
            })
        })
    });

        //update project
        describe("Put /project/:id", () => {
            it("update project", (done) => {
                const gID = 1;
                chai.request(server)
                .put("/project/:id" + gID)
                .send({"description":"test","contactName":"test"})
                .end((err, response) => {
                    expect(response).to.have.status(201);
                    // expect(response).to.be.an('object');
                done();
                })
            })
        });

    describe("Put /put/:id", () => {
        it("it should put a user", (done) => {
            const id = 1;
            chai.request(server)
            .put("/user/" + id)
            .send({"fullname":"apitest","email":"a@a.com","mobile":"1231231231"})
            .end((err, response) => {
                expect(response).to.have.status(200);
                // expect(response).to.be.an('object');
            done();
            })
        })
    });

    /////////////////////////////////////////////Test Delete

    //update selected project
    describe("Delete /project-update-selected-team/:id", () => {
        it("update selected project", (done) => {
            const id = 1;
            chai.request(server)
            .delete("/project-update-selected-team/:id" + id)
            .end((err, response) => {
                expect(response).to.have.status(200);
                // expect(response).to.be.an('object');
            done();
            })
        })
    });

        //update selected project as cancel
        describe("Delete /project-cancel-selected-team/:id", () => {
            it("update selected project as cancel", (done) => {
                const id = 1;
                chai.request(server)
                .delete("/project-cancel-selected-team/:id" + id)
                .end((err, response) => {
                    expect(response).to.have.status(200);
                    // expect(response).to.be.an('object');
                done();
                })
            })
        });

        //delete client
        describe("Delete /client/:id", () => {
            it("delete client", (done) => {
                const id = 99999;
                chai.request(server)
                .delete("/client/:id" + id)
                .end((err, response) => {
                    expect(response).to.have.status(201);
                done();
                })
            })
        });

        //delete project
        describe("Delete /project/:id", () => {
            it("delete project", (done) => {
                const id = 99999;
                chai.request(server)
                .delete("/project/:id" + id)
                .end((err, response) => {
                    expect(response).to.have.status(201);
                done();
                })
            })
        });

    describe("Delete /delete/:id", () => {
        it("it should delete a user", (done) => {
            const id = 5;
            chai.request(server)
            .delete("/user/" + id)
            .end((err, response) => {
                expect(response).to.have.status(200);
                // expect(response).to.be.an('object');
            done();
            })
        })
    });

});