# Architecture Documentation

## Backend Architecture

### Overview
The backend follows a layered architecture pattern with clear separation of concerns:
- **Routes Layer**: HTTP request routing
- **Controllers Layer**: Request/response handling
- **Services Layer**: Business logic and data access
- **Config Layer**: Database and environment configuration

### Technology Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Database Client**: pg (node-postgres)

### Folder Structure
```
backend/
├── src/
│   ├── config/
│   │   └── db.js              # PostgreSQL connection pool
│   ├── controllers/
│   │   └── salesController.js # Request handlers
│   ├── services/
│   │   └── salesService.js    # Business logic & queries
│   ├── routes/
│   │   └── salesRoutes.js     # API route definitions
│   ├── utils/
│   │   └── loadSalesData.js   # CSV loading utility
│   ├── data/
│   │   └── sales.csv          # Source data file
│   └── index.js               # Application entry point
├── scripts/
│   ├── importCsv.js           # CSV to database import script
│   └── showHeaders.js         # Utility script
└── package.json
```

### Module Responsibilities

#### `src/index.js`
- Application entry point
- Express app initialization
- Middleware configuration (CORS, JSON parsing)
- Route registration
- Server startup

#### `src/config/db.js`
- PostgreSQL connection pool configuration
- Environment variable management
- Connection error handling

#### `src/routes/salesRoutes.js`
- API endpoint definitions
- Route-to-controller mapping
- Endpoints:
  - `GET /api/sales` - Fetch paginated sales data with filters
  - `GET /api/sales/summary` - Fetch aggregated summary statistics

#### `src/controllers/salesController.js`
- HTTP request/response handling
- Query parameter parsing and validation
- Error handling and status code management
- Delegates business logic to services

#### `src/services/salesService.js`
- Core business logic implementation
- SQL query construction
- Filter condition building (`buildWhereClause`)
- Sorting logic (`getSortColumn`)
- Pagination calculation
- Database query execution
- Summary statistics aggregation

### Data Flow (Backend)

1. **Request Arrival**: HTTP request arrives at Express server
2. **Routing**: `salesRoutes.js` matches URL to controller
3. **Controller Processing**: `salesController.js` parses query parameters
4. **Service Layer**: `salesService.js` builds SQL queries with filters
5. **Database Query**: PostgreSQL executes query via connection pool
6. **Response Formation**: Results formatted and returned to client

### Database Schema

The `sales` table contains the following columns:
- Transaction metadata: `id`, `transaction_id`, `date`
- Customer fields: `customer_id`, `customer_name`, `phone_number`, `gender`, `age`, `customer_region`, `customer_type`
- Product fields: `product_id`, `product_name`, `brand`, `product_category`, `tags`
- Sales fields: `quantity`, `price_per_unit`, `discount_percentage`, `total_amount`, `final_amount`
- Operational fields: `payment_method`, `order_status`, `delivery_type`, `store_id`, `store_location`, `salesperson_id`, `employee_name`

---

## Frontend Architecture

### Overview
The frontend follows a component-based architecture using React with functional components and hooks. State management is handled through React's built-in state management with proper separation between UI components and data fetching logic.

### Technology Stack
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Icons**: Heroicons

### Folder Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── FiltersRow.jsx         # Filter controls
│   │   │   ├── PaginationControls.jsx # Pagination UI
│   │   │   ├── SortBar.jsx            # Sorting controls
│   │   │   └── SummaryCards.jsx       # Summary statistics
│   │   ├── inputs/
│   │   │   ├── FilterDropdown.jsx     # Reusable dropdown component
│   │   │   └── SearchBar.jsx          # Search input component
│   │   ├── layout/
│   │   │   ├── HeaderBar.jsx          # Top navigation bar
│   │   │   └── Sidebar.jsx            # Side navigation
│   │   └── table/
│   │       └── SalesTable.jsx         # Data table component
│   ├── pages/
│   │   └── Dashboard.jsx              # Main dashboard page
│   ├── services/
│   │   └── salesApi.js               # API client functions
│   ├── App.jsx                        # Root component
│   └── main.jsx                       # Application entry point
├── public/
└── package.json
```

### Module Responsibilities

#### `src/App.jsx`
- Root application component
- Global state management (query parameters, data, loading, error)
- API data fetching orchestration
- Layout composition (Sidebar + Main content)

#### `src/pages/Dashboard.jsx`
- Main dashboard page component
- Composes filter, sort, table, and pagination components
- Handles loading and error states
- Displays summary cards

#### `src/services/salesApi.js`
- API client abstraction
- HTTP request construction
- Query parameter formatting
- Response handling

#### Component Hierarchy
```
App
├── Sidebar
└── Main
    ├── HeaderBar
    │   └── SearchBar
    └── Dashboard
        ├── FiltersRow
        │   └── FilterDropdown (multiple)
        ├── SummaryCards
        ├── SortBar
        ├── SalesTable
        └── PaginationControls
```

### Data Flow (Frontend)

1. **User Interaction**: User interacts with UI (search, filter, sort, pagination)
2. **State Update**: `App.jsx` updates query state via `updateQuery`
3. **Effect Trigger**: `useEffect` detects state change
4. **API Call**: `salesApi.js` constructs and sends HTTP request
5. **Backend Processing**: Backend processes request and returns data
6. **State Update**: Response updates component state
7. **UI Re-render**: React re-renders components with new data

### State Management

The application uses React's `useState` and `useEffect` hooks for state management:

- **Query State**: Contains all filter, search, sort, and pagination parameters
- **Data State**: Stores paginated sales data and metadata
- **Summary State**: Stores aggregated statistics
- **Loading State**: Tracks loading status for better UX
- **Error State**: Handles and displays error messages

---

## Data Flow (Full Stack)

```
User Input (Frontend)
    ↓
React State Update
    ↓
useEffect Hook Trigger
    ↓
Axios HTTP Request
    ↓
Express Route Handler
    ↓
Controller Parameter Parsing
    ↓
Service Query Building
    ↓
PostgreSQL Database Query
    ↓
Database Response
    ↓
Service Data Formatting
    ↓
Controller JSON Response
    ↓
Axios Response Handling
    ↓
React State Update
    ↓
Component Re-render
    ↓
UI Update (Frontend)
```

---

## Key Design Decisions

### Backend
1. **Parameterized Queries**: All database queries use parameterized statements to prevent SQL injection
2. **Connection Pooling**: PostgreSQL connection pool for efficient database access
3. **Modular Query Building**: Dynamic WHERE clause construction for flexible filtering
4. **Separate Count Query**: Efficient pagination with separate count query for total records

### Frontend
1. **Component Reusability**: Reusable components like `FilterDropdown` for consistency
2. **Separation of Concerns**: API calls separated into service layer
3. **State-Driven UI**: All UI updates driven by state changes
4. **Optimistic Updates**: Immediate UI feedback with loading states

### Performance Considerations
1. **Database Indexing**: Recommended indexes on frequently filtered/sorted columns
2. **Pagination**: Limits data transfer and improves response times
3. **Server-Side Filtering**: Reduces data transfer and improves performance
4. **Connection Pooling**: Efficient database connection management

---

## API Endpoints

### GET /api/sales
**Query Parameters:**
- `search` (string): Search term for customer name or phone
- `regions` (array): Filter by customer regions
- `genders` (array): Filter by gender
- `ageMin` (number): Minimum age filter
- `ageMax` (number): Maximum age filter
- `productCategories` (array): Filter by product categories
- `tags` (array): Filter by product tags
- `paymentMethods` (array): Filter by payment methods
- `dateFrom` (string): Start date filter (YYYY-MM-DD)
- `dateTo` (string): End date filter (YYYY-MM-DD)
- `sortBy` (string): Sort field (date, quantity, customerName)
- `sortOrder` (string): Sort direction (asc, desc)
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)

**Response:**
```json
{
  "data": [...],
  "total": 150,
  "page": 1,
  "pageSize": 10,
  "totalPages": 15
}
```

### GET /api/sales/summary
**Response:**
```json
{
  "totalUnits": 5000,
  "totalAmount": 150000,
  "totalDiscount": 5000
}
```

