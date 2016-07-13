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
19	Lehtitie 7, 01300 Vantaa, Finland	Finland	Vantaa	01300	2016-05-01 21:20:31.659+02	2016-05-01 21:20:31.659+02
20	L52358, Co. Mayo, Ireland	Ireland	\N	\N	2016-05-01 22:14:54.907+02	2016-05-01 22:14:54.907+02
21	80, Mosul, Iraq	Iraq	Mosul	\N	2016-05-01 22:49:49.435+02	2016-05-01 22:49:49.435+02
22	Peltokyläntie, 00740 Helsinki, Finland	Finland	Helsinki	00740	2016-05-01 23:07:24.339+02	2016-05-01 23:07:24.339+02
23	Lammvägen 5, 01710 Vanda, Finland	Finland	Vanda	01710	2016-05-02 17:06:38.616+02	2016-05-02 17:06:38.616+02
24	E69, 9764 Nordkapp, Norway	Norway	\N	9764	2016-05-02 17:08:20.185+02	2016-05-02 17:08:20.185+02
25	Drottning Kristinas väg 15-27, 114 28 Stockholm, Sweden	Sweden	Stockholm	114 28	2016-05-03 12:02:13.589+02	2016-05-03 12:02:13.589+02
26	Drammen, Norge	Norge	Drammen	\N	2016-05-03 13:40:32.551+02	2016-05-03 13:40:32.551+02
27	Bislettgata 4, 0170 Oslo, Norge	Norge	Oslo	0170	2016-05-03 14:44:23.244+02	2016-05-03 14:44:23.244+02
28	Kjelsåsveien, 0488 Oslo, Norway	Norway	Oslo	0488	2016-05-04 13:55:51.293+02	2016-05-04 13:55:51.293+02
\.


--
-- Name: Addresses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: general
--

SELECT pg_catalog.setval('"Addresses_id_seq"', 28, true);


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
23	testi	f	f	2016-05-01 20:58:25.172+02	2016-05-01 20:58:25.172+02	13	8
24	Kuulostaa kivalta!	f	f	2016-05-01 21:12:10.1+02	2016-05-01 21:12:10.1+02	12	1
29	\N	f	f	2016-05-01 23:07:24.368+02	2016-05-01 23:07:24.368+02	21	10
35	\N	f	f	2016-05-02 17:26:36.716+02	2016-05-02 17:30:32.954+02	22	12
38	Great idea :)	f	f	2016-05-03 11:58:14.293+02	2016-05-03 11:58:14.293+02	3	14
39	\N	f	f	2016-05-03 12:02:13.615+02	2016-05-03 12:02:13.615+02	23	1
40	\N	f	f	2016-05-03 13:40:32.585+02	2016-05-03 13:40:32.585+02	24	15
41	\N	f	f	2016-05-03 14:44:23.285+02	2016-05-03 14:44:23.285+02	25	16
42	Sounds like fun. I'll consider	f	f	2016-05-03 23:02:14.21+02	2016-05-03 23:02:14.21+02	8	1
43	\N	f	f	2016-05-04 13:26:44.095+02	2016-05-04 13:26:44.095+02	25	17
44	\N	f	f	2016-05-04 13:27:33.944+02	2016-05-04 13:27:33.944+02	25	18
45	\N	f	f	2016-05-04 13:39:43+02	2016-05-04 13:39:43+02	25	19
46	\N	f	f	2016-05-04 13:53:34.636+02	2016-05-04 13:53:34.636+02	25	20
47	\N	f	f	2016-05-04 13:55:51.348+02	2016-05-04 13:55:51.348+02	26	20
48	\N	f	f	2016-05-04 14:18:06.66+02	2016-05-04 14:18:06.66+02	25	21
\.


--
-- Name: Attendances_id_seq; Type: SEQUENCE SET; Schema: public; Owner: general
--

SELECT pg_catalog.setval('"Attendances_id_seq"', 48, true);


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
12	Puistojumppa kaivarissa	Tarkista tarkemmat ja ajantasaiset tiedot tapahtuman facebook sivulta: https://www.facebook.com/events/1121356541248022/\n\nFriskis&Svettis Helsinki järjestää taas puistojumppaa Kaivopuiston nurmella joka tiistai ja torstai klo 18. Jumpat alkoivat 2.6. ja jatkuvat koko kesän - satoi tai paistoi!\n\nKaivarin jumppa on jo käsite Helsingissä. Parhaimmillaan puiston nurmella on jopa 300 liikunnasta nauttivaa naista ja miestä. Hyvä, liikkeitä tukeva musiikki innostaa ja kannustaa jaksamista loppuun asti.\n\nPuistojumppa sopii kaikille ja tunnille voi osallistua oman kunnon ja fiiliksen mukaan. Jumppa on kaikille avoin ja maksuton!\n\nAika:\nTiistaisin ja torstaisin kesä-elokuussa klo 18-19.\n\nPaikka: \nravintola Kaivohuoneen takana\nhttp://bit.ly/jECSY1 \n\nJumppataso ja ohjaaja:\n2.6. REPLAY - avajaiset!\n7.6. Timppa / Jumppa sportti \n9.6. Alex / Jumppa sportti \n14.6. Selma / Jumppa \n16.6. Niina / Jumppa sportti \n21.6. Tarja / Jumppa sportti \n23.6. Leila / Kesäjumppa \n28.6. Inka / Jumppa sportti \n30.6. Alex / Jumppa sportti\n\nwww.friskissvettis.fi/helsinki \n	24.9552639327575889	60.1579728544256298	1464879600000	\N	\N	\N	2016-05-01 19:37:13.152+02	2016-05-04 16:52:50.368+02	14	\N	5	1
13	Open doors at canoeing center	Checkout the updated information from the event's facebook page:\nhttps://www.facebook.com/events/1583340171992693/\n\nOur open day event is on Saturday, the 28th of May from 12 am to 4 pm. You can try our kayaks free of charge with our guides helping you out. We will also tell you more about kayaks and paddling equipment. We have kayak rescue demos, information about our programs this summer, and other entertainment for adults and kids alike. Our new Cafe Natura is also open during the event!\n\nFree kayak tour after the event!\n\nAfter the event our guides kayak to the closeby islands to collect garbage. If you want to join and help us clean the islands, your kayak rental is free! If you want to join us, please sign up here: http://kauppa.naturaviva.fi/en/kayak-tours/garbage-trip-in-vuosaari-p-145.html\n\nThe Program:\n\n\nThe program for the day:\n•\tA change to try paddling for free from 12-16\n•\tKayak and SUP demos at 12.30, 13:30, 14:30 and 15:30\n•\tBear & Water paddling store showing different kayak models\n•\tTwenty Knots has Fanatic SUP-boards to show and test\n•\tBEST WESTERN Hotel Rantapuisto is also present, telling about their services\n•\tDROPP representing ther products and talking about the state of the Baltic Sea. You can participate in the Baltic Sea competition!\n\nCome and spend a great day with us!\n\nPaddling Regards,\n\nIlkka\n\nMore info: \ntel. 010 292 4030\ninfo@naturaviva.fi\nwww.naturaviva.fi	25.1277694000000338	60.1978705000000005	1464426000000	\N	\N	\N	2016-05-01 19:38:32.021+02	2016-05-01 19:49:11.829+02	13	\N	2	1
14	Roihuvuoren HANAMI 2016	Sunnuntaina 15.5.2016 klo 12 -18 Roihuvuoren Kirsikkapuistossa\n#roihuvuorenhanami2016\n\nParapara- ja buto-tanssiesityksiä, origameja, teetaidetta, koton soittoa ja budo-esityksiä. Myynnissä japanilaisia herkkuja. Tule piknikille yksin, kaksin tai koko perheen voimin. \n\nRoihuvuoren Kirsikkapuistossa ja Japanilaistyylisessä puutarhassa kukkii noin 240 kirsikkapuuta, joista valtaosan ovat lahjoittaneet Suomessa asuvat japanilaiset ja Suomessa toimivat japanilaiset yritykset, kuten Toyota ja Brother. Juhlapaikka on Sahaajankadun ja Abraham Wetterin tien kulmassa lähellä vesitornia. Paikalle pääsee Herttoniemen metroasemalta kävellen tai busseilla 80, 82 ja 83.\n\nSeuraa kukinnan edistymistä tai katso kuvia viime juhlista hanami-sivustolta http://www.roihuvuori.fi/hanami/\n\nTarkista tarkemmat ja ajankohtaiset tiedot tapahtuman facebook sivuilta:\nhttps://www.facebook.com/events/1567545340241420/\n\nHanami-juhlan tekijöitä ovat \nRoihuvuori-Seura ry.\nAkita ry.\nFinnPARAnoids\nJapania ry.\nJapanilainen kouluyhdistys\nJapanilaisen kulttuurin ystävät ry.\nHelsingin Kendoseura Ki-Ken-Tai-Icchi ry.,\nSakura budo club,\nSuomalais-japanilainen yhdistys ry.\nSuomen Chado Urasenke Tankokai yhdistys ry.\nRoihuvuoren kirjasto\nRoihuvuoren seurakunta\nYatagarasu ry. \n\nTapahtuma järjestetään vapaaehtoisten talkoovoimin.\n\nKasvualustan juhlalle tarjoaa rakennusviraston Hyvä Kasvaa Helsingissä -liike.\n\nHanami-juhla on maksuton.\nTervetuloa!	25.0490403941955719	60.1953244345779694	1463302800000	\N	\N	\N	2016-05-01 19:48:00.741+02	2016-05-01 21:11:28.018+02	15	\N	2	2
15	Study visit to Spotify	Hey everyone! We are organizing our last event before summer break and it's a study visit to Spotify! \nMonday, 9 of May - tour to the workplace of dream! We will talk about product development, business growth, secrets of great success of Spotify, and other interesting things. \nYou will have an opportunity to ask whatever you are interested in, chat with employees and, of course, have fun. \nMonday 9th of May is gonna be awesome start of the week!\nPlease fill out the form, if you want to join!\nhttp://goo.gl/forms/yH72SIa5PO\nNote: There are only 25 free spots (Si Scholarship holders have the adavntage)	18.0756507999999485	59.3335348999999965	1462809600000	\N	\N	\N	2016-05-01 19:50:06.424+02	2016-05-01 19:50:06.434+02	16	\N	1	2
16	Muse in Stockholm	Muse are performing in Stockholm, Sweden at the Ericsson Globe on 11 June 2016!\n\nThe Drones World Tour will see the band perform for the first time “in the round” from the middle of the arena. This stage design and configuration will give fans a true 360 degree audio/visual sensory experience.\n\nGeneral on sale starts 28 September at 9am local: http://axs.com/se/events/292501/muse-tickets?skin=livenationse\n\nFor details on Enhanced Experience tickets, please click here: http://www.cidentertainment.com/events/muse-drones-tour/\n\nView all dates on the Drones World Tour here: http://muse.mu/tour-dates.htm	18.0835191999999552	59.2935251999999977	1465667400000	\N	\N	\N	2016-05-01 19:51:43.143+02	2016-05-01 19:51:43.152+02	17	\N	1	5
17	Eurovison 2016	\N	18.0685808000000634	59.3293234999999868	1463248800000	\N	\N	\N	2016-05-01 19:53:52.093+02	2016-05-01 19:53:52.103+02	18	\N	1	5
24	Drammenselva rundt	20km bicycling for the whole family around the Drammen river from Drammen to Mjøndalen and back.\n\nhttp://drammenselvarundt.no\n	10.2044564000000264	59.7440738000000024	1462431600000	\N	\N	\N	2016-05-03 13:40:32.57+02	2016-05-03 13:40:32.583+02	26	\N	15	1
21	pelataa lautapelejä	splendor ym?	24.9821329000000105	60.2684069000000022	1462194000000	\N	\N	\N	2016-05-01 23:07:24.358+02	2016-05-01 23:07:24.367+02	22	\N	10	2
25	Holmenkollstafetten 2016	Predicted winner: Affecto	10.7321834564208984	59.9246139278168641	1462627800000	\N	\N	\N	2016-05-03 14:44:23.264+02	2016-05-03 14:44:23.284+02	27	\N	16	1
26	Grefsenkollen opp	http://www.grefsenkollenopp.no/	10.7901303999999527	59.9452964999999978	1464433200000	\N	\N	\N	2016-05-04 13:55:51.327+02	2016-05-04 13:55:51.344+02	28	\N	20	1
22	test event please ignore	\N	25.7837404603271807	71.1709189713433545	1462269900000	\N	\N	\N	2016-05-02 17:06:38.659+02	2016-05-02 17:21:34.528+02	24	\N	12	7
23	Lunch at Nymble 2	Lunch at Nymble	18.0713578823090302	59.3473495881106174	1462315280000	\N	\N	\N	2016-05-03 12:02:13.605+02	2016-05-03 12:02:13.614+02	25	\N	1	3
\.


--
-- Name: Events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: general
--

SELECT pg_catalog.setval('"Events_id_seq"', 26, true);


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
8	kulmmii@gmail.com	b86fc86442894b7502c489db3bec7e4d012c5c444e19ebc9b8c656d2fcd0527306f5e0d68fbeeefb9fd58d9fc0626c26a6fc81d1f3b6d51a54d92b228dc9e4793be474b4fff0f005ad9abb444e874cf4dc25ebfb6a684f5eb687a649dc58ce69e1533e9d034f854c21ca50956daadf8735d4869cc3e4763339b00e2f00943041b8eb4cd170601a3f3adb4ee8003a79e66632171e999bb2b828c64effe4d66eca35ca451fb08a47be588d6c11be214dcefe51f53001cfc238a6d6531383ea255d8e693773480ef49d63ef673f882f90b4d18315913f9f8ca6faea7cb4e08c95809486c95ebea145900a1e550cafe1408ce8be16a8fc97e91525386b28e322e973	kulmmii@gmail.com	ea638f7b4e0b7492132ac92e719c096354627edf445b7ae58a126279cf2da9aa54a83c5eeb56cf77bb632c95fcd7f40ffb7f1704598434e3169ee194858255645319c2c47ddda4f9c612c3f53c95b939b89a1a38de5ec50badd6b6f50c8f42a1dfcab44153c52a6cd8b947de4d6a1b5000192aa8af74e752bb04b25c179d5a54c1d84ce9e98eae0663bde343e30c82c0f76ca040a2b66a5412eb3cbe05921330b1d61e11a76d5c425c0f97af5987879c71c2db6cbf2d4ea434b385f5e43e01bbcfa495a81bda17547424748faaabc98c71e2fe758114ef221dc8f3f40bd58d69e1b576eb35d029c5548bb60fb6712cba04da68e78fc4be13d8a473ee08bf446a	User	t	8fEsCz3lHz097HfvlYa08Vtjv6HNznMRp9yHm4ml2M6dyI5jQXaGbI0R6zLXLXpJ9yR45GcOqGT	0	t	\N	\N	\N	\N	2016-05-01 20:54:29.66+02	2016-05-01 20:57:52.193+02
9	Anonymous	c82f9a27bfe1e513ef6a7c1479954bef590a34d82ec676cd4f57e4117d1e64882d06d5845c3589facb3483567ed319d148a67f3dcd8b96146ca12339249f053249a13a2ca5d4d7f21db38241f2eb1d9dc350024d08eeffac2aca9a147de2bf12799c0ab2a88eb7073e05f77dda4b870f8a8fc598dd128bf370f1109a16f714488f9b0efb2a961496ce0591c5829f6f190dbe4776cce507db101150bbb8b90d1ad3976ceb8784ceefff870b64bc96861026861de9e01c7e003759335210469944bc78b4347e42605a75ceb9db37afbd748c73ae0a67e91915d1d5d1daad05ec7ca7d14921b47d0199fbfc7a139c269ec4f79a758033fe1a38e008deddaaf75ca2	kek@kek.com	eb7c49f64acbf6573e5e28f037edc089c13ba3585fdc96ee993edabb46d38af88e2ec31d9b42294cb9f8e05e49cd74e89dca8355909bce04529ac15f55d47cdbf9fa23fc7f81055c8d39e40e10e53aab4cf8c29912f3e55a3b49b8029fe83854ead6441f7a2ed0fa15280d1d15623af7e8346715f534a23f8e29de93ec8f42877d4ce106745e54a61b41afc7719973138af49703ff117ecd4b5f76312ab040b6577b1ea1ee254a0d8449c2220d384ce5ecb68f06d4a027a4d056cc5c018afeb731a596b086aeff68e9b3735a9a4aad332afd579b30a6e7fff65ff6e62c0e6c4beeb44fb9ddbb02543716be5fc0e694fc964964a2ff63057af67fad7760e34951	User	f	HwzlvnlYZJHWiLL5m3mAjY2ClesUdPEoGjvfLiWRXoV8hvpkpSRo3x3qCMCMzmYCGeQclm41rH9	0	t	\N	\N	\N	\N	2016-05-01 21:12:36.196+02	2016-05-01 21:12:36.196+02
10	lolee	b4e7a3c64df718cef02cd163226c6f33fc3c3a4e90acb334f8e7f7e31ace07c28cbd6b73eeb5df77ba0c7d53e628068853206f30729a25db29b5652c91fc794109ff2e17efbe3e4b3acf21b62aa416904f7c656cc39c202cb7d68963e4cfe1359fd686c63015c63d6d0d6fa2b306147f5f9adc37b9932b56a693f63bc86234a138f05bdb3e25485803af193c24d1e9e4b7f7c6d43c4d6eedd199cbcb736120a27503cc283a1f2db66acad21aa2bd8f9e1cdd761c37b9bdc261b702b6a6b9b2e4654aa3fb2967084b34713744058f0f44ee9401bd9dc6944758a670b6b2acf54b7b574a0e002d6fe9d829c5cd5fcdf47c255caf7748c2ff2a91f49f33ee523b12	re_joni@hotmail.com	9ead44ebfe9ae8486476923e5fdd54ca673b4c3fba6bec612941d4fe3ffad18774f0a650eb3f35fe4dd929d8a227588c33c4902155ca983f14f1150fb133d71ea2c08cc5470ec70bd071a4618bd496789b7c5f0ff5f16206952106a391b3d1b9fd1cbbac531f52b0b3f838c8431b904666738c5e605718b5bac4eb7f92c4046b666aa14ac2e0b1f1bc1ff7d2abe97ffb291373dd7860761dbc767383766d6eeb431cbbd1779d56f6e17d0cfbc53e71d6551730479500a4807f5806b6ef3a670c359d5fe992dc54f3f3d3c1bda0f4ffb652be5dedbd7b3673bea8f9f29e2e77c276c2e7718b8d9e49892421009280e3b155fdbef6f0de76c31b4875c3a339e5d4	User	t	E1YzUuz6elC38UXAAQX48rINvBHpvDVE1u1xlsyukjfrp6CAIv4daGmnVM106YgCRc9ArbH3pUY	1	t	\N	\N	\N	\N	2016-05-01 21:14:38.233+02	2016-05-01 21:18:49.375+02
11	jtuulisaari@gmail.com	6aaf956bbb122d30d964d8a3c6e63beb1a7a1dc5a10a8c9360f078cc0772a6a12c8058f9fd2fd642a7172e7ce6fb843488af3eaf39c48788ece0f78b3c9e37a5b43ac8ad6f3c7830faaadecd4a233219f47cda3be9d5bf12fb59b60304cf59591a300e93ab682229e43c4e8f052293620fbde28380c46efe8c128a99dbe86069488ef45dc2f4ef36a8523c91b33a3a34d49bd4e25175193138fe0eb9ec1cf5f34703613b2408056edcc02f8182a897e46caa7aa83d2ffd1f904c55602d8550ade47a60839a7f23b26ab14991a6b00ef21d0bf7c4c8f1606c229f975032f47caa6a8293798954d613f6dc5be9c392d29ef2a68a41e342dd29c6fd1ce83ccc8d4f	jtuulisaari@gmail.com	ce197b34f50b1c0e775c1e6680c12e89f80daa616bef88f7a7224b5445e364925403591a22b2bddfe4c5df99e2cfc51925d811f7e1608c753def3338c63cc3f0ba4ca9e5490c31ffa47e20badb2d62a6364241d98ddd7e54236f9719108575bb65c23b7ce19efef61c077ad9dce89077c67b08e6b3e3660cdbc45d1ee5c3fc229d9cd06f8a550178b9491d66956567322f9df6ec04ab13189f9279967a2f3af201422f76ad055dd4c379f45ea1dec9b5a8d3893bd37173de6376395685a8e178879fd2b4bda3a8506fb6a92992a27137054c87fa96bebf7ed80bacaed49d9ab4bba73ed8a285cd3c57d6d4436da8c59b75740522dca923bbb91cc18b030f3a2c	User	t	SbfqjyEfalDVYbfZwtHlFe3ofzKHevuggEtuFlWuCxUogsz86pYY03Djz0031HdL0wKBG2JXqDk	0	t	\N	\N	\N	\N	2016-05-01 22:18:59.89+02	2016-05-01 22:19:15.631+02
12	markus	0be8f43547f9566d3bec4916d79009012d916523e3c5c90a2ca57c73e76d7c2e041be7dcbe7fab91e27ea9fe2786b86a78a24398e9d58f2881dee130611c80972e443be59b67c91dfec5c27a27c9d1669f1e2f6a2d705f803defd265e1086b3e08cabf25e22e3de0d5f47d86a88d238a33a49b9697816bde656978908964f291c30d1d34491d3b5da628046e8019dae36ea9197706e8254ecef350c4c701ba70fe88ec684769af2b4a70456525ada83e23adfbf6a8bf367b9efcf8949921019e2520266f6d1e0d331d7cdce2ddf5d74e28c84990a80841d1644f62fd9d1a79b18ec84b731bb6b8fb43bc8fc31109b59f4068dbb284f26fe2936ebed335289fa3	markus.juopperi@kolumbus.fi	4bdbc204b1832ab31fe8833cd8da376fee806fba9198eea753ff6b1496e713ca754e1f7a4ab6c37be1c16b1e7d775fd3337e7661b73b77682e1dd69462154aa66051dba452ca6a712d820eb071d6788b95244b075889c48959fb0c76a895cc10aaa71d1ecc98735429cd73ecc366ee092cd690d38fece9464e791247e3b1e03251637d3f2b861f0e92b8030c60acea1f8f2e9be093310a0e866e79e22b2d74e49816393ec3256d0cc765c473550b29c943161769e5ff51c81d8652f759ff076b45e8784410f84764d9ce712d57f1fb7a104afd80bd70c792a337347f555027894ea43614e5ad53e22dc8c32057d565c7fac7efb4f221a3fdec35372f3ea9d7de	User	t	DKkNnwXuF0WEoA0jvcKyNpTS791vi3bkaWo44FR1nxKye1SAOLGQW1rXZBCATEqliBs0LecVLmw	0	t	\N	\N	\N	\N	2016-05-02 16:52:18.484+02	2016-05-02 16:54:28.591+02
13	Sami	06b93b4fff340e122c40c12c9934a2c7f7a7c32cb6f3bcad93664d4f9b5957fd5e5c6fb4ae922842eb9eb8f912a0bb1f2618b4dd854c4ff224eda56a60cc7df11d3d02dabb98ad19da53ecb7d5724d8ade09f97b6f3d58fd2b3992fa5da42660f199be53fd0708ffcfd0d7f044fae6e586e71635abda018b2656e6542462776582ecc5f9d74449cbd1b5d0610aca15ec4ea481dff39541f865a129999890c4425df73cae1818e1c484ae3f561278af600052f9d6b09d9398f3f64b3112136947ea5617c0f0f8314745501e6b74f2c6fe05f25864f01e7f835ca59c6be4c9cb91eb7f5d497ea7daf82c4c652e6dbeaaff90f77fc8410ca9b2c68d2067fbc1dc59	sami@underware.nl	d757be6d45f59f26268e5076051331902ba64952fbfc1484dd88c2c36851d8bc988514240ff1402bf7513e8e7c8ecd65fc71e32a7a977473db4ecfef71ef5a36f1c1125226f219d6c57b7b77416225ce3f36572db517466014936eb2af5d55af098a0be7fe1de953170b936883f617d65496ced461fbcfeefd28ddb977b9fbe239a8c3154db3848361f17f85b6a3cf78b50aa409c414d1619cb575efed3349e09b87743851d47c2c6f40efdc158a0c0fe089e1469b81573464e0e96c20d698167d9e4dd6c5cbef6e4d3a7a552c03cd4c4eb26505a3008e9f77f7c894ff0b0cb1ac0c21a00ce49945a425e39d9a0e18c226a7433e091c5e420450cf859f61bb36	User	t	1ZkWX9k3160wGzHzH5SEXNJs3YeM1hJPjE5hdgknPZKoi0AwO7ZqFTp8G7tt1qLvsGnIThzGVgQ	0	t	\N	\N	\N	\N	2016-05-03 09:02:15.945+02	2016-05-03 09:03:22.555+02
14	Jannica	\N	jannica.andrea@gmail.com	\N	User	t	\N	0	t	facebook	564031700436722	\N	\N	2016-05-03 11:57:43.087+02	2016-05-03 11:57:43.087+02
15	havarde	b3a64be55b06a01f11dba4dd27ee932415b79fb65c1dd43ce1ab6d938145038fe72dded9dd891dac1bc424dc57d0d3eab0a68b9f6e775b454e7ccf068a043a2266139e87c0d0e9828c2a3e351c53670f76c7a16e0dfa02e37e6015290ad78b871f14b229c51a7d513a5300096d811f17386897bb9d4d9a31a0d4f067dff58d21e1d4b183a7f9dcfc11d08bb568de633f6a01ba4bc906a7b04e09898ee32343b4933e4eb64100b1c74ab3ae2d442e636f7449c9c896fd64874ce2d232cd0225256a9a2ed5126a776d8e8cf97b1974781246ba660e842f2d256b12eae25345d560544f9adc9c9463bedc03d2eb99c153b44cc2a71cdf2a7b6de5506b585170d084	havard.ellefsen@affecto.com	90c4e3581aa4eb3d601b5efd2aa6e64887eddbaffd249d24fa9fab95e8740f804b88ae1eb6a3ec357c5d454d91c58f0cc696de3391509b84ba55052ab611f136e190be274614ef9f32801015212c70713d47c97cbb22616698b4aa1aa08ffb90cbaa190fab9319119c6665f2469c69e817ce76c95fb69b4fb5b2676e0b02812400b7ff63f972ad22f019120a43ab9b36890438422cbde2de2cf66528bb9256888895aa2310d39845610e2b549d3502ef6cc7c72120371b6d63d853b3c405efeae3e537a581eba91d2b4ed0696602ecdb2fd31ade0427590ba1ab9d80c9ca239c3cba3185cee0f9f5c7965d51f5238efe33454b576025714a2090f4b39245f7b0	User	t	2HWk6rSfh6qkpfgkksiDzMNcGJwsx8suJGCBZWNS1Nf5WONGijGsYR5UwhFLzKy1KCSOBBZS38Q	0	t	\N	\N	\N	\N	2016-05-03 13:36:43.155+02	2016-05-03 13:37:26.457+02
16	karl	26de8acb2c3fb1028ce3e9e5d1ac30c41aa99d10a95c40b3cee2c13f4e7dcd37be6b25597d0a0e1dfdf7e75c570fc0754a7aad8a186aa763d2eb57ac775ad663c1179d3f6f3346b5157bbae022a318faac6d074fb7be129a9db7508cd5a76dba8e9f9a0be076c94e6f366902506e36cd94306f571db95d13937d716109940de1b2d81c8fe7a436aa3fe692b0ac0254d43148d7796945d83a7965d68eac55de1912c669fc0e2f253e5d2ccb7d4d723a130d2bd7646724b0092d8f4bf7576abacc1fe70bb7c12fd00a262cc5b0be15eb540b4c3642995224b27c4f7e8c87ab5adeae7942eeb6de9e87120f050420f2f4feb9cc7e5341e3777df1862f9bb679fb6e	karl.binde@affecto.com	67a0c383afafdc84264050d8c109d03c7585e47474023b5696f711bf29b366e4fd848a2d12856715e26103f12627aeaff277145f5216b2965910dc6d67fe468e498940849d36979a7dd91c6ba46f844878d550463115d50c07b6bf3ab08a0074b2b055353d0b110fe898f3a248552b896b55be2b9676d8c777447960f4f3ca824cd7fc2a6149d61ad17bf3268cd3a9882d576432d1f6c83ad17b378f638d657c39ba876655096bd4f98f4d741eee5c31f6a34878a8e34dd45948f3f01cf70364b5290e2d6b0353db0c8d3ac8b5fa2060f21d7e76caa08dfd434387b393f6e33133281b9e5b412fbf39c7d83d01f0c02a4f4b11a1249802fc69b8f3ea121bc8f7	User	t	eiEfsE0mqAsu2k0uWp8qWyEDjOLDUfoBh1wCH0gVxqgfV6TYzBK8cmFnf4IeUuzs5IWetLYo5aJ	0	t	\N	\N	\N	\N	2016-05-03 14:41:40.823+02	2016-05-03 14:42:07.211+02
17	Anonymous	06e5b594247618a76cfd7d8033a1205aa0d5a2efd58fa9073460f6c1e901f0e922ac4d30250ad6b25df65c2aee2b3b88c75dab0f9f0cc84e2ff65498e9faed8f70d4de4b0e21109c909cb30f6ad11f33bccf281da03705d443bfa216cdcfa0b0ec234d788d77f5bb28141df4a503fa3c438195a2ee2742ab7cc98ae5d75cd34f37c5558a399a72324cb2484cc9719832040e94961821b57cde0bf517b43b95497f330c94a56211a32d872a032c8f86dc6ee45f0cefafbc123be3ac21a3b63791ff0227e7450a853c905623530cc30071eba07fa6499506ce9d5321b686d11c61247b0b1e9c669310502d6134a83067f675a125e4d09ded53455b004bcdbcdb9c	oyvind.nergard@affecto.com	332ad5f4bc70861b08d98b0d785d8c14af35d737043cb56f7fcc6efb658eaca1eaa45e99ab568f0144dd1c7004764db7b152737b7bb15a4ce2bc0e7c744731f7e7593fa1403a89d8ff3972b2b9302a8c82bdb77a4a9d5f15b8f734217632e81da283cf68fa636636a4bcf23f8fd378ad707cb097fe3980ef71c274caa70333d547392123f184eb56ca5590961f8f35c459c18f0cd8fac6899850e8b788bd4450868711beab2352d3bf3c4adc1d8230587812ee40b72ab0b4a5fb3c0beab34d935ba73adfd98f4f361e35144317c1de7747a55a0de66576c6b2920900ae6e3802325ab3497f0aed0c930f0aa08a82604b4968a91ac3a2f86d4d63c6965e187a5d	User	t	gqadlJAXyDd4jW56OLguT3xg1cEMPjaQpcVy3VMZZ85mRnSgOTN2StgfDXYWXrdQ2jTDODEu8c9	0	t	\N	\N	\N	\N	2016-05-04 13:26:00.176+02	2016-05-04 13:26:22.022+02
18	Erling	2c9b6e287de34cbf40495bef537c162850cedaf178bfdc100b6f241e81fe633ad052a78121a16401297832bab527110952bc08da55b600a58b12b5d80c708b56a588a31a44d2f9e1cd8a2bffc171513eac22d2ce5872cfe5a57bab1ccad2c01c31336408c31a42d7bcd09a5f7c258036e911e3d5c0a1466f48477b7b5a18e0207b6ea5acc157b38a6d3f4c19959a46e20d18bee1b956a2a47e8f508817106d7c2fedbf9d7aaa523edddc04716a2073628c51e6a606d07702f0f39fdc8b93e1b2ff4a6d7bf5611b744f9aaca109c6672f794724a2a539e84914a0f63d8021fc2186b7761242859ed26a869d16453ee6f762a2f2e87fb39af1141875f36e7c44c0	rognerud@gmail.com	dab1470ff6b3464ac8c94f7e5b14cffe114cbc10ae453642f55d77fdc2ef636c449b0a5c88d585ef55c41d6d149b7b5ab735c60e02b8a1e31069aadb4931ceb08830179a772cb4b7b54c8f3613a253607206a08af9e2db91dbc862d6edc2f322e73cabe0db4f515b5dc126d23041a86c07b56a81e74bac4116279a435f84f32c25753203c09a69f4e00b366c81a16d464ba3ce4f09a60a59cc82fa1b57394b28b7077606c99e58c7a33c2d779f94936768627fbb4afb049e7a33143bbe55e6b58f6157028d57cd633ebb3f10dabf082dfbdf86aae70267fdd97062f180254243ccc8de87d975062b80c34fe46ecfbc5610579957680590d0507569e69562cc42	User	t	7VU8UklNfd30dQKyXLfdvdCTfWKvUq0aryv9Gtqbv9pt90o2jKC6JzvxppMWw6FamnVWSnmeKaW	0	t	\N	\N	\N	\N	2016-05-04 13:26:55.417+02	2016-05-04 13:27:49.767+02
19	live.melhuus	15d68548bfe5ab07440b3fb40b00484dc03435110b7bd1d2906c6b8c604f86efae4ee7196c6f2a5e3b54ab508d4534e884164f3549da23e30b536aa02cd0a431de2ebc7f53d282aa24258cb2668cbfdaff57403ed48d64e62b99720c2b788a5c56cbdeb5dec0fdef1f24312daed5e16b1e79c1b3d32e7780afabbde308b04ada86519a23fc927d7c9d1360747530ae75916a5237328c1c0b38edc47223ec5d89b31d40e94ec25c0a09826c6d2963f39b493ceefb70d9dceef92c431a26da0657d87d12f4001796256f3277aaeca46d29fd308f8f193a96007a751adf84df3ee4f99d0a16981c38a182c33f782c7e6b495ae0b2c0517d010da0d648dd5d17bdf0	live.melhuus@gmail.com	d5baa2e729a2025ff28694590bf4e00a2466f9d6fe37f2f314d4e31ac57f54ed82c1a7584a97783084c2b95d0cf35c9f4940e70d6380fb4ff6356d234963bc4209d36ee8e1639983a5641972799f9a068c8e558d8f44e9139d20f406bb34f56d8431c28952b6d8f70a2775cc1e5a62dbc2cde456dc9a2a8b997590858a239dbe17909ca2a7ddd451975c5fa68ff2493058b8ecc7d0fd38c18e4f0fcb753fbc1828a04deac34d788406c8d2922e4762a07bffb3d82256dd267605f06df3a0a06a0c04f8e158dc8179e6b1d778b64ad4121cfdfd4147f6e8db19e5d8f0d8e0d775129dc53d4035e4f505d0f024eec1816382c1b4ea07f8c17ca23118c6e815c88d	User	t	sWpid61fQwFZN4kTMXcZ9SHHPCZiUiUF3dUHVFPYZ7Vmo3jZzmgtj3Z9CW6neefabMOryCI4UCq	0	t	\N	\N	\N	\N	2016-05-04 13:39:18.006+02	2016-05-04 13:39:35.697+02
20	jatle	daf4ac801c0d6f64136f56a5719e9797631257fc99f3ed74a75c268e5479049981e00f483733c38192e3e00e344884dfa52cb705940a842ccf2240c1892b6b206b939619a0bddf37a4d08265ac3fe3747091b20258a514a70772c63d8818c864cec69174d0f26ad1a87f5758cc538643b312e50e17476fea17e82fa0eec93761f2719f3a09ec0af2f6c6093e638c2791bf871a129fb856868524f9cb192c6eedcf894ac203a45cd1f31f3c101cca41fb6f0bc7ee683dc41f7c35860f406c16e0386c0e70b979fb7e6d577fb993b5adf489938d1ef05c618e2886bd03923ac67b7de0369dc8b47e620d72835815eae0ca3440832d4994f248d2d08718cf075ca7	jahusbyn@online.no	4a7b1d3234217e294954b6b609d04d832c5ab2d907690eaffaf306ad5c4f385b43e7e3a203ded4d195a97dd0e2e7e1cbe30e1a73a62d08638c8e5ccc033574e0e0781944a592b8047a3d2c8e3d56dae2118eaaf3f7c6c2b3042fb85c4bf05788c54c4f6f13b534d279539a81ec15b0d02cd47df558134f0744510500852ee8dbb839e2ced56859bfa74477eda45aadbc8c48de5f83ecce6b1cecfc8c033855c8b92def3952ead4948fc4fb4117ab0a4223ec6b0b03cb4a7b6cf37b9ea611dd628f6f89f985f850b23d5c3620457170db9a3c8b11095d858bf301c128ad4e206c65bf1852c6bf4ca1f8ad8f09c008a5f18e5f9e9739ae98df95e0619936bd35d9	User	t	0s39Vh6KONxjzhhQD4kLuwCIF7QyAwNg0pujwqMD0Q1jpcAWmjWZlgUmrg1KjwUZYQhHpYX06Sv	0	t	\N	\N	\N	\N	2016-05-04 13:52:32.762+02	2016-05-04 13:53:25.39+02
21	Kjetil	\N	kjetil.h.hansen@gmail.com	\N	User	t	\N	0	t	facebook	10156855515440521	\N	\N	2016-05-04 14:17:54.445+02	2016-05-04 14:17:54.445+02
22	Anonymous	a6791da4ad5743c18265925d3aa661a050d385ba0a726de86aad71deecb425ab200f83e14c8e802ec8cb46fd719a36fb13c95f985ef7efa740f4ab72b2ef9432677a8dc9044a67c4daff0d4f8ef8c8ad724893e34a7f3fdc293ab1ee4d80662b15e43817078f959c295ff6291d9fc0ac75aa5d84d4a354dc1ad900fb28767711ba5c530e9c61460ea98a2f77e05c2110966190321058c4dabd8d9af831f1d97116ba291750a7b36724941fcca8f38960dce21fa7d559edb51839ebd9d9ef11473a6c8e04f7c234015b542520188d802433e93953b0c3fd6b1cda87fe3b0f0fc0b9110cd384fcdcd3fb491575239f989f40631394e1b1cb12c5ba038018fcbf58	juhasiltanen@gmail.com	c03da8143273ef5667a5a32b1412401c3a69f7f98a604527a2f7817e2a2f6f37404e8ac57ed6399e282cee430887e4771f1ede0172af74f3bb414e781f2a330384923a2b8eccd3947e9475988942e33764ec7444fbacaf8f3cf71e9753c7048951b9b18b0d3da31120a28cd5a83af232d2d9d7b02a7f66f00ee66cdd3465af3c6add84ab0950234621020872913533997b47b98b59bf315c2138bfd91b56895b8813a167585be3d8c6ec5929da75d160e7bdbd637a1a8e36faef2a04e0cea3910858a37e7420c74bf33339181c5cedae3e143b0593e5b8ee68870d84fe527bbeb813eb17da51ef4195d16b173b699f37d67c95ccf4cd0920adf9969c5e79b02c	User	f	axNBNGw07fuPR1hSKk5bwMBH4t82lUYAH9oX5Aq1ldKekRWh5PBEfwnnjOmbJpWFuF5QglQloeG	0	t	\N	\N	\N	\N	2016-05-04 14:45:34.157+02	2016-05-04 14:45:34.157+02
23	Anonymous1	63d2bcbff7b887cdeb5287911184337dfd3f0d5920987712ec9a02b37348729b2d37b998f520884b028a3ab209c88f8cb5d33171f59d415c7adccd4732ad7fc957b7f7e56167a5e4fad4ecf97de72299cfacd0c87848a0b340cc88302564ef4017b373366ac5ccc9f2e30fa48fab2db5fcb7ead13d2fa368db0046bae31a6e9dd8c62891ae9f5d504c3230e995f1f87c38d9511780518964e325f7f742c97c0769e6412c0ddff14c983a1a4fb225f78b45ab81cbc41e84471a4f1c41f27b64d5368b9c884b592d4e3a0a9e49a9a9991ae435033b81ca00749dcaa7409b98b09eada94b3ec5b86815683ce65c57f2896e855c5aec9a5480c16c604a6e36fd4a58	a@a.com	f432522ab3e8f9821ad48c6c837e2a4b26d41246973dcdf50c883aba1a43c637defa3192d830c202448367ef246bbf84103f2ef17b4aa64f86423c799a083f612c48853a5f5b18302aeb3a4704e7d7c6342c69c097ce2a463b8b1c23ac702e385182cbce0b270f534de3d378a5444f4bfc0098628450e69dd8998d601470aa2a1a5b7e9897930a691631a47fbbc947193b8512f8611e9d2a9b309b70ecdf943e7ee5daa61ad22f2b201e51ae624aef118a52ebf081ae4cccaa7162bfb82317563cfc7f134def9588a36042768df6e4a2dc0cdebe5f644f6ae9fd3053753392ffdd9abae44e0b13c0cd9695ebcb639f05f5a51a9be9eb727f5b1f1bfb68d03fb2	User	f	pRs4gFpx6HnDSZkd07KkwEB3diRyUBDNKUSecUgRhnE6qcwcRX8Sk71xymehy9LCaV3Bo56Dozc	0	t	\N	\N	\N	\N	2016-05-04 22:35:57.562+02	2016-05-04 22:35:57.562+02
\.


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: general
--

SELECT pg_catalog.setval('"Users_id_seq"', 23, true);


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

