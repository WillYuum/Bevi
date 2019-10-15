-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2019-10-14 14:41:21.83

-- tables
-- Table: Company
CREATE TABLE Company (
    CompanyId integer NOT NULL CONSTRAINT Company_pk PRIMARY KEY,
    CompanyLogo text NOT NULL,
    CompanyName text NOT NULL,
    CompanyWebLink text NOT NULL,
    CompanyDescription text NOT NULL
);

-- Table: CompanyCity
CREATE TABLE CompanyCity (
    CompanyCityId integer NOT NULL CONSTRAINT CompanyCity_pk PRIMARY KEY,
    CompanyCity integer NOT NULL,
    CONSTRAINT CompanyCity_Company FOREIGN KEY (CompanyCityId)
    REFERENCES Company (CompanyId)
);

-- Table: CompanyPosts
CREATE TABLE CompanyPosts (
    CompanyId integer NOT NULL,
    CompanyPosts integer NOT NULL CONSTRAINT CompanyPosts_pk PRIMARY KEY,
    CONSTRAINT CompanyPosts_Company FOREIGN KEY (CompanyId)
    REFERENCES Company (CompanyId)
);

-- Table: CompanyType
CREATE TABLE CompanyType (
    CompanyTypeId integer NOT NULL CONSTRAINT CompanyType_pk PRIMARY KEY,
    CompanyType text NOT NULL,
    CONSTRAINT CompanyType_Company FOREIGN KEY (CompanyType)
    REFERENCES Company (CompanyId)
);

-- Table: Post
CREATE TABLE Post (
    PostId integer NOT NULL CONSTRAINT Post_pk PRIMARY KEY,
    Description text NOT NULL,
    imageUrl integer NOT NULL,
    CONSTRAINT Post_CompanyPosts FOREIGN KEY (PostId)
    REFERENCES CompanyPosts (CompanyPosts)
);

-- End of file.

