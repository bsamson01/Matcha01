CREATE TABLE IF NOT EXISTS `users` ( 
  `id` VARCHAR(36) NOT NULL , 
  `username` VARCHAR(32) NOT NULL , 
  `password` TEXT NOT NULL , 
  `mail` TEXT NOT NULL , 
  `firstname` VARCHAR(32) NOT NULL , 
  `lastname` VARCHAR(32) NOT NULL ,
  `age` INT(11) NOT NULL DEFAULT '18',
  `gender` ENUM('MAN','WOMAN') NULL , 
  `bio` TEXT NULL , 
  `location` VARCHAR(50) NOT NULL DEFAULT '48.8965568,2.3163477' , 
  `picture` TEXT NULL , 
  `orientation` ENUM('HETERO','BI','HOMO') NOT NULL DEFAULT 'BI' , 
  `score` INT NOT NULL DEFAULT '0' , 
  `status` ENUM('WAITING','CONFIRMED','BANNED') NOT NULL DEFAULT 'WAITING' ,
  `last_visit` TIMESTAMP NULL ,
  `register_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB;

INSERT INTO `matcha`.`users` (`id`, `username`, `password`, `mail`, `firstname`, `lastname`, `gender`, `bio`, `location`, `picture`, `orientation`, `score`, `status`, `last_visit`, `register_date`) VALUES ('c90e8efd-35f7-42d0-97a8-a621ac176768', 'bsamson', '$2a$06$Jh4jkBWTBglDLjPfHggeH.eFZF0hwcfoDG6fx/34bmpEmWYY7xz.6', 'brandon.samsonjnr@gmail.com', 'Brandon', 'Samson', 'MAN', 'xxx', '48.8965568,2.3163477', NULL, 'HETERO', '0', 'CONFIRMED', NULL, CURRENT_TIMESTAMP);
INSERT INTO `matcha`.`users` (`id`, `username`, `password`, `mail`, `firstname`, `lastname`, `gender`, `bio`, `location`, `picture`, `orientation`, `score`, `status`, `last_visit`, `register_date`) VALUES ('8801f84a-81e7-4bf3-b433-88684240a851', 'user1', '$2a$06$Jh4jkBWTBglDLjPfHggeH.eFZF0hwcfoDG6fx/34bmpEmWYY7xz.6', 'mail1@matcha.com', 'Alain', 'Lussier', 'MAN', 'xxx', '48.894092,2.314158', NULL, 'HETERO', '0', 'CONFIRMED', NULL, CURRENT_TIMESTAMP);
INSERT INTO `matcha`.`users` (`id`, `username`, `password`, `mail`, `firstname`, `lastname`, `gender`, `bio`, `location`, `picture`, `orientation`, `score`, `status`, `last_visit`, `register_date`) VALUES ('4c142618-5720-45de-bd00-7de76428fb05', 'user2', '$2a$06$Jh4jkBWTBglDLjPfHggeH.eFZF0hwcfoDG6fx/34bmpEmWYY7xz.6', 'mail2@matcha.com', 'Marc', 'Varden', 'MAN', 'xxx', '48.892725,2.327201', NULL, 'HETERO', '0', 'CONFIRMED', NULL, CURRENT_TIMESTAMP);
INSERT INTO `matcha`.`users` (`id`, `username`, `password`, `mail`, `firstname`, `lastname`, `gender`, `bio`, `location`, `picture`, `orientation`, `score`, `status`, `last_visit`, `register_date`) VALUES ('cc003c50-17d0-4c46-9abe-53dec3a4b5c9', 'user3', '$2a$06$Jh4jkBWTBglDLjPfHggeH.eFZF0hwcfoDG6fx/34bmpEmWYY7xz.6', 'mail3@matcha.com', 'Paul', 'Fouquet', 'MAN', 'xxx', '48.887645,2.325382', NULL, 'HETERO', '0', 'CONFIRMED', NULL, CURRENT_TIMESTAMP); 
INSERT INTO `matcha`.`users` (`id`, `username`, `password`, `mail`, `firstname`, `lastname`, `gender`, `bio`, `location`, `picture`, `orientation`, `score`, `status`, `last_visit`, `register_date`) VALUES ('f3a80b83-755f-48d3-af4a-43af10ac112a', 'user4', '$2a$06$Jh4jkBWTBglDLjPfHggeH.eFZF0hwcfoDG6fx/34bmpEmWYY7xz.6', 'mail4@matcha.com', 'Catherine', 'Fremont', 'WOMAN', 'xxx', '48.876048,2.324591', NULL, 'HETERO', '0', 'CONFIRMED', NULL, CURRENT_TIMESTAMP);
INSERT INTO `matcha`.`users` (`id`, `username`, `password`, `mail`, `firstname`, `lastname`, `gender`, `bio`, `location`, `picture`, `orientation`, `score`, `status`, `last_visit`, `register_date`) VALUES ('234bc097-e7f1-4d51-8691-cb38a9e7088c', 'user5', '$2a$06$Jh4jkBWTBglDLjPfHggeH.eFZF0hwcfoDG6fx/34bmpEmWYY7xz.6', 'mail5@matcha.com', 'Pauline', 'Labbe', 'WOMAN', 'xxx', '48.880885,2.355140', NULL, 'HETERO', '0', 'CONFIRMED', NULL, CURRENT_TIMESTAMP);
INSERT INTO `matcha`.`users` (`id`, `username`, `password`, `mail`, `firstname`, `lastname`, `gender`, `bio`, `location`, `picture`, `orientation`, `score`, `status`, `last_visit`, `register_date`) VALUES ('a279879b-8c26-4e04-a82d-465fd9b0b7d7', 'user6', '$2a$06$Jh4jkBWTBglDLjPfHggeH.eFZF0hwcfoDG6fx/34bmpEmWYY7xz.6', 'mail6@matcha.com', 'Chloe', 'Girard', 'WOMAN', 'xxx', '48.868987,2.340585', NULL, 'HETERO', '0', 'CONFIRMED', NULL, CURRENT_TIMESTAMP);
INSERT INTO `matcha`.`users` (`id`, `username`, `password`, `mail`, `firstname`, `lastname`, `gender`, `bio`, `location`, `picture`, `orientation`, `score`, `status`, `last_visit`, `register_date`) VALUES ('b8a2bd25-917b-4717-9606-906cb7a59fd0', 'user7', '$2a$06$Jh4jkBWTBglDLjPfHggeH.eFZF0hwcfoDG6fx/34bmpEmWYY7xz.6', 'mail7@matcha.com', 'Gaetan', 'Brousseau', 'MAN', 'xxx', '48.866228,2.323621', NULL, 'HOMO', '0', 'CONFIRMED', NULL, CURRENT_TIMESTAMP);
INSERT INTO `matcha`.`users` (`id`, `username`, `password`, `mail`, `firstname`, `lastname`, `gender`, `bio`, `location`, `picture`, `orientation`, `score`, `status`, `last_visit`, `register_date`) VALUES ('16abf513-ed05-4997-a85f-e783c8c7f920', 'user8', '$2a$06$Jh4jkBWTBglDLjPfHggeH.eFZF0hwcfoDG6fx/34bmpEmWYY7xz.6', 'mail8@matcha.com', 'Laurie', 'Voisine', 'WOMAN', 'xxx', '48.861780,2.346970', NULL, 'HOMO', '0', 'CONFIRMED', NULL, CURRENT_TIMESTAMP); 
INSERT INTO `matcha`.`users` (`id`, `username`, `password`, `mail`, `firstname`, `lastname`, `gender`, `bio`, `location`, `picture`, `orientation`, `score`, `status`, `last_visit`, `register_date`) VALUES ('8f1556fc-e53f-46a5-9c65-8ddd29d3d716', 'user9', '$2a$06$Jh4jkBWTBglDLjPfHggeH.eFZF0hwcfoDG6fx/34bmpEmWYY7xz.6', 'mail9@matcha.com', 'Gautier', 'Frappier', 'MAN', 'xxx', '48.839001, 2.330632', NULL, 'HOMO', '0', 'CONFIRMED', NULL, CURRENT_TIMESTAMP); 
INSERT INTO `matcha`.`users` (`id`, `username`, `password`, `mail`, `firstname`, `lastname`, `gender`, `bio`, `location`, `picture`, `orientation`, `score`, `status`, `last_visit`, `register_date`) VALUES ('2b2ba1c4-a3c1-4216-837e-1668f0b3b975', 'user10', '$2a$06$Jh4jkBWTBglDLjPfHggeH.eFZF0hwcfoDG6fx/34bmpEmWYY7xz.6', 'mail10@matcha.com', 'Deborah', 'Francoeur', 'WOMAN', 'xxx', '48.791482,2.402023', NULL, 'HOMO', '0', 'CONFIRMED', NULL, CURRENT_TIMESTAMP); 
INSERT INTO `matcha`.`users` (`id`, `username`, `password`, `mail`, `firstname`, `lastname`, `gender`, `bio`, `location`, `picture`, `orientation`, `score`, `status`, `last_visit`, `register_date`) VALUES ('f00aec2f-6793-47a1-9226-8ca33149142d', 'user11', '$2a$06$Jh4jkBWTBglDLjPfHggeH.eFZF0hwcfoDG6fx/34bmpEmWYY7xz.6', 'mail11@matcha.com', 'Axel', 'Cormier', 'MAN', 'xxx', '48.801722,2.124218', NULL, 'BI', '0', 'CONFIRMED', NULL, CURRENT_TIMESTAMP);
INSERT INTO `matcha`.`users` (`id`, `username`, `password`, `mail`, `firstname`, `lastname`, `gender`, `bio`, `location`, `picture`, `orientation`, `score`, `status`, `last_visit`, `register_date`) VALUES ('eab91049-8d88-454c-823a-b09571e3a551', 'user12', '$2a$06$Jh4jkBWTBglDLjPfHggeH.eFZF0hwcfoDG6fx/34bmpEmWYY7xz.6', 'mail12@matcha.com', 'Sixtine', 'Cantin', 'WOMAN', 'xxx', '48.986869,2.441039', NULL, 'BI', '0', 'CONFIRMED', NULL, CURRENT_TIMESTAMP);
INSERT INTO `matcha`.`users` (`id`, `username`, `password`, `mail`, `firstname`, `lastname`, `gender`, `bio`, `location`, `picture`, `orientation`, `score`, `status`, `last_visit`, `register_date`) VALUES ('03a37c25-ceaf-4212-a8da-ea01b4c6f541', 'user13', '$2a$06$Jh4jkBWTBglDLjPfHggeH.eFZF0hwcfoDG6fx/34bmpEmWYY7xz.6', 'mail13@matcha.com', 'Remi', 'Dennis', 'MAN', 'xxx', '48.962067,2.554927', NULL, 'BI', '0', 'CONFIRMED', NULL, CURRENT_TIMESTAMP);
INSERT INTO `matcha`.`users` (`id`, `username`, `password`, `mail`, `firstname`, `lastname`, `gender`, `bio`, `location`, `picture`, `orientation`, `score`, `status`, `last_visit`, `register_date`) VALUES ('24c9a3f4-90fa-4490-8e44-f4d74f1bfb35', 'user14', '$2a$06$Jh4jkBWTBglDLjPfHggeH.eFZF0hwcfoDG6fx/34bmpEmWYY7xz.6', 'mail14@matcha.com', 'Julie', 'Hervieux', 'WOMAN', 'xxx', '48.791964,2.452215', NULL, 'BI', '0', 'CONFIRMED', NULL, CURRENT_TIMESTAMP);
INSERT INTO `matcha`.`users` (`id`, `username`, `password`, `mail`, `firstname`, `lastname`, `gender`, `bio`, `location`, `picture`, `orientation`, `score`, `status`, `last_visit`, `register_date`) VALUES ('41093145-40c7-4a9b-ac5a-3a6a1664b24b', 'user15', '$2a$06$Jh4jkBWTBglDLjPfHggeH.eFZF0hwcfoDG6fx/34bmpEmWYY7xz.6', 'mail15@matcha.com', 'Sarah', 'Heureux', 'WOMAN', 'xxx', '48.727412,2.362808', NULL, 'HETERO', '0', 'CONFIRMED', NULL, CURRENT_TIMESTAMP);

CREATE TABLE IF NOT EXISTS `tags` (
  `id` INT(36) NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(30) NOT NULL,
  primary key (id)
) ENGINE = InnoDB;

INSERT INTO `matcha`.`tags`(`id`, `name`) VALUES (1, 'tall');
INSERT INTO `matcha`.`tags`(`id`, `name`) VALUES (2, 'funny');
INSERT INTO `matcha`.`tags`(`id`, `name`) VALUES (3, 'outgoing');
INSERT INTO `matcha`.`tags`(`id`, `name`) VALUES (4, 'extra pound');
INSERT INTO `matcha`.`tags`(`id`, `name`) VALUES (5, 'blonde');
INSERT INTO `matcha`.`tags`(`id`, `name`) VALUES (6, 'muscular');
INSERT INTO `matcha`.`tags`(`id`, `name`) VALUES (7, 'six pack');
INSERT INTO `matcha`.`tags`(`id`, `name`) VALUES (8, 'strong');
INSERT INTO `matcha`.`tags`(`id`, `name`) VALUES (9, 'shy');
INSERT INTO `matcha`.`tags`(`id`, `name`) VALUES (10, 'curious');

CREATE TABLE IF NOT EXISTS `user_tags` (
  `user` varchar(36) NOT NULL,
  `tag` VARCHAR(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `matcha`.`user_tags`(`user`, `tag`) VALUES ('c90e8efd-35f7-42d0-97a8-a621ac176768', 'tall');
INSERT INTO `matcha`.`user_tags`(`user`, `tag`) VALUES ('c90e8efd-35f7-42d0-97a8-a621ac176768', 'funny');
INSERT INTO `matcha`.`user_tags`(`user`, `tag`) VALUES ('8801f84a-81e7-4bf3-b433-88684240a851', 'outgoing');
INSERT INTO `matcha`.`user_tags`(`user`, `tag`) VALUES ('8801f84a-81e7-4bf3-b433-88684240a851', 'extra pound');
INSERT INTO `matcha`.`user_tags`(`user`, `tag`) VALUES ('4c142618-5720-45de-bd00-7de76428fb05', 'blonde');
INSERT INTO `matcha`.`user_tags`(`user`, `tag`) VALUES ('4c142618-5720-45de-bd00-7de76428fb05', 'muscular');
INSERT INTO `matcha`.`user_tags`(`user`, `tag`) VALUES ('cc003c50-17d0-4c46-9abe-53dec3a4b5c9', 'six pack');
INSERT INTO `matcha`.`user_tags`(`user`, `tag`) VALUES ('cc003c50-17d0-4c46-9abe-53dec3a4b5c9', 'shy');
INSERT INTO `matcha`.`user_tags`(`user`, `tag`) VALUES ('f3a80b83-755f-48d3-af4a-43af10ac112a', 'strong');
INSERT INTO `matcha`.`user_tags`(`user`, `tag`) VALUES ('f3a80b83-755f-48d3-af4a-43af10ac112a', 'curious');
INSERT INTO `matcha`.`user_tags`(`user`, `tag`) VALUES ('234bc097-e7f1-4d51-8691-cb38a9e7088c', 'tall');
INSERT INTO `matcha`.`user_tags`(`user`, `tag`) VALUES ('234bc097-e7f1-4d51-8691-cb38a9e7088c', 'funny');
INSERT INTO `matcha`.`user_tags`(`user`, `tag`) VALUES ('a279879b-8c26-4e04-a82d-465fd9b0b7d7', 'outgoing');
INSERT INTO `matcha`.`user_tags`(`user`, `tag`) VALUES ('a279879b-8c26-4e04-a82d-465fd9b0b7d7', 'extra pound');
INSERT INTO `matcha`.`user_tags`(`user`, `tag`) VALUES ('b8a2bd25-917b-4717-9606-906cb7a59fd0', 'blonde');
INSERT INTO `matcha`.`user_tags`(`user`, `tag`) VALUES ('b8a2bd25-917b-4717-9606-906cb7a59fd0', 'muscular');
INSERT INTO `matcha`.`user_tags`(`user`, `tag`) VALUES ('16abf513-ed05-4997-a85f-e783c8c7f920', 'six pack');
INSERT INTO `matcha`.`user_tags`(`user`, `tag`) VALUES ('16abf513-ed05-4997-a85f-e783c8c7f920', 'shy');
INSERT INTO `matcha`.`user_tags`(`user`, `tag`) VALUES ('8f1556fc-e53f-46a5-9c65-8ddd29d3d716', 'strong');
INSERT INTO `matcha`.`user_tags`(`user`, `tag`) VALUES ('8f1556fc-e53f-46a5-9c65-8ddd29d3d716', 'tenth');
INSERT INTO `matcha`.`user_tags`(`user`, `tag`) VALUES ('2b2ba1c4-a3c1-4216-837e-1668f0b3b975', 'tall');
INSERT INTO `matcha`.`user_tags`(`user`, `tag`) VALUES ('2b2ba1c4-a3c1-4216-837e-1668f0b3b975', 'funny');
INSERT INTO `matcha`.`user_tags`(`user`, `tag`) VALUES ('f00aec2f-6793-47a1-9226-8ca33149142d', 'outgoing');
INSERT INTO `matcha`.`user_tags`(`user`, `tag`) VALUES ('f00aec2f-6793-47a1-9226-8ca33149142d', 'extra pound');
INSERT INTO `matcha`.`user_tags`(`user`, `tag`) VALUES ('eab91049-8d88-454c-823a-b09571e3a551', 'blonde');
INSERT INTO `matcha`.`user_tags`(`user`, `tag`) VALUES ('eab91049-8d88-454c-823a-b09571e3a551', 'muscular');
INSERT INTO `matcha`.`user_tags`(`user`, `tag`) VALUES ('03a37c25-ceaf-4212-a8da-ea01b4c6f541', 'six pack');
INSERT INTO `matcha`.`user_tags`(`user`, `tag`) VALUES ('03a37c25-ceaf-4212-a8da-ea01b4c6f541', 'shy');
INSERT INTO `matcha`.`user_tags`(`user`, `tag`) VALUES ('24c9a3f4-90fa-4490-8e44-f4d74f1bfb35', 'strong');
INSERT INTO `matcha`.`user_tags`(`user`, `tag`) VALUES ('24c9a3f4-90fa-4490-8e44-f4d74f1bfb35', 'tenth');
INSERT INTO `matcha`.`user_tags`(`user`, `tag`) VALUES ('41093145-40c7-4a9b-ac5a-3a6a1664b24b', 'tall');
INSERT INTO `matcha`.`user_tags`(`user`, `tag`) VALUES ('41093145-40c7-4a9b-ac5a-3a6a1664b24b', 'funny');


CREATE TABLE IF NOT EXISTS `images` (
  `user` VARCHAR(36) NOT NULL ,
  `img` MEDIUMTEXT NOT NULL
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `blocked_users` (
  `user` varchar(36) NOT NULL,
  `blocked_target` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `matchs` (
  `user` varchar(36) NOT NULL,
  `match_target` varchar(36) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `reciprocal` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `visits` (
  `user` varchar(36) NOT NULL,
  `visit_target` varchar(36) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `user_alerts` (
  `id` varchar(36) NOT NULL,
  `visitor` varchar(36) NOT NULL,
  `message` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `displayed` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `chats` (
  `id` varchar(36) NOT NULL,
  `user_1` varchar(36) NOT NULL,
  `user_2` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `chat_msgs` (
  `id` varchar(36) NOT NULL,
  `user` varchar(36) NOT NULL,
  `msg` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `reports` (
  `id` varchar(36) NOT NULL,
  `user` varchar(36) NOT NULL,
  `reported_target` varchar(36) NOT NULL,
  `type` enum('FAKE','HARASSMENT','INSULTS') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `bugs` (
  `id` INT(36) NOT NULL AUTO_INCREMENT ,
  `user` VARCHAR(36) NOT NULL,
  `description` text NOT NULL,
  primary key (id)
) ENGINE = InnoDB;


ALTER TABLE `chats`
 ADD PRIMARY KEY (`id`);

ALTER TABLE `reports`
 ADD PRIMARY KEY (`id`);

ALTER TABLE `users`
 ADD PRIMARY KEY (`id`);

ALTER TABLE `user_alerts`
 ADD PRIMARY KEY (`id`);