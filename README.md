# College Compass 🧭

A professional engineering college recommendation and comparison platform built with Next.js, Prisma, and PostgreSQL.

## Features

### 🎓 College Discovery
- **Search & Explore**: Search colleges by name with real-time results
- **Advanced Filters**: Filter by location, minimum rating, and maximum fees
- **Smart Sorting**: Sort by highest rating, lowest fees, or best placement package
- **Statistics Dashboard**: View aggregate data across all colleges

### ❤️ Favorites System
- Save colleges for later
- View all favorites in one place
- Remove favorites easily
- Quick compare feature from favorites page

### 📊 College Comparison
- Compare colleges side-by-side
- Desktop table view with highlighted best values
- Mobile-friendly card view
- Highlight highest rated, best placement, and lowest fees colleges

### ⭐ Reviews & Ratings
- View college reviews from other users
- Submit your own review with name, rating, and comment
- See average ratings
- Reviews sorted by newest first

### 🎯 College Details
- Comprehensive college information
- Large banner image
- Key statistics highlighted (rating, placement, fees)
- Student reviews section with review submission
- Related colleges in the same location

### 👨‍💼 Admin Dashboard
- View all colleges in a management table
- Add new colleges
- Edit college information
- Delete colleges
- View aggregate statistics

### 💅 Modern UI/UX
- Responsive design (desktop, tablet, mobile)
- Tailwind CSS for styling
- React Icons for consistent iconography
- Smooth animations and transitions
- Loading states and empty states
- Gradient backgrounds and shadows
- Professional navbar and footer

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: React Icons
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (Prisma ORM)
- **Deployment Ready**: Environment variables, no hardcoded URLs

## Project Structure

```
college-compass/
├── app/
│   ├── api/
│   │   ├── colleges/
│   │   │   └── route.js          # College CRUD with filters/sorting
│   │   ├── favorites/
│   │   │   └── route.ts          # Favorites management
│   │   └── reviews/
│   │       └── route.ts          # Reviews management
│   ├── admin/
│   │   └── page.tsx              # Admin dashboard
│   ├── college/
│   │   └── [id]/
│   │       └── page.tsx          # College detail page
│   ├── compare/
│   │   └── page.tsx              # Compare colleges page
│   ├── favorites/
│   │   └── page.tsx              # Favorites page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout with navbar/footer
│   ├── loading.tsx               # Global loading page
│   ├── not-found.tsx             # Global 404 page
│   └── page.tsx                  # Homepage
├── components/
│   ├── Navbar.tsx                # Navigation component
│   ├── Footer.tsx                # Footer component
│   ├── StatCard.tsx              # Reusable stat card
│   ├── searchBar.tsx             # Search component (legacy)
│   └── FavoriteButton.tsx        # Favorite button component
├── lib/
│   └── prisma.ts                 # Prisma client
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── seed.ts                   # Seed script (optional)
├── public/                       # Static assets
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.js
└── README.md
```

## Database Schema

### College Model
```prisma
model College {
  id          String        @id @default(cuid())
  name        String
  location    String
  fees        Int
  rating      Float
  placements  String
  overview    String
  image       String?
  favorites   Favorite[]
  reviews     Review[]
  createdAt   DateTime      @default(now())
}
```

### Favorite Model
```prisma
model Favorite {
  id        String    @id @default(cuid())
  collegeId String
  createdAt DateTime  @default(now())
  college   College   @relation(fields: [collegeId], references: [id])
}
```

### Review Model
```prisma
model Review {
  id        String    @id @default(cuid())
  name      String
  comment   String
  rating    Float
  collegeId String
  createdAt DateTime  @default(now())
  college   College   @relation(fields: [collegeId], references: [id])
}
```

## Installation & Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL database (Neon recommended for cloud)

### Step 1: Clone or Setup
```bash
cd college-compass
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Environment Variables
Create `.env.local` file in the root directory:

```env
# Database URL (PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/college_compass"

# Or for Neon:
# DATABASE_URL="postgresql://[user]:[password]@[host]/[database]"
```

### Step 4: Setup Database

Generate Prisma Client:
```bash
npx prisma generate
```

Run migrations:
```bash
npx prisma migrate dev --name init
```

(Optional) Seed database with sample data:
```bash
npx tsx prisma/seed.ts
```

### Step 5: Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Routes

### Colleges API
```
GET  /api/colleges
Query Parameters:
  - search: string (search by college name)
  - location: string (filter by location)
  - minRating: number (minimum rating filter)
  - maxFees: number (maximum fees filter)
  - sort: string (ratingDesc, feesAsc, placementDesc)
```

### Favorites API
```
GET    /api/favorites           # Get all favorites
POST   /api/favorites           # Add to favorites
DELETE /api/favorites           # Remove from favorites
```

### Reviews API
```
GET  /api/reviews?collegeId=[id]  # Get reviews for a college
POST /api/reviews                  # Submit a new review
```

## Pages & Routes

| Route | Page | Purpose |
|-------|------|---------|
| `/` | Homepage | Browse and search colleges |
| `/college/[id]` | College Details | View college details and reviews |
| `/favorites` | Favorites | View saved colleges |
| `/compare` | Compare | Compare colleges side-by-side |
| `/admin` | Admin Dashboard | Manage colleges (add/edit/delete) |

## Features Breakdown

### 1. Homepage (page.tsx)
- Hero section with search bar
- Quick statistics cards (total colleges, avg rating, best package, avg fees)
- Advanced filters and sorting
- College grid with hover animations
- Call-to-action section
- Loading and empty states

### 2. College Detail Page (college/[id]/page.tsx)
- Large banner image
- Key information highlighted (rating, placement, fees)
- Overview section
- Add review form
- Reviews listing
- Related colleges section

### 3. Favorites Page (favorites/page.tsx)
- List of saved colleges
- Remove favorite button
- Quick view details button
- Empty state message
- Favorite count display

### 4. Compare Page (compare/page.tsx)
- Statistics summary cards
- Desktop: Responsive table with highlighting
- Mobile: Card-based layout
- Highlight best values
- Quick navigation to college details

### 5. Admin Dashboard (admin/page.tsx)
- College management table
- Add new college form
- Edit college form
- Delete college functionality
- Dashboard statistics

### 6. Navbar (components/Navbar.tsx)
- Logo with link to home
- Navigation menu (Home, Favorites, Compare, Admin)
- Mobile hamburger menu
- Responsive design

### 7. Footer (components/Footer.tsx)
- About section
- Quick links
- Social media links
- Copyright information

## Commands

```bash
# Development
npm run dev              # Start dev server

# Build & Production
npm run build            # Build for production
npm start               # Start production server

# Linting
npm run lint            # Run ESLint

# Database
npx prisma migrate dev  # Create and run migrations
npx prisma studio      # Open Prisma Studio (visual DB editor)
npx prisma generate    # Generate Prisma Client
```

## Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations
- Server-side rendering where possible
- Client-side fetching for interactive features
- Image optimization (object-cover)
- Responsive images
- Lazy loading for college images
- Minimal CSS with Tailwind

## Security Considerations
- No hardcoded API URLs (uses relative paths)
- Environment variables for sensitive data
- Input validation on forms
- SQL injection protection via Prisma ORM
- CORS ready (can add CORS headers if needed)

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy automatically

### Other Platforms
- Ensure Node.js 18+ is available
- Set environment variables
- Run migrations before starting
- Use `npm run build && npm start`

## Future Enhancements
- User authentication and profiles
- College admissions calculator
- Scholarship information
- Alumni network
- College rankings by category
- Advanced analytics dashboard
- Email notifications
- Social sharing features
- Mobile app (React Native)

## Troubleshooting

### Database Connection Error
```
Error: Can't reach database server
```
Solution: Check `DATABASE_URL` in `.env.local`

### Prisma Migration Error
```
npm run dev
# Automatically handles migrations
```

### Port Already in Use
```bash
npm run dev -- -p 3001  # Use different port
```

## Contributing
To contribute:
1. Create a feature branch
2. Make changes
3. Test thoroughly
4. Submit a pull request

## License
MIT License - feel free to use this project for your portfolio

## Support
For issues or questions, create an issue in the repository.

---

**Built with ❤️ using Next.js + Prisma + Tailwind CSS**

Perfect for:
- Engineering College Mini-Project
- Academic Submission
- Resume Portfolio Project
- Learning Next.js & Prisma

