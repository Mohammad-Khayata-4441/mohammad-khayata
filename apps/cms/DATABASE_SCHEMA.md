# Strapi CMS – PostgreSQL schema (tables & relations)

Extracted from content-type and component schemas. Table names follow Strapi `collectionName`; relations and component links may use Strapi internal link tables in addition to these.

---

## Content type tables

### 1. `abouts` (single type)

| Column / attribute   | Type      | Notes                    |
|----------------------|-----------|--------------------------|
| fullName             | string    |                          |
| birthDay              | date      |                          |
| overview             | text      |                          |
| nationality          | string    |                          |
| email                | string    |                          |
| phoneNumber          | string    |                          |
| altPhoneNumber       | string    |                          |
| contactCta           | string    |                          |
| professionalSummary  | richtext  |                          |
| technicalExpertise   | richtext  |                          |
| educationalBackground| blocks    | Block content            |
| leadershipExperience | richtext  |                          |
| professionalGoals   | blocks    | Block content            |
| seo                  | component | → `shared.seo` (single)  |
| openGraph            | component | → `shared.open-graph` (single) |
| socialLinks          | component | → `shared.social-link` (repeatable) |

**Relations:** None (only components).

---

### 2. `experiences` (collection type)

| Column / attribute | Type    | Notes                          |
|--------------------|---------|--------------------------------|
| company            | string  |                                |
| jobTitle           | string  |                                |
| position           | string  |                                |
| location           | string  |                                |
| isRemote           | boolean |                                |
| startDate          | date    |                                |
| endDate            | date    |                                |
| media              | media   | multiple (images/files/videos/audios) |
| reference          | string  |                                |
| projects           | relation| **oneToMany** → `projects` (mappedBy: experience) |

**Relations:**

- **experiences** ←── **projects** (one experience has many projects; `project.experience` is the FK side).

---

### 3. `homes` (single type)

| Column / attribute | Type     | Notes              |
|--------------------|----------|--------------------|
| experiences        | relation | **oneToMany** → `experiences` |
| skills             | relation | **oneToMany** → `skills`      |
| technologies       | relation | **oneToMany** → `technologies`|
| projects           | relation | **oneToMany** → `projects`    |

**Relations:**

- **homes** → experiences, skills, technologies, projects (curated lists; stored via Strapi relation/link tables).

---

### 4. `posts` (collection type)

| Column / attribute | Type      | Notes                          |
|--------------------|-----------|--------------------------------|
| title              | string    |                                |
| summary            | text      |                                |
| content            | richtext  |                                |
| cover              | media     | single (images/files/videos/audios) |
| slug               | uid       | from `title`                   |
| seo                | component | → `shared.seo` (single)        |
| openGraph          | component | → `shared.open-graph` (single) |

**Relations:** None (only media and components).

---

### 5. `projects` (collection type)

| Column / attribute | Type      | Notes                          |
|--------------------|-----------|--------------------------------|
| title              | string    |                                |
| overview           | richtext  |                                |
| company            | string    |                                |
| date               | date      |                                |
| cover              | media     | single (images/files/videos/audios) |
| media              | media     | multiple (images/files/videos/audios) |
| primaryColor       | string    |                                |
| technologies       | relation  | **oneToMany** → `technologies` (mappedBy: project) |
| skills             | relation  | **oneToMany** → `skills` (mappedBy: project) |
| url                | string    |                                |
| repo               | string    |                                |
| experience         | relation  | **manyToOne** → `experiences` (inversedBy: projects) |
| seo                | component | → `shared.seo` (single)        |
| openGraph          | component | → `shared.open-graph` (single) |

**Relations:**

- **projects** → **experiences** (manyToOne: `project.experience` → `experience`).
- **projects** ←── **technologies** (one project has many technologies; `technology.project` is the FK side).
- **projects** ←── **skills** (one project has many skills; `skill.project` is the FK side).

---

### 6. `settings` (single type)

| Column / attribute | Type | Notes |
|--------------------|-----|-------|
| *(none)*           | —   | Empty schema |

**Relations:** None.

---

### 7. `skills` (collection type)

| Column / attribute | Type     | Notes                          |
|--------------------|----------|--------------------------------|
| project            | relation | **manyToOne** → `projects` (inversedBy: skills) |
| title              | string   |                                |
| description        | text     |                                |
| technologies       | relation | **oneToMany** → `technologies` (mappedBy: skill) |

**Relations:**

- **skills** → **projects** (manyToOne: `skill.project` → `project`).
- **skills** ←── **technologies** (one skill has many technologies; `technology.skill` is the FK side).

---

### 8. `tags` (collection type)

| Column / attribute | Type   | Notes |
|--------------------|--------|-------|
| title              | string |       |

**Relations:** None.

---

### 9. `technologies` (collection type)

| Column / attribute | Type     | Notes                          |
|--------------------|----------|--------------------------------|
| project            | relation | **manyToOne** → `projects` (inversedBy: technologies) |
| skill              | relation | **manyToOne** → `skills` (inversedBy: technologies) |
| name               | string   |                                |
| logo               | media    | single (images/files/videos/audios) |

**Relations:**

- **technologies** → **projects** (manyToOne: `technology.project` → `project`).
- **technologies** → **skills** (manyToOne: `technology.skill` → `skill`).

---

## Component tables

Components are stored in their own tables; content types reference them via Strapi component/link tables.

### 10. `components_shared_seos`

| Column / attribute | Type   | Constraints / notes      |
|--------------------|--------|--------------------------|
| metaTitle          | string | required, maxLength 60   |
| metaDescription    | string | required, 50–160 chars   |
| metaImage          | media  | single, images only      |
| openGraph          | component | → `shared.open-graph` (single) |
| keywords           | text   | regex: `[^,]+`           |
| metaRobots         | string | regex: `[^,]+`           |
| metaViewport       | string |                          |
| canonicalURL       | string |                          |
| structuredData     | json   |                          |

**Used by:** `abouts`, `posts`, `projects` (non-repeatable).

---

### 11. `components_shared_open_graphs`

| Column / attribute | Type   | Constraints / notes   |
|--------------------|--------|------------------------|
| ogTitle            | string | required, maxLength 70 |
| ogDescription      | string | required, maxLength 200|
| ogImage            | media  | images only            |
| ogUrl              | string | optional               |
| ogType             | string | optional               |

**Used by:** `shared.seo` (nested), `abouts`, `posts`, `projects`.

---

### 12. `components_shared_social_links`

| Column / attribute | Type        | Notes |
|--------------------|-------------|-------|
| title              | string      |       |
| url                | string      |       |
| icon               | string      |       |
| type               | enumeration | facebook, instagram, linkedin, whatsapp, github, telegram, youtube, reddit, discord, x, other |

**Used by:** `abouts` (repeatable).

---

### 13. `components_shared_features`

| Column / attribute | Type   | Notes |
|--------------------|--------|-------|
| title              | string |       |
| description        | text   |       |
| icon               | string |       |
| css                | json   |       |

**Used by:** Not referenced in the provided API schemas (available for reuse).

---

## Relation diagram (summary)

```
homes
  ├── oneToMany → experiences
  ├── oneToMany → skills
  ├── oneToMany → technologies
  └── oneToMany → projects

experiences
  └── oneToMany ← projects (project.experience → experience)

projects
  ├── manyToOne → experiences
  ├── oneToMany ← technologies (technology.project → project)
  └── oneToMany ← skills (skill.project → project)

skills
  ├── manyToOne → projects
  └── oneToMany ← technologies (technology.skill → skill)

technologies
  ├── manyToOne → projects
  └── manyToOne → skills
```

---

## Strapi / PostgreSQL notes

- **Content types:** Tables `abouts`, `experiences`, `homes`, `posts`, `projects`, `settings`, `skills`, `tags`, `technologies` correspond to the content-type `collectionName` values. Strapi may add a schema prefix (e.g. `public`) and internal columns (e.g. `document_id`, `published_at`, `created_at`, `updated_at`, `created_by_id`, `updated_by_id`).
- **Media:** `media` and `type: "media"` attributes are stored via the Strapi upload plugin (e.g. `files` and related tables), not as raw columns in these tables.
- **Components:** Component data lives in `components_shared_*` tables; links from content types to components are stored in Strapi’s component link tables (e.g. join by document/entity and component type).
- **Draft & publish:** All content types use `draftAndPublish: true`, so `published_at` (and related) will exist in the database.

To get the exact table and column list from your running database (including Strapi internals), you can run:

```sql
SELECT table_schema, table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_schema, table_name;
```

And for columns of a given table:

```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'your_table_name'
ORDER BY ordinal_position;
```
