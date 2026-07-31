# Tikamgarh Properties

A modern real estate website built using **Next.js and Headless WordPress**.

WordPress is used as the content management system, while Next.js provides the frontend. Data is fetched from WordPress using **WPGraphQL**.

## Tech Stack

- Next.js 16
- React
- TypeScript
- Headless WordPress
- WPGraphQL
- Advanced Custom Fields (ACF)
- WPGraphQL for ACF
- Bootstrap
- Swiper.js
- Nodemailer

## Architecture

WordPress works as the backend CMS and Next.js works as the frontend.

```text
WordPress CMS
      |
      | WPGraphQL
      v
Next.js Frontend
      |
      v
User
WordPress Backend

WordPress manages:

Properties
Property details
Featured images
Pages
Testimonials
Agents / property authors
ACF fields
Gutenberg content
Next.js Frontend

Next.js handles:

Frontend UI
Routing
Property listing
Single property pages
GraphQL requests
Contact form
Image optimization
SEO
Server-side rendering
Features
Dynamic homepage
Property listings
Single property pages
Property details using ACF
Property featured images
Agent information using WordPress users/authors
Testimonials
Dynamic About page
Dynamic Services page
Contact page
Contact form with Nodemailer
Gutenberg content support
Swiper sliders
Responsive design
Dynamic WordPress data using GraphQL

Project Structure
app/
├── about/
├── api/
│   └── contact/
├── contact/
├── properties/
│   ├── page.tsx
│   └── [slug]/
│       └── page.tsx
├── services/
├── layout.tsx
└── page.tsx

components/
├── Header.tsx
├── Footer.tsx
├── HeroSlider.tsx
├── PageHero.tsx
├── PropertyCard.tsx
├── PropertySlider.tsx
├── TestimonialCard.tsx
└── TestimonialSlider.tsx

graphql/
└── queries/

lib/
├── wordpress.ts
└── mail.ts

sections/
└── SingleProperty/
    ├── PropertyGallery.tsx
    ├── PropertyDetails.tsx
    └── AgentCard.tsx

WordPress GraphQL

The frontend communicates with WordPress through WPGraphQL.

Example GraphQL endpoint:

https://your-wordpress-site.com/graphql

Example query:
query GetProperties {
  properties(first: 10) {
    nodes {
      id
      title
      slug

      featuredImage {
        node {
          sourceUrl
          altText
        }
      }

      propertyDetail {
        price
        bedroom
        bathroom
        area
      }
    }
  }
}




Environment Variables

Create a .env.local file in the project root.

WP_GRAPHQL_URL=https://your-wordpress-site.com/graphql

NEXT_PUBLIC_SITE_URL=http://localhost:3000

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
MAIL_FROM=
MAIL_TO=


Do not commit .env.local to GitHub.


Installation

Clone the repository:

git clone https://github.com/YOUR_USERNAME/tikamgarh-properties.git

Go to the project directory:

cd tikamgarh-properties

Install dependencies:

npm install

Create .env.local and configure the required environment variables.

Start the development server:

npm run dev

Open:

http://localhost:3000
Production Build

Create a production build:

npm run build

Run the production server:

npm start
Deployment

The recommended deployment architecture is:

WordPress
Shared Hosting / VPS
        |
        | GraphQL API
        v
Next.js
Vercel
        |
        v
Custom Domain

Environment variables must be configured in the Vercel project before deploying.

WordPress Requirements

The WordPress backend requires plugins/features such as:

WPGraphQL
Advanced Custom Fields (ACF)
WPGraphQL for ACF
Custom Post Types for properties and other dynamic content
Property Data

Property information is managed using ACF fields such as:

Price
Bedroom
Bathroom
Area
Gallery/Image
Map Embed

The assigned WordPress author can also be used as the property agent.

Agent information can include:

Name
Avatar
Designation
Phone
Facebook
Twitter/X
LinkedIn
Instagram
Purpose

This project demonstrates how WordPress can be used as a powerful CMS while Next.js provides a modern, fast frontend.

It is also an example of building a real-world real estate website using:

WordPress + WPGraphQL + ACF + Next.js + TypeScript

Author

Sandeep Jain

Web Developer specializing in:

WordPress
Headless WordPress
Next.js
React
WPGraphQL
AWS
High-performance websites

For your GitHub repo, I'd use the short description:

> **A modern real estate website built with Next.js 16, TypeScript, Headless WordPress, WPGraphQL and ACF.**

This makes the repository useful both as your actual Tikamgarh Properties codebase and as a portfolio example of your Headless WordPress work. 