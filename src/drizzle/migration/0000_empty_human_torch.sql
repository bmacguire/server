CREATE TABLE `note` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`title` varchar(256) NOT NULL,
	`text` text NOT NULL,
	`userId` bigint NOT NULL,
	`createdAt` bigint NOT NULL,
	`updatedAt` bigint,
	CONSTRAINT `note_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`email` varchar(256) NOT NULL,
	`passwordHash` text NOT NULL,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `emailIndex` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `note` ADD CONSTRAINT `note_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;