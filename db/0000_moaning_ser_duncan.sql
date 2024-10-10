-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `_cf_KV` (
	`key` text PRIMARY KEY NOT NULL,
	`value` blob
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY,
	`email` text,
	`createdAt` numeric DEFAULT (CURRENT_TIMESTAMP),
	`role` text DEFAULT 'Demo admin'
);

*/