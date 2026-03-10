drop database HospitalManagementSystem;

create database HospitalManagementSystem;
use HospitalManagementSystem;

-- drop table patients;
create table patients(
	pat_id int primary key auto_increment,
	user_email varchar(50) unique, 
    f_name varchar(50), 
    l_name varchar(50), 
    sex varchar(10),
    house_number varchar(50),
    pincode varchar(10),
    city varchar(40),
    state varchar(40),
    country varchar(40),
    dob date,
    phone_no varchar(20)
);

insert into patients(user_email, f_name, l_name, sex, house_number, pincode, city, state, country, dob, phone_no)
values ("pat1@gmail.com","Aditya","Singh","Male","121","277209","Ballia","Uttar Pradesh","India","2003-12-12","9198503398");

insert into patients(user_email, f_name, l_name, sex, house_number, pincode, city, state, country, dob, phone_no)
values ("pat2@gmail.com","Utkarsh","Rai","Male","122","221010","Varanasi","Uttar Pradesh","India","2002-11-11","8739979535");

insert into patients(user_email, f_name, l_name, sex, house_number, pincode, city, state, country, dob, phone_no)
values ("pat3@gmail.com","Akshat","Bhatnagar","Male","123","212121","Kurukshetra","Haryana","India","2001-11-10","9199903398");

insert into patients(user_email, f_name, l_name, sex, house_number, pincode, city, state, country, dob, phone_no)
values ("pat4@gmail.com","Aditya","Kumar","Male","121","277209","Ballia","Uttar Pradesh","India","2003-12-12","9198503398");

insert into patients(user_email, f_name, l_name, sex, house_number, pincode, city, state, country, dob, phone_no)
values ("pat5@gmail.com","Harsh","Kumar","Male","129-H231","272309","Patna","Bihar","India","2003-12-12","9198803398");

-- drop table employee;
create table employee(
	id 			int primary key,
	job 		varchar(50),
	firstName 	varchar(50),
	lastName 	varchar(50),
	email 		varchar(50) unique,
	phoneNo 	varchar(54),
	city 		varchar(50),
	street 		varchar(50),
	pin 		varchar(50),
	dob 		date,
	sex 		varchar(50)
);

insert into employee values (1,"Doctor","Amit","Mishra","doc1@gmail.com","1010101010","Varanasi","PK12","221010","1990-10-10","Male");

insert into employee values (2,"Doctor","Rohit","Reddy","doc2@gmail.com","8787878787","Chennai","BHK-12","221210","1989-10-10","Male");

insert into employee values (3,"Doctor","Satya","Joshi","doc3@gmail.com","8776124323","Tapi","NY-12","221010","1990-11-01","Male");

insert into employee values (4,"Doctor","Ankit","Sharma","doc4@gmail.com","9969919293","NewDelhi","KB-11","123332","1992-10-10","Male");


-- drop table user;
create table user(
	email varchar(50) unique,
    password varchar(50),
    role varchar(10)
    -- foreign key(email) references patients(user_email) on delete cascade on update cascade,
    -- foreign key(email) references employee(email) on delete cascade on update cascade
);

insert into user values ("pat1@gmail.com","pat1","Patient");
insert into user values ("pat2@gmail.com","pat2","Patient");
insert into user values ("pat3@gmail.com","pat3","Patient");
insert into user values ("pat4@gmail.com","pat4","Patient");
insert into user values ("pat5@gmail.com","pat5","Patient");

insert into user values ("doc1@gmail.com","doc1","Doctor");
insert into user values ("doc2@gmail.com","doc2","Doctor");
insert into user values ("doc3@gmail.com","doc3","Doctor");
insert into user values ("doc4@gmail.com","doc4","Doctor");


-- drop table doctor;
create table doctor(
	id 				int primary key,
	specialization 	varchar(20),
    foreign key (id) references employee(id) on update cascade on delete cascade
);

insert into doctor values(1,"Surgeon");
insert into doctor values(2,"Dentist");
insert into doctor values(3,"Cardiologist");
insert into doctor values(4,"Neurologist");

-- drop table reviews;
CREATE TABLE reviews(
	doctor_id INT,
    pat_id INT,
    review INT,
    PRIMARY KEY(doctor_id,pat_id),
    FOREIGN KEY(pat_id) references patients(pat_id) on delete cascade on update cascade,
    FOREIGN KEY(doctor_id) references employee(id) on delete cascade on update cascade
);

insert into reviews values (1,1,4);
insert into reviews values (1,2,5);
insert into reviews values (1,3,5);
insert into reviews values (2,1,3);
insert into reviews values (2,2,4);
insert into reviews values (2,3,5);
insert into reviews values (3,3,5);
insert into reviews values (3,1,4);
insert into reviews values (4,1,5);
insert into reviews values (4,2,3);
insert into reviews values (4,4,3);

-- drop table appointments;
CREATE TABLE appointments(
	appt_id INT PRIMARY KEY AUTO_INCREMENT,
    appt_date DATE,
    pat_id INT,
    doctor_id INT,
    time_slot VARCHAR(100),
    prescription VARCHAR(1000),
    FOREIGN KEY(pat_id) references patients(pat_id),
    FOREIGN KEY(doctor_id) references employee(id)
);

insert into appointments(appt_date,pat_id,doctor_id,time_slot,prescription) values("2022-11-21",1,1,"9:30AM-10:00AM","xyz xyz xyz");
insert into appointments(appt_date,pat_id,doctor_id,time_slot,prescription) values("2022-11-20",1,1,"9:30AM-10:00AM","xyz xyz xyz");
insert into appointments(appt_date,pat_id,doctor_id,time_slot,prescription) values("2022-11-22",1,1,"9:30AM-10:00AM","xyz xyz xyz");
insert into appointments(appt_date,pat_id,doctor_id,time_slot,prescription) values("2022-11-23",1,1,"9:30AM-10:00AM","xyz xyz xyz");

insert into appointments(appt_date,pat_id,doctor_id,time_slot,prescription) values("2022-11-21",2,1,"10:00AM-10:30AM","xyz xyz xyz");
insert into appointments(appt_date,pat_id,doctor_id,time_slot,prescription) values("2022-11-20",2,1,"10:00AM-10:30AM","xyz xyz xyz");
insert into appointments(appt_date,pat_id,doctor_id,time_slot,prescription) values("2022-11-22",2,1,"10:00AM-10:30AM","xyz xyz xyz");
insert into appointments(appt_date,pat_id,doctor_id,time_slot,prescription) values("2022-11-23",2,1,"10:00AM-10:30AM","xyz xyz xyz");

-- drop table admit;
create table admit(
    pat_id int,
    f_name varchar(100),
    l_name varchar(100),
    user_email varchar(100),
    sex varchar(6),
    address varchar(100),
    admit_date date,
    doctor int,
    status varchar(10),
    foreign key(pat_id) references patients(pat_id) on update cascade on delete cascade,
    foreign key(doctor) references doctor(id) on delete cascade on update cascade
);

insert into admit values(1,"Aditya","Singh","pat1@gmail.com","Male","Ballia, Uttar Pradesh","2022-11-20",1,"Active");
insert into admit values(2,"Utkarsh","Rai","pat2@gmail.com","Male","Varanasi, Uttar Pradesh","2022-11-20",1,"Active");