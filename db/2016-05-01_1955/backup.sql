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
-- Name: Addresses; Type: TABLE; Schema: public; Owner: general; Tablespace: 
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


ALTER TABLE public."Addresses" OWNER TO general;

--
-- Name: Addresses_id_seq; Type: SEQUENCE; Schema: public; Owner: general
--

CREATE SEQUENCE "Addresses_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Addresses_id_seq" OWNER TO general;

--
-- Name: Addresses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: general
--

ALTER SEQUENCE "Addresses_id_seq" OWNED BY "Addresses".id;


--
-- Name: Attendances; Type: TABLE; Schema: public; Owner: general; Tablespace: 
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


ALTER TABLE public."Attendances" OWNER TO general;

--
-- Name: Attendances_id_seq; Type: SEQUENCE; Schema: public; Owner: general
--

CREATE SEQUENCE "Attendances_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Attendances_id_seq" OWNER TO general;

--
-- Name: Attendances_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: general
--

ALTER SEQUENCE "Attendances_id_seq" OWNED BY "Attendances".id;


--
-- Name: Categories; Type: TABLE; Schema: public; Owner: general; Tablespace: 
--

CREATE TABLE "Categories" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Categories" OWNER TO general;

--
-- Name: Categories_id_seq; Type: SEQUENCE; Schema: public; Owner: general
--

CREATE SEQUENCE "Categories_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Categories_id_seq" OWNER TO general;

--
-- Name: Categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: general
--

ALTER SEQUENCE "Categories_id_seq" OWNED BY "Categories".id;


--
-- Name: Contacts; Type: TABLE; Schema: public; Owner: general; Tablespace: 
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


ALTER TABLE public."Contacts" OWNER TO general;

--
-- Name: Contacts_id_seq; Type: SEQUENCE; Schema: public; Owner: general
--

CREATE SEQUENCE "Contacts_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Contacts_id_seq" OWNER TO general;

--
-- Name: Contacts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: general
--

ALTER SEQUENCE "Contacts_id_seq" OWNED BY "Contacts".id;


--
-- Name: EventLanguages; Type: TABLE; Schema: public; Owner: general; Tablespace: 
--

CREATE TABLE "EventLanguages" (
    language character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "languageId" integer NOT NULL,
    "eventId" integer NOT NULL
);


ALTER TABLE public."EventLanguages" OWNER TO general;

--
-- Name: EventQueues; Type: TABLE; Schema: public; Owner: general; Tablespace: 
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


ALTER TABLE public."EventQueues" OWNER TO general;

--
-- Name: EventQueues_id_seq; Type: SEQUENCE; Schema: public; Owner: general
--

CREATE SEQUENCE "EventQueues_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."EventQueues_id_seq" OWNER TO general;

--
-- Name: EventQueues_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: general
--

ALTER SEQUENCE "EventQueues_id_seq" OWNED BY "EventQueues".id;


--
-- Name: EventReports; Type: TABLE; Schema: public; Owner: general; Tablespace: 
--

CREATE TABLE "EventReports" (
    id integer NOT NULL,
    "reporterUserId" integer NOT NULL,
    comment character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "eventId" integer
);


ALTER TABLE public."EventReports" OWNER TO general;

--
-- Name: EventReports_id_seq; Type: SEQUENCE; Schema: public; Owner: general
--

CREATE SEQUENCE "EventReports_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."EventReports_id_seq" OWNER TO general;

--
-- Name: EventReports_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: general
--

ALTER SEQUENCE "EventReports_id_seq" OWNED BY "EventReports".id;


--
-- Name: Events; Type: TABLE; Schema: public; Owner: general; Tablespace: 
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


ALTER TABLE public."Events" OWNER TO general;

--
-- Name: Events_id_seq; Type: SEQUENCE; Schema: public; Owner: general
--

CREATE SEQUENCE "Events_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Events_id_seq" OWNER TO general;

--
-- Name: Events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: general
--

ALTER SEQUENCE "Events_id_seq" OWNED BY "Events".id;


--
-- Name: Languages; Type: TABLE; Schema: public; Owner: general; Tablespace: 
--

CREATE TABLE "Languages" (
    id integer NOT NULL,
    language character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Languages" OWNER TO general;

--
-- Name: Languages_id_seq; Type: SEQUENCE; Schema: public; Owner: general
--

CREATE SEQUENCE "Languages_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Languages_id_seq" OWNER TO general;

--
-- Name: Languages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: general
--

ALTER SEQUENCE "Languages_id_seq" OWNED BY "Languages".id;


--
-- Name: UserReports; Type: TABLE; Schema: public; Owner: general; Tablespace: 
--

CREATE TABLE "UserReports" (
    id integer NOT NULL,
    "reporterUserId" integer NOT NULL,
    comment character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" integer
);


ALTER TABLE public."UserReports" OWNER TO general;

--
-- Name: UserReports_id_seq; Type: SEQUENCE; Schema: public; Owner: general
--

CREATE SEQUENCE "UserReports_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."UserReports_id_seq" OWNER TO general;

--
-- Name: UserReports_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: general
--

ALTER SEQUENCE "UserReports_id_seq" OWNED BY "UserReports".id;


--
-- Name: Users; Type: TABLE; Schema: public; Owner: general; Tablespace: 
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


ALTER TABLE public."Users" OWNER TO general;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: general
--

CREATE SEQUENCE "Users_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_id_seq" OWNER TO general;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: general
--

ALTER SEQUENCE "Users_id_seq" OWNED BY "Users".id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: general
--

ALTER TABLE ONLY "Addresses" ALTER COLUMN id SET DEFAULT nextval('"Addresses_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: general
--

ALTER TABLE ONLY "Attendances" ALTER COLUMN id SET DEFAULT nextval('"Attendances_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: general
--

ALTER TABLE ONLY "Categories" ALTER COLUMN id SET DEFAULT nextval('"Categories_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: general
--

ALTER TABLE ONLY "Contacts" ALTER COLUMN id SET DEFAULT nextval('"Contacts_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: general
--

ALTER TABLE ONLY "EventQueues" ALTER COLUMN id SET DEFAULT nextval('"EventQueues_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: general
--

ALTER TABLE ONLY "EventReports" ALTER COLUMN id SET DEFAULT nextval('"EventReports_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: general
--

ALTER TABLE ONLY "Events" ALTER COLUMN id SET DEFAULT nextval('"Events_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: general
--

ALTER TABLE ONLY "Languages" ALTER COLUMN id SET DEFAULT nextval('"Languages_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: general
--

ALTER TABLE ONLY "UserReports" ALTER COLUMN id SET DEFAULT nextval('"UserReports_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: general
--

ALTER TABLE ONLY "Users" ALTER COLUMN id SET DEFAULT nextval('"Users_id_seq"'::regclass);


--
-- Data for Name: Addresses; Type: TABLE DATA; Schema: public; Owner: general
--

COPY "Addresses" (id, "streetAddress", country, city, "zipCode", "createdAt", "updatedAt") FROM stdin;
1	Hietsu, Helsinki, Finland	Finland	Helsingfors	00100	2016-05-01 19:08:28.41+02	2016-05-01 19:08:28.41+02
2	Hietaniemi, 00100 Helsinki, Finland	Finland	Helsinki	00100	2016-05-01 19:12:35.547+02	2016-05-01 19:12:35.547+02
3	Drottning Kristinas väg 33, 114 28 Stockholm, Sweden	Sweden	Stockholm	114 28	2016-05-01 19:16:28.347+02	2016-05-01 19:16:28.347+02
4	Pohjoisesplanadi 27, 00100 Helsinki, Finland	Finland	Helsinki	00100	2016-05-01 19:17:08.909+02	2016-05-01 19:17:08.909+02
5	Museivägen 7, 115 27 Stockholm, Sweden	Sweden	Stockholm	115 27	2016-05-01 19:19:11.101+02	2016-05-01 19:19:11.101+02
6	Tennispalatsinaukio, 00100 Helsinki, Finland	Finland	Helsinki	00100	2016-05-01 19:23:43.052+02	2016-05-01 19:23:43.052+02
7	Salomonkatu 15, 00100 Helsinki, Finland	Finland	Helsinki	00100	2016-05-01 19:23:49.039+02	2016-05-01 19:23:49.039+02
8	Helsinki, Finland	Finland	Helsinki	00160	2016-05-01 19:27:16.063+02	2016-05-01 19:27:16.063+02
9	Helsinginkatu 25, 00101 Helsinki, Finland	Finland	Helsinki	00510	2016-05-01 19:28:40.971+02	2016-05-01 19:28:40.971+02
10	Djurgårdsbrunnsvägen 34, 115 27 Stockholm, Sweden	Sweden	Stockholm	115 27	2016-05-01 19:33:40.518+02	2016-05-01 19:33:40.518+02
11	Korkeasaari, Helsinki, Finland	Finland	Helsinki	\N	2016-05-01 19:36:48.2+02	2016-05-01 19:36:48.2+02
12	Kaivopuisto, Helsinki, Finland	Finland	Helsinki	\N	2016-05-01 19:37:13.133+02	2016-05-01 19:37:13.133+02
13	Harbonkatu 13, 00980 Helsinki, Finland	Finland	Helsinki	00980	2016-05-01 19:38:31.997+02	2016-05-01 19:38:31.997+02
14	Kaivopuisto, Helsinki, Finland	Finland	Helsingfors	00140	2016-05-01 19:39:50.932+02	2016-05-01 19:39:50.932+02
15	Sahaajankatu 8, 00880 Helsinki, Finland	Finland	Helsinki	00880	2016-05-01 19:48:00.718+02	2016-05-01 19:48:00.718+02
16	Birger Jarlsgatan 4, 114 34 Stockholm, Sweden	Sweden	Stockholm	114 34	2016-05-01 19:50:06.409+02	2016-05-01 19:50:06.409+02
17	Ericsson Globen, 121 77 Johanneshov, Sweden	Sweden	Stockholm	121 77	2016-05-01 19:51:43.132+02	2016-05-01 19:51:43.132+02
18	Stockholm, Sweden	Sweden	Stockholm	\N	2016-05-01 19:53:52.079+02	2016-05-01 19:53:52.079+02
\.


--
-- Name: Addresses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: general
--

SELECT pg_catalog.setval('"Addresses_id_seq"', 18, true);


--
-- Data for Name: Attendances; Type: TABLE DATA; Schema: public; Owner: general
--

COPY "Attendances" (id, comment, "sendEmail", confirmed, "createdAt", "updatedAt", "eventId", "userId") FROM stdin;
1	I can bring some frisbees	f	f	2016-05-01 19:08:28.467+02	2016-05-01 19:09:52.516+02	1	5
3	\N	f	f	2016-05-01 19:12:35.579+02	2016-05-01 19:12:35.579+02	2	2
4	\N	f	f	2016-05-01 19:16:28.383+02	2016-05-01 19:16:28.383+02	3	1
5	Bringing some drinks	f	f	2016-05-01 19:16:50.263+02	2016-05-01 19:16:50.263+02	2	1
7	\N	f	f	2016-05-01 19:19:11.141+02	2016-05-01 19:19:11.141+02	5	1
8	\N	f	f	2016-05-01 19:23:43.093+02	2016-05-01 19:23:43.093+02	6	1
11	\N	f	f	2016-05-01 19:28:33.523+02	2016-05-01 19:28:33.523+02	2	5
14	\N	f	f	2016-05-01 19:31:04.058+02	2016-05-01 19:31:04.058+02	1	7
15	\N	f	f	2016-05-01 19:33:40.571+02	2016-05-01 19:33:40.571+02	10	1
16	\N	f	f	2016-05-01 19:36:48.228+02	2016-05-01 19:36:48.228+02	11	1
20	\N	f	f	2016-05-01 19:50:06.435+02	2016-05-01 19:50:06.435+02	15	1
21	\N	f	f	2016-05-01 19:51:43.153+02	2016-05-01 19:51:43.153+02	16	1
22	\N	f	f	2016-05-01 19:53:52.104+02	2016-05-01 19:53:52.104+02	17	1
\.


--
-- Name: Attendances_id_seq; Type: SEQUENCE SET; Schema: public; Owner: general
--

SELECT pg_catalog.setval('"Attendances_id_seq"', 22, true);


--
-- Data for Name: Categories; Type: TABLE DATA; Schema: public; Owner: general
--

COPY "Categories" (id, name, "createdAt", "updatedAt") FROM stdin;
1	Sports	2016-05-01 19:06:38.513309+02	2016-05-01 19:06:38.513309+02
2	Socializing	2016-05-01 19:06:38.513309+02	2016-05-01 19:06:38.513309+02
3	Food & Drink	2016-05-01 19:06:38.513309+02	2016-05-01 19:06:38.513309+02
4	Nature	2016-05-01 19:06:38.513309+02	2016-05-01 19:06:38.513309+02
5	Music	2016-05-01 19:06:38.513309+02	2016-05-01 19:06:38.513309+02
6	Travel	2016-05-01 19:06:38.513309+02	2016-05-01 19:06:38.513309+02
7	Other	2016-05-01 19:06:38.513309+02	2016-05-01 19:06:38.513309+02
\.


--
-- Name: Categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: general
--

SELECT pg_catalog.setval('"Categories_id_seq"', 1, false);


--
-- Data for Name: Contacts; Type: TABLE DATA; Schema: public; Owner: general
--

COPY "Contacts" (id, "subjectId", "userId", email, description, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Name: Contacts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: general
--

SELECT pg_catalog.setval('"Contacts_id_seq"', 1, false);


--
-- Data for Name: EventLanguages; Type: TABLE DATA; Schema: public; Owner: general
--

COPY "EventLanguages" (language, "createdAt", "updatedAt", "languageId", "eventId") FROM stdin;
\.


--
-- Data for Name: EventQueues; Type: TABLE DATA; Schema: public; Owner: general
--

COPY "EventQueues" (id, comment, "sendEmail", "createdAt", "updatedAt", "eventId", "userId") FROM stdin;
\.


--
-- Name: EventQueues_id_seq; Type: SEQUENCE SET; Schema: public; Owner: general
--

SELECT pg_catalog.setval('"EventQueues_id_seq"', 1, false);


--
-- Data for Name: EventReports; Type: TABLE DATA; Schema: public; Owner: general
--

COPY "EventReports" (id, "reporterUserId", comment, "createdAt", "updatedAt", "eventId") FROM stdin;
\.


--
-- Name: EventReports_id_seq; Type: SEQUENCE SET; Schema: public; Owner: general
--

SELECT pg_catalog.setval('"EventReports_id_seq"', 1, false);


--
-- Data for Name: Events; Type: TABLE DATA; Schema: public; Owner: general
--

COPY "Events" (id, name, description, lon, lat, "timestamp", "maxAttendees", "confirmStart", "confirmEnd", "createdAt", "updatedAt", "AddressId", "categoryId", creator, "CategoryId") FROM stdin;
5	Free Tekniska Museet visit	Free entrance for all on Wednesdays from 5 pm – 8 pm.	18.1189656999999897	59.3325049000000035	1462374000000	\N	\N	\N	2016-05-01 19:19:11.125+02	2016-05-01 19:19:11.137+02	5	\N	1	6
9	International Yoga Day	https://www.facebook.com/events/1741722566064273/\n\nYoga transforms life, bringing a sense of balance, contentedness, peace, and careful consideration to one’s decisions and pathways through life. \n\nEmbassy of India in collaboration with our associates, invites everyone to come and join the International Yoga Day celebrations held at Helsingin Urheilutalo.\n\nMore details will follow on.\n\n----------- Finnish Version below -------------\n\nJooga tukee kehon ja mielen tasapainoa, ohjaa kohti mielenrauhaa ja johdattaa kohti syvempää itsetuntemusta. Joogasta tulee monille elämäntapa, joka johdattaa tasapainoiseen kehon ja mielen hyvinvointiin.\n\nIntian suurlähetystö yhdessä yhteistyökumppaneiden kanssa haluaa kutsua kaikki mukaan viettämään kansainvälistä joogapäivää Helsingin Urheilutalo.	24.9475380999999743	60.1865865999999983	1466337600000	\N	\N	\N	2016-05-01 19:28:41.023+02	2016-05-01 19:28:41.049+02	9	\N	2	2
1	Ultimate at hietsu	Let's meet at the corner of the beach (see map).	24.9086307058349803	60.1748309266206007	1463591280000	\N	\N	\N	2016-05-01 19:08:28.45+02	2016-05-01 19:09:42.116+02	1	\N	5	1
6	Anssi Kela Free Concert	It is on the roof of Tennispalatsi at 5pm.	24.9328331000000389	60.1692893999999967	1462546800000	\N	\N	\N	2016-05-01 19:23:43.074+02	2016-05-01 19:23:43.092+02	6	\N	1	5
2	SeeYa Meeting	Do you want to meet SeeYa team live? Give us some live feedback of the app. Come and see us!\n\nSeeYa!\n@TeamSeeYa	24.9052988608520991	60.1736769623002061	1465646400000	\N	\N	\N	2016-05-01 19:12:35.567+02	2016-05-01 19:12:35.576+02	2	\N	2	2
3	Lunch at Nymble	Ordinary Lunch at Nymble KTH. Eat at the restaurant or bring our own luchbox. 	18.0699845912934052	59.3489303540393109	1462269600000	\N	\N	\N	2016-05-01 19:16:28.371+02	2016-05-01 19:16:28.382+02	3	\N	1	3
4	Ravintolapäivä	https://www.facebook.com/events/223675497987891/\n\nEN \n\nRestaurant Day is just around the corner and Project for Romania ry will be there with more traditional goodies! \n\nJoin us on a journey of rich flavors, subtle aromas and traditional cooking techniques, that deliciously combine culinary elements from different regions of Romania! Our rich history is ever-present in our food, our cuisine including Greek, Turkish, Saxon, Slavic and Magyar influences. \n\nOn May 21st 2016, experience a piece of Romania: \n\n1st course \n- Soup Rădăuţeana, 3€/serving \n\n2nd course \n- Spinach and nettles in milk with garlic and grilled sausages and 2 slices of bread, 5€/serving \n\nDessert \n- Homemade milk poultry, 2€/serving \n\nFull menu (1st course+2nd course+ dessert) - 10€ \n\nCoffee/Tea/Lemonade - 1€/cup \n\nGive us a taste, we promise you won’t be disappointed! :) Cash is king. \n\nProject for Romania members - 50% discount. To learn more about the benefits of becoming a member, contact us at project@4romania.fi 	24.9480117000000519	60.1679024000000027	1463810400000	\N	\N	\N	2016-05-01 19:17:08.919+02	2016-05-01 19:50:07.5+02	4	\N	2	3
7	Anssi Kelan ilmaiskeikka	https://www.facebook.com/events/819582858174847/\n\nKEIKKA:\nPe 6.5.2016 klo 17 Tennispalatsin katto, Helsinki\nVapaa pääsy, kesto 30-45 minuuttia.\n\nAnssi Kela tekee perjantaina 6. toukokuuta klo 17 ainutlaatuisen soolokeikan Helsingin tunnetuimpiin rakennuksiin lukeutuvan Tennispalatsin katolla. Kela toteuttaa ilmaiskeikan kiittääkseen ja palkitakseen aktiivista Facebook-yhteisöään, jonka seuraajamäärä on noussut jo yli 85 000:een. \n\n"Muusikoiden keskuudessa puhutaan ns. erikoiskeikoista. Tämä on sellainen. Luvassa on takuuvarmasti esiintyminen, joka jää pysyvästi mieleen. Tästä tulee yksi tämän vuoden kohokohdista – eikä vain metreissä mitattuna", kertoo Anssi Kela.\n\nAnssi Kela tunnetaan Facebook-faneilleen järjestämistään keikkatempauksista jo entuudestaan. Ensimmäisen spesiaalikeikkansa hän järjesti vuonna 2012 Helsingissä Korjaamon Vintillä kun Facebook-tykkääjien määrä oli 5000. Keväällä 2013 tykkääjien määrä oli tuplaantunut, ja Kela kiitti fanejaan soittamalla ilmaisen keikan Hämeenlinnassa, Verkatehtaalla. Toukokuussa on aika juhlistaa yli 85 000:een noussutta Facebook-tykkääjämäärää keikalla Tennispalatsin katolla. Yleisö pääsee seuraamaan Kelan ilmaiskeikkaa Kampin keskuksen ja Tennispalatsin välissä olevalta aukiolta. \n\nKekseliäistä some-tempauksistaan tunnettu Anssi Kela on ollut ensimmäisten suomalaisten artistien joukossa hyödyntämässä myös livestriimausta. Kelan lukuisia suoria lähetyksiä on seurannut Facebookissa parhaimmillaan peräti 180 000 katsojaa ja tavoittavuus on ollut huikeat 635 000. Jakomäärät ovat liikkuneet useissa sadoissa ja kommentti- ja tykkäysmäärät ovat nousseet puolestaan useisiin tuhansiin. \n\nEsimerkkejä Kelan Facebook-livestriimauksista:\n\nMa 19.10.2015 klo 21\nLähetyksen lopussa 22 000 samanaikaista katsojaa \nYhteensä 117 000 katsojaa\n5900 kommenttia\n553 jakoa\n423 000 tavoitettu\n6700 tykkäystä\n\nKe 28.10.2015 klo 19\nLähetyksen lopussa 21 000 samanaikaista katsojaa\nYhteensä 83 000 katsojaa\n4500 kommenttia\n248 jakoa\n285 000 tavoitettu\n3000 tykkäystä\n\nKe 4.11.2015 klo 20\nLähetyksen lopussa 47 000 samanaikaista katsojaa\nYhteensä 180 000 katsojaa\n6600 kommenttia\n469 jakoa\n635 000 tavoitettu\n6500 tykkäystä\n\nViime viikot Anssi Kela on kiertänyt Suomea menestyksekkäällä Parasta Aikaa -konserttisalikiertueellaan. Konserttisaliesiintymiset olivat ennätyssuosittuja ja Kela konsertoi Helsingissä, Järvenpäässä, Lohjalla ja Turussa viimeistä paikkaa myöden loppuunmyydyille saleille.	24.9310568999999305	60.1692912999999976	1462543200000	\N	\N	\N	2016-05-01 19:23:49.048+02	2016-05-01 19:23:49.062+02	7	\N	2	5
8	Kaljakellunta	*Suomeksi:\nKaljakellunta on uusimaalainen avoin kesätapahtuma, jossa satunnainen määrä osallistujia kelluu kaikenlaisilla kelluvilla välineillä olutta litkien pitkin Keravanjokea tai Vantaajokea. Kaljakellunnalla ei ole virallista järjestäjää, mutta tapahtuman suosio on kasvanut eksponentiaalisesti vuosien varrella. Viime vuosina iloisia osallistujia on ollut jo useita tuhansia, sekä suosio on kasvanut myös turistien keskuudessa.\n\nKaljakellunta Facebook tapahtuman tekijä ei ole avoimen Kaljakellunta-tapahtuman järjestäjä eikä ota siitä minkäänlaista vastuuta. \n\nCheck the most up to date information at: https://www.facebook.com/events/1513432565588142/\n\nTietoa Kaljakelluntasta: http://www.kaljakellunta.org/ \n\n*English\nKaljakellunta or "Beer floating" is a festival organised every summer, where thousands of people float down the Vantaa/Kerava river in random inflatable boats and rafts, drinking beer. \n\nKaljakellunta has no official organiser, but it's popularity has been growing each year. Everyone is floating at their own responsibility. \n\nInformation about Kaljakellunta: http://www.kaljakellunta.org/en/ \n\n\nThe official date is decided by the participants themselves and the voted date and time will be published on this group. The creator of this event is not the organiser of Kaljakellunta and does not take any form of responsibility of this open event.	24.9352072089538979	60.1746277898675714	1467273600000	\N	\N	\N	2016-05-01 19:27:16.077+02	2016-05-01 19:27:16.085+02	8	\N	5	2
10	Free Etnografiska Museet	Free entrance to Museum from 1 February 2016!	18.1205141000000367	59.3328485999999984	1462528800000	\N	\N	\N	2016-05-01 19:33:40.551+02	2016-05-01 19:33:40.569+02	10	\N	1	6
11	Free Day at Korkeasaari	Lisätietoa:\nKorkeasaaripäivänä 4.10. Korkeasaareen vapaa pääsy. Korkeasaari on avoinna klo 10.00-18.00\n\n4.10. juhlitaan myös kansainvälistä Maailman eläinten päivää. Tule tutustumaan monimuotoiseen eläinmaailmaan keskellä Helsinkiä! Pääset kurkistamaan kulisseihin ja samalla sinulle selviää, miksi eläintarhat ovat tärkeitä. Tapahtumaan on vapaa pääsy. \n\nHuomioithan, että vesibussit eivät enää lokakuussa liikennöi Korkeasaareen, mutta eläintarhaan pääsee maitse Mustikkamaan kautta.\n\nEläinten ruokinnat:\nPikkumangusti 11:00\nKissalaakso (vaihtuva laji) 12:30\nAmazonia (vaihtuva laji) 13:00\nMilu 14:00\nMongolianvillihevonen 15:00\n\nMuuta ohjelmaa:\n11.00-16.00 Grillit kuumina\n\nBussi 16 ajaa normaalit lähdöt Rautatientorilta ja Mustikkamaalta 20 minuutin välein lisäbusseilla, joten jos ensimmäinen bussi ajaa pysäkin ohi täytenä, perässä seuraa toivon mukaan väljempi bussi. Vesitse Korkeasaareen ei enää Korkeasaaripäivänä pääse, sillä liikennöinti Kauppatorille päättyy syyskuun lopussa.\n	24.9860535000000255	60.1749718999999885	1475568000000	\N	\N	\N	2016-05-01 19:36:48.22+02	2016-05-01 19:36:48.227+02	11	\N	1	4
13	Open doors at canoeing center	Checkout the updated information from the event's facebook page:\nhttps://www.facebook.com/events/1583340171992693/\n\nOur open day event is on Saturday, the 28th of May from 12 am to 4 pm. You can try our kayaks free of charge with our guides helping you out. We will also tell you more about kayaks and paddling equipment. We have kayak rescue demos, information about our programs this summer, and other entertainment for adults and kids alike. Our new Cafe Natura is also open during the event!\n\nFree kayak tour after the event!\n\nAfter the event our guides kayak to the closeby islands to collect garbage. If you want to join and help us clean the islands, your kayak rental is free! If you want to join us, please sign up here: http://kauppa.naturaviva.fi/en/kayak-tours/garbage-trip-in-vuosaari-p-145.html\n\nThe Program:\n\n\nThe program for the day:\n•\tA change to try paddling for free from 12-16\n•\tKayak and SUP demos at 12.30, 13:30, 14:30 and 15:30\n•\tBear & Water paddling store showing different kayak models\n•\tTwenty Knots has Fanatic SUP-boards to show and test\n•\tBEST WESTERN Hotel Rantapuisto is also present, telling about their services\n•\tDROPP representing ther products and talking about the state of the Baltic Sea. You can participate in the Baltic Sea competition!\n\nCome and spend a great day with us!\n\nPaddling Regards,\n\nIlkka\n\nMore info: \ntel. 010 292 4030\ninfo@naturaviva.fi\nwww.naturaviva.fi	25.1277694000000338	60.1978705000000005	1464426000000	\N	\N	\N	2016-05-01 19:38:32.021+02	2016-05-01 19:49:11.829+02	13	\N	2	1
12	Puistojummpa kaivarissa	Tarkista tarkemmat ja ajantasaiset tiedot tapahtuman facebook sivulta: https://www.facebook.com/events/1121356541248022/\n\nFriskis&Svettis Helsinki järjestää taas puistojumppaa Kaivopuiston nurmella joka tiistai ja torstai klo 18. Jumpat alkoivat 2.6. ja jatkuvat koko kesän - satoi tai paistoi!\n\nKaivarin jumppa on jo käsite Helsingissä. Parhaimmillaan puiston nurmella on jopa 300 liikunnasta nauttivaa naista ja miestä. Hyvä, liikkeitä tukeva musiikki innostaa ja kannustaa jaksamista loppuun asti.\n\nPuistojumppa sopii kaikille ja tunnille voi osallistua oman kunnon ja fiiliksen mukaan. Jumppa on kaikille avoin ja maksuton!\n\nAika:\nTiistaisin ja torstaisin kesä-elokuussa klo 18-19.\n\nPaikka: \nravintola Kaivohuoneen takana\nhttp://bit.ly/jECSY1 \n\nJumppataso ja ohjaaja:\n2.6. REPLAY - avajaiset!\n7.6. Timppa / Jumppa sportti \n9.6. Alex / Jumppa sportti \n14.6. Selma / Jumppa \n16.6. Niina / Jumppa sportti \n21.6. Tarja / Jumppa sportti \n23.6. Leila / Kesäjumppa \n28.6. Inka / Jumppa sportti \n30.6. Alex / Jumppa sportti\n\nwww.friskissvettis.fi/helsinki \n	24.9552639327575889	60.1579728544256298	1464879600000	\N	\N	\N	2016-05-01 19:37:13.152+02	2016-05-01 19:39:50.957+02	14	\N	5	1
14	 Roihuvuoren HANAMI 2016	Sunnuntaina 15.5.2016 klo 12 -18 Roihuvuoren Kirsikkapuistossa\n#roihuvuorenhanami2016\n\nParapara- ja buto-tanssiesityksiä, origameja, teetaidetta, koton soittoa ja budo-esityksiä. Myynnissä japanilaisia herkkuja. Tule piknikille yksin, kaksin tai koko perheen voimin. \n\nRoihuvuoren Kirsikkapuistossa ja Japanilaistyylisessä puutarhassa kukkii noin 240 kirsikkapuuta, joista valtaosan ovat lahjoittaneet Suomessa asuvat japanilaiset ja Suomessa toimivat japanilaiset yritykset, kuten Toyota ja Brother. Juhlapaikka on Sahaajankadun ja Abraham Wetterin tien kulmassa lähellä vesitornia. Paikalle pääsee Herttoniemen metroasemalta kävellen tai busseilla 80, 82 ja 83.\n\nSeuraa kukinnan edistymistä tai katso kuvia viime juhlista hanami-sivustolta http://www.roihuvuori.fi/hanami/\n\nTarkista tarkemmat ja ajankohtaiset tiedot tapahtuman facebook sivuilta:\nhttps://www.facebook.com/events/1567545340241420/\n\nHanami-juhlan tekijöitä ovat \nRoihuvuori-Seura ry.\nAkita ry.\nFinnPARAnoids\nJapania ry.\nJapanilainen kouluyhdistys\nJapanilaisen kulttuurin ystävät ry.\nHelsingin Kendoseura Ki-Ken-Tai-Icchi ry.,\nSakura budo club,\nSuomalais-japanilainen yhdistys ry.\nSuomen Chado Urasenke Tankokai yhdistys ry.\nRoihuvuoren kirjasto\nRoihuvuoren seurakunta\nYatagarasu ry. \n\nTapahtuma järjestetään vapaaehtoisten talkoovoimin.\n\nKasvualustan juhlalle tarjoaa rakennusviraston Hyvä Kasvaa Helsingissä -liike.\n\nHanami-juhla on maksuton.\nTervetuloa!	25.0490403941955719	60.1953244345779694	1463302800000	\N	\N	\N	2016-05-01 19:48:00.741+02	2016-05-01 19:48:00.753+02	15	\N	2	2
15	Study visit to Spotify	Hey everyone! We are organizing our last event before summer break and it's a study visit to Spotify! \nMonday, 9 of May - tour to the workplace of dream! We will talk about product development, business growth, secrets of great success of Spotify, and other interesting things. \nYou will have an opportunity to ask whatever you are interested in, chat with employees and, of course, have fun. \nMonday 9th of May is gonna be awesome start of the week!\nPlease fill out the form, if you want to join!\nhttp://goo.gl/forms/yH72SIa5PO\nNote: There are only 25 free spots (Si Scholarship holders have the adavntage)	18.0756507999999485	59.3335348999999965	1462809600000	\N	\N	\N	2016-05-01 19:50:06.424+02	2016-05-01 19:50:06.434+02	16	\N	1	2
16	Muse in Stockholm	Muse are performing in Stockholm, Sweden at the Ericsson Globe on 11 June 2016!\n\nThe Drones World Tour will see the band perform for the first time “in the round” from the middle of the arena. This stage design and configuration will give fans a true 360 degree audio/visual sensory experience.\n\nGeneral on sale starts 28 September at 9am local: http://axs.com/se/events/292501/muse-tickets?skin=livenationse\n\nFor details on Enhanced Experience tickets, please click here: http://www.cidentertainment.com/events/muse-drones-tour/\n\nView all dates on the Drones World Tour here: http://muse.mu/tour-dates.htm	18.0835191999999552	59.2935251999999977	1465667400000	\N	\N	\N	2016-05-01 19:51:43.143+02	2016-05-01 19:51:43.152+02	17	\N	1	5
17	Eurovison 2016	\N	18.0685808000000634	59.3293234999999868	1463248800000	\N	\N	\N	2016-05-01 19:53:52.093+02	2016-05-01 19:53:52.103+02	18	\N	1	5
\.


--
-- Name: Events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: general
--

SELECT pg_catalog.setval('"Events_id_seq"', 17, true);


--
-- Data for Name: Languages; Type: TABLE DATA; Schema: public; Owner: general
--

COPY "Languages" (id, language, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Name: Languages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: general
--

SELECT pg_catalog.setval('"Languages_id_seq"', 1, false);


--
-- Data for Name: UserReports; Type: TABLE DATA; Schema: public; Owner: general
--

COPY "UserReports" (id, "reporterUserId", comment, "createdAt", "updatedAt", "userId") FROM stdin;
\.


--
-- Name: UserReports_id_seq; Type: SEQUENCE SET; Schema: public; Owner: general
--

SELECT pg_catalog.setval('"UserReports_id_seq"', 1, false);


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: general
--

COPY "Users" (id, username, password, email, salt, role, "emailVerified", "emailVerificationId", "countOfSentVerificationEmails", "showNotifications", "authProvider", "authProvUserId", "forgotPasswordId", "forgotPasswordIdCreateTime", "createdAt", "updatedAt") FROM stdin;
1	Juho	\N	juho.kastemaa@gmail.com	\N	User	t	\N	0	t	facebook	10207305730861267	\N	\N	2016-05-01 19:00:56.576+02	2016-05-01 19:00:56.576+02
3	NoReply	d4bca676e5ded3fb1f4d3ebe70ab94ecbf3abc186c5502a596bf471b1a8fd2afd474dfbdd1852000c85f9c45a82c6155d8745c0fb37ebfa1d93ce9f0f209b8b871b22b30326d64a28eeca99e587662731847abde29988ea085daa3748a41e330b82f222dd7b9d134eb8f3dd6893c7b23ba5ea4dcbd63bb18d645f1f03b4f122fa767f21d44c643b8e3cc05c4327d63e6f7f4c69d3d791013377fbece6ab26a8c4e90d47d57a53cc893551f8f053e7a96238849cc262ab48f106bed4fe12d589597ffc91be409b880730ff538e64bf8cd3a7151d6cdbfa20d993b0d20c2883604148c3f0195de456cb74e83d1c1d19440a6753f5ff748f75115365fb6963c7eed	seeyanoreply@gmail.com	2fb5c668bfa81200f5d8dd7113996276586ee07092a7e417232cefa0825b45ced8e9ece9c3e458ac01e1c72f3cecd67a25e1157aa8203d29a46b8384ba95181220546cea543d503c5c9379134bcc61b9555f2703e511bd62bd7b52b4ac07f7ddbd7e0297ab2de9dcf4044cf350ab1ab77a03d732167139c99d85ce463ac4e3fa15021be9a767b54ab04d922c5f4a3b52f60ef4d57ea545f006430ee3dcd4d3cc2d7cbc0a2414d90f527144f7c13b8460587c0c0192a059a5bd860c4e52b5319802b72c5a9c0d9d8fb608096ec450d5226220c592008995e68ad909a0f072908eda566496a7f1e3f42e7788955d86b25d31efb117b10b2090e4277f8ed32c3cfc	User	f	yryFbhSpD4vva8EHSqkTvEf0W78g17saMiJylNXvMuv0V3HNkJaRyVvpLFVRdWQlUnL7C0IwnvG	0	t	\N	\N	\N	\N	2016-05-01 19:01:41.761+02	2016-05-01 19:01:41.761+02
2	admin	254a293dcdc26f8e56527e7b67890b3014dc917f96af2bc764c45a4e2324863bfde0195d78700996348fd81887e96fc06e5aa0b6a3e3d24d19d7447807521087f944ccd3b30a4c864179b3b8bfe53fd2cd901821c9cd15356b4272bb9f22b9d3e2e09784739fa44c60fb1c97eea7702ab00603fdb5732a4abb62acad7c76c3886303b840155cd1f2d0a6735de84cec7aaf0f52d44dd4a149b53597afc7f6c579bb088618645fb0e0dc74be5822bc83220f6a3fd6916a46d261e917f4689e8b88e4e20a11c754d8ee53b0f00f7f29ff2b2020c47d05caf01f4516fda4b7c253a3117af2c1538b199748030773180e456f2ccffcd7ed0b9f8c129e5a5968db339b	admin@seeyaevents.com	91016b67e7a27680900b017b2d56649de4f9c97ba91c32f2de1a34d9a2bf924b8e4a90711fca42dc0c06a1e99503a9bc0fa0717a2c9304c77475f829e3b7a3c660f55d0fef2b5ad726642a65e9ae16a97831daa4c54ec7109379d90f2b6081ddfe80dabc0e96e158bb364c44cb1658ecacfb672119932e25d61f87cd15542b203f16f6eef4a78d0afbede6d1f6662181cea86b67287109654eaaeaa3a5dcb065d1d28e04b030a4d4983a64868c5171886472e46df0d84f9b97385d5c84975fa32e7a8a9d213cebf1324e0aac94ad4d9a06e3c69df6e4b40197dff536e6569264a71eb86a26290bd954761b9ef4f9d2826a34a8d3c5a5103cc88fe97fc5f899f0	Admin	t	Tre16Z1crIbFUAb20stHDCFJ7dH4rwQSTfG6SU4nZxoUlHAwh7Dpc0ggo1nn6G0Lw6Wd5DMABaP	0	t	\N	\N	\N	\N	2016-05-01 19:01:31.555+02	2016-05-01 19:01:57.361+02
4	Robot	99ebc577723780ea520e2e4df5fdfe462a55ec0ee58fa1f28eee776d5db02cde1243f1c4591cc20de943374058a6a04fc9d4fb9f478defd1e9224968fd783d5dd5660318677248d7e66c2a2c2638134a7abaa6464b7def5463f94a3c3eb58e1ca871ec3c29448edbbb826fabd9e4fb1fd9775837165ce13b6c697e99ac6a3270836a524143807eca52b2878cf5be5aa0f86460cbce8d1ad904fe49608d99b8fb0187d8fc309562ab2e69b2d4f5d2b0e13b77354c400d6edd4ce0ce61ee93211f61621b54c30168c332634f6ef3a3f47793e8b88d0b723cd6925a7d44da777dedbcc3fd3beaa237cf751449b670f592596f64e0c826d56edcc3c4597582ceebfc	seeyarobot@gmail.com	78cfc474becc623be60a0350692debbdf89c0d1e66ceaa598731561585ccdf8e900ad7fc2a01c761ca77ca80a10066bfeae216a3a73574564f759d4f969d8aadb55a67f8759bb11bccc1548e8048c86e4153535513f0b9d5f5e44106f118989ec275266bdac3210a2ba403a5e8e59dd3749b2a9fc577fc66e1f43768dbf46749972f3fbb16bfe92b4df2542bda7942a82edefb75f467a2247ed2b196495b756c49e9fd9da19437eed5dadc6dd70201702877cc06aeab5187119dc59a48410c614ae89f54f9a5b426c48565afd580ee6261597a65677a6fa16cf34319ca279cc84092b0d48bea9811d24e155f2573f7219d3d269eef81717e3067bcb6ce9218ee	User	t	plcTUP2KDuIKY649ghDo09RqHKgCZVZ3sgXOY9WSu6UmRC8qkvQ3sn1IQDJBK7pMZqn6vsKbzjU	0	t	\N	\N	\N	\N	2016-05-01 19:02:21.336+02	2016-05-01 19:04:04.686+02
6	Admin	a0e74bcf5116d47c2e0282fd29ba7149a30999b82711a877abb6761416a19b9f3e6df58e2a23a4784153807d493dcc21f9b428f31ec90e8c8da411935f73f841444d446beb14ba9ff1c1627b49310bf5b447cc4026f5eee00673c457456b0ea7ec438e69e1326c6587e05263612561449d53e37ab75564af823d86859c0d609645aa9eac60f3b6cbc3aa1b665357bd0d669b7cf67d23562dfb661675f016e49918f3f8b12ed872480738ef717b7c2b38e693302740da5ad9e8c9c9e99782d04a727cca14a1ed153bf058de39bbeeef85bd4882b454279979278cf1e969d034074123335fe1b2bdd606a11594c69ce921d44ce53b94fbb11223678c406a6901ac	seeyaevents@gmail.com 	e802daf1e89f4f8cbecf6287ef00a7ea1329594aae1baf287fc850833c25b103ce9f52559b275a2c56810f9c71b864f7e0e9f2920bebeed9303facd5fa8b282d4c14cece79438ca1f068c9ef3ed3872a04ce28d664111262dc49839fb3081511af932ce3ce0514fd85679ab164e129e2e751fed4f95a0304b91c14096f10bc49ea324fa39e90ca0444d8a82d2dcc3718cda1536bbaca5072d3f12bda09dae456eaf4f801419e472c88b09ec24d799b9b1c4596097ddf25b42752960596b2f95eacdcf40ec8f62ebbebddb3ac8e06939652a3e1a0d27463826db25a74d5e70da3ad7f2168c6aed7f47afee3622d467a01fb3eb55dddba77aa70dfdb3fe14f4b34	User	f	4VMMx6Rs3xcVZVfWQfYKSfOWpXBpduFE8VKVMGZRhQNaBgnyKNYbo04JFZyjVcjSiVhlp254lpu	0	t	\N	\N	\N	\N	2016-05-01 19:07:43.272+02	2016-05-01 19:07:43.272+02
5	Pete	\N	pmmakinen@hotmail.com	\N	User	t	\N	0	t	facebook	10154703182734881	\N	\N	2016-05-01 19:04:17.733+02	2016-05-01 19:09:19.453+02
7	Joe	\N	niemijoe@hotmail.com	\N	User	t	\N	0	t	facebook	10209544619675247	\N	\N	2016-05-01 19:29:18.748+02	2016-05-01 19:29:18.748+02
\.


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: general
--

SELECT pg_catalog.setval('"Users_id_seq"', 7, true);


--
-- Name: Addresses_pkey; Type: CONSTRAINT; Schema: public; Owner: general; Tablespace: 
--

ALTER TABLE ONLY "Addresses"
    ADD CONSTRAINT "Addresses_pkey" PRIMARY KEY (id);


--
-- Name: Attendances_eventId_userId_key; Type: CONSTRAINT; Schema: public; Owner: general; Tablespace: 
--

ALTER TABLE ONLY "Attendances"
    ADD CONSTRAINT "Attendances_eventId_userId_key" UNIQUE ("eventId", "userId");


--
-- Name: Attendances_pkey; Type: CONSTRAINT; Schema: public; Owner: general; Tablespace: 
--

ALTER TABLE ONLY "Attendances"
    ADD CONSTRAINT "Attendances_pkey" PRIMARY KEY (id);


--
-- Name: Categories_pkey; Type: CONSTRAINT; Schema: public; Owner: general; Tablespace: 
--

ALTER TABLE ONLY "Categories"
    ADD CONSTRAINT "Categories_pkey" PRIMARY KEY (id);


--
-- Name: Contacts_pkey; Type: CONSTRAINT; Schema: public; Owner: general; Tablespace: 
--

ALTER TABLE ONLY "Contacts"
    ADD CONSTRAINT "Contacts_pkey" PRIMARY KEY (id);


--
-- Name: EventLanguages_pkey; Type: CONSTRAINT; Schema: public; Owner: general; Tablespace: 
--

ALTER TABLE ONLY "EventLanguages"
    ADD CONSTRAINT "EventLanguages_pkey" PRIMARY KEY ("languageId", "eventId");


--
-- Name: EventQueues_pkey; Type: CONSTRAINT; Schema: public; Owner: general; Tablespace: 
--

ALTER TABLE ONLY "EventQueues"
    ADD CONSTRAINT "EventQueues_pkey" PRIMARY KEY (id);


--
-- Name: EventReports_pkey; Type: CONSTRAINT; Schema: public; Owner: general; Tablespace: 
--

ALTER TABLE ONLY "EventReports"
    ADD CONSTRAINT "EventReports_pkey" PRIMARY KEY (id);


--
-- Name: Events_pkey; Type: CONSTRAINT; Schema: public; Owner: general; Tablespace: 
--

ALTER TABLE ONLY "Events"
    ADD CONSTRAINT "Events_pkey" PRIMARY KEY (id);


--
-- Name: Languages_pkey; Type: CONSTRAINT; Schema: public; Owner: general; Tablespace: 
--

ALTER TABLE ONLY "Languages"
    ADD CONSTRAINT "Languages_pkey" PRIMARY KEY (id);


--
-- Name: UserReports_pkey; Type: CONSTRAINT; Schema: public; Owner: general; Tablespace: 
--

ALTER TABLE ONLY "UserReports"
    ADD CONSTRAINT "UserReports_pkey" PRIMARY KEY (id);


--
-- Name: Users_email_key; Type: CONSTRAINT; Schema: public; Owner: general; Tablespace: 
--

ALTER TABLE ONLY "Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);


--
-- Name: Users_pkey; Type: CONSTRAINT; Schema: public; Owner: general; Tablespace: 
--

ALTER TABLE ONLY "Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: Attendances_eventId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: general
--

ALTER TABLE ONLY "Attendances"
    ADD CONSTRAINT "Attendances_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Events"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Attendances_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: general
--

ALTER TABLE ONLY "Attendances"
    ADD CONSTRAINT "Attendances_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: EventLanguages_eventId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: general
--

ALTER TABLE ONLY "EventLanguages"
    ADD CONSTRAINT "EventLanguages_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Events"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: EventLanguages_languageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: general
--

ALTER TABLE ONLY "EventLanguages"
    ADD CONSTRAINT "EventLanguages_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Languages"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: EventQueues_eventId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: general
--

ALTER TABLE ONLY "EventQueues"
    ADD CONSTRAINT "EventQueues_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Events"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: EventQueues_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: general
--

ALTER TABLE ONLY "EventQueues"
    ADD CONSTRAINT "EventQueues_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: EventReports_eventId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: general
--

ALTER TABLE ONLY "EventReports"
    ADD CONSTRAINT "EventReports_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Events"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Events_AddressId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: general
--

ALTER TABLE ONLY "Events"
    ADD CONSTRAINT "Events_AddressId_fkey" FOREIGN KEY ("AddressId") REFERENCES "Addresses"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Events_CategoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: general
--

ALTER TABLE ONLY "Events"
    ADD CONSTRAINT "Events_CategoryId_fkey" FOREIGN KEY ("CategoryId") REFERENCES "Categories"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Events_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: general
--

ALTER TABLE ONLY "Events"
    ADD CONSTRAINT "Events_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Events_creator_fkey; Type: FK CONSTRAINT; Schema: public; Owner: general
--

ALTER TABLE ONLY "Events"
    ADD CONSTRAINT "Events_creator_fkey" FOREIGN KEY (creator) REFERENCES "Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: UserReports_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: general
--

ALTER TABLE ONLY "UserReports"
    ADD CONSTRAINT "UserReports_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

