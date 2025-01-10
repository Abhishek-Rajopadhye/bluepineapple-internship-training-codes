CREATE TABLE lift_data(liftID int primary key, liftName varchar(100) not null unique, direction varchar(5), currentCapacity int, totalCapacity int);
CREATE TABLE floor_data(floorID int primary key, floorName varchar(100) not null unique, directionPressed varchar(10));
CREATE TABLE lift_floor_map(liftID int primary key, floorID int, foreign key(floorID) REFERENCES floor_data(floorID), foreign key(liftID) REFERENCES lift_data(liftID));

INSERT INTO lift_data (liftID, liftName, direction, currentCapacity, totalCapacity) VALUES (1, 'Lift 1', 'Up', 0, 10);
INSERT INTO lift_data (liftID, liftName, direction, currentCapacity, totalCapacity) VALUES (2, 'Lift 2', 'Up', 0, 10);
INSERT INTO lift_data (liftID, liftName, direction, currentCapacity, totalCapacity) VALUES (3, 'Lift 3', 'Down', 0, 10);
INSERT INTO lift_data (liftID, liftName, direction, currentCapacity, totalCapacity) VALUES (4, 'Lift 4', '', 0, 10);

INSERT INTO floor_data (floorID, floorName, directionPressed) VALUES (1, 'Floor 1', 'Up');
INSERT INTO floor_data (floorID, floorName, directionPressed) VALUES (2, 'Floor 2', 'Up');
INSERT INTO floor_data (floorID, floorName, directionPressed) VALUES (3, 'Floor 3', 'Up/Down');
INSERT INTO floor_data (floorID, floorName, directionPressed) VALUES (4, 'Floor 4', 'Down');
INSERT INTO floor_data (floorID, floorName, directionPressed) VALUES (5, 'Floor 5', '');
INSERT INTO floor_data (floorID, floorName, directionPressed) VALUES (6, 'Floor 6', '');
INSERT INTO floor_data (floorID, floorName, directionPressed) VALUES (7, 'Floor 7', 'Up');
INSERT INTO floor_data (floorID, floorName, directionPressed) VALUES (8, 'Floor 8', '');
INSERT INTO floor_data (floorID, floorName, directionPressed) VALUES (9, 'Floor 9', '');
INSERT INTO floor_data (floorID, floorName, directionPressed) VALUES (10, 'Floor 10', 'Up/Down');
INSERT INTO floor_data (floorID, floorName, directionPressed) VALUES (11, 'Floor 11', '');
INSERT INTO floor_data (floorID, floorName, directionPressed) VALUES (12, 'Floor 12', '');
INSERT INTO floor_data (floorID, floorName, directionPressed) VALUES (13, 'Floor 13', '');
INSERT INTO floor_data (floorID, floorName, directionPressed) VALUES (14, 'Floor 14', 'Down');

INSERT INTO lift_floor_map (liftID, floorID) VALUES (1, 1);
INSERT INTO lift_floor_map (liftID, floorID) VALUES (2, 11);
INSERT INTO lift_floor_map (liftID, floorID) VALUES (3, 14);
INSERT INTO lift_floor_map (liftID, floorID) VALUES (4, 4);

SELECT * from lift_data;
SELECT * from floor_data;
SELECT l.liftName, f.floorName FROM lift_data as l, floor_data as f, lift_floor_map as lfm WHERE l.liftID = lfm.liftID AND lfm.floorID = f.floorID;
SELECT COUNT(liftID) from lift_floor_map GROUP BY floorID;
