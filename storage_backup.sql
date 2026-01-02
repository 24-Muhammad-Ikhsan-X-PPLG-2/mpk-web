SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict 6AlWkwYwRU19nkz3yVOt4pMnEHmYjH5k3V5ySZ6AN32reraSbbGFBnbDr2ZsUE1

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id", "type") VALUES
	('avatars', 'avatars', NULL, '2025-12-27 08:38:14.190581+00', '2025-12-27 08:38:14.190581+00', false, false, NULL, NULL, NULL, 'STANDARD'),
	('seminar', 'seminar', NULL, '2025-12-29 14:57:28.479941+00', '2025-12-29 14:57:28.479941+00', true, false, NULL, '{image/*}', NULL, 'STANDARD');


--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: buckets_vectors; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."objects" ("id", "bucket_id", "name", "owner", "created_at", "updated_at", "last_accessed_at", "metadata", "version", "owner_id", "user_metadata", "level") VALUES
	('a10bbc3a-d5aa-4ab7-8e70-f1d6a444f625', 'seminar', '1767027837971-z5ega18w5xf.png', 'f66c160d-97c9-4423-a047-da62c1dea850', '2025-12-29 17:03:59.684144+00', '2025-12-29 17:03:59.684144+00', '2025-12-29 17:03:59.684144+00', '{"eTag": "\"cfca6ddd0174052cfa7552ee7ae35ad5\"", "size": 2510122, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-12-29T17:04:00.000Z", "contentLength": 2510122, "httpStatusCode": 200}', '869ed099-0143-4c3e-bbe5-f9200c095229', 'f66c160d-97c9-4423-a047-da62c1dea850', '{}', 1),
	('db36e919-41ed-40f4-83a9-4f95f3af1f69', 'seminar', '1767028503237-x7fe6fi139n.png', 'f66c160d-97c9-4423-a047-da62c1dea850', '2025-12-29 17:15:05.126513+00', '2025-12-29 17:15:05.126513+00', '2025-12-29 17:15:05.126513+00', '{"eTag": "\"cfca6ddd0174052cfa7552ee7ae35ad5\"", "size": 2510122, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-12-29T17:15:05.000Z", "contentLength": 2510122, "httpStatusCode": 200}', 'eb02868e-98ec-44ff-b997-9db78ab3abce', 'f66c160d-97c9-4423-a047-da62c1dea850', '{}', 1),
	('82e307b7-6feb-4306-967b-9c2751aa836a', 'seminar', '4f963258-57bf-4318-acd6-7b81c9ed5250.png', 'f66c160d-97c9-4423-a047-da62c1dea850', '2026-01-01 19:30:20.050014+00', '2026-01-01 19:30:20.050014+00', '2026-01-01 19:30:20.050014+00', '{"eTag": "\"ae54b56213fcfe054f3b0d1228d0ab3c\"", "size": 1562906, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-01-01T19:30:20.000Z", "contentLength": 1562906, "httpStatusCode": 200}', '2585cb07-3f35-4324-ae49-f5bc2ddda235', 'f66c160d-97c9-4423-a047-da62c1dea850', '{}', 1);


--
-- Data for Name: prefixes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: vector_indexes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- PostgreSQL database dump complete
--

-- \unrestrict 6AlWkwYwRU19nkz3yVOt4pMnEHmYjH5k3V5ySZ6AN32reraSbbGFBnbDr2ZsUE1

RESET ALL;
