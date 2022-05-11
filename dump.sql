--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.1

-- Started on 2022-05-11 15:48:50 +03

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

--
-- TOC entry 3677 (class 1262 OID 17295)
-- Name: Students; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE "Students" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';


\connect "Students"

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

--
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- TOC entry 3678 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 17371)
-- Name: available_groups; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.available_groups (
    id integer NOT NULL,
    teacher_id integer NOT NULL,
    group_id integer NOT NULL,
    disciplines_id integer NOT NULL
);


--
-- TOC entry 221 (class 1259 OID 17370)
-- Name: avalible_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.available_groups ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.avalible_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 216 (class 1259 OID 17334)
-- Name: disciplines; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.disciplines (
    id integer NOT NULL,
    name character varying NOT NULL,
    hours numeric NOT NULL,
    type character varying NOT NULL
);


--
-- TOC entry 215 (class 1259 OID 17333)
-- Name: disciplines_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.disciplines ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.disciplines_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 214 (class 1259 OID 17316)
-- Name: groups; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.groups (
    id integer NOT NULL,
    name character varying,
    speciality_id integer NOT NULL
);


--
-- TOC entry 213 (class 1259 OID 17315)
-- Name: groups_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.groups ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 218 (class 1259 OID 17342)
-- Name: marks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.marks (
    id integer NOT NULL,
    student_id integer NOT NULL,
    disciplines_id integer NOT NULL,
    value character varying,
    teacher_id integer NOT NULL,
    hours integer NOT NULL
);


--
-- TOC entry 217 (class 1259 OID 17341)
-- Name: marks_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.marks ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.marks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 226 (class 1259 OID 17442)
-- Name: specialties; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.specialties (
    id integer NOT NULL,
    code character varying NOT NULL,
    name character varying NOT NULL,
    short_name character varying NOT NULL
);


--
-- TOC entry 225 (class 1259 OID 17441)
-- Name: specialties_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.specialties ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.specialties_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 212 (class 1259 OID 17305)
-- Name: students; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.students (
    id integer NOT NULL,
    user_id integer NOT NULL,
    group_id integer NOT NULL
);


--
-- TOC entry 210 (class 1259 OID 17297)
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    firstname character varying NOT NULL,
    lastname character varying NOT NULL,
    secondname character varying,
    role character varying,
    login character varying NOT NULL,
    password character varying NOT NULL
);


--
-- TOC entry 227 (class 1259 OID 17484)
-- Name: student_info; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.student_info AS
 SELECT u.id AS user_id,
    s.id AS student_id,
    u.firstname,
    u.lastname,
    u.secondname,
    g.id AS group_id,
    g.name AS group_name,
    sp.code,
    sp.name AS speciality_name,
    sp.short_name
   FROM (((public.users u
     JOIN public.students s ON ((s.user_id = u.id)))
     JOIN public.groups g ON ((g.id = s.group_id)))
     JOIN public.specialties sp ON ((sp.id = g.speciality_id)));


--
-- TOC entry 224 (class 1259 OID 17416)
-- Name: study_plan; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.study_plan (
    id integer NOT NULL,
    group_id integer NOT NULL,
    disciplines_id integer NOT NULL,
    semester integer NOT NULL
);


--
-- TOC entry 228 (class 1259 OID 17490)
-- Name: student_marks; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.student_marks AS
 SELECT m.id,
    sp.semester,
    g.id AS group_id,
    g.name AS group_name,
    m.student_id,
    m.disciplines_id,
    d.name,
    m.hours AS "hours passed",
    d.hours AS "hours all",
    d.type,
    m.value
   FROM ((((public.marks m
     JOIN public.disciplines d ON ((d.id = m.disciplines_id)))
     JOIN public.students s ON ((s.id = m.student_id)))
     JOIN public.groups g ON ((g.id = s.group_id)))
     JOIN public.study_plan sp ON (((sp.group_id = g.id) AND (sp.disciplines_id = d.id))));


--
-- TOC entry 211 (class 1259 OID 17304)
-- Name: students_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.students ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.students_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 223 (class 1259 OID 17415)
-- Name: study_plan_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.study_plan ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.study_plan_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 220 (class 1259 OID 17360)
-- Name: teachers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.teachers (
    id integer NOT NULL,
    user_id integer NOT NULL
);


--
-- TOC entry 219 (class 1259 OID 17359)
-- Name: techers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.teachers ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.techers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 209 (class 1259 OID 17296)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3667 (class 0 OID 17371)
-- Dependencies: 222
-- Data for Name: available_groups; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3661 (class 0 OID 17334)
-- Dependencies: 216
-- Data for Name: disciplines; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.disciplines OVERRIDING SYSTEM VALUE VALUES (1, 'Физкультура', 36, 'Зачет');
INSERT INTO public.disciplines OVERRIDING SYSTEM VALUE VALUES (2, 'Физика', 72, 'Экзамен');
INSERT INTO public.disciplines OVERRIDING SYSTEM VALUE VALUES (3, 'Химия', 72, 'Экзамен');
INSERT INTO public.disciplines OVERRIDING SYSTEM VALUE VALUES (4, 'Информатика', 72, 'Экзамен');
INSERT INTO public.disciplines OVERRIDING SYSTEM VALUE VALUES (5, 'Английский язык', 36, 'Зачет');
INSERT INTO public.disciplines OVERRIDING SYSTEM VALUE VALUES (6, 'Изобразительное искусство', 36, 'Зачет');
INSERT INTO public.disciplines OVERRIDING SYSTEM VALUE VALUES (8, 'Экономика', 72, 'Экзамен');
INSERT INTO public.disciplines OVERRIDING SYSTEM VALUE VALUES (7, 'Основы предпринимательской деятельности', 36, 'Зачет');


--
-- TOC entry 3659 (class 0 OID 17316)
-- Dependencies: 214
-- Data for Name: groups; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.groups OVERRIDING SYSTEM VALUE VALUES (25, 'ИСП-401', 1);
INSERT INTO public.groups OVERRIDING SYSTEM VALUE VALUES (28, 'Тест1', 1);


--
-- TOC entry 3663 (class 0 OID 17342)
-- Dependencies: 218
-- Data for Name: marks; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.marks OVERRIDING SYSTEM VALUE VALUES (1, 48, 1, 'Зачтено', 1, 36);
INSERT INTO public.marks OVERRIDING SYSTEM VALUE VALUES (2, 48, 2, 'Отлично', 1, 72);
INSERT INTO public.marks OVERRIDING SYSTEM VALUE VALUES (3, 48, 3, 'Отлично', 1, 72);
INSERT INTO public.marks OVERRIDING SYSTEM VALUE VALUES (4, 48, 4, 'Отлично', 1, 72);
INSERT INTO public.marks OVERRIDING SYSTEM VALUE VALUES (8, 48, 8, 'Отлично', 1, 72);
INSERT INTO public.marks OVERRIDING SYSTEM VALUE VALUES (5, 48, 5, 'Зачтено', 1, 36);
INSERT INTO public.marks OVERRIDING SYSTEM VALUE VALUES (6, 48, 6, 'Зачтено', 1, 36);
INSERT INTO public.marks OVERRIDING SYSTEM VALUE VALUES (7, 48, 7, 'Зачтено', 1, 36);


--
-- TOC entry 3671 (class 0 OID 17442)
-- Dependencies: 226
-- Data for Name: specialties; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.specialties OVERRIDING SYSTEM VALUE VALUES (1, '09.02.07', 'Информационные системы и программирование', 'ИСП');


--
-- TOC entry 3657 (class 0 OID 17305)
-- Dependencies: 212
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.students OVERRIDING SYSTEM VALUE VALUES (48, 73, 25);
INSERT INTO public.students OVERRIDING SYSTEM VALUE VALUES (49, 74, 25);


--
-- TOC entry 3669 (class 0 OID 17416)
-- Dependencies: 224
-- Data for Name: study_plan; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.study_plan OVERRIDING SYSTEM VALUE VALUES (1, 25, 1, 1);
INSERT INTO public.study_plan OVERRIDING SYSTEM VALUE VALUES (3, 25, 3, 1);
INSERT INTO public.study_plan OVERRIDING SYSTEM VALUE VALUES (4, 25, 4, 1);
INSERT INTO public.study_plan OVERRIDING SYSTEM VALUE VALUES (2, 25, 2, 1);
INSERT INTO public.study_plan OVERRIDING SYSTEM VALUE VALUES (5, 25, 5, 2);
INSERT INTO public.study_plan OVERRIDING SYSTEM VALUE VALUES (6, 25, 6, 2);
INSERT INTO public.study_plan OVERRIDING SYSTEM VALUE VALUES (7, 25, 7, 2);
INSERT INTO public.study_plan OVERRIDING SYSTEM VALUE VALUES (8, 25, 8, 2);


--
-- TOC entry 3665 (class 0 OID 17360)
-- Dependencies: 220
-- Data for Name: teachers; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.teachers OVERRIDING SYSTEM VALUE VALUES (1, 75);


--
-- TOC entry 3655 (class 0 OID 17297)
-- Dependencies: 210
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (75, 'Рентос', 'Газович', '', 'teacher', '3', '3');
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (76, '123', '123', '123', 'admin', 'admin', 'admin');
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (73, 'Иван', 'Иванов', 'Иванович', 'student', '1', '1');
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (74, 'Денис', 'Агапов', 'Романович', 'student', '2', '2');


--
-- TOC entry 3679 (class 0 OID 0)
-- Dependencies: 221
-- Name: avalible_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.avalible_groups_id_seq', 1, false);


--
-- TOC entry 3680 (class 0 OID 0)
-- Dependencies: 215
-- Name: disciplines_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.disciplines_id_seq', 8, true);


--
-- TOC entry 3681 (class 0 OID 0)
-- Dependencies: 213
-- Name: groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.groups_id_seq', 32, true);


--
-- TOC entry 3682 (class 0 OID 0)
-- Dependencies: 217
-- Name: marks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.marks_id_seq', 8, true);


--
-- TOC entry 3683 (class 0 OID 0)
-- Dependencies: 225
-- Name: specialties_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.specialties_id_seq', 1, true);


--
-- TOC entry 3684 (class 0 OID 0)
-- Dependencies: 211
-- Name: students_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.students_id_seq', 49, true);


--
-- TOC entry 3685 (class 0 OID 0)
-- Dependencies: 223
-- Name: study_plan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.study_plan_id_seq', 8, true);


--
-- TOC entry 3686 (class 0 OID 0)
-- Dependencies: 219
-- Name: techers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.techers_id_seq', 1, true);


--
-- TOC entry 3687 (class 0 OID 0)
-- Dependencies: 209
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 76, true);


--
-- TOC entry 3496 (class 2606 OID 17375)
-- Name: available_groups avalible_groups_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.available_groups
    ADD CONSTRAINT avalible_groups_pk PRIMARY KEY (id);


--
-- TOC entry 3490 (class 2606 OID 17340)
-- Name: disciplines disciplines_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.disciplines
    ADD CONSTRAINT disciplines_pk PRIMARY KEY (id);


--
-- TOC entry 3488 (class 2606 OID 17322)
-- Name: groups groups_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_pk PRIMARY KEY (id);


--
-- TOC entry 3492 (class 2606 OID 17346)
-- Name: marks marks_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.marks
    ADD CONSTRAINT marks_pk PRIMARY KEY (id);


--
-- TOC entry 3500 (class 2606 OID 17448)
-- Name: specialties specialties_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.specialties
    ADD CONSTRAINT specialties_pk PRIMARY KEY (id);


--
-- TOC entry 3484 (class 2606 OID 17309)
-- Name: students students_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pk PRIMARY KEY (id);


--
-- TOC entry 3486 (class 2606 OID 17391)
-- Name: students students_un; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_un UNIQUE (user_id);


--
-- TOC entry 3498 (class 2606 OID 17420)
-- Name: study_plan study_plan_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.study_plan
    ADD CONSTRAINT study_plan_pk PRIMARY KEY (id);


--
-- TOC entry 3494 (class 2606 OID 17364)
-- Name: teachers teachers_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.teachers
    ADD CONSTRAINT teachers_pk PRIMARY KEY (id);


--
-- TOC entry 3480 (class 2606 OID 17303)
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- TOC entry 3482 (class 2606 OID 17387)
-- Name: users users_un; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_un UNIQUE (login);


--
-- TOC entry 3510 (class 2606 OID 17436)
-- Name: available_groups available_groups_fk_diciplines; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.available_groups
    ADD CONSTRAINT available_groups_fk_diciplines FOREIGN KEY (disciplines_id) REFERENCES public.disciplines(id);


--
-- TOC entry 3509 (class 2606 OID 17381)
-- Name: available_groups avalible_groups_fk_groups; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.available_groups
    ADD CONSTRAINT avalible_groups_fk_groups FOREIGN KEY (teacher_id) REFERENCES public.groups(id);


--
-- TOC entry 3508 (class 2606 OID 17376)
-- Name: available_groups avalible_groups_fk_teachers; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.available_groups
    ADD CONSTRAINT avalible_groups_fk_teachers FOREIGN KEY (teacher_id) REFERENCES public.teachers(id);


--
-- TOC entry 3503 (class 2606 OID 17449)
-- Name: groups groups_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_fk FOREIGN KEY (speciality_id) REFERENCES public.specialties(id);


--
-- TOC entry 3505 (class 2606 OID 17352)
-- Name: marks marks_fk_disciplines; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.marks
    ADD CONSTRAINT marks_fk_disciplines FOREIGN KEY (disciplines_id) REFERENCES public.disciplines(id);


--
-- TOC entry 3504 (class 2606 OID 17347)
-- Name: marks marks_fk_students; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.marks
    ADD CONSTRAINT marks_fk_students FOREIGN KEY (student_id) REFERENCES public.students(id);


--
-- TOC entry 3506 (class 2606 OID 17431)
-- Name: marks marks_fk_teacher; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.marks
    ADD CONSTRAINT marks_fk_teacher FOREIGN KEY (teacher_id) REFERENCES public.teachers(id);


--
-- TOC entry 3502 (class 2606 OID 17328)
-- Name: students students_fk_group; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_fk_group FOREIGN KEY (group_id) REFERENCES public.groups(id);


--
-- TOC entry 3501 (class 2606 OID 17310)
-- Name: students students_fk_user; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_fk_user FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3511 (class 2606 OID 17421)
-- Name: study_plan study_plan_fk_disciplines; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.study_plan
    ADD CONSTRAINT study_plan_fk_disciplines FOREIGN KEY (disciplines_id) REFERENCES public.disciplines(id);


--
-- TOC entry 3512 (class 2606 OID 17426)
-- Name: study_plan study_plan_fk_groups; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.study_plan
    ADD CONSTRAINT study_plan_fk_groups FOREIGN KEY (group_id) REFERENCES public.groups(id);


--
-- TOC entry 3507 (class 2606 OID 17365)
-- Name: teachers teachers_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.teachers
    ADD CONSTRAINT teachers_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


-- Completed on 2022-05-11 15:48:50 +03

--
-- PostgreSQL database dump complete
--

