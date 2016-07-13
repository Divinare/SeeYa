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
-- Name: Contact; Type: TABLE; Schema: public; Owner: general; Tablespace: 
--

CREATE TABLE "Contact" (
    id integer NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone,
    "subjectId" integer NOT NULL,
    "userId" integer,
    email character varying(255),
    description character varying(255) NOT NULL
);


ALTER TABLE public."Contact" OWNER TO general;

--
-- Name: Contact_id_seq; Type: SEQUENCE; Schema: public; Owner: general
--

CREATE SEQUENCE "Contact_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Contact_id_seq" OWNER TO general;

--
-- Name: Contact_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: general
--

ALTER SEQUENCE "Contact_id_seq" OWNED BY "Contact".id;


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
    description character varying(500),
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
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: general; Tablespace: 
--

CREATE TABLE "SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO general;

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
    "showNotifications" boolean DEFAULT true NOT NULL,
    "authProvider" character varying(255),
    "authProvUserId" character varying(255),
    "forgotPasswordId" character varying(255),
    "forgotPasswordIdCreateTime" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "countOfSentVerificationEmails" integer DEFAULT 0 NOT NULL
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

ALTER TABLE ONLY "Contact" ALTER COLUMN id SET DEFAULT nextval('"Contact_id_seq"'::regclass);


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
1	Hietaranta Beach, 00101 Helsinki, Finland	Finland	Helsinki	00100	2016-04-24 23:20:33.873+02	2016-04-24 23:20:33.873+02
2	Kulosaari, 00570 Helsinki, Finland	Finland	Helsinki	00570	2016-04-24 23:22:38.197+02	2016-04-24 23:22:38.197+02
3	Kungsträdgården T-bana, 111 47 Stockholm, Sweden	Sweden	Stockholm	111 47	2016-04-24 23:25:00.302+02	2016-04-24 23:25:00.302+02
4	Sampogatan 12, 00100 Helsingfors, Finland	Finland	Helsingfors	00100	2016-04-24 23:26:08.872+02	2016-04-24 23:26:08.872+02
5	02970 Luukki, Finland	Finland	Luukki	02970	2016-04-24 23:27:30.237+02	2016-04-24 23:27:30.237+02
6	Punavuori, Helsinki, Finland	Finland	Helsinki	\N	2016-04-24 23:28:00.028+02	2016-04-24 23:28:00.028+02
7	Paavo Nurmen tie, 00101 Helsinki, Finland	Finland	Helsinki	00250	2016-04-24 23:29:48.937+02	2016-04-24 23:29:48.937+02
8	Korkeasaari, Helsinki, Finland	Finland	Helsinki	\N	2016-04-24 23:31:07.856+02	2016-04-24 23:31:07.856+02
9	Seurasaari, 00250 Helsinki, Finland	Finland	Helsinki	00250	2016-04-24 23:32:38.803+02	2016-04-24 23:32:38.803+02
10	Stockholm, Sweden	Sweden	Stockholm	\N	2016-04-24 23:33:36.535+02	2016-04-24 23:33:36.535+02
11	KTH Hallen, 114 28 Stockholm, Sweden	Sweden	Stockholm	114 28	2016-04-24 23:34:21.002+02	2016-04-24 23:34:21.002+02
12	Gamla stan, Södermalm, Stockholm, Sweden	Sweden	Stockholm	\N	2016-04-24 23:35:35.983+02	2016-04-24 23:35:35.983+02
13	111 51 Stockholm, Sweden	Sweden	Stockholm	111 51	2016-04-24 23:36:43.753+02	2016-04-24 23:36:43.753+02
14	Lancaster, Lancashire, UK	United Kingdom	Lancaster	\N	2016-04-24 23:38:33.096+02	2016-04-24 23:38:33.096+02
15	Ashton Memorial, Lancaster, Lancaster, Lancashire LA1, UK	United Kingdom	Lancaster	LA1	2016-04-24 23:39:38.338+02	2016-04-24 23:39:38.338+02
16	Barcelona, Barcelona, Spain	Spain	Barcelona	\N	2016-04-24 23:40:30.289+02	2016-04-24 23:40:30.289+02
17	Edinburgh Zoo (Stop 1), Edinburgh, Edinburgh, Edinburgh EH12, UK	United Kingdom	Edinburgh	EH12	2016-04-24 23:42:09.213+02	2016-04-24 23:42:09.213+02
18	48/2 London Rd, Edinburgh, Edinburgh EH7 5SP, UK	United Kingdom	Edinburgh	EH7 5SP	2016-04-24 23:43:16.185+02	2016-04-24 23:43:16.185+02
19	Lauttasaari, Helsinki, Finland	Finland	Helsinki	\N	2016-04-24 23:44:29.086+02	2016-04-24 23:44:29.086+02
20	Suomenlinna Maritime Fortress, 00190 Helsinki, Finland	Finland	Helsinki	00190	2016-04-24 23:45:34.568+02	2016-04-24 23:45:34.568+02
21	Ruoholahti, Helsinki, Finland	Finland	Helsinki	\N	2016-04-24 23:46:48.046+02	2016-04-24 23:46:48.046+02
22	Svinhufvudsvägen 11, 00570 Helsingfors, Finland	Finland	Helsingfors	00570	2016-04-25 00:07:42.398+02	2016-04-25 00:07:42.398+02
23	Sandstrandsvägen, 00101 Helsingfors, Finland	Finland	Helsingfors	00100	2016-04-27 18:34:38.387+02	2016-04-27 18:34:38.387+02
24	Kumpula, 00560 Helsinki, Finland	Finland	Helsinki	00560	2016-04-28 23:21:40.768+02	2016-04-28 23:21:40.768+02
25	Kumpula, 00560 Helsinki, Finland	Finland	Helsinki	0056	2016-04-28 23:28:51.703+02	2016-04-28 23:28:51.703+02
26	Kumpula, 00560 Helsinki, Finland	Finland	Helsinki	00850	2016-04-28 23:29:02.802+02	2016-04-28 23:29:02.802+02
27	Rosendalsvägen 49, 115 21 Stockholm, Sweden	Sweden	Stockholm	115 21	2016-04-29 21:03:29.014+02	2016-04-29 21:03:29.014+02
28	Valmundsvägen, 115 21 Stockholm, Sweden	Sweden	Stockholm	115 21	2016-04-29 21:06:00.111+02	2016-04-29 21:06:00.111+02
29	Djurgården, Östermalm, Stockholm, Sweden	Sweden	Stockholm	\N	2016-04-29 21:13:05.733+02	2016-04-29 21:13:05.733+02
30	Vaasankatu, 00101 Helsinki, Finland	Finland	Helsinki	00101	2016-04-29 22:29:32.403+02	2016-04-29 22:29:32.403+02
\.


--
-- Name: Addresses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: general
--

SELECT pg_catalog.setval('"Addresses_id_seq"', 30, true);


--
-- Data for Name: Attendances; Type: TABLE DATA; Schema: public; Owner: general
--

COPY "Attendances" (id, comment, "sendEmail", confirmed, "createdAt", "updatedAt", "eventId", "userId") FROM stdin;
1	\N	f	f	2016-04-24 23:20:33.989+02	2016-04-24 23:20:33.989+02	1	2
2	\N	f	f	2016-04-24 23:22:38.269+02	2016-04-24 23:22:38.269+02	2	2
3	\N	f	f	2016-04-24 23:25:00.356+02	2016-04-24 23:25:00.356+02	3	2
4	\N	f	f	2016-04-24 23:26:08.905+02	2016-04-24 23:26:08.905+02	4	2
5	\N	f	f	2016-04-24 23:27:30.291+02	2016-04-24 23:27:30.291+02	5	2
6	\N	f	f	2016-04-24 23:28:00.083+02	2016-04-24 23:28:00.083+02	6	2
7	\N	f	f	2016-04-24 23:29:48.961+02	2016-04-24 23:29:48.961+02	7	2
8	\N	f	f	2016-04-24 23:31:07.88+02	2016-04-24 23:31:07.88+02	8	2
9	\N	f	f	2016-04-24 23:32:38.851+02	2016-04-24 23:32:38.851+02	9	2
10	\N	f	f	2016-04-24 23:33:36.59+02	2016-04-24 23:33:36.59+02	10	2
11	\N	f	f	2016-04-24 23:34:21.038+02	2016-04-24 23:34:21.038+02	11	2
12	\N	f	f	2016-04-24 23:35:36.017+02	2016-04-24 23:35:36.017+02	12	2
13	\N	f	f	2016-04-24 23:36:43.802+02	2016-04-24 23:36:43.802+02	13	2
14	\N	f	f	2016-04-24 23:38:33.131+02	2016-04-24 23:38:33.131+02	14	2
15	\N	f	f	2016-04-24 23:39:38.379+02	2016-04-24 23:39:38.379+02	15	2
16	\N	f	f	2016-04-24 23:40:30.319+02	2016-04-24 23:40:30.319+02	16	2
17	\N	f	f	2016-04-24 23:42:09.248+02	2016-04-24 23:42:09.248+02	17	2
18	\N	f	f	2016-04-24 23:43:16.231+02	2016-04-24 23:43:16.231+02	18	2
19	\N	f	f	2016-04-24 23:44:29.129+02	2016-04-24 23:44:29.129+02	19	2
20	\N	f	f	2016-04-24 23:45:34.605+02	2016-04-24 23:45:34.605+02	20	2
21	\N	f	f	2016-04-24 23:46:48.088+02	2016-04-24 23:46:48.088+02	21	2
22	\N	f	f	2016-04-25 10:57:24.904+02	2016-04-25 10:57:24.904+02	2	3
23	\N	f	f	2016-04-25 10:57:47.921+02	2016-04-25 10:57:47.921+02	1	3
24	\N	f	f	2016-04-25 10:57:58.725+02	2016-04-25 10:57:58.725+02	7	3
25	\N	f	f	2016-04-26 17:03:43.926+02	2016-04-26 17:03:43.926+02	2	4
27	\N	f	f	2016-04-26 17:03:52.466+02	2016-04-26 17:03:52.466+02	14	4
28	\N	f	f	2016-04-26 17:03:56.916+02	2016-04-26 17:03:56.916+02	4	4
29	\N	f	f	2016-04-26 17:04:03.981+02	2016-04-26 17:04:03.981+02	11	4
26	Lets have some fun!	f	f	2016-04-26 17:03:47.998+02	2016-04-26 17:04:18.94+02	7	4
31	\N	f	f	2016-04-26 17:04:24.908+02	2016-04-26 17:04:24.908+02	5	4
32	\N	f	f	2016-04-26 17:04:29.657+02	2016-04-26 17:04:29.657+02	12	4
33	\N	f	f	2016-04-26 17:04:34.28+02	2016-04-26 17:04:34.28+02	15	4
34	\N	f	f	2016-04-26 17:38:13.314+02	2016-04-26 17:38:13.314+02	9	5
35	\N	f	f	2016-04-26 17:38:17.942+02	2016-04-26 17:38:17.942+02	2	5
36	\N	f	f	2016-04-26 17:38:22.061+02	2016-04-26 17:38:22.061+02	7	5
37	\N	f	f	2016-04-26 17:38:31.758+02	2016-04-26 17:38:31.758+02	6	5
38	\N	f	f	2016-04-26 17:38:37.397+02	2016-04-26 17:38:37.397+02	12	5
39	\N	f	f	2016-04-26 17:38:50.271+02	2016-04-26 17:38:50.271+02	5	5
40	\N	f	f	2016-04-26 17:38:54.676+02	2016-04-26 17:38:54.676+02	15	5
41	\N	f	f	2016-04-26 17:39:14.928+02	2016-04-26 17:39:14.928+02	3	5
42	\N	f	f	2016-04-26 17:40:06.435+02	2016-04-26 17:40:06.435+02	7	6
43	Coming if its not rainy	f	f	2016-04-26 17:40:10.238+02	2016-04-26 17:40:40.485+02	2	6
45	\N	f	f	2016-04-26 17:40:51.615+02	2016-04-26 17:40:51.615+02	9	6
46	\N	f	f	2016-04-26 17:40:55.579+02	2016-04-26 17:40:55.579+02	12	6
47	\N	f	f	2016-04-26 17:41:03.091+02	2016-04-26 17:41:03.091+02	6	6
48	\N	f	f	2016-04-26 17:41:07.697+02	2016-04-26 17:41:07.697+02	1	6
49	\N	f	f	2016-04-26 17:41:15.466+02	2016-04-26 17:41:15.466+02	8	6
50	\N	f	f	2016-04-26 17:41:20.499+02	2016-04-26 17:41:20.499+02	5	6
51	Amazing! I'll bring my camera!	f	f	2016-04-27 18:15:38.959+02	2016-04-27 18:15:38.959+02	3	7
52	I'll look forward to this!	f	f	2016-04-27 18:24:13.974+02	2016-04-27 18:24:13.974+02	7	7
53	\N	f	f	2016-04-27 18:26:54.09+02	2016-04-27 18:26:54.09+02	15	7
54	I'm coming! :))))	f	f	2016-04-27 18:30:08.205+02	2016-04-27 18:30:08.205+02	17	7
55	\N	f	f	2016-04-27 18:34:38.534+02	2016-04-27 18:34:38.534+02	22	7
56	☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃	f	f	2016-04-28 23:21:40.875+02	2016-04-28 23:22:02.149+02	23	10
66	\N	f	f	2016-04-29 14:34:32.508+02	2016-04-29 14:34:32.508+02	7	9
67	\N	f	f	2016-04-29 14:34:43.63+02	2016-04-29 14:34:43.63+02	19	9
74	Wow	f	f	2016-04-29 18:34:04.745+02	2016-04-29 18:34:04.745+02	2	11
77	\N	f	f	2016-04-29 21:06:00.312+02	2016-04-29 21:06:00.312+02	32	13
78	\N	f	f	2016-04-29 21:13:05.847+02	2016-04-29 21:13:05.847+02	33	13
\.


--
-- Name: Attendances_id_seq; Type: SEQUENCE SET; Schema: public; Owner: general
--

SELECT pg_catalog.setval('"Attendances_id_seq"', 79, true);


--
-- Data for Name: Categories; Type: TABLE DATA; Schema: public; Owner: general
--

COPY "Categories" (id, name, "createdAt", "updatedAt") FROM stdin;
1	Sports	2016-04-24 21:27:27.063037+02	2016-04-24 21:27:27.063037+02
2	Socializing	2016-04-24 21:27:27.063037+02	2016-04-24 21:27:27.063037+02
3	Food & Drink	2016-04-24 21:27:27.063037+02	2016-04-24 21:27:27.063037+02
4	Nature	2016-04-24 21:27:27.063037+02	2016-04-24 21:27:27.063037+02
5	Music	2016-04-24 21:27:27.063037+02	2016-04-24 21:27:27.063037+02
6	Travel	2016-04-24 21:27:27.063037+02	2016-04-24 21:27:27.063037+02
7	Other	2016-04-24 21:27:27.063037+02	2016-04-24 21:27:27.063037+02
\.


--
-- Name: Categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: general
--

SELECT pg_catalog.setval('"Categories_id_seq"', 1, false);


--
-- Data for Name: Contact; Type: TABLE DATA; Schema: public; Owner: general
--

COPY "Contact" (id, "createdAt", "updatedAt", "subjectId", "userId", email, description) FROM stdin;
\.


--
-- Name: Contact_id_seq; Type: SEQUENCE SET; Schema: public; Owner: general
--

SELECT pg_catalog.setval('"Contact_id_seq"', 1, false);


--
-- Data for Name: Contacts; Type: TABLE DATA; Schema: public; Owner: general
--

COPY "Contacts" (id, "subjectId", "userId", email, description, "createdAt", "updatedAt") FROM stdin;
1	3	\N	\N	test\n	2016-04-24 21:27:55.397+02	2016-04-24 21:27:55.397+02
2	1	9	\N	Moi T. Joe	2016-04-29 19:15:36.744+02	2016-04-29 19:15:36.744+02
\.


--
-- Name: Contacts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: general
--

SELECT pg_catalog.setval('"Contacts_id_seq"', 2, true);


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
15	The Ashton Memorial Visit	We will meet at Piccadilly in London.	-2.78227000000003954	54.045259999999999	1466577000000	\N	\N	\N	2016-04-24 23:39:38.357+02	2016-04-24 23:39:38.37+02	15	\N	2	6
1	Volleyball	Everybody invited! Come and bring friends.	24.9066566000000194	60.1740732000000023	1462960800000	\N	\N	\N	2016-04-24 23:20:33.952+02	2016-04-24 23:20:33.986+02	1	\N	2	1
3	Cherry Blossom Watching	We sill meet at T-bana and go and chill in Kungsträgården. Take your friends as well!	18.0732937999999876	59.3307839999999871	1462270800000	\N	\N	\N	2016-04-24 23:25:00.337+02	2016-04-24 23:25:00.354+02	3	\N	2	4
16	City Walk Barcelona	Here you are welcome. Always!	2.17340349999994942	41.3850638999999987	1462437600000	\N	\N	\N	2016-04-24 23:40:30.309+02	2016-04-24 23:40:30.318+02	16	\N	2	6
4	Basketball Meeting	We have this every night and you are very welcome.	24.9184662802733783	60.1725880533803448	1462397400000	\N	\N	\N	2016-04-24 23:26:08.885+02	2016-04-24 23:26:08.905+02	4	\N	2	1
5	Hiking in Luukki	Let's meet at the gate around 8. We will start Hiking as soon as everybody is ready. Looking forward to seeing you! SeeYa!	24.6922707999999602	60.3163525000000078	1464156000000	\N	\N	\N	2016-04-24 23:27:30.265+02	2016-04-24 23:27:30.289+02	5	\N	2	4
6	SeeYa Meeting	As always at the right time :)	24.9364126000000397	60.1617225000000033	1462310400000	\N	\N	\N	2016-04-24 23:28:00.059+02	2016-04-24 23:28:00.082+02	6	\N	2	3
17	Edinburgh Zoo visit	Let's meet after the lunch!	-3.267317999999932	55.9423259999999871	1466589600000	\N	\N	\N	2016-04-24 23:42:09.238+02	2016-04-24 23:42:09.247+02	17	\N	2	6
7	Floorball	Let's have a game!	24.9266910552978516	60.1839632312986836	1464161400000	\N	\N	\N	2016-04-24 23:29:48.951+02	2016-04-24 23:29:48.961+02	7	\N	2	1
8	Zoo Korkeasaari meeting	Every Friday as always!	24.9860535000000255	60.1749718999999885	1464157800000	\N	\N	\N	2016-04-24 23:31:07.869+02	2016-04-24 23:31:07.879+02	8	\N	2	4
33	Friendly Football	Come and spend a great afternoon with friends and strangers too! Bring your own football, please !	18.113215099999934	59.3262840000000011	1462431900000	\N	\N	\N	2016-04-29 21:13:05.827+02	2016-04-29 21:13:05.846+02	29	\N	13	1
9	Piknic at Seurasaari	Some drinks here! Welcome. Take you Avec ;)	24.884097200000042	60.1814921000000069	1462260600000	\N	\N	\N	2016-04-24 23:32:38.827+02	2016-04-24 23:32:38.849+02	9	\N	2	3
18	National Museum of Scotland	\N	-3.16732431201171494	55.9573123461098874	1466667600000	\N	\N	\N	2016-04-24 23:43:16.21+02	2016-04-24 23:43:16.229+02	18	\N	2	6
10	Stockholm City Walks	We start at central station and walk to Gamla Stan!	18.0685808000000634	59.3293234999999868	1464251400000	\N	\N	\N	2016-04-24 23:33:36.568+02	2016-04-24 23:33:36.588+02	10	\N	2	6
11	KTH Meetup Club	We meet at KTH Hallen. SeYa there!	18.0689575000000104	59.3521689000000023	1462397400000	\N	\N	\N	2016-04-24 23:34:21.023+02	2016-04-24 23:34:21.036+02	11	\N	2	5
12	Gamla Stan Visit	Let's have a lunch there! The entrance to the restaurant is 30 kr! But it is cheap one!	18.071867500000053	59.3256954000000007	1467196200000	\N	\N	\N	2016-04-24 23:35:36.006+02	2016-04-24 23:35:36.016+02	12	\N	2	6
19	Lauttasaari Canoeing meet	We will start here and the sail to Seurasaari!	24.877253200000041	60.157330199999997	1462609800000	\N	\N	\N	2016-04-24 23:44:29.109+02	2016-04-24 23:44:29.127+02	19	\N	2	1
13	Kulturhuset and Trapporna	Here we are again.	18.0644768899962855	59.3320475653325801	1466582400000	\N	\N	\N	2016-04-24 23:36:43.792+02	2016-04-24 23:36:43.801+02	13	\N	2	6
14	Picnik in Lancaster Park	Lets gave a picnic! Bring your friends, we are here anyway.	-2.80073990000005324	54.0465749999999971	1467187200000	\N	\N	\N	2016-04-24 23:38:33.12+02	2016-04-24 23:38:33.13+02	14	\N	2	3
20	Maritime Fortress visit	All tourists and not tourists welcome!	24.9863004999999703	60.1479031999999876	1462341600000	\N	\N	\N	2016-04-24 23:45:34.59+02	2016-04-24 23:45:34.603+02	20	\N	2	6
21	Kaapelitehdas Game Jam	Yes! It is finally there!	24.9075688000000355	60.1636377000000024	1469655960000	\N	\N	\N	2016-04-24 23:46:48.066+02	2016-04-24 23:46:48.086+02	21	\N	2	2
2	Friendly football	Me and my friends are organising this every Friday. Come and have fun. We are not professionals.	25.0117116820313186	60.1876467361665348	1462437000000	\N	\N	\N	2016-04-24 23:22:38.232+02	2016-04-25 00:07:42.433+02	22	\N	2	1
22	Football	Welcome!	24.9079339886718572	60.1742037212744378	1461845848000	\N	\N	\N	2016-04-27 18:34:38.503+02	2016-04-27 18:34:38.531+02	23	\N	7	1
23	☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃	☃	24.964735399999995	60.2091077999999982	1461880740000	\N	\N	\N	2016-04-28 23:21:40.842+02	2016-04-28 23:21:40.872+02	24	\N	10	7
32	Friendly Football	Welcome here and bring your friends as well! Bring your own ball as well.	18.1180216185546215	59.326656182273247	1462474800000	\N	\N	\N	2016-04-29 21:06:00.243+02	2016-04-29 21:06:24.486+02	28	\N	13	1
\.


--
-- Name: Events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: general
--

SELECT pg_catalog.setval('"Events_id_seq"', 34, true);


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
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: general
--

COPY "SequelizeMeta" (name) FROM stdin;
20160410134610-length-to-username.js
20160410144103-add-contact-model.js
20160415143030-make-username-unique.js
20160422125954-add-auth-provider-to-user.js
20160422130434-add-auth-userid-to-user.js
20160422152719-email-null-allowed.js
20160422153604-password-null-allowed.js
20160422154009-salt-null-allowed.js
20160424115910-add-accountValidationId-forgotPasswordId-forgotPasswordIdCreateTime.js
20160427212707-change-veralidation-to-verification.js
20160427214602-change-column-accountValidationId.js
20160428104120-chrenameccountVerification.js
20160428104334-chrenameccountVerificationAgain.js
20160428171827-rename-email-verification.js
20160428210235-limit-to-emailverificationscount.js
\.


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

COPY "Users" (id, username, password, email, salt, role, "emailVerified", "emailVerificationId", "showNotifications", "authProvider", "authProvUserId", "forgotPasswordId", "forgotPasswordIdCreateTime", "createdAt", "updatedAt", "countOfSentVerificationEmails") FROM stdin;
1	Joe	b4bd4534af97bd27c75d88bacc31919914222bcd25c416550be67a928e61308d3d2ce3015e53650f1a59ceb056ee77b34592d594445265d35ed7c18d59a01ff42434192cd28377722cfa0b01f59e948d9307eda1a3a278fe54d5955bbfaa5b246811210a6c1d16bd15587f4a25a2cddb7da7ed58f0636b9f7a4a2f8d9d962d02ceb12f647b37d7a03c77521ba5fba32ef5e45ccb069db8812905bb8b0952b59bf29d42480a37906232afbce23d77ba59e52b280d9ab1feb85786dc486557dd40263f94875a55cb7749f578bd65b01c233f982c5d39c0308f86c547dca68bf97779cb69ab855fb8410ebb58d3084bcdb30f7f27b27e06be63681036fc5707d0e4	123@123.fi	9ca6ccd46c371a2937bfa522edd5c823f1239ac0a2cbe54e76b9179a7ed9bcc8b3141ddeebd11b0920d3858dcc73ae43aeecee261745baef214530d5b42a88778cae0f09019a8231bc4bd12a9b4799e25a9cbabf56b3f917f7742e38c1fa7b747d1a4561da75a8a410a868680726067c5279e15aef8d7effc9dc0bd5f09db5c1a9ec59103ac39463ed603c58d1c292523508a051212557ef7bf6ee0257f801221ea1eacab836508171866847cb4e829ad9b08a0fd7f0bc31db0cb34b6af300da784815f01155c94da9aec2da2b78471e58883bf73587b459528def911f2491eed199a64cebd854273cf67187b6ca67d5c6285932b4e80ad5d12392bf507621ca	User	f	\N	t	\N	\N	\N	\N	2016-04-24 21:29:24.015+02	2016-04-24 21:29:24.015+02	0
2	admin@admin.com	0b3cf1950c8069cd130b480d55c493c92a42e764abbc9ae30baff8cd3d0e9d044a7411f8c9102c82a2498fce4262bb1e622855ee892ab68b04db75f3987714549f5ff8fc705caf09f0cd682a6b6e52edcb7aeafb18b1e64904f725894c6dbf97c2103306b13c95daa230193b5cb3cf52a22ff403630c51f09bc906880f0bca02fda8a2f2ca8f45f464017980258df9c4dc84c2b5cca2bd1112560ee96f87b9fa24b0c881ca73bdf91decb8c95f7ece5d43dc35db25f1c40b16f51f482e1be845b2a4500b05855f20d7c7bdc30ef9083e3360f6bb0dde71267cd50ad2b7b69b82632cf7bfdbf9bc4d926dbedef390a15eca5e6e42e96b84ba38b7efc2cb459df2	admin	f2ae8e61587071af59df5f457de20e73a581fcbaf52d9343a9d20e3ff0630800786f02191e7d53215201ecc271acfcdc60cee56ff16b1d28ba85243e8c7673578adb36647526ca98f19d82db2f8eee4cfd61e9edbfd85468e415028d3066143b14b1adefae582800e119be1ef981fde4c227650090b53ee5c8bfa1551485d06d0070449128db199711977a04b8cc0c45395be1f362ea675fa65f0cc1017b4937ad0d6c7334c89c5170b7922e814496e7758005337b3c610a52305bbd00772db6b2dfbed4921ff3f49b82a25452d2d1576692f77f833ea16386f31cb3187c950ba32a08f1031aca92c0fb890df5c93d1d57c1f922046d96b747735297d1be2b1c	User	f	\N	t	\N	\N	\N	\N	2016-04-24 23:18:43.331+02	2016-04-24 23:18:43.331+02	0
3	Mike	0c49494432b8a824fe3861109e2707e230a392b3382a455b55ce4295993abb8d9a697f0004eb4d4213b861d1060afbf297c71b8b70b6816489ab44c29ea556d68c87aa151a16ce295640761ade1fb638dfaa1d6205434513f1bbc8065ecba134ccd5fb8149e5321df5d5958d2ae78419a7778d32db05be8ece734234bef02f3af415c466e620607a56610ac6f573d73ba16ab6d13d887a96fec61d58f60bcab70e929f0cc0c59ec33990e5574e3d0f646c8939321f8ace8116793a37b8fb80079a3e69486d620ca5fc85d10ebf6261723e5d743a495f67ad73dfc1373922c8869e353f7f8316ac7fe4f54c0d8dc6253028f31c7ee6811469d8bf51dacceb25b8	jeejee@jee.fi	441c966a30767d78c122486e04c803c38b14392858f12e942d9aa2884caa7f75f207f4ecbce152715aa69acfe9318a96f75817a47e731552b33bbb20fe4fc54867ff1fbfa2c22d648c5c6c16a2524df903765d1dd5faab5c75170cf06277721bdb0ee35ddb618980c39eab476ebebeefc9e9fb950d61c853e33c8c94fc696665628716e0bf83f4ffbace228810e281c5c1b32a745735bd7db1e54520559b7a990ad0cca600e3de311f1653770fe2e9196976e1a4fa30af89e2b60cd86fa119bd61d60daaf0c6baf611887690bb2ee58d6b85fb90b2113908cda7d6e7e8c22d7e5f2cc34fb5c30a8786de12935b10cc18ea276aa7db93b5aa69bc058d8dd181bc	User	f	\N	t	\N	\N	\N	\N	2016-04-25 10:55:04.077+02	2016-04-25 10:55:52.358+02	0
4	Peter	e9b0bdeb1935b1192e72a8641e83147f97c8d8359237463e7297e8f2159ffdf4376eeb70b77ac79023c2cd5758a717c2b36b091768a3effdedd79669f3d66cab00f4e8575735de6d92a2d6f0114a5658e55ba5ea6b8cb1361745b93724ba880f24bb61aa557eec571075bbad117cee3a97d459cceab2f507cbfa2101a3b3ef6a20b82943c582f403172c5185cba8d948f2f7d507253885c3ce2749199b9529373ef9ec7c47c1f32d2d93cea1f16b956cb1667d7266f30b302afefa64374a8eef5c2cbf6b8d74cc16769fa400291c54f1aceb7e1dd434053a699331ec1a193ace35f90ae1b77f3356f4bd1b376c749973708b1488c9df1dca3e533a10d103a87f	p@p.fi	11541f1774a1ea178ed5b92d700b8ab57b2c2391c1af96054e04db25b135d0b2d1608bfd9c86c1cbed20db1fc9a817fdd8b2890f3c28e2edb1706966dfe1ae8fefb2585baa7c52d8227a003c7917456e4a1523419e9ecdb1402e310481f5a3f668ef7e7e0e77a47246055075c47776fae61c13e8cb81df4f47d8e8ed09a56aebd348032a1311fb5bfc7e8cb15016eb21dd8e45408b63b5ea97f29b24080d70c92828e1038bdd9ccd04871efdb4649fdd2e373a7d87a637cc9ab38e3c912833a6c43ba7c428f70a56ff62ea20cc6c0b12d573f4d24e5650c0591cd0949da6be94fde9f1854b0f6c90a3e550c7f7b3bc9792f81389d7c5f4a87c961680682e2f27	User	f	\N	t	\N	\N	\N	\N	2016-04-26 17:03:40.318+02	2016-04-26 17:03:40.318+02	0
5	Kate	e02340fc637f761b46f1cb315409e74c1563defe73ebcfa92478b19255b15d654972487095d4073bc9f0d6031cf14d2ed9bebff517532b2c7870f5e2676b7d476ba23bffbfbb03f4dc68f2da90bbe9ab48ddefb9b24b50482b06c8f81656b7acfe6a37c5ce35a4fc5f1f38d8cc1187fc0a668e70d5f2398c5c7d3e7002fd35f6c3edeabdeabb384fea3938dd60e425a3811fc780a7952633f8017181ddd7e06c48d8cc401c11cde8c3cc44c9bfd4bdd02067d716a06dbe7b3572a989be4d5242868441e762c472bd9b44e23ca819301accd12c11b2e392a0b087c37f60c047891e171caf56bb9f7c44a3f49a0aa5d95227ab24bba1c9d93502ebc4cb6ba4761e	Kate	5d74e1895d4ea25a86757e31e5c4a14a95597e2a8b88d5eb554123052c979357b23bbc188b64648fe08a74b4588f5124ad31bb387730fc7cebd0fee60360d70c2d37b63762ec7bc952a83427e5929b9f0164c2b4b229c7ee34ec4b2035b6462dc9f46a993ceaf4a420b4308dd0f9d261e61b955069b9403875e494ab70ecc0467f1a0a455fbd818ec069ec86ce15f858508b65fd10f261c73499ba7bdcdf902b2d618c0595e6e919d1aa72c015db6e4187af5c0f527724cd1194c72573b334a87ac20a3e69681ca8adf7b1a3aadffa1cbf5750f57455e80ab91274b6ddd4f922fe98fae18ccc9af76f4794cd7563be006d778961de4c369a15cf44b1405c08f2	User	f	\N	t	\N	\N	\N	\N	2016-04-26 17:38:01.006+02	2016-04-26 17:38:08.551+02	0
6	AnonymousGuy	5fde9f1b35366cb094131c9cce51875320a8fe868559a2c1fed8a67ee5b9df1a866a51b471b6682b65be1c9c6ab0e6f25c822ecfb88cf6facd7b3ae777795e0829f32d59fa9074973b71e193dd6ac0dd82e9e83889c922a153d0681cc3914742495d36fa99f5bf45fbf0b7e1280f8b7e67dd87d85577b427af93e430fbef9aa991da5585279f8c4a92ca6465c5ae27d7c2eb446d069643b5df53f411a3e2834048d6ad2379924a83dcb2cbdcbf6fac50fb6ed983ace88168122a83557754c5d984d6ea8f506a0dac09bda695740f5ae6b2a06345e8bd42310eb920ef63a3c5ce7002996d1fcef87469e9b7421d185cd6311ce5246040fca97e4985791bbd6f48	a@a.fi	512126302c7e0a5a4cc66e390d57e1d6ce78b32644051b1e125e3cc682d6c296887f1e4b98e82bf8b1ea86aa9fc94552d04c53200df60a98f886d4a43c63a8af35401b186c837e91c42c3617585a45219fee48b03f8b82fe3e0a0ac234b823c2a02cbd038a5dfe75aee743dbdd5b39169b4247652016657998b88152a9e2277ac55f91dec09bf31758bd88b69282d5efbf45bf49eacd9ce6d5237243e11627dabe7d95588ad46a1d58b068070e4d9afa189070107d09031095d08076174004b406a1d97d0a531dc1250c20cb7e1cb7a779da738a13c7c51f76d8074628d1f07527329ba0e0f12d465da1035845bcbf3ed30f313b25b922c3534c9e993028cab1	User	f	\N	t	\N	\N	\N	\N	2016-04-26 17:39:58.478+02	2016-04-26 17:39:58.478+02	0
7	Joanna	e38e37e22f24b7e29563311b95196e7577ed5f237af34ad34ce3344ec646a4ed7f881ac23676b74460e41cc9c37d9fcd59db39b3aa927c44568714df0ef257c2ac5a23cd210c10cf06ae125a1ed863c3767dca9ba930a52ae74fd02485886999ecbfeff4119e1ffa832f852a90a5f6a9858ee38cf44a11c9519f66e6659aca2468f4720661bec8367663d14ad151c41ef32cf315d4e48fac37d64e21ea23fcc1af74db0727823ea3eff85a248338a6cc5465acfd22a41ad1893f18ad5d7801d1e8107d1a933d172748364b3e480b8ebc0bf18dbbc7c9fc43776a8d855cc2e5df61194279a7d8ca979f1766bc5a40f63d26057e838b9cb892d507d9fb5668220b		4f8665651c2f0413f6fa2389e5cba5c4bb1c0fb96a31090affcd96f3db43621c643f51d05ce84c66025aaa0a33ea3b6050b9ff28fda03d23417d1ec230745938423076aba5e3ba02b4d93d01dd6db5141174aa56d027e959a7bce16cafe25b6b1dbbbca15fd4286c08636dcdc0bb11ed054c7495026853d569df5c5b9d11e038cba2f3e7a41937d8ae8bf02441497496d9cb8d53f1d0a1061798e9ea20cd3d590bfc6820116778f9dcd30c1ae53ca39ecd6241a6c28b60475bf622a66dabf24697dba22a4f3983eae31081116f58f7b03cc0485aa6d0f2fd82b79fa964c6d693cd9da2a98b0c4acb0970bcc301dfdf338d71f68ba77e87bc170e764a0b12701a	User	f	\N	t	\N	\N	\N	\N	2016-04-27 18:13:44.153+02	2016-04-27 18:32:02.37+02	0
8	Pete	798c71f7d0168e1ba0f07a58e0bb733f97303691332d4f8d72c83d1edf17341639d4312562ca4478ccd66c7ebb72ba04cefd20cc388c46f7417d1fd2315ee2b6d5d7c6b22ffe426cafb15578bfe2999cf113a053afe58455943fd4055db57694261676f3203f89700e0f828dcb6ca91a9fcd8470bcc7c166efcfef65a59045abdb48eace8080c80320114793fb01ac9567aaf58918405aeea13e8c29c3297e0d768b049c4be95dd4849532a7a5403d27a870cf19a9045ed27e46150affd63a4b397465e58f76a8f05c45bad36c3f9729e6a61b0d74c2b96ea85f3e5e0674ca7c0b913adfc83ef80d359f69685e7e55b437484db79afb56ccf5ff424cd1ca2372	petri.mkinen1@gmail.com	c3ea0abc8187cb7548c14189913aa2be8e3f9006b336456ff168ed3011ca1ffa9e2d2ca99c1545ca4528d04bf1b94cb806ca72fbed1aca74908c96ad24e9adab07488c7b7197b7c95a69e9dfd3ebcf4cbc2267b1b0cf1882a6d859a150f0946311ef916a5d57ed4c8340b804a494c075c1df62feb8b693ed8180129b632c6ffd55911e0c6587e54946fa112be00f49fe9fcfda408b13f06ed757c93f902b45a4651caf4cabeda5bc44bc7904f9788330fb94efd1071243ff1517e7e31d0195a8fdb73c2358be2170ddc1048dcd06b5e8b29f429f8edf03ec760b42208d0206028822e38898c27dc0a5196a0a849424cd670eb31a13da7f148f16bb501621ae92	User	f	\N	t	\N	\N	\N	\N	2016-04-27 21:57:11.146+02	2016-04-27 21:57:37.848+02	0
10	<marquee>jamo</marquee>	fbc9d1e2e122b6d629b5a58071e0ad6348e4b0c373d7c39162211ced03fa0af3fa8e3ba10e818791582c18efc8167a30f522826222d443c19f33262a42f62848f75f4802618073e7c0c017b751750cb63110fcf597551ecbe555f03f655a8fdd4f2b25c4fbc7e41217c54072033502ab610ed84695ec0c2929d08e2a493db5a0da2f6bb6343d530023dc7acfcddabdb3b60a680c4d6be024915001d2a67e7b0d0f28bdc34371a9dd76d3441f3b819d6bfb23a25a6e039c96e0f069795aa72a92e46dca21bfff0a72c2d5cc37cb29ec4ad9e2f88396f8800a6f44e7249c00390e2eb0d06b1260cb46621a94a1d1ad29b58e5e6016c4a33a6e2de320b19bb763f2	jamo+1@isotalo.fi	32afe3da0b34a3efd1ff8ef7b9fec06f6fd84dc51076c9b05fe695d26e2574e52ad0d68fa6ae1b5aa47a6c6cd27d2efb8e4290687eaa3aff743a9f2ef779218a5d0ba3bd10e28d8e0510ec084e828ee6e376c8591eaac7117a71c44a28f09b9f4b93ec96affc7ea13685edb5cae748cd442d530b38747902721536c23ae5ab474954f79762727ad5280f6257ce696dfb6b9ea409f597b23ca79cfe67d18d939c889cd2b056e5c6edf4c1e0623b52c05f82a46ea71751a2c07437c91de2b62f8ab3b194ab5a7de13ae9380aa57e1d067f99f883343637c6858ca9b407ae82b30de634f241aa3ea8fdb75f7b2723bdfc63e46d3e92fbff61ff0b31c3dcd198e6f6	User	t	rynSyYKtsNSErcR44zofQp9YLUVQuLiPcrrl6SZ8uCV3s5AhSeRRtAYMN3S7ABQ8GlGYJ3KdCWV	t	\N	\N	\N	\N	2016-04-28 23:18:07.058+02	2016-04-28 23:19:18.127+02	0
11	John	ee056dbd1ea87169b0f3dc9da12c5d644568d6b425ed78c5c592a0c903a72050d12cfb5d94a62adbeb94e7e3773818add9dee278b430d39969247bcdaef17f4c9586b1b9ea7bc8126bb20eb0fa140046f08177e17499fbc893b714ffa5301202859d45a0afd09ec46726d4c8282d009f13155e4ea17a1a7f1ac82aa93a3961c1829d0078469ec77278f77f0e18b7035bda32b7b5b06f68d18e7af659365131f9c7fc5d5b0589eae1b897e03e5b7eae262a4d672e65b1fddead92fc0689c0c83abbccb638293d63609cfb3c00abffdc01190bb7c81769de5b62c2dafefea24f9076400ea7da48dc81e3a5e48c563792c6093f39cde71adacf806b4f1fab2fb533	kastemaa@kth.se	bb2fc5d63421d6cc559231bb269ba55864259888f3f982c592cebacc8f338a3ee1b50fa6c4d110aee84ce32c333c79cbc68e42b1e063da8826d6344220ffa01a40e70d0ebdb2ceac1b2a88e75ca2bc71b634cf95939690bc2b70f0015f5f75ede8d43bff0358f5e00c21a0ccc2c105bb178b709873e34e035591b12c5a9cb08a554f92da9e16493a534bbd7548ec2b61e76b51c54999951746f8f1688b815d22764d9b9ce38e691068e3876f387d60b3cd47257d76cdc902f31fcb732e9bcdd648c98812ca6b96d4db24e9cb5df14d0fa4f6a88b1cb754d4e241ff210648ad3ae8890510ca934484f4814063c3c1c08ba1f97d23e48209dd897395552850f490	User	f	04mWD0uxiVack9cq2ih4aD9Qp9Wd4wHDlqP6584DaF8BQyoHgdRK41uFVSRlEuytbM61Ad2R3Le	t	\N	\N	\N	\N	2016-04-29 17:59:24.329+02	2016-04-29 17:59:24.329+02	0
9	Anonymous123	a123f05d94c5aa6652f341190a989983b8f0cb5a56ffe1d24bbf774f5d19b616ad5fd7961071d7ec513f669a81e9bcdb13b09d4c3594706051e95c5501a1a49f22efa1f132bb8aac92f41ac9054ee50cf8a33fff9b9e537f3230d80d666bc3d40d9806085ff90fda15bbaba38b8d4279b3898e96df521a8ecb11e5cb707c703aff72d7194e87f493a6affdb3ea65ae448a8f9987c5ee595eca632165070b05e43a5a40fdc50ce94c7efda6995f73f43533b7b01346b39e9e99ed10411ca43bee852381e97fcfcbdb93ddde1789e2303551f32103cf5ab277e3dc068ddb29c34eb27c2854e02e508356c4f0976621b6e95b5ba86ad4d964f71db5b775b47fc412	niemijoe@hotmail.com	735d2adb81b066284569344f3254f87c11960a922f75902a7378061228b7c80d7e9ed2a39bbb88160a032c33d58f0c65842f61ab808150175dd5fe4658fb9f0471a8e5f477ece7fedf419d4067f14f3b7f77b15f061b838f6d3fc28f77e93215c01a9cb8eaafac5d235750bf299e20b6dd351e42450c50a43ea8f0e5b8b9a4412b64203eb622bb7eeb1fb54302032747264c5d7c8c5db3f8ce787408dd6f3b169353a738465b2d32fda554c9e50d72b4013e2cc8bbb04b734bf75b5734e5481dfc869021e9db4ee9e6195944c9a24c4523b5f506104fa9d1ba6aa3053ef64968711c30a384d91e34c7f5f64ae13c70850e4cce8e8b57c1e30661df9fac793be5	Admin	t	lJZhdOTA4dlk3p2IkkZYbkC8nGCbLqGyjrvxOsHH5sskON8x8SDsivjHb7w2IshKmWaEBpH31B1	t	\N	\N	\N	\N	2016-04-28 22:17:28.996+02	2016-04-29 18:04:11.63+02	0
12	Anonymous124	fda76a88dfecf0862b44458bf221faee27be77cdca33d8456e8e9ca29ceb95d798ae5ffa334ea6136e70f7b32295f0ba022ae1f0ed7cadb0b5741c84b51112d6c8fdbbe595fba9054acce989d0a14f732e0ab0a7e3c4afc27074b88eb3961a8ea03abd3356ca701527a6a193818090e91e9ea5a8bd2a85e58e75b0c9a0f41558d750a31135be2678a09c6f81512819a69fd5e9f0c0ec0fd70ce59545c64e0f9fc2928a3fba5ec52fa400469c04c822249e47d0aac75bdf260589536ab96939da0ea3e1babfcd1ab44a907d3af578d200fc40cb60d5b49fa9c3c9f874ca4fe9058ebc28410b671a764ab5d4fc5ab21931889edd8cfadf0f09e0f5ba7754c1e49b	Testi@test.fi	eb74c03284b63947682123e0132628d60d5c16bcf59634ab5dc418004c45af5f6589d0541f156057226b273ed6de91cfe76fde71464c47fa41c0133f7f7d8eda0c31bc38b4876255ebd9d333e7b10b3ebb812e8688e4e68cf3be7ca1e0b606014bfb95e4203025598e71bb2dd1d7460350f6e6af8d5ef5a0dfeba911bafad833d1154f80fa9dab1db8fcd6a856d60874c115a5e6be1605b49b2de0a68093a0d6a47424fcd123a1bf6b02c7b444adc61c011283f12138b8255387d7dfdd9fde970c679d96440cec95216394f4abb0a75abb361626e8a415e5576cfae27f4e3b3103e60302383986c03826376ae3972943a9ecd8069d25218d9a5f7a7525bfed83	User	f	ztuvbSS1iLkQM8jbKfia9UshZiMokc51YU3ppSMaUV5fc0Cc4atjyzMLWEVpPux0wzLifmIZeRw	t	\N	\N	\N	\N	2016-04-29 19:21:50.593+02	2016-04-29 19:22:08.939+02	2
13	Janis	f18aed71d12fe5a76766afae674c0e6cbb6243c14222ef09ac97bcfa2d8e5266f1887c6d96f07d2b537feba340137a741909a8f29845d80d6544b1135c4f77745b7546b6c6e142c20f76d31c7d22033a65da98140db0bbc7fefd098914d35298f00cc85715efab1360ac95349fad930d4ce81527fc47c2b36013706a9a7d7563b10224f71a5c78d3d1c06f6c1eb406cfb4a5a0576583427d81b377b09f001c29d95d6f0cf1091a4fff61d31210547fabcf9233e6aa467e9f17488a1d14f052c96d811e1bd170a5dece4c15c73ccf839ddf99123518292e2adff2edf28dd69992ccb6a7f1e56a2d1bc7d791fcdef1c7436a443e2ef9143b612154c76e6e171c5d	juho.kastemaa@gmail.com	b7a6134ea8d35b639c7eaf7cc7312a62a6532d31863bba42a06cc9c6a4bc42750be7cc468467bdb59715ec3246d61036f08cf247721f27f4b7c94127dfa193a007ea1ffcf42603ca8cc79329f49e8d98e5dee62a2f11149b98274f9c1aee983980c20e1cdb37ade1429c7abd59f487fff7e52a61438db6dd90278586fc514c6d365e42cef1cdb74fae7f910baa0d74e0112afd6188d83f5453c7266e651cdc9ff6c08e8b185eba044ff27d548ee6636721b25f152b5b7fd264eafe31477f1a351530ead34f5fbce971b7df452ed6650d644a3f7377cd5c4ef45bad04ca31a82fb04876ffa0d8c6fe44408fe5fced6f0dfa0b157ff1d8986d65d3e302a3bbf5b1	User	t	8EzJmH8H5DD5mhWz5FrG9xAzimzTl7zLPVHgCeaElxTFPe4Un5Ehc26LTacYkXhK45Px9Qgyc17	t	\N	\N	\N	\N	2016-04-29 21:01:19.268+02	2016-04-29 21:01:55.537+02	0
14	Anonymous125	4a4b60993be71951741877a02d3a18918a445fdc7d45da5a8a8372c0f2735823f35e2ec1448f6b7931ebababca2d01816e501013b0e1f59f576380a49849c661be2cd491067efad897dcac052dafcac68fb37d1262c746bc20a2d539e35a712c7a1d9f83932ef69008d3e8fdfeb0d3c4d21d6bd1ae15b935d88ae27691c725698b953f3b5b0338f3d3453acbc19d76886771ee7750cbea4310ef780f6d495968418a2e71d561f4c85ba177740d46ea765d1db2e98594ca3ce4d9164f4d682a3a1992910f46fe30052473f6da68ac78c315f268fb1f1e45ef7b4ce83ee50af7d9c364ed53017a2ec710e56a7278c41f0ca81d36dc0fc3bb2f5045d3d953c42d05	pete@pete.com	f25e434a3307412949ddee0d29aaa0efd1754b136a3d67979a5d5218511101a10380f6b2c35a2a73325c9113ed5f312d7c73887c3447fa52f380ec888492605db62d9789ae783090513cddc3dc440597226c8f32600bdfd6788b8408fb2aab40bd0be5c034875b845865bb2ed90682d9bd9ab787e0a36cb94f1cefedab94216ee2a1bd214707ae6bd62d0444c227d125947a74411dc12ceee806adc4c5a860d854f19886d5ad9044cc191a64edc3f53f740ceafa67c0e4b92a656edc7b46f4924837c7dcffcebfb980fa1d1cbaca3e79c5bc6a72a57fa217cc2120b60bb05d44aa497ae2d33aafd83508289cb2143e34bc4eae4f580b5046234dfed8fce42955	User	f	kobObEGRj3LHn350RGX6lX3wVwZTjF0J6H0eP5A5rKPIEwsHFgD0gDwdXgNO2Oxp1ZWi6bycoas	t	\N	\N	\N	\N	2016-04-29 22:28:53.879+02	2016-04-29 22:28:53.879+02	0
\.


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: general
--

SELECT pg_catalog.setval('"Users_id_seq"', 14, true);


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
-- Name: Contact_pkey; Type: CONSTRAINT; Schema: public; Owner: general; Tablespace: 
--

ALTER TABLE ONLY "Contact"
    ADD CONSTRAINT "Contact_pkey" PRIMARY KEY (id);


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
-- Name: SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: general; Tablespace: 
--

ALTER TABLE ONLY "SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


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
-- Name: email_unique_idx; Type: CONSTRAINT; Schema: public; Owner: general; Tablespace: 
--

ALTER TABLE ONLY "Users"
    ADD CONSTRAINT email_unique_idx UNIQUE (email);


--
-- Name: username_unique_idx; Type: CONSTRAINT; Schema: public; Owner: general; Tablespace: 
--

ALTER TABLE ONLY "Users"
    ADD CONSTRAINT username_unique_idx UNIQUE (username);


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

