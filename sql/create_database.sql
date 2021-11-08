CREATE TABLE "institution" (
	"idInstitution" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"city" varchar(255) NOT NULL,
	"community" varchar(255) NOT NULL,
	"postalCode" varchar(10) NOT NULL,
	"address" varchar(255) NOT NULL,
	"telephone" varchar(30) NOT NULL,
	"fax" varchar(30),
	CONSTRAINT "institution_pk" PRIMARY KEY ("idInstitution")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "employee" (
	"idEmployee" serial NOT NULL,
	"firstName" varchar(150) NOT NULL,
	"secondName" varchar(150),
	"lastName" varchar(150) NOT NULL,
	"age" int NOT NULL,
	CONSTRAINT "employee_pk" PRIMARY KEY ("idEmployee")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "programs" (
	"idProgram" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"isLocal" BOOLEAN NOT NULL,
	"typeOfProgram" TEXT,
	"forWho" int NOT NULL,
	"classes" TEXT NULL,
	CONSTRAINT "programs_pk" PRIMARY KEY ("idProgram")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "programEvent" (
	"idEvent" serial NOT NULL,
	"dateOfEvent" varchar(50) NOT NULL,
	-- "employeeId" int NOT NULL,
	"employees" TEXT NOT NULL,
	"institutionId" int NOT NULL,
	"programId" int NOT NULL,
	"howManyParticipiants" int NOT NULL,
	"howManyPrograms" int NOT NULL,
	"differentNameProgram" TEXT,
	CONSTRAINT "programEvent_pk" PRIMARY KEY ("idEvent")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "users" (
	"id" serial NOT NULL,
	"login" varchar(100) NOT NULL,
	"password" varchar(100) NOT NULL,
	"dateCreated" timestamp NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);





-- ALTER TABLE "programEvent" ADD CONSTRAINT "programEvent_fk0" FOREIGN KEY ("employeeId") REFERENCES "employee"("idEmployee");
ALTER TABLE "programEvent" ADD CONSTRAINT "programEvent_fk1" FOREIGN KEY ("institutionId") REFERENCES "institution"("idInstitution");
ALTER TABLE "programEvent" ADD CONSTRAINT "programEvent_fk2" FOREIGN KEY ("programId") REFERENCES "programs"("idProgram");





