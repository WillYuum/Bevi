-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2019-10-07 09:19:29.7

-- tables
-- Table: Company
CREATE TABLE Company (
    CompanyId integer NOT NULL CONSTRAINT Company_pk PRIMARY KEY AUTOINCREMENT,
    CompanyName text NOT NULL,
    CompanyTypeId integer NOT NULL,
    CompanyWebLink text NOT NULL,
    CompanyDescription text NOT NULL,
    CompanyLocationId integer NOT NULL
);

-- Table: CompanyLocation
CREATE TABLE CompanyLocation (
    CompanyLocId integer NOT NULL CONSTRAINT CompanyLocation_pk PRIMARY KEY AUTOINCREMENT,
    CompanyLocImg text NOT NULL,
    companyLocLink text NOT NULL,
    CONSTRAINT CompanyLocation_Company FOREIGN KEY (companyLocLink)
    REFERENCES Company (CompanyId)
);

-- Table: CompanyPosts
CREATE TABLE CompanyPosts (
    CompanyPostId integer NOT NULL AUTOINCREMENT,
    CompanyPosts integer NOT NULL CONSTRAINT CompanyPosts_pk PRIMARY KEY AUTOINCREMENT,
    CONSTRAINT CompanyPosts_Company FOREIGN KEY (CompanyPostId)
    REFERENCES Company (CompanyId)
);

-- Table: CompanyType
CREATE TABLE CompanyType (
    CompanyTypeId integer NOT NULL CONSTRAINT CompanyType_pk PRIMARY KEY AUTOINCREMENT,
    CompanyType text NOT NULL,
    CONSTRAINT CompanyType_Company FOREIGN KEY (CompanyType)
    REFERENCES Company (CompanyId)
);

-- Table: Post
CREATE TABLE Post (
    PostId integer NOT NULL CONSTRAINT Post_pk PRIMARY KEY AUTOINCREMENT,
    Description text NOT NULL,
    imageUrl text NOT NULL,
    CONSTRAINT Post_CompanyPosts FOREIGN KEY (PostId)
    REFERENCES CompanyPosts (CompanyPosts)
);

-- End of file.

