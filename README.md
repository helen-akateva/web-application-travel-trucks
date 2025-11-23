# 🚐 TravelTrucks

**TravelTrucks** is a modern web application for searching and booking campers for travel. Built with Next.js and TypeScript, it provides a fast, convenient, and intuitive platform for travelers.

## 📋 Project Description

TravelTrucks helps users find the perfect camper for their journey. The application provides detailed information about each camper, including photos, specifications, reviews, and booking capabilities.

## ✨ Key Features

- **Camper Catalog** — browse available campers with detailed information
- **Advanced Filtering** — search campers by location, body type, and equipment
- **Detailed Information** — view specifications, photo gallery, and reviews
- **Favorites** — save favorite campers for quick access
- **Booking System** — reservation form for selected dates
- **Responsive Design** — proper display on all devices

## 🛠️ Technologies

The project is built using a modern technology stack:

- **[Next.js 16](https://nextjs.org/)** — React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** — type safety and better developer experience
- **[React 19](https://react.dev/)** — library for building user interfaces
- **[Zustand](https://zustand-demo.pmnd.rs/)** — state management
- **[TanStack Query](https://tanstack.com/query)** — server state management and caching
- **[Axios](https://axios-http.com/)** — HTTP client for API requests
- **[React DatePicker](https://reactdatepicker.com/)** — date selection for bookings
- **[React Hot Toast](https://react-hot-toast.com/)** — user notifications
- **[CSS Modules](https://github.com/css-modules/css-modules)** — modular component styling

## 📦 Installation

### Prerequisites

Make sure you have installed:

- **Node.js** version 18.x or higher
- **npm** or **yarn**

### Installation Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/helen-akateva/web-application-travel-trucks.git
   cd web-application-travel-trucks
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Open the application:**

   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Usage

### Available Commands

- `npm run dev` — start development server
- `npm run build` — build project for production
- `npm start` — run production build
- `npm run lint` — check code with linter

### Project Structure

```
web-application-travel-trucks/
├── app/                    # Next.js App Router pages
│   ├── catalog/           # Catalog page
│   ├── page.tsx           # Home page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── Camper/           # Camper detail page components
│   ├── Catalog/          # Catalog components
│   ├── Header/           # Header components
│   └── Ui/               # Reusable UI components
├── lib/                   # Utilities and helpers
│   ├── api/              # API client
│   └── store/            # Zustand store
├── types/                 # TypeScript type definitions
└── public/               # Static assets
```

### Main Pages

- **`/`** — Home page with welcome section
- **`/catalog`** — Camper catalog with filters
- **`/catalog/:id`** — Detailed camper information

## 🌐 Deployment

The project is optimized for deployment on [Vercel](https://vercel.com/):

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Vercel will automatically build and deploy your project

Alternatively, you can use any hosting platform that supports Node.js.

## 👩‍💻 Author

**Olena Akatieva**

- LinkedIn: [linkedin.com/in/olena-akatieva](https://www.linkedin.com/in/olenaakatieva/)
- GitHub: [@helen-akateva](https://github.com/helen-akateva)

## 📄 License

This project was created for educational purposes.

---

**Happy travels with TravelTrucks! 🚐✨**
