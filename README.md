# Blog Application Frontend

A modern, high-performance blog frontend built with Next.js 14 and TypeScript, featuring a clean, responsive UI primarily styled with Material-UI (MUI) and enhanced with real-time capabilities.

## 🚀 Quick Links

- **Live Demo:** `https://blog-frontend-client.vercel.app`
- **API Documentation:** `https://blog-backend-20zl.onrender.com/api/docs/client`
- **Source Code:** https://github.com/KamilPolojko/blog-frontend

## 🎥 Live Demo & Features

### Key Functionalities Showcase:

- **📝 Rich Article Editor** - Full WYSIWYG editor with image uploads and formatting
- **💬 Real-Time Comments** - Live comment system with nested replies
- **🔔 Live Notifications** - Instant notifications for user interactions
- **🌍 Multi-language Support** - Internationalization with language detection
- **📱 Responsive Design** - Seamless experience across all devices
- **⚡ Instant Interactions** - Likes, saves, and follows without page refresh
- **🎯 Advanced Search** - Filter articles by categories, tags, and popularity
- **🔐 Secure Authentication** - JWT-based login with persistent sessions

[👉 Explore Live Demo](https://blog-frontend-client.vercel.app)

## ✨ Features

| Feature Area | Technologies & Implementation |
| :--- | :--- |
| 🎨 UI Framework | Material-UI (MUI) with sx prop, styled-components |
| ⚡ State Management | TanStack Query (React Query) for server state |
| 📝 Rich Text Editor | Tiptap with image, links, text alignment extensions |
| 🌍 Internationalization | i18next with browser language detection |
| 📧 Form Management | React Hook Form for robust form handling |
| 🔄 Real-Time Features | Socket.io client for live updates |
| 🎯 Type Safety | Full TypeScript implementation |
| 🚀 Performance | Next.js 14 with App Router |

## 🛠 Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Material-UI (MUI), styled-components, Tailwind CSS
- **Data Fetching:** TanStack React Query, Axios
- **Forms:** React Hook Form
- **Real-Time:** Socket.io client
- **Rich Text:** Tiptap with extensions
- **Internationalization:** i18next, react-i18next

## 🔥 Real-Time Features
- **Live Comments:** New comments appear instantly across all connected clients without page refresh
- **Real-time Likes:** Like counters update immediately for all users viewing the same content
- **Live Notifications:** Instant push notifications for user interactions and system events
- **WebSocket Integration:** Seamless bidirectional communication with the backend API

## ⚡ Performance Optimizations
- **Image Optimization:** Next.js Image component with lazy loading and responsive breakpoints
- **Code Splitting:** Automatic bundle splitting with Next.js App Router for faster initial loads
- **Efficient Caching:** TanStack Query with aggressive caching strategies and background updates

## 📁 Project Structure

src/
├── app/                    # Next.js App Router pages
├── components/             # Reusable React components
├── hooks/                  # Custom React hooks
├── lib/                    # Configuration files
├── styles/                 # Global styles and theme
├── types/                  # TypeScript type definitions
├── utils/                  # Utility functions
└── locales/                # Translation files

## 💡 Code Examples

**Custom Hook - Data Fetching with Tanstack Query: **

```typescript
export const useGetArticlesCreatedByClient = ({
                                                  clientId,
                                                  page = 1,
                                                  limit = 10,
                                                  sortBy,
                                                  sortOrder,
                                                  filters = {},
                                              }: Params): UseQueryResult<PaginatedResponse<articleType>, Error> => {
    return useQuery<PaginatedResponse<articleType>, Error>({
        queryKey: [
            "clientCreatedArticles",
            clientId,
            page,
            limit,
            sortBy,
            sortOrder,
            filters,
        ],
        queryFn: async () => {
            const { data } = await api.get(
                API_ROUTES.ARTICLES.CREATED_BY_CLIENT(clientId),
                {
                    params: {
                        page,
                        limit,
                        sortBy,
                        sortOrder,
                        filters: JSON.stringify(filters),
                    },
                }
            );
            return data;
        },
        enabled: !!clientId,
        staleTime: 30000,
        gcTime: 300000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        placeholderData: (previousData) => previousData,
    });
};
```

**MUI Styling with sx Prop:**
```typescript
<Box
    sx={{
    display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: 3,
        backgroundColor: 'background.paper',
        borderRadius: 1,
        boxShadow: 1,
        '&:hover': {
        boxShadow: 3,
    },
}}
>
{/* Component content */}
</Box>
```

**Form Handling with React Hook Form:**

```typescript
    const { control, handleSubmit, reset, watch, formState } = useForm<ArticleFormData>({
        defaultValues,
    });

    <FormField
        name="title"
        label={t('form_fields.title.label')}
        control={control}
        rules={{
            required: t('form_fields.title.errors.required'),
            maxLength: { value: 100, message: t('form_fields.title.errors.maxLength.message') }
        }}
    />
```

## 🔧 Implementation Highlights

### Architecture & Patterns

- **Component-Based Architecture** with reusable, maintainable React components
- **Custom Hooks** for encapsulated business logic and state management
- **TypeScript Excellence** with full type coverage and generic implementations
- **Responsive Design** using MUI's Grid system and sx prop styling

### Performance & UX

- **Server-Side Rendering** with Next.js for optimal SEO and loading performance
- **Efficient Caching** with TanStack Query for smooth user experience
- **Real-Time Updates** for live comments, likes, and notifications
- **Code Splitting** automatic with Next.js App Router

## ⚙️ Installation & Local Development

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Getting Started

1. **Clone the repository**
```bash
   git clone https://github.com/KamilPolojko/blog-frontend-client.git
   cd blog-frontend
```

2. **Install dependencies**
```bash
  npm install
 ```
3. **Environment Configuration
   Create a .env.local file in the root directory:**
```env
  # API Configuration
   NEXT_PUBLIC_BASE_URL=http://localhost:3000/client
   NEXT_PUBLIC_WS_URL=http://localhost:3000
 ```
4. **Run the developer server**
```bash
  npm run dev
 ```

5. **Open http://localhost:3001 in your browser.**


## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint for code quality |


## 🚀 Deployment on Vercel

This project is optimized for Vercel deployment:

1. Push your code to GitHub
2. Connect your repository in the Vercel dashboard
3. Configure environment variables in Vercel project settings
4. Deploy automatically on every push to main branch

The project leverages Vercel's native Next.js support for optimal performance without requiring Docker containerization.


## 🎯 Key Dependencies & Usage

| Package | Purpose |
| :--- | :--- |
| `@mui/material` & `@emotion/react` | Primary component library and styling |
| `@tanstack/react-query` | Server state management and caching |
| `react-hook-form` | Form handling with validation |
| `@tiptap/react` | Rich text editor functionality |
| `socket.io-client` | Real-time WebSocket connections |
| `react-i18next` | Internationalization and localization |


## 🔮 Future Enhancements

- **👥 Creator Follow System** - Follow favorite authors and see their articles in personalized feeds
- **💬 Live Chat Rooms** - Real-time discussions between users
- **⭐ Article & Creator Reviews** - Rating system and reviews for content and authors
- **📈 Advanced Analytics Dashboard** - Creator insights and user behavior tracking
- **🔔 Enhanced Notifications** - Smart alerts for new content from followed creators, real-time alerts for new followers
