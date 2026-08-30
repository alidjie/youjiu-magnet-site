-- ============================================
-- YOUJIU NdFeB Magnet Site - Database Schema
-- ============================================

-- ============================================
-- Extensions
-- ============================================
create extension if not exists "uuid-ossp";

-- ============================================
-- Tables
-- ============================================

-- Products table
create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  category text not null default 'sintered' check (
    category in ('sintered', 'bonded', 'assembly')
  ),
  series text not null,
  grade text not null,
  shape text not null,
  description text not null,
  specs jsonb not null default '{}'::jsonb,
  images jsonb not null default '[]'::jsonb,
  seo_title text,
  seo_description text,
  seo_keywords text,
  is_featured boolean not null default false,
  is_published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Contact submissions table
create table if not exists public.contact_submissions (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  company text,
  phone text,
  product_requirement text,
  message text not null,
  status text not null default 'new' check (
    status in ('new', 'read', 'replied')
  ),
  created_at timestamptz not null default now()
);

-- ============================================
-- Indexes
-- ============================================
create index if not exists idx_products_slug on public.products(slug);
create index if not exists idx_products_category on public.products(category);
create index if not exists idx_products_series on public.products(series);
create index if not exists idx_products_published on public.products(is_published);
create index if not exists idx_products_featured on public.products(is_featured);
create index if not exists idx_products_sort on public.products(sort_order);
create index if not exists idx_contact_submissions_status on public.contact_submissions(status);
create index if not exists idx_contact_submissions_created on public.contact_submissions(created_at desc);

-- ============================================
-- Row Level Security (RLS)
-- ============================================
alter table public.products enable row level security;
alter table public.contact_submissions enable row level security;

-- Products RLS policies
-- Public can read published products
create policy "Public can read published products"
  on public.products
  for select
  using (is_published = true);

-- Authenticated users can read all products
create policy "Authenticated can read all products"
  on public.products
  for select
  to authenticated
  using (true);

-- Authenticated users can insert products
create policy "Authenticated can insert products"
  on public.products
  for insert
  to authenticated
  with check (true);

-- Authenticated users can update products
create policy "Authenticated can update products"
  on public.products
  for update
  to authenticated
  using (true)
  with check (true);

-- Authenticated users can delete products
create policy "Authenticated can delete products"
  on public.products
  for delete
  to authenticated
  using (true);

-- Contact submissions RLS policies
-- Public can insert submissions
create policy "Public can submit contact form"
  on public.contact_submissions
  for insert
  to anon, authenticated
  with check (true);

-- Authenticated users can read submissions
create policy "Authenticated can read submissions"
  on public.contact_submissions
  for select
  to authenticated
  using (true);

-- Authenticated users can update submissions (status changes)
create policy "Authenticated can update submissions"
  on public.contact_submissions
  for update
  to authenticated
  using (true)
  with check (true);

-- Authenticated users can delete submissions
create policy "Authenticated can delete submissions"
  on public.contact_submissions
  for delete
  to authenticated
  using (true);

-- ============================================
-- Storage Bucket
-- ============================================
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

-- Storage RLS policies for product-images bucket
-- Public can read images
create policy "Public can read product images"
  on storage.objects
  for select
  using (bucket_id = 'product-images');

-- Authenticated users can upload images
create policy "Authenticated can upload product images"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'product-images');

-- Authenticated users can update images
create policy "Authenticated can update product images"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'product-images');

-- Authenticated users can delete images
create policy "Authenticated can delete product images"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'product-images');

-- ============================================
-- Updated_at trigger
-- ============================================
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_updated_at on public.products;
create trigger products_updated_at
  before update on public.products
  for each row
  execute function public.handle_updated_at();

-- ============================================
-- Seed Data
-- ============================================

-- N Series: N42
insert into public.products (name, slug, category, series, grade, shape, description, specs, images, seo_title, seo_description, seo_keywords, is_featured, is_published, sort_order)
values (
  'NdFeB Magnet N42 - Disc Shape',
  'ndfeb-magnet-n42-disc',
  'sintered',
  'N Series',
  'N42',
  'Disc',
  'Standard grade N42 sintered NdFeB magnet in disc shape. Excellent magnetic strength for general-purpose applications including speakers, sensors, and holding devices. NiCuNi coating for corrosion resistance.',
  '{"Br": "13.0-13.3 kGs", "Hcb": "12.5 kOe", "Hcj": "14.0 kOe", "BHmax": "40-43 MGOe", "Max Operating Temp": "80C"}'::jsonb,
  '["https://images.unsplash.com/photo-1635073908681-5a9b8a8a3e1c"]'::jsonb,
  'N42 NdFeB Disc Magnet - High Strength | YOUJIU',
  'Premium N42 grade sintered NdFeB disc magnet with 40-43 MGOe energy product. Ideal for speakers, sensors, and holding applications.',
  'N42, NdFeB, neodymium magnet, disc magnet, sintered magnet, 80C, YOUJIU',
  true,
  true,
  1
)
on conflict (slug) do nothing;

-- N Series: N52
insert into public.products (name, slug, category, series, grade, shape, description, specs, images, seo_title, seo_description, seo_keywords, is_featured, is_published, sort_order)
values (
  'NdFeB Magnet N52 - Block Shape',
  'ndfeb-magnet-n52-block',
  'sintered',
  'N Series',
  'N52',
  'Block',
  'Highest grade N52 sintered NdFeB magnet in block shape. Maximum available magnetic energy density for compact, high-performance applications. NiCuNi + Epoxy dual coating for enhanced durability.',
  '{"Br": "14.3-14.8 kGs", "Hcb": "10.5 kOe", "Hcj": "11.0 kOe", "BHmax": "49-53 MGOe", "Max Operating Temp": "60C"}'::jsonb,
  '["https://images.unsplash.com/photo-1635073908681-5a9b8a8a3e2d"]'::jsonb,
  'N52 NdFeB Block Magnet - Maximum Strength | YOUJIU',
  'Ultra-high grade N52 sintered NdFeB block magnet with up to 53 MGOe energy product. Premium choice for maximum magnetic force in compact designs.',
  'N52, NdFeB, neodymium magnet, block magnet, sintered magnet, 60C, highest grade, YOUJIU',
  true,
  true,
  2
)
on conflict (slug) do nothing;

-- M Series: 35M
insert into public.products (name, slug, category, series, grade, shape, description, specs, images, seo_title, seo_description, seo_keywords, is_featured, is_published, sort_order)
values (
  'NdFeB Magnet 35M - Ring Shape',
  'ndfeb-magnet-35m-ring',
  'sintered',
  'M Series',
  '35M',
  'Ring',
  'Medium temperature grade 35M sintered NdFeB magnet in ring shape. Improved temperature stability up to 100C for motor and sensor applications requiring moderate thermal resistance.',
  '{"Br": "12.0-12.3 kGs", "Hcb": "11.0 kOe", "Hcj": "14.0 kOe", "BHmax": "33-36 MGOe", "Max Operating Temp": "100C"}'::jsonb,
  '["https://images.unsplash.com/photo-1635073908681-5a9b8a8a3e3f"]'::jsonb,
  '35M NdFeB Ring Magnet - Medium Temperature | YOUJIU',
  '35M grade sintered NdFeB ring magnet with 100C max operating temperature. Ideal for motors, sensors, and applications requiring moderate thermal stability.',
  '35M, NdFeB, neodymium magnet, ring magnet, sintered magnet, 100C, M series, YOUJIU',
  false,
  true,
  3
)
on conflict (slug) do nothing;

-- H Series: 42H
insert into public.products (name, slug, category, series, grade, shape, description, specs, images, seo_title, seo_description, seo_keywords, is_featured, is_published, sort_order)
values (
  'NdFeB Magnet 42H - Cylinder Shape',
  'ndfeb-magnet-42h-cylinder',
  'sintered',
  'H Series',
  '42H',
  'Cylinder',
  'High temperature grade 42H sintered NdFeB magnet in cylinder shape. Strong coercivity with 120C operating temperature for motors, generators, and industrial equipment.',
  '{"Br": "12.8-13.3 kGs", "Hcb": "11.5 kOe", "Hcj": "17.0 kOe", "BHmax": "40-43 MGOe", "Max Operating Temp": "120C"}'::jsonb,
  '["https://images.unsplash.com/photo-1635073908681-5a9b8a8a4f0a"]'::jsonb,
  '42H NdFeB Cylinder Magnet - High Temperature | YOUJIU',
  '42H grade sintered NdFeB cylinder magnet with 120C max operating temperature. Designed for motors, generators, and industrial applications requiring thermal stability.',
  '42H, NdFeB, neodymium magnet, cylinder magnet, sintered magnet, 120C, H series, YOUJIU',
  true,
  true,
  4
)
on conflict (slug) do nothing;

-- SH Series: 42SH
insert into public.products (name, slug, category, series, grade, shape, description, specs, images, seo_title, seo_description, seo_keywords, is_featured, is_published, sort_order)
values (
  'NdFeB Magnet 42SH - Arc Segment',
  'ndfeb-magnet-42sh-arc',
  'sintered',
  'SH Series',
  '42SH',
  'Arc Segment',
  'Super high temperature grade 42SH sintered NdFeB magnet in arc segment shape. 150C operating temperature for demanding motor and generator applications. Optimized for rotor assemblies.',
  '{"Br": "12.8-13.2 kGs", "Hcb": "11.5 kOe", "Hcj": "20.0 kOe", "BHmax": "40-43 MGOe", "Max Operating Temp": "150C"}'::jsonb,
  '["https://images.unsplash.com/photo-1635073908681-5a9b8a8a5b1c"]'::jsonb,
  '42SH NdFeB Arc Segment Magnet - Super High Temperature | YOUJIU',
  '42SH grade sintered NdFeB arc segment magnet with 150C max operating temperature. Engineered for high-performance motor rotors and generator assemblies.',
  '42SH, NdFeB, neodymium magnet, arc segment, sintered magnet, 150C, SH series, motor magnet, YOUJIU',
  true,
  true,
  5
)
on conflict (slug) do nothing;

-- UH Series: 35UH
insert into public.products (name, slug, category, series, grade, shape, description, specs, images, seo_title, seo_description, seo_keywords, is_featured, is_published, sort_order)
values (
  'NdFeB Magnet 35UH - Custom Block',
  'ndfeb-magnet-35uh-block',
  'sintered',
  'UH Series',
  '35UH',
  'Block',
  'Ultra high temperature grade 35UH sintered NdFeB magnet in custom block shape. 180C operating temperature for wind turbine generators, EV traction motors, and extreme-environment industrial equipment.',
  '{"Br": "11.8-12.2 kGs", "Hcb": "10.5 kOe", "Hcj": "25.0 kOe", "BHmax": "33-36 MGOe", "Max Operating Temp": "180C"}'::jsonb,
  '["https://images.unsplash.com/photo-1635073908681-5a9b8a8a6c2d"]'::jsonb,
  '35UH NdFeB Block Magnet - Ultra High Temperature | YOUJIU',
  '35UH grade sintered NdFeB block magnet with 180C max operating temperature. Designed for wind turbines, EV motors, and extreme industrial environments.',
  '35UH, NdFeB, neodymium magnet, block magnet, sintered magnet, 180C, UH series, wind turbine, EV motor, YOUJIU',
  false,
  true,
  6
)
on conflict (slug) do nothing;

-- EH Series: 33EH
insert into public.products (name, slug, category, series, grade, shape, description, specs, images, seo_title, seo_description, seo_keywords, is_featured, is_published, sort_order)
values (
  'NdFeB Magnet 33EH - Custom Disc',
  'ndfeb-magnet-33eh-disc',
  'sintered',
  'EH Series',
  '33EH',
  'Disc',
  'Extreme high temperature grade 33EH sintered NdFeB magnet in disc shape. 200C operating temperature for the most demanding aerospace and specialized industrial applications where maximum thermal stability is critical.',
  '{"Br": "11.3-11.7 kGs", "Hcb": "10.5 kOe", "Hcj": "30.0 kOe", "BHmax": "31-35 MGOe", "Max Operating Temp": "200C"}'::jsonb,
  '["https://images.unsplash.com/photo-1635073908681-5a9b8a8a7e3f"]'::jsonb,
  '33EH NdFeB Disc Magnet - Extreme High Temperature | YOUJIU',
  '33EH grade sintered NdFeB disc magnet with 200C max operating temperature. The ultimate thermal stability solution for aerospace and specialized industrial applications.',
  '33EH, NdFeB, neodymium magnet, disc magnet, sintered magnet, 200C, EH series, aerospace, extreme temperature, YOUJIU',
  false,
  true,
  7
)
on conflict (slug) do nothing;

-- ============================================
-- End of Schema
-- ============================================
