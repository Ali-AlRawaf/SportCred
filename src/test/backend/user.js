process.env.NODE_ENV = 'test';

const expect = require("chai").expect;

const conn = require("../../server");

const register = require("../../controller/user").register;
const login = require("../../controller/user").login;



describe("POST /register", () =>{
    before(() => {
        conn.connect();
    })

    it("Creating a valid new user", (done) => {
        
        register({username: "userA", email: "UserName@example.ca", password: "User PASSWORD"})
        .then((res) => {
                console.log(res.status);
                expect(res.status).to.equal(200);
                done();
            })
            .catch((e) => done(e));
    })

    it("Creating a valid new user with username including space", (done) => {
        
        register({username: "userA Q", email: "UserName@example.com", password: "User PASSWORD"})
        .then(function(res) {
                console.log(res.status);
                expect(res.status).to.equal(200);
                done();
            })
            .catch((e) => done(e));
    })

    it("Creating a valid new user with username same as an existing one except that it includes a space in the middle", (done) => {
        
        register({username: "user A", email: "noUserName@example.com", password: "User PASSWORD"})
        .then((res) => {
                console.log(res.status);
                expect(res.status).to.equal(200);
                done();
            })
            .catch((e) => done(e));
    })

    it("Creating a user with an existing username", (done) => {
        
        register({username: "userA", email: "notUserName@example.com", password: "User PASSWORD"})
        .then((res) => {
            console.log(res.error);
                expect(res.status).to.equal(400);
                done();
            })
            .catch((e) => done(e));
    })
    
    it("Creating a user with existing username, but different email and password", (done) => {
        
        register({username: "userA", email: "UserA@example.com", password: "UserA PASSWORD"})
        .then((res) => {
            console.log(res.error);
                expect(res.status).to.equal(400);
                done();
            })
            .catch((e) => done(e));
    })

    it("Creating a user with an existing username, but with different case format", (done) => {
        
        register({username: "USerA", email: "UserCapital@example.com", password: "User PASSWORD"})
        .then((res) => {
                console.log(res.status);
                expect(res.status).to.equal(200);
                done();
            })
            .catch((e) => done(e));
    })

    it("Creating a user with non-existing username, but same email and password", (done) => {
        
        register({username: "userB", email: "UserName@example.ca", password: "UserA PASSWORD"})
        .then((res) => {
            console.log(res.error);
                expect(res.status).to.equal(400);
                done();
            })
            .catch((e) => done(e));
    })

    it("Creating a user with invalid non-empty username of less than 5 chars", (done) => {
        
        register({username: "user", email: "UserA@example.com", password: "UserA PASSWORD"})
        .then((res) => {
            console.log(res.error);
                expect(res.status).to.equal(400);
                done();
            })
            .catch((e) => done(e));
    })

    it("Creating a user with invalid non-empty username of more than 25 chars", (done) => {
        
        register({username: "123456789123456789123456789123456789", email: "UserA@example.com", password: "UserA PASSWORD"})
        .then((res) => {
            console.log(res.error);
                expect(res.status).to.equal(400);
                done();
            })
            .catch((e) => done(e));
    })

    it("Creating a user with empty username", (done) => {
        
        register({username: "", email: "UserA@example.com", password: "UserA PASSWORD"})
        .then((res) => {
            console.log(res.error);
                expect(res.status).to.equal(400);
                done();
            })
            .catch((e) => done(e));
    })

    it("Creating a user with empty username and email", (done) => {
        
        register({username: "", email: "", password: "UserA PASSWORD"})
        .then((res) => {
            console.log(res.error);
                expect(res.status).to.equal(400);
                done();
            })
            .catch((e) => done(e));
    })

    it("Creating a user with empty username, email, and password", (done) => {
        
        register({username: "", email: "", password: ""})
        .then((res) => {
            console.log(res.error);
                expect(res.status).to.equal(400);
                done();
            })
            .catch((e) => done(e));
    })

    it("Creating a user with invalid non-empty email of less than 5 chars", (done) => {
        
        register({username: "userC", email: "@h.c", password: "UserC PASSWORD"})
        .then((res) => {
            console.log(res.error);
                expect(res.status).to.equal(400);
                done();
            })
            .catch((e) => done(e));
    })
    
    it("Creating a user with invalid non-empty email of more than 255 chars", (done) => {
        
        register({
            username: "userC", 
            email: "LoremmipsumpdolorlsitrametkcconsectetueraadipiscingqelitweAeneanpcommodoligulacegetgdoloredAeneankmassagaCumssociisnatoquewpenatibuseetrmagnistdisgparturientgmontesgnasceturkridiculustmusggDonecgquamtfeliseeultriciesdnecfpellentesqueeufpretiumquissss@example.ca", 
            password: "UserC PASSWORD"
        })
        .then((res) => {
            console.log(res.error);
                expect(res.status).to.equal(400);
                done();
            })
            .catch((e) => done(e));
    })

    it("Creating a user with invalid non-empty email without a head", (done) => {
        
        register({username: "userC", email: "@example.ca", password: "UserC PASSWORD"})
        .then((res) => {
            console.log(res.error);
                expect(res.status).to.equal(400);
                done();
            })
            .catch((e) => done(e));
    })

    it("Creating a user with invalid non-empty email without an '@'", (done) => {
        
        register({username: "userC", email: "email.ca", password: "UserC PASSWORD"})
        .then((res) => {
            console.log(res.error);
                expect(res.status).to.equal(400);
                done();
            })
            .catch((e) => done(e));
    })

    it("Creating a user with invalid non-empty email without a '.domain'", (done) => {
        
        register({username: "userC", email: "userCemail@exampleca", password: "UserC PASSWORD"})
        .then((res) => {
            console.log(res.error);
                expect(res.status).to.equal(400);
                done();
            })
            .catch((e) => done(e));
    })

    it("Creating a user with invalid non-empty email without a 'text' after '@'", (done) => {
        
        register({username: "userC", email: "userCemail@.ca", password: "UserC PASSWORD"})
        .then((res) => {
            console.log(res.error);
                expect(res.status).to.equal(400);
                done();
            })
            .catch((e) => done(e));
    })

    it("Creating a user with invalid non-empty password of less than 6 chars", (done) => {
        
        register({username: "userC", email: "userCemail@h.ca", password: "1"})
        .then((res) => {
            console.log(res.error);
                expect(res.status).to.equal(400);
                done();
            })
            .catch((e) => done(e));
    })

    it("Creating a user with valid status and bio", (done) => {
        
        register({
            username: "userC", 
            email: "userCemail@h.ca", 
            status: "userC Status", 
            bio: "userC Bio", 
            password: "userC Password"
        })
        .then((res) => {
                console.log(res.status);
                expect(res.status).to.equal(200);
                done();
            })
            .catch((e) => done(e));
    })

    it("Creating a user with invalid status of more than 200 chars", (done) => {
        
        register({
            username: "userD", 
            email: "userCemail@h.ca", 
            status: "LoremmipsumpdolorlsitrametkcconsectetueraadipiscingqelitweAeneanpcommodoligulacegetgdoloredAeneankmassagaCumssociisnatoquewpenatibuseetrmagnistdisgparturientgmontesgnasceturkridiculustmusggDonecgquamtfeliseeultriciesdnecfpellentesqueeufpretiumquissss", 
            bio: "userC Bio", 
            password: "userC Password"
        })
        .then((res) => {
            console.log(res.error);
                expect(res.status).to.equal(400);
                done();
            })
            .catch((e) => done(e));
    })

    it("Creating a user with invalid bio of more than 255 chars", (done) => {
        
        register({
            username: "userD", 
            email: "userCemail@example.ca", 
            status: "userC Status", 
            bio: "LoremmipsumpdolorlsitrametkcconsectetueraadipiscingqelitweAeneanpcommodoligulacegetgdoloredAeneankmassagaCumssociisnatoquewpenatibuseetrmagnistdisgparturientgmontesgnasceturkridiculustmusggDonecgquamtfeliseeultriciesdnecfpellentesqueeufpretiumquissssjfjfjj", 
            password: "userC Password"
        })
        .then((res) => {
            console.log(res.error);
                expect(res.status).to.equal(400);
                done();
            })
            .catch((e) => done(e));
    })
})

describe("POST /login", () =>{
    before(() => {
        conn.connect();
    })

    it("Creating a valid new user", (done) => {
        
        register({username: "userR", email: "UserR@example.ca", password: "User PASSWORD"})
        .then((res) => {
                console.log(res.status);
                expect(res.status).to.equal(200);
                done();
            })
            .catch((e) => done(e));
    })

    it("Login a valid user", (done) => {
        
        login({username: "userR", password: "User PASSWORD"})
        .then((res) => {
            console.log(res.status);
                expect(res.status).to.equal(200);
                done();
            })
            .catch((e) => done(e));
    })

    it("Login an invalid user with correct username, but wrong password", (done) => {
        
        login({username: "userR", password: "UserPASSWORD"})
        .then((res) => {
            console.log(res.error);
                expect(res.status).to.equal(400);
                done();
            })
            .catch((e) => done(e));
    })

    it("Login an invalid user with correct password, but wrong username", (done) => {
        
        login({username: "userZ", password: "User PASSWORD"})
        .then((res) => {
            console.log(res.error);
                expect(res.status).to.equal(400);
                done();
            })
            .catch((e) => done(e));
    })

    it("Login an invalid user with correct password, but wrong username", (done) => {
        
        login({username: "userZ", password: "User PASSWORD"})
        .then((res) => {
            console.log(res.error);
                expect(res.status).to.equal(400);
                done();
            })
            .catch((e) => done(e));
    })

    it("Login an invalid user with wrong username and password", (done) => {
        
        login({username: "notValid", password: "notValidUser PASSWORD"})
        .then((res) => {
            console.log(res.error);
                expect(res.status).to.equal(400);
                done();
            })
            .catch((e) => done(e));
    })


})