use cs542;

CREATE TABLE Customer
(
  cID CHAR(20) NOT NULL,
  cpwd CHAR(20) NOT NULL,
  address CHAR(50) NOT NULL,
  czipcode INT NOT NULL,
  cname CHAR(20) NOT NULL,
  PRIMARY KEY (cID),
  check (czipcode >= 10000 and czipcode <= 99999)
);

CREATE TABLE Restaurant
(
  rID CHAR(20) NOT NULL,
  rpwd CHAR(20) NOT NULL,
  tel INT NOT NULL,
  type CHAR(10) NOT NULL,
  city CHAR(10) NOT NULL,
  state CHAR(10) NOT NULL,
  street CHAR(20) NOT NULL,
  rzipcode INT NOT NULL,
  durl CHAR(50) NOT NULL,
  PRIMARY KEY (rID),
  check (rzipcode >= 10000 and rzipcode <= 99999)
);

CREATE TABLE Orders
(
  oID CHAR(20) NOT NULL,
  status CHAR(10) NOT NULL,
  sum FLOAT NOT NULL,
  otime DATE NOT NULL,
  odate DATE NOT NULL,
  cID CHAR(20) NOT NULL,
  rID CHAR(20) NOT NULL,
  PRIMARY KEY (oID),
  FOREIGN KEY (cID) REFERENCES Customer(cID),
  FOREIGN KEY (rID) REFERENCES Restaurant(rID)
);

CREATE TABLE Dish
(
  dID CHAR(20) NOT NULL,
  dname CHAR(20) NOT NULL,
  price FLOAT NOT NULL,
  description CHAR(50) NOT NULL,
  dishurl CHAR(50) NOT NULL,
  rID CHAR(20) NOT NULL,
  PRIMARY KEY (dID),
  FOREIGN KEY (rID) REFERENCES Restaurant(rID),
  check (price > 0)
);

CREATE TABLE Comment
(
  rID CHAR(20) NOT NULL,
  ctime DATE NOT NULL,
  cdate DATE NOT NULL,
  content CHAR(50) NOT NULL,
  oID CHAR(20) NOT NULL,
  PRIMARY KEY (oID),
  FOREIGN KEY (oID) REFERENCES Orders(oID)
);

CREATE TABLE contains
(
  num INT NOT NULL,
  oID CHAR(20) NOT NULL,
  dID CHAR(20) NOT NULL,
  PRIMARY KEY (oID, dID),
  FOREIGN KEY (oID) REFERENCES Orders(oID),
  FOREIGN KEY (dID) REFERENCES Dish(dID)
);

insert into Customer values ('c1', 'aaa', 'Boston', 10000, 'AA');
insert into Customer values ('c2', 'bbb', 'Worcester', 11609, 'BB');
insert into Customer values ('c3', 'ccc', 'Cambridge', 12001, 'CC');

insert into Restaurant values ('r1', 'aa',  6174, 'American', 'Boston', 'MA', 'Newbury', 12222, 'www');
insert into Restaurant values ('r2', 'bb', 6174, 'Chinese', 'Boston', 'MA', 'Newbury', 12222, 'www');

insert into Orders values ('o1', 'Finished', 16, '2017-04-10', '2017-04-10', 'c1', 'r1');
insert into Orders values ('o2', 'Finished', 30, '2017-04-15', '2017-04-15', 'c2', 'r2');

insert into Dish values ('d1', 'Bagel', 5, 'Bagel', 'www', 'r1');
insert into Dish values ('d2', 'Burger', 6, 'Burger', 'www', 'r1');
insert into Dish values ('d3', 'Fried rice', 8, 'Rice', 'www', 'r2');
insert into Dish values ('d4', 'Noodles', 7, 'Noodles', 'www', 'r2');

insert into contains values (2, 'o1', 'd1');
insert into contains values (1, 'o1', 'd2');
insert into contains values (2, 'o2', 'd3');
insert into contains values (2, 'o2', 'd4');