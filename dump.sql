--
-- PostgreSQL database dump
--

\restrict R9wWDyciNfM97vdZ9JoKdlcp3Gr5zHIj8vrwh39UKvdWLRoe9pdghyWcypj1Lad

-- Dumped from database version 16.10
-- Dumped by pg_dump version 16.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: puppies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.puppies (
    id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    age integer NOT NULL,
    breed text NOT NULL,
    image_url text NOT NULL,
    is_featured boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.puppies OWNER TO postgres;

--
-- Name: puppies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.puppies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.puppies_id_seq OWNER TO postgres;

--
-- Name: puppies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.puppies_id_seq OWNED BY public.puppies.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    sid character varying NOT NULL,
    sess jsonb NOT NULL,
    expire timestamp without time zone NOT NULL
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    email character varying,
    first_name character varying,
    last_name character varying,
    profile_image_url character varying,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: puppies id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.puppies ALTER COLUMN id SET DEFAULT nextval('public.puppies_id_seq'::regclass);


--
-- Data for Name: puppies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.puppies (id, name, description, age, breed, image_url, is_featured, created_at) FROM stdin;
6	Buddy	A little shy, Buddy is a very cute white Labrador Retriever who would be a great companion to your modest family.	4	white labrador	https://media.istockphoto.com/id/543200392/fr/photo/chien-chiot-%C3%A0-lext%C3%A9rieur.jpg?s=612x612&w=0&k=20&c=54WgWv7UriLk-Zg-3D23xDVXZ1N6MA4WpJiGAMj7r-k=	t	2026-01-07 13:16:58.400404
7	Teddy	Bringing a new pet home is a big change for both you and the animal. Make sure the environment is set up for them and keep an eye on them during their first week to ensure they’re settling in comfortably.	5	brown labrador	https://i.pinimg.com/736x/50/cf/19/50cf191170e4bd8d4e3d8ca1ada04860.jpg	t	2026-01-07 13:21:40.673748
8	Samy	Bring this beautiful puppy home. He will make a wonderful companion. Already vaccinated and treated.	5	Brown Labrador	https://scontent.fdla4-1.fna.fbcdn.net/v/t39.30808-6/611148593_122112199125100518_6884759932667571439_n.jpg?stp=dst-jpg_s590x590_tt6&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGfg80KjAGYXLqRXBY5C441dXmPUWZ-4B11eY9RZn7gHS3P6JxKrVxS5khdp-FCV7yRHNJ7WDCCPxsnReJQ86rR&_nc_ohc=_LhPIqn0pR4Q7kNvwHNQSDE&_nc_oc=AdmmrQ5pB4fSEYTNWX06oFlmWzlnLI0JqwX9LmwM4TFuBdrfqzukyJcItzgpLzqVTUA&_nc_zt=23&_nc_ht=scontent.fdla4-1.fna&_nc_gid=zrqeJ5mJf9edKgrNYbrHtw&oh=00_Afr-rNiAFfjkmaXVuKEw8DWZVQcTgIyRkYyDxzSi6kQ4rQ&oe=69643D7F	f	2026-01-07 13:27:39.05774
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions (sid, sess, expire) FROM stdin;
8tVOYwYVRllmcMdd3NKqmZ5ZF96yqHDn	{"cookie": {"path": "/", "secure": true, "expires": "2026-01-23T10:03:05.467Z", "httpOnly": true, "originalMaxAge": 604800000}, "passport": {"user": {"claims": {"aud": "b947bafc-67f6-4842-a624-2388c3c6c3e3", "exp": 1768561385, "iat": 1768557785, "iss": "https://replit.com/oidc", "sub": "39338724", "email": "lemetijoseph211@gmail.com", "at_hash": "ywgCwQONHohJ-Qu5GSXCnQ", "username": "lemetijoseph211", "auth_time": 1768557781, "last_name": "Joseph", "first_name": "LEMETI"}, "expires_at": 1768561385, "access_token": "Sms1Ay4lY_0OdGLyECa7fOJwXmwqeAoX0PgNdV3EscM", "refresh_token": "NWGCzWCzOtmD0yEABhGO9e53vdi7PzLPj9jjabrq3H4"}}}	2026-01-23 11:00:47
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, first_name, last_name, profile_image_url, created_at, updated_at) FROM stdin;
39338724	lemetijoseph211@gmail.com	LEMETI	Joseph	\N	2026-01-07 12:13:48.300351	2026-01-16 10:03:05.433
\.


--
-- Name: puppies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.puppies_id_seq', 8, true);


--
-- Name: puppies puppies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.puppies
    ADD CONSTRAINT puppies_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (sid);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: IDX_session_expire; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_session_expire" ON public.sessions USING btree (expire);


--
-- PostgreSQL database dump complete
--

\unrestrict R9wWDyciNfM97vdZ9JoKdlcp3Gr5zHIj8vrwh39UKvdWLRoe9pdghyWcypj1Lad

