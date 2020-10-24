let mysql = require('mysql');
let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'hyfuser',
    password : 'hyfpassword'
});

connection.connect();

let create_database_query = "CREATE DATABASE meetup;";
let drop_database = "DROP DATABASE meetup;";

connection.query(drop_database, function(err, results, fields) {
    if (err) {
        throw err;
    }
    console.log("the reply is ", results);
})

connection.query(create_database_query, function(err, results, fields) {
    if (err) {
        throw err;
    }
    console.log("the reply is ", results);
})

connection.query("use meetup", function(err, results, fields) {
    if (err) {
        throw err;
    }
    console.log("the reply is ", results);
})

let create_table_queries = [
    "create table Invitee (invitee_no int, invitee_name varchar(50), invited_by varchar(50))",
    "create table Room (room_no int, room_name varchar(50), floor_number int)",
    "create table Meeting (meeting_no int, meeting_title varchar(50), starting_time datetime, ending_time time, room_no int)"
]

create_table_queries.forEach(query => {
    connection.query(query, function(err, results, fields) {
        if (err) {
            throw err;
        }
        console.log("the reply is ", results);
    })
})

let insert_invitee_queries = [
    "insert into Invitee values (1, 'Unmesh', 'Merve')",
    "insert into Invitee values (2, 'Wouter', 'Merve')",
    "insert into Invitee values (3, 'Fede', 'Merve')",
    "insert into Invitee values (4, 'Tjebbe', 'Merve')",
    "insert into Invitee values (5, 'Andrej', 'Merve')"
]

insert_invitee_queries.forEach(query => {
    connection.query(query, function(err, results, fields) {
        if (err) {
            throw err;
        }
        console.log("the reply is ", results);
    })
})

let insert_room_queries = [
    "insert into Room values (1, 'Meeting room 1', 7)",
    "insert into Room values (2, 'Meeting room 2', 8)",
    "insert into Room values (3, 'Meeting room 3', 9)",
    "insert into Room values (4, 'Meeting room 4', 10)",
    "insert into Room values (5, 'Meeting room 5', 11)"
]

insert_room_queries.forEach(query => {
    connection.query(query, function(err, results, fields) {
        if (err) {
            throw err;
        }
        console.log("the reply is ", results);
    })
})

let insert_meeting_queries = [
    "insert into Meeting values (1, 'Database Workshop', '2020-12-20 10:00:00', '2020-12-20 11:00:00', 1)",
    "insert into Meeting values (2, 'Hackyourfuture Graduation', '2020-12-20 11:00:00', '2020-12-20 12:00:00', 2)",
    "insert into Meeting values (3, 'Career Talk', '2020-12-20 12:00:00', '2020-12-20 13:00:00', 3)",
    "insert into Meeting values (4, 'New Work Flow', '2020-12-20 13:00:00', '2020-12-20 14:00:00', 4)",
    "insert into Meeting values (5, 'Node.js Workshop', '2020-12-20 14:00:00', '2020-12-20 15:00:00', 5)"
]

insert_meeting_queries.forEach(query => {
    connection.query(query, function(err, results, fields) {
        if (err) {
            throw err;
        }
        console.log("the reply is ", results);
    })
})

connection.end();