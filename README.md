# Retail Sales Management System

## Overview

A full-stack Retail Sales Management System that provides advanced search, filtering, sorting, and pagination capabilities for sales transaction data. The system enables efficient data exploration through a modern web interface with real-time filtering and comprehensive data management features.

## Tech Stack

**Backend:**
- Node.js with Express.js
- PostgreSQL database
- pg (PostgreSQL client)

**Frontend:**
- React 19
- Vite (build tool)
- Tailwind CSS
- Axios (HTTP client)
- Heroicons (UI icons)

## Search Implementation Summary

The search functionality implements full-text search across Customer Name and Phone Number fields. It uses PostgreSQL's `ILIKE` operator for case-insensitive pattern matching, allowing partial matches with wildcard support. The search query is processed server-side and works seamlessly with all filters and sorting options. Search is triggered on input change and maintains state across pagination.

**Implementation:** Backend uses `(customer_name ILIKE '%search%' OR phone_number ILIKE '%search%')` in the WHERE clause, ensuring case-insensitive matching and optimal performance through database-level filtering.

## Filter Implementation Summary

The system supports multi-select and range-based filtering across seven dimensions:

1. **Customer Region** - Multi-select dropdown (North, South, East, West)
2. **Gender** - Multi-select dropdown (Male, Female, Other)
3. **Age Range** - Predefined ranges (18-25, 26-35, 36-50, 50+)
4. **Product Category** - Multi-select dropdown (Clothing, Beauty, Electronics)
5. **Tags** - Multi-select dropdown with product tags
6. **Payment Method** - Multi-select dropdown (Cash, Credit Card, Net Banking, Wallet)
7. **Date Range** - Dual date picker inputs with year range presets

All filters work independently and can be combined. Filter state is maintained in React state and synchronized with URL query parameters. The backend processes filters using PostgreSQL array operations (`ANY`) for multi-select filters and range comparisons for numeric/date filters. Edge cases are handled including invalid ranges, conflicting filters, and missing optional fields.

## Sorting Implementation Summary

The system supports sorting by three fields:
- **Date** (default: Newest First - descending)
- **Quantity** (ascending/descending)
- **Customer Name** (A-Z / Z-A)

Sorting is implemented server-side using PostgreSQL `ORDER BY` clauses. Users can toggle between ascending and descending order via a UI button. The sort state persists across search, filters, and pagination changes, ensuring a consistent user experience.

## Pagination Implementation Summary

Pagination is implemented with a fixed page size of 10 items per page. The system provides Previous/Next navigation buttons with proper disabled states at boundaries. The pagination component displays current page information (e.g., "Showing 1-10 of 150 results") and total page count. All active search, filter, and sort states are preserved when navigating between pages. The backend uses `LIMIT` and `OFFSET` for efficient data retrieval, with a separate count query for total records.

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
PORT=5000
```

4. Set up the database schema (create the `sales` table with all required columns as per the import script).

5. Download the sales dataset:
   - Download `sales.csv` from: https://drive.google.com/file/d/1tzbyuxBmrBwMSXbL22r33FUMtO0V_lxb/view?usp=sharing
   - Place the file in `backend/src/data/sales.csv`

6. Import the CSV data:
```bash
npm run import:csv
```

6. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory (optional, defaults to localhost:5000):
```env
VITE_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or the next available port)

### Production Build

**Backend:**
```bash
npm start
```

**Frontend:**
```bash
npm run build
npm run preview
```

