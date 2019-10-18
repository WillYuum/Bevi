-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2019-10-17 10:10:33.416


--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

-- tables
-- Table: Companies
    CREATE TABLE Companies (
        CompanyId integer NOT NULL CONSTRAINT Companies_pk PRIMARY KEY,
        CompanyLogo text ,
        CompanyName text ,
        CompanytypeId integer NOT NULL,
        CompanyWebLink text ,
        CompanyDescription text,
        CONSTRAINT Companies_Copy_of_Table_1 FOREIGN KEY (CompanytypeId)
        REFERENCES Types (TypeId)
);

-- Table: CompanyPosts
CREATE TABLE CompanyPosts (
    CompanyId integer NOT NULL,
    CompanyPost integer NOT NULL CONSTRAINT CompanyPosts_pk PRIMARY KEY,
    CONSTRAINT Copy_of_Table_1_Companies FOREIGN KEY (CompanyId)
    REFERENCES Companies (CompanyId)
);

-- Table: Post
CREATE TABLE Post (
    PostId integer NOT NULL CONSTRAINT Post_pk PRIMARY KEY,
    Description text NOT NULL,
    ImageUrl text NOT NULL,
    CONSTRAINT Copy_of_Table_1_Copy_of_Table_1 FOREIGN KEY (PostId)
    REFERENCES CompanyPosts (CompanyPost)
);

-- Table: Types
CREATE TABLE Types (
    TypeId integer NOT NULL CONSTRAINT Types_pk PRIMARY KEY,
    Type text NOT NULL
);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------


DROP TABLE CompanyPosts
DROP TABLE Post
DROP TABLE Companies
DROP TABLE Types