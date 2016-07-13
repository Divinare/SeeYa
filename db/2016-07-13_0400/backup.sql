--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: Addresses; Type: TABLE; Schema: public; Owner: joe; Tablespace: 
--

CREATE TABLE "Addresses" (
    id integer NOT NULL,
    "streetAddress" character varying(255) NOT NULL,
    country character varying(255),
    city character varying(255),
    "zipCode" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE "Addresses" OWNER TO joe;

--
-- Name: Addresses_id_seq; Type: SEQUENCE; Schema: public; Owner: joe
--

CREATE SEQUENCE "Addresses_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Addresses_id_seq" OWNER TO joe;

--
-- Name: Addresses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: joe
--

ALTER SEQUENCE "Addresses_id_seq" OWNED BY "Addresses".id;


--
-- Name: Attendances; Type: TABLE; Schema: public; Owner: joe; Tablespace: 
--

CREATE TABLE "Attendances" (
    id integer NOT NULL,
    comment character varying(255),
    "sendEmail" boolean DEFAULT false NOT NULL,
    confirmed boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "eventId" integer,
    "userId" integer
);


ALTER TABLE "Attendances" OWNER TO joe;

--
-- Name: Attendances_id_seq; Type: SEQUENCE; Schema: public; Owner: joe
--

CREATE SEQUENCE "Attendances_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Attendances_id_seq" OWNER TO joe;

--
-- Name: Attendances_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: joe
--

ALTER SEQUENCE "Attendances_id_seq" OWNED BY "Attendances".id;


--
-- Name: Categories; Type: TABLE; Schema: public; Owner: joe; Tablespace: 
--

CREATE TABLE "Categories" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE "Categories" OWNER TO joe;

--
-- Name: Categories_id_seq; Type: SEQUENCE; Schema: public; Owner: joe
--

CREATE SEQUENCE "Categories_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Categories_id_seq" OWNER TO joe;

--
-- Name: Categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: joe
--

ALTER SEQUENCE "Categories_id_seq" OWNED BY "Categories".id;


--
-- Name: Contacts; Type: TABLE; Schema: public; Owner: joe; Tablespace: 
--

CREATE TABLE "Contacts" (
    id integer NOT NULL,
    "subjectId" integer NOT NULL,
    "userId" integer,
    email character varying(255),
    description character varying(500) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE "Contacts" OWNER TO joe;

--
-- Name: Contacts_id_seq; Type: SEQUENCE; Schema: public; Owner: joe
--

CREATE SEQUENCE "Contacts_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Contacts_id_seq" OWNER TO joe;

--
-- Name: Contacts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: joe
--

ALTER SEQUENCE "Contacts_id_seq" OWNED BY "Contacts".id;


--
-- Name: EventLanguages; Type: TABLE; Schema: public; Owner: joe; Tablespace: 
--

CREATE TABLE "EventLanguages" (
    language character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "languageId" integer NOT NULL,
    "eventId" integer NOT NULL
);


ALTER TABLE "EventLanguages" OWNER TO joe;

--
-- Name: EventQueues; Type: TABLE; Schema: public; Owner: joe; Tablespace: 
--

CREATE TABLE "EventQueues" (
    id integer NOT NULL,
    comment character varying(255),
    "sendEmail" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "eventId" integer,
    "userId" integer
);


ALTER TABLE "EventQueues" OWNER TO joe;

--
-- Name: EventQueues_id_seq; Type: SEQUENCE; Schema: public; Owner: joe
--

CREATE SEQUENCE "EventQueues_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "EventQueues_id_seq" OWNER TO joe;

--
-- Name: EventQueues_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: joe
--

ALTER SEQUENCE "EventQueues_id_seq" OWNED BY "EventQueues".id;


--
-- Name: EventReports; Type: TABLE; Schema: public; Owner: joe; Tablespace: 
--

CREATE TABLE "EventReports" (
    id integer NOT NULL,
    "reporterUserId" integer NOT NULL,
    comment character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "eventId" integer
);


ALTER TABLE "EventReports" OWNER TO joe;

--
-- Name: EventReports_id_seq; Type: SEQUENCE; Schema: public; Owner: joe
--

CREATE SEQUENCE "EventReports_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "EventReports_id_seq" OWNER TO joe;

--
-- Name: EventReports_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: joe
--

ALTER SEQUENCE "EventReports_id_seq" OWNED BY "EventReports".id;


--
-- Name: Events; Type: TABLE; Schema: public; Owner: joe; Tablespace: 
--

CREATE TABLE "Events" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(2500),
    lon double precision NOT NULL,
    lat double precision NOT NULL,
    "timestamp" bigint NOT NULL,
    "maxAttendees" integer,
    "confirmStart" timestamp with time zone,
    "confirmEnd" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "AddressId" integer,
    "categoryId" integer,
    creator integer,
    "CategoryId" integer
);


ALTER TABLE "Events" OWNER TO joe;

--
-- Name: Events_id_seq; Type: SEQUENCE; Schema: public; Owner: joe
--

CREATE SEQUENCE "Events_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Events_id_seq" OWNER TO joe;

--
-- Name: Events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: joe
--

ALTER SEQUENCE "Events_id_seq" OWNED BY "Events".id;


--
-- Name: Languages; Type: TABLE; Schema: public; Owner: joe; Tablespace: 
--

CREATE TABLE "Languages" (
    id integer NOT NULL,
    language character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE "Languages" OWNER TO joe;

--
-- Name: Languages_id_seq; Type: SEQUENCE; Schema: public; Owner: joe
--

CREATE SEQUENCE "Languages_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Languages_id_seq" OWNER TO joe;

--
-- Name: Languages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: joe
--

ALTER SEQUENCE "Languages_id_seq" OWNED BY "Languages".id;


--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: joe; Tablespace: 
--

CREATE TABLE "SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE "SequelizeMeta" OWNER TO joe;

--
-- Name: UserReports; Type: TABLE; Schema: public; Owner: joe; Tablespace: 
--

CREATE TABLE "UserReports" (
    id integer NOT NULL,
    "reporterUserId" integer NOT NULL,
    comment character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" integer
);


ALTER TABLE "UserReports" OWNER TO joe;

--
-- Name: UserReports_id_seq; Type: SEQUENCE; Schema: public; Owner: joe
--

CREATE SEQUENCE "UserReports_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "UserReports_id_seq" OWNER TO joe;

--
-- Name: UserReports_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: joe
--

ALTER SEQUENCE "UserReports_id_seq" OWNED BY "UserReports".id;


--
-- Name: Users; Type: TABLE; Schema: public; Owner: joe; Tablespace: 
--

CREATE TABLE "Users" (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(512),
    email character varying(255),
    salt character varying(512),
    role character varying(255) DEFAULT 'User'::character varying NOT NULL,
    "emailVerified" boolean DEFAULT false NOT NULL,
    "emailVerificationId" character varying(255),
    "countOfSentVerificationEmails" integer DEFAULT 0 NOT NULL,
    "showNotifications" boolean DEFAULT true NOT NULL,
    "authProvider" character varying(255),
    "authProvUserId" character varying(255),
    "forgotPasswordId" character varying(255),
    "forgotPasswordIdCreateTime" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE "Users" OWNER TO joe;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: joe
--

CREATE SEQUENCE "Users_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Users_id_seq" OWNER TO joe;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: joe
--

ALTER SEQUENCE "Users_id_seq" OWNED BY "Users".id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: joe
--

ALTER TABLE ONLY "Addresses" ALTER COLUMN id SET DEFAULT nextval('"Addresses_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: joe
--

ALTER TABLE ONLY "Attendances" ALTER COLUMN id SET DEFAULT nextval('"Attendances_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: joe
--

ALTER TABLE ONLY "Categories" ALTER COLUMN id SET DEFAULT nextval('"Categories_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: joe
--

ALTER TABLE ONLY "Contacts" ALTER COLUMN id SET DEFAULT nextval('"Contacts_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: joe
--

ALTER TABLE ONLY "EventQueues" ALTER COLUMN id SET DEFAULT nextval('"EventQueues_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: joe
--

ALTER TABLE ONLY "EventReports" ALTER COLUMN id SET DEFAULT nextval('"EventReports_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: joe
--

ALTER TABLE ONLY "Events" ALTER COLUMN id SET DEFAULT nextval('"Events_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: joe
--

ALTER TABLE ONLY "Languages" ALTER COLUMN id SET DEFAULT nextval('"Languages_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: joe
--

ALTER TABLE ONLY "UserReports" ALTER COLUMN id SET DEFAULT nextval('"UserReports_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: joe
--

ALTER TABLE ONLY "Users" ALTER COLUMN id SET DEFAULT nextval('"Users_id_seq"'::regclass);


--
-- Data for Name: Addresses; Type: TABLE DATA; Schema: public; Owner: joe
--

COPY "Addresses" (id, "streetAddress", country, city, "zipCode", "createdAt", "updatedAt") FROM stdin;
1	Helsinki, Finland	Finland	Helsinki	\N	2016-05-01 19:51:22.997+03	2016-05-01 19:51:22.997+03
\.


--
-- Name: Addresses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: joe
--

SELECT pg_catalog.setval('"Addresses_id_seq"', 1, true);


--
-- Data for Name: Attendances; Type: TABLE DATA; Schema: public; Owner: joe
--

COPY "Attendances" (id, comment, "sendEmail", confirmed, "createdAt", "updatedAt", "eventId", "userId") FROM stdin;
1	\N	f	f	2016-05-01 19:51:23.081+03	2016-05-01 19:51:23.081+03	1	1
\.


--
-- Name: Attendances_id_seq; Type: SEQUENCE SET; Schema: public; Owner: joe
--

SELECT pg_catalog.setval('"Attendances_id_seq"', 1, true);


--
-- Data for Name: Categories; Type: TABLE DATA; Schema: public; Owner: joe
--

COPY "Categories" (id, name, "createdAt", "updatedAt") FROM stdin;
1	Sports	2016-05-01 19:42:21.021559+03	2016-05-01 19:42:21.021559+03
2	Socializing	2016-05-01 19:42:21.021559+03	2016-05-01 19:42:21.021559+03
3	Food & Drink	2016-05-01 19:42:21.021559+03	2016-05-01 19:42:21.021559+03
4	Nature	2016-05-01 19:42:21.021559+03	2016-05-01 19:42:21.021559+03
5	Music	2016-05-01 19:42:21.021559+03	2016-05-01 19:42:21.021559+03
6	Travel	2016-05-01 19:42:21.021559+03	2016-05-01 19:42:21.021559+03
7	Other	2016-05-01 19:42:21.021559+03	2016-05-01 19:42:21.021559+03
\.


--
-- Name: Categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: joe
--

SELECT pg_catalog.setval('"Categories_id_seq"', 1, false);


--
-- Data for Name: Contacts; Type: TABLE DATA; Schema: public; Owner: joe
--

COPY "Contacts" (id, "subjectId", "userId", email, description, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Name: Contacts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: joe
--

SELECT pg_catalog.setval('"Contacts_id_seq"', 1, false);


--
-- Data for Name: EventLanguages; Type: TABLE DATA; Schema: public; Owner: joe
--

COPY "EventLanguages" (language, "createdAt", "updatedAt", "languageId", "eventId") FROM stdin;
\.


--
-- Data for Name: EventQueues; Type: TABLE DATA; Schema: public; Owner: joe
--

COPY "EventQueues" (id, comment, "sendEmail", "createdAt", "updatedAt", "eventId", "userId") FROM stdin;
\.


--
-- Name: EventQueues_id_seq; Type: SEQUENCE SET; Schema: public; Owner: joe
--

SELECT pg_catalog.setval('"EventQueues_id_seq"', 1, false);


--
-- Data for Name: EventReports; Type: TABLE DATA; Schema: public; Owner: joe
--

COPY "EventReports" (id, "reporterUserId", comment, "createdAt", "updatedAt", "eventId") FROM stdin;
\.


--
-- Name: EventReports_id_seq; Type: SEQUENCE SET; Schema: public; Owner: joe
--

SELECT pg_catalog.setval('"EventReports_id_seq"', 1, false);


--
-- Data for Name: Events; Type: TABLE DATA; Schema: public; Owner: joe
--

COPY "Events" (id, name, description, lon, lat, "timestamp", "maxAttendees", "confirmStart", "confirmEnd", "createdAt", "updatedAt", "AddressId", "categoryId", creator, "CategoryId") FROM stdin;
1	Description length test	EN \n\nRestaurant Day is just around the corner and Project for Romania ry will be there with more traditional goodies! \n\nJoin us on a journey of rich flavors, subtle aromas and traditional cooking techniques, that deliciously combine culinary elements from different regions of Romania! Our rich history is ever-present in our food, our cuisine including Greek, Turkish, Saxon, Slavic and Magyar influences. \n\nOn May 21st 2016, experience a piece of Romania: \n\n1st course \n- Soup Rădăuţeana, 3€/serving \n\n2nd course \n- Spinach and nettles in milk with garlic and grilled sausages and 2 slices of bread, 5€/serving \n\nDessert \n- Homemade milk poultry, 2€/serving \n\nFull menu (1st course+2nd course+ dessert) - 10€ \n\nCoffee/Tea/Lemonade - 1€/cup \n\nGive us a taste, we promise you won’t be disappointed! :) Cash is king. \n\nProject for Romania members - 50% discount. To learn more about the benefits of becoming a member, contact us at project@4romania.fi \n\n\n--- \nRO \n\nPe 21 Mai 2016, la Ravintolapäivä se mănâncă românește! \n\nVă așteptăm și de data aceasta la Ziua Restaurantelor cu preparate felurite și pline de savoare! \n\nFelul 1: Ciorbă Rădăuțeană - 3€/porție \n\nFelul 2: Spanac si urzici in lapte cu usturoi cu carnaț la grătar - 5€/porție \n\nDesert: Lapte de pasăre- 2€/porție \n\nMeniu complet (Felul 1,2 si desert) - 10€ \n\nCafea/Ceai/Limonadă - 1€/pahar \n\nPOFTĂ BUNĂ! \n\nMembrii Project for Romania beneficiază de o reducere de 50%. \nContactați-ne la project@4romania.fi pentru mai multe informații despre oportunitatea de a deveni membru.	24.9383789999999408	60.1698556999999923	1463590200000	\N	\N	\N	2016-05-01 19:51:23.026+03	2016-05-01 19:51:23.081+03	1	\N	1	5
\.


--
-- Name: Events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: joe
--

SELECT pg_catalog.setval('"Events_id_seq"', 1, true);


--
-- Data for Name: Languages; Type: TABLE DATA; Schema: public; Owner: joe
--

COPY "Languages" (id, language, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Name: Languages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: joe
--

SELECT pg_catalog.setval('"Languages_id_seq"', 1, false);


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: joe
--

COPY "SequelizeMeta" (name) FROM stdin;
20160501194528-more-length-to-event-description-field.js
\.


--
-- Data for Name: UserReports; Type: TABLE DATA; Schema: public; Owner: joe
--

COPY "UserReports" (id, "reporterUserId", comment, "createdAt", "updatedAt", "userId") FROM stdin;
\.


--
-- Name: UserReports_id_seq; Type: SEQUENCE SET; Schema: public; Owner: joe
--

SELECT pg_catalog.setval('"UserReports_id_seq"', 1, false);


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: joe
--

COPY "Users" (id, username, password, email, salt, role, "emailVerified", "emailVerificationId", "countOfSentVerificationEmails", "showNotifications", "authProvider", "authProvUserId", "forgotPasswordId", "forgotPasswordIdCreateTime", "createdAt", "updatedAt") FROM stdin;
1	Joe	709f6d5bdfffbfcdafe27b71e5491a8d27410da8bdc764e6f1a753516595a1458dad04850755ebd6afd4a5851caa6db2fd9ddcf9b67bd6f7eec1ce5014afc9d184cbf2d659c890cd6185da2a03f4ccf2d34ef7fc5056d7cb32dcaa6ac908bc403f525fc56fac4aab1a749a39df441f0c33f6a9911c0bdf62feefc0fc7471507ac8ed9d057a6847df36af78aea2adfc961548a7582b08ba173d0129219ef40d70a871cb1d1a83a053bc7783add566a55ecb473537a1420593383b2e64aaf1f71b5d568ad23d2b57670ee3e6c21b71400a355300e06009adb8febe75bd0e1b8945d44c191e1ea24ef21467ced1b91e17fd289612574c990a5f50972b668953ba94	niemijoe@hotmail.com	c1606d9c9bf7326a87caf4be63a5280f164671b0319a65d0e4df9c87f0b9c325a2945ac96716fe08253013101b2e0d0d0ed0f7b96a743b6daff844f637526766d40f77ed90bf581b0ed1abd19c52aed8d25a2c877d9afa51c4f38e30177351a272d7c016064cc62652c9b89333d788c38ffe508ef8db43654121f8dd3f5e20b5c5e2f2d2aa1dacda2bcd698675a9aa74480a884dcc298671b55ef3a976167956ad9b9d61efe9e963b625d8f1111d88772be4b077a46d16ee6868daefdbfb9b3c45c1d9e17deceeba12abef03ac44cb65639d35e7c0583e78450b286953ec01bb616cfb302e576c54fc1fe56c409edf9bb97dd6b9f9cd03ae1427623aa16b776f	User	t	zWZGOM2qUwR9zTNJpOn5VAeixPtnCExJXNXA2cON7feMF9JMm2YbYdRjYvpu4YMjwTcfmrUwQPS	0	t	\N	\N	\N	\N	2016-05-01 19:48:42.038+03	2016-05-01 19:49:03.55+03
\.


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: joe
--

SELECT pg_catalog.setval('"Users_id_seq"', 1, true);


--
-- Name: Addresses_pkey; Type: CONSTRAINT; Schema: public; Owner: joe; Tablespace: 
--

ALTER TABLE ONLY "Addresses"
    ADD CONSTRAINT "Addresses_pkey" PRIMARY KEY (id);


--
-- Name: Attendances_eventId_userId_key; Type: CONSTRAINT; Schema: public; Owner: joe; Tablespace: 
--

ALTER TABLE ONLY "Attendances"
    ADD CONSTRAINT "Attendances_eventId_userId_key" UNIQUE ("eventId", "userId");


--
-- Name: Attendances_pkey; Type: CONSTRAINT; Schema: public; Owner: joe; Tablespace: 
--

ALTER TABLE ONLY "Attendances"
    ADD CONSTRAINT "Attendances_pkey" PRIMARY KEY (id);


--
-- Name: Categories_pkey; Type: CONSTRAINT; Schema: public; Owner: joe; Tablespace: 
--

ALTER TABLE ONLY "Categories"
    ADD CONSTRAINT "Categories_pkey" PRIMARY KEY (id);


--
-- Name: Contacts_pkey; Type: CONSTRAINT; Schema: public; Owner: joe; Tablespace: 
--

ALTER TABLE ONLY "Contacts"
    ADD CONSTRAINT "Contacts_pkey" PRIMARY KEY (id);


--
-- Name: EventLanguages_pkey; Type: CONSTRAINT; Schema: public; Owner: joe; Tablespace: 
--

ALTER TABLE ONLY "EventLanguages"
    ADD CONSTRAINT "EventLanguages_pkey" PRIMARY KEY ("languageId", "eventId");


--
-- Name: EventQueues_pkey; Type: CONSTRAINT; Schema: public; Owner: joe; Tablespace: 
--

ALTER TABLE ONLY "EventQueues"
    ADD CONSTRAINT "EventQueues_pkey" PRIMARY KEY (id);


--
-- Name: EventReports_pkey; Type: CONSTRAINT; Schema: public; Owner: joe; Tablespace: 
--

ALTER TABLE ONLY "EventReports"
    ADD CONSTRAINT "EventReports_pkey" PRIMARY KEY (id);


--
-- Name: Events_pkey; Type: CONSTRAINT; Schema: public; Owner: joe; Tablespace: 
--

ALTER TABLE ONLY "Events"
    ADD CONSTRAINT "Events_pkey" PRIMARY KEY (id);


--
-- Name: Languages_pkey; Type: CONSTRAINT; Schema: public; Owner: joe; Tablespace: 
--

ALTER TABLE ONLY "Languages"
    ADD CONSTRAINT "Languages_pkey" PRIMARY KEY (id);


--
-- Name: SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: joe; Tablespace: 
--

ALTER TABLE ONLY "SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: UserReports_pkey; Type: CONSTRAINT; Schema: public; Owner: joe; Tablespace: 
--

ALTER TABLE ONLY "UserReports"
    ADD CONSTRAINT "UserReports_pkey" PRIMARY KEY (id);


--
-- Name: Users_email_key; Type: CONSTRAINT; Schema: public; Owner: joe; Tablespace: 
--

ALTER TABLE ONLY "Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);


--
-- Name: Users_pkey; Type: CONSTRAINT; Schema: public; Owner: joe; Tablespace: 
--

ALTER TABLE ONLY "Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: Attendances_eventId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: joe
--

ALTER TABLE ONLY "Attendances"
    ADD CONSTRAINT "Attendances_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Events"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Attendances_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: joe
--

ALTER TABLE ONLY "Attendances"
    ADD CONSTRAINT "Attendances_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: EventLanguages_eventId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: joe
--

ALTER TABLE ONLY "EventLanguages"
    ADD CONSTRAINT "EventLanguages_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Events"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: EventLanguages_languageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: joe
--

ALTER TABLE ONLY "EventLanguages"
    ADD CONSTRAINT "EventLanguages_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Languages"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: EventQueues_eventId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: joe
--

ALTER TABLE ONLY "EventQueues"
    ADD CONSTRAINT "EventQueues_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Events"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: EventQueues_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: joe
--

ALTER TABLE ONLY "EventQueues"
    ADD CONSTRAINT "EventQueues_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: EventReports_eventId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: joe
--

ALTER TABLE ONLY "EventReports"
    ADD CONSTRAINT "EventReports_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Events"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Events_AddressId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: joe
--

ALTER TABLE ONLY "Events"
    ADD CONSTRAINT "Events_AddressId_fkey" FOREIGN KEY ("AddressId") REFERENCES "Addresses"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Events_CategoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: joe
--

ALTER TABLE ONLY "Events"
    ADD CONSTRAINT "Events_CategoryId_fkey" FOREIGN KEY ("CategoryId") REFERENCES "Categories"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Events_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: joe
--

ALTER TABLE ONLY "Events"
    ADD CONSTRAINT "Events_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Events_creator_fkey; Type: FK CONSTRAINT; Schema: public; Owner: joe
--

ALTER TABLE ONLY "Events"
    ADD CONSTRAINT "Events_creator_fkey" FOREIGN KEY (creator) REFERENCES "Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: UserReports_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: joe
--

ALTER TABLE ONLY "UserReports"
    ADD CONSTRAINT "UserReports_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: public; Type: ACL; Schema: -; Owner: joe
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM joe;
GRANT ALL ON SCHEMA public TO joe;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

