// ─────────────────────────────────────────────────────────────────────────────
// Strapi v5 – Type Definitions
// ─────────────────────────────────────────────────────────────────────────────

/** Strapi v5 uses flat data (no nested `attributes`). Wrap your own types directly. */
export type StrapiEntity<T> = T & {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string | null;
};

// ── Pagination ────────────────────────────────────────────────────────────────

export interface PaginationByPage {
    page?: number;
    pageSize?: number;
    withCount?: boolean;
}

export interface PaginationByOffset {
    start?: number;
    limit?: number;
    withCount?: boolean;
}

export type Pagination = PaginationByPage | PaginationByOffset;

export interface PaginationMeta {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

// ── Sorting ───────────────────────────────────────────────────────────────────

type SortOrder = 'asc' | 'desc';

/** Sort by a single field: `"title:asc"` or `["title:asc", "createdAt:desc"]` */
export type SortParam<T> =
    | `${string & keyof T}:${SortOrder}`
    | (`${string & keyof T}:${SortOrder}`)[];

// ── Filters ───────────────────────────────────────────────────────────────────

type FilterOperator =
    | '$eq' | '$eqi' | '$ne' | '$nei'
    | '$lt' | '$lte' | '$gt' | '$gte'
    | '$in' | '$notIn'
    | '$contains' | '$notContains' | '$containsi' | '$notContainsi'
    | '$startsWith' | '$startsWithi' | '$endsWith' | '$endsWithi'
    | '$null' | '$notNull'
    | '$between';

type FieldFilter<V> = Partial<Record<FilterOperator, V | V[]>>;

export type Filters<T> = {
    [K in keyof T]?: FieldFilter<T[K]> | Filters<T[K]>;
} & {
    $and?: Filters<T>[];
    $or?: Filters<T>[];
    $not?: Filters<T>;
};

// ── Populate ──────────────────────────────────────────────────────────────────

export type Populate<T> =
    | '*'
    | (string & keyof T)[]
    | Record<string, PopulateDeep>;

interface PopulateDeep {
    populate?: Populate<unknown>;
    fields?: string[];
    filters?: Filters<unknown>;
    sort?: string | string[];
}

// ── Fields (sparse fieldsets) ─────────────────────────────────────────────────

export type Fields<T> = (string & keyof T)[];

// ── Combined Query Params ─────────────────────────────────────────────────────

export interface QueryParams<T = Record<string, unknown>> {
    filters?: Filters<T>;
    sort?: SortParam<T>;
    populate?: any;
    fields?: Fields<T>;
    pagination?: Pagination;
    /** Publication state: 'live' (default) | 'preview' */
    status?: 'draft' | 'published';
    locale?: string;
}

// ── Responses ─────────────────────────────────────────────────────────────────

export interface StrapiListResponse<T> {
    data: StrapiEntity<T>[];
    meta: {
        pagination: PaginationMeta;
    };
}

export interface StrapiCollectionResponse<T> {
    data: StrapiEntity<T>[];
    meta: {
        pagination: PaginationMeta;
    };
}

export interface StrapiSingleResponse<T> {
    data: StrapiEntity<T>;
    meta: Record<string, unknown>;
}

// ── Errors ────────────────────────────────────────────────────────────────────

export interface StrapiErrorDetail {
    path: string[];
    message: string;
    name: string;
}

export interface StrapiErrorPayload {
    status: number;
    name: string;
    message: string;
    details?: {
        errors?: StrapiErrorDetail[];
    };
}

export class StrapiError extends Error {
    constructor(
        public readonly status: number,
        public readonly payload: StrapiErrorPayload,
    ) {
        super(`[Strapi ${status}] ${payload.name}: ${payload.message}`);
        this.name = 'StrapiError';
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Param Deep Merge
// Uses `deepmerge` (npm i deepmerge) — tiny, zero-dep, Next.js compatible.
// ─────────────────────────────────────────────────────────────────────────────

import deepmerge from 'deepmerge';

type PopulateValue = QueryParams['populate'];

/**
 * Merge two `populate` values with awareness of the three possible shapes:
 *  - `'*'`         → wildcard wins over everything
 *  - `string[]`    → union (deduplicate)
 *  - `object`      → deep-merge recursively
 *  - mixed         → convert arrays to object keys, then deep-merge
 */
function mergePopulate(a: PopulateValue, b: PopulateValue): PopulateValue {
    if (b === '*' || a === '*') return '*';

    // Both arrays → union
    if (Array.isArray(a) && Array.isArray(b)) {
        return [...new Set([...a, ...b])];
    }

    // Normalise an array to a Record so we can deep-merge with an object
    const toRecord = (v: PopulateValue): Record<string, PopulateDeep> => {
        if (Array.isArray(v)) return Object.fromEntries(v.map(k => [k, {}]));
        if (typeof v === 'object' && v !== null) return v as Record<string, PopulateDeep>;
        return {};
    };

    return deepmerge(toRecord(a), toRecord(b));
}

/**
 * Merge two `QueryParams` objects with per-field strategies so that nested
 * structures like deep populate or stacked filters are never silently dropped.
 *
 * Rules:
 *  - `filters`    → recursive deep merge; `$or` / `$and` arrays are concatenated
 *  - `populate`   → see mergePopulate above
 *  - `sort`       → concatenate and deduplicate (last one wins for same field)
 *  - `fields`     → union
 *  - `pagination` → call-level replaces default entirely (last-write wins)
 *  - `status`     → call-level wins
 *  - `locale`     → call-level wins
 */
export function mergeParams<T>(
    base: QueryParams<T> = {},
    override: QueryParams<T> = {},
): QueryParams<T> {
    const result: QueryParams<T> = { ...base };

    // ── scalar overrides ──────────────────────────────────────────────────────
    if (override.status !== undefined) result.status = override.status;
    if (override.locale !== undefined) result.locale = override.locale;
    // pagination is intentionally a full replace — mixing page/offset strategies
    // or merging pageSize=10 with pageSize=5 would produce confusing results.
    if (override.pagination !== undefined) result.pagination = override.pagination;

    // ── filters: recursive deep merge ────────────────────────────────────────
    if (override.filters !== undefined) {
        result.filters = base.filters
            ? deepmerge(
                base.filters as object,
                override.filters as object,
                // $or / $and / $in / $notIn are *logic arrays* → concatenate
                {
                    arrayMerge: (dest, src) => [...dest, ...src],
                },
            ) as Filters<T>
            : override.filters;
    }

    // ── populate: smart three-way merge ──────────────────────────────────────
    if (override.populate !== undefined) {
        result.populate = base.populate
            ? mergePopulate(base.populate as PopulateValue, override.populate as PopulateValue) as Populate<T>
            : override.populate;
    }

    // ── sort: concat + deduplicate (later entries win per field) ─────────────
    if (override.sort !== undefined) {
        const toArray = (s: QueryParams<T>['sort']): string[] =>
            s === undefined ? [] : Array.isArray(s) ? (s as string[]) : [s as string];

        const combined = [...toArray(base.sort), ...toArray(override.sort)];
        // Keep last entry per field name (override wins)
        const seen = new Map<string, string>();
        for (const entry of combined) {
            const field = (entry as string).split(':')[0];
            seen.set(field, entry as string);
        }
        result.sort = [...seen.values()] as QueryParams<T>['sort'];
    }

    // ── fields: union ─────────────────────────────────────────────────────────
    if (override.fields !== undefined) {
        result.fields = base.fields
            ? ([...new Set([...(base.fields as string[]), ...(override.fields as string[])])] as Fields<T>)
            : override.fields;
    }

    return result;
}

// ─────────────────────────────────────────────────────────────────────────────
// Query String Builder
// ─────────────────────────────────────────────────────────────────────────────

function buildQueryString(params: Record<string, unknown>): string {
    const parts: string[] = [];

    function encode(key: string, value: unknown): void {
        if (value === undefined || value === null) return;

        if (Array.isArray(value)) {
            value.forEach((v, i) => encode(`${key}[${i}]`, v));
        } else if (typeof value === 'object') {
            Object.entries(value as Record<string, unknown>).forEach(([k, v]) =>
                encode(`${key}[${k}]`, v),
            );
        } else {
            parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
        }
    }

    Object.entries(params).forEach(([k, v]) => encode(k, v));
    return parts.length ? `?${parts.join('&')}` : '';
}

// ─────────────────────────────────────────────────────────────────────────────
// StrapiService
// ─────────────────────────────────────────────────────────────────────────────

const LOG_PREFIX = '[Strapi]';

function isLoggingEnabled(options: StrapiServiceOptions): boolean {
    if (options.logging === false) return false;
    if (options.logging === true) return true;
    return process.env.NODE_ENV !== 'production';
}

export interface StrapiServiceOptions {
    /** Default headers merged into every request */
    headers?: HeadersInit;
    /** Default query params applied to every request */
    defaultParams?: QueryParams;
    /** Enable request/response logging. Default: true in development, false in production */
    logging?: boolean;
}

export class StrapiService<TDefault = unknown> {
    protected readonly baseUrl: string;
    protected readonly endpoint: string;
    private readonly options: StrapiServiceOptions;

    constructor(
        baseUrl: string,
        endpoint: string = '',
        options: StrapiServiceOptions = {},
    ) {
        // Strip trailing slash once so subclasses don't have to worry
        this.baseUrl = baseUrl.replace(/\/$/, '');
        this.endpoint = endpoint.replace(/^\//, '');
        this.options = options;
    }

    // ── Internal helpers ────────────────────────────────────────────────────────

    private buildUrl(path: string, params?: QueryParams): string {
        const merged = mergeParams(this.options.defaultParams ?? {}, params ?? {});
        const qs = Object.keys(merged).length ? buildQueryString(merged as Record<string, unknown>) : '';
        return `${this.baseUrl}/${path}${qs}`;
    }

    private buildHeaders(extra?: HeadersInit): HeadersInit {
        return {
            'Content-Type': 'application/json',
            ...this.options.headers,
            ...extra,
        };
    }

    private async request<R>(url: string, init: RequestInit = {}): Promise<R> {
        const method = (init.method ?? 'GET').toUpperCase();
        const logging = isLoggingEnabled(this.options);
        const startTime = Date.now();

        if (logging) {
            const reqInfo: string[] = [method, url];
            if (init.body && typeof init.body === 'string') {
                try {
                    const parsed = JSON.parse(init.body) as { data?: unknown };
                    const bodyPreview =
                        parsed?.data && typeof parsed.data === 'object'
                            ? `body: ${JSON.stringify(parsed).slice(0, 200)}${init.body.length > 200 ? '...' : ''}`
                            : `body: ${init.body.slice(0, 150)}${init.body.length > 150 ? '...' : ''}`;
                    reqInfo.push(bodyPreview);
                } catch {
                    reqInfo.push(`body: ${init.body.slice(0, 100)}...`);
                }
            }
            console.log(`${LOG_PREFIX} → ${reqInfo.join(' ')}`);
        }

        const response = await fetch(url, {
            ...init,
            headers: this.buildHeaders(init.headers as HeadersInit),
            cache:'no-store'
        });

        const durationMs = Date.now() - startTime;
        const json = await response.json();

        if (logging) {
            const statusLabel = response.ok ? '✓' : '✗';
            const resMeta = `[${response.status}] ${durationMs}ms`;
            let resSummary = '';
            if (response.ok && json && typeof json === 'object') {
                if (Array.isArray(json.data)) {
                    resSummary = ` → ${json.data.length} item(s)`;
                } else if (json.data && typeof json.data === 'object' && 'id' in json.data) {
                    resSummary = ` → id=${(json.data as { id: unknown }).id}`;
                } else if (json.meta?.pagination) {
                    const p = json.meta.pagination as { total?: number; page?: number };
                    resSummary = ` → page ${p.page ?? '?'}, total ${p.total ?? '?'}`;
                }
            } else if (!response.ok && json?.error) {
                const err = json.error as { message?: string; name?: string };
                resSummary = ` → ${err.name ?? 'Error'}: ${String(err.message ?? json.error).slice(0, 80)}`;
            }
            console.log(`${LOG_PREFIX} ${statusLabel} ${resMeta} ${method} ${url}${resSummary}`);
        }

        if (!response.ok) {
            if (logging && json?.error?.details) {
                console.error(`${LOG_PREFIX} Error details:`, json.error.details);
            }
            throw new StrapiError(response.status, json.error ?? json);
        }

        return json as R;
    }

    // ── Public API ──────────────────────────────────────────────────────────────

    /**
     * Fetch a paginated list of entities.
     *
     * @example
     * const { data, meta } = await client.getList({ pagination: { page: 1, pageSize: 10 } });
     */
    async getCollection<T = TDefault>(
        params: QueryParams<T> = {},
    ): Promise<StrapiCollectionResponse<T>> {
        const url = this.buildUrl(this.endpoint, params as QueryParams);
        return this.request<StrapiCollectionResponse<T>>(url);
    }


    async getSingleResource<T = TDefault>(
        params: QueryParams<T> = {},
        useEndpoint = this.endpoint,
    ): Promise<StrapiSingleResponse<T>> {
        const url = this.buildUrl(useEndpoint, params as QueryParams);
        return this.request<StrapiSingleResponse<T>>(url);
    }


    /**
     * Fetch a single entity by its numeric `id`.
     *
     * @example
     * const { data } = await client.getById(42, { populate: '*' });
     */
    async getById<T = TDefault>(
        id: number | string,
        params: QueryParams<T> = {},
    ): Promise<StrapiSingleResponse<T>> {
        const url = this.buildUrl(`${this.endpoint}/${id}`, params as QueryParams);
        return this.request<StrapiSingleResponse<T>>(url);
    }



    /**
     * Fetch a single entity by a unique field value (e.g. slug).
     * Uses Strapi filters under the hood.
     *
     * @example
     * const { data } = await client.getByField('slug', 'my-project');
     */
    async getByField<T = TDefault>(
        field: string & keyof T,
        value: string | number,
        params: QueryParams<T> = {},
    ): Promise<StrapiEntity<T> | null> {
        const merged: QueryParams<T> = {
            ...params,
            filters: {
                ...((params.filters ?? {}) as Filters<T>),
                [field]: { $eq: value },
            } as Filters<T>,
            pagination: { page: 1, pageSize: 1 },
        };
        const { data } = await this.getCollection<T>(merged);
        return data[0] ?? null;
    }




    /**
     * Create a new entity.
     *
     * @example
     * const { data } = await client.create({ title: 'New Project', status: 'draft' });
     */
    async create<T = TDefault, TInput = Partial<T>>(
        body: TInput,
        params: QueryParams<T> = {},
    ): Promise<StrapiSingleResponse<T>> {
        const url = this.buildUrl(this.endpoint, params as QueryParams);
        return this.request<StrapiSingleResponse<T>>(url, {
            method: 'POST',
            body: JSON.stringify({ data: body }),
        });
    }

    /**
     * Update an entity by id (partial update / PUT).
     *
     * @example
     * const { data } = await client.update(42, { title: 'Updated' });
     */
    async update<T = TDefault, TInput = Partial<T>>(
        id: number | string,
        body: TInput,
        params: QueryParams<T> = {},
    ): Promise<StrapiSingleResponse<T>> {
        const url = this.buildUrl(`${this.endpoint}/${id}`, params as QueryParams);
        return this.request<StrapiSingleResponse<T>>(url, {
            method: 'PUT',
            body: JSON.stringify({ data: body }),
        });
    }



    /**
     * Delete an entity by id.
     *
     * @example
     * await client.delete(42);
     */
    async delete<T = TDefault>(
        id: number | string,
    ): Promise<StrapiSingleResponse<T>> {
        const url = this.buildUrl(`${this.endpoint}/${id}`);
        return this.request<StrapiSingleResponse<T>>(url, { method: 'DELETE' });
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Usage Examples (delete before shipping)
// ─────────────────────────────────────────────────────────────────────────────

/*

// ── 1. Inline instantiation ──────────────────────────────────────────────────

type Project = {
  title: string;
  slug: string;
  description: string;
  stack: string[];
  featured: boolean;
};

const projectsClient = new StrapiService<Project>(
  'https://my-strapi.example.com/api',
  'projects',
);

// Fetch page 1, sorted by title, only published
const { data: projects, meta } = await projectsClient.getList({
  pagination: { page: 1, pageSize: 12 },
  sort: ['title:asc'],
  filters: { featured: { $eq: true } },
  populate: ['coverImage'],
  status: 'published',
});
// data → StrapiEntity<Project>[]
// meta.pagination → PaginationMeta

// Fetch by slug
const project = await projectsClient.getByField('slug', 'my-cool-project', {
  populate: '*',
});
// project → StrapiEntity<Project> | null


// ── 2. Inheritance for domain-specific logic ─────────────────────────────────

type BlogPost = {
  title: string;
  slug: string;
  content: string;
  author: { name: string };
  tags: string[];
};

class BlogPostsClient extends StrapiService<BlogPost> {
  constructor(baseUrl: string) {
    super(baseUrl, 'blog-posts', {
      defaultParams: {
        populate: ['author', 'coverImage'],
        status: 'published',
      },
    });
  }

  // Domain-specific helper
  async getBySlug(slug: string) {
    return this.getByField('slug', slug, { populate: '*' });
  }

  async getFeatured(limit = 3) {
    return this.getList({
      filters: { tags: { $contains: 'featured' } },
      pagination: { pageSize: limit },
      sort: ['publishedAt:desc'],
    });
  }
}

const blog = new BlogPostsClient('https://my-strapi.example.com/api');

const latestPost = await blog.getBySlug('hello-world');
const { data: featured } = await blog.getFeatured(5);


// ── 3. Error handling ────────────────────────────────────────────────────────

try {
  await projectsClient.create({ title: '' }); // validation error
} catch (err) {
  if (err instanceof StrapiError) {
    console.error(err.status);          // 400
    console.error(err.payload.message); // "Validation error"
    console.error(err.payload.details?.errors); // field-level errors
  }
}


// ── 4. Deep merge in practice ────────────────────────────────────────────────

type Article = {
  title: string;
  slug: string;
  status: string;
  featured: boolean;
  category: string;
  author: { name: string; avatar: string };
  coverImage: { url: string; alternativeText: string };
  tags: { name: string; slug: string }[];
};

// defaultParams set at construction time:
const articlesClient = new StrapiService<Article>(
  'https://my-strapi.example.com/api',
  'articles',
  {
    defaultParams: {
      populate: {
        author:     { fields: ['name', 'avatar'] },
        coverImage: { fields: ['url', 'alternativeText'] },
      },
      filters: { status: { $eq: 'published' } },
      sort: ['publishedAt:desc'],
    },
  },
);

// Call-level params are DEEP MERGED — nothing from defaultParams is lost:
const { data: articles } = await articlesClient.getList({
  populate: {
    // merged with author + coverImage → all three present in final request
    tags: { fields: ['name', 'slug'] },
  },
  filters: {
    // deep-merged with status filter above → both conditions applied
    category: { $eq: 'technology' },
  },
  sort: ['title:asc'],      // deduped: ['publishedAt:desc', 'title:asc']
  pagination: { page: 2 }, // full replace (mixing strategies makes no sense)
});

// mergeParams is also exported for manual composition:
const base: QueryParams<Article> = {
  populate: { author: { fields: ['name'] } },
  filters: { $or: [{ featured: { $eq: true } }] },
};
const extra: QueryParams<Article> = {
  populate: { tags: {}, coverImage: {} },
  filters: { $or: [{ status: { $eq: 'draft' } }] },
};
const combined = mergeParams(base, extra);
// combined.populate → { author, tags, coverImage }               ← merged
// combined.filters.$or → [{ featured: true }, { status: draft }] ← concatenated

*/