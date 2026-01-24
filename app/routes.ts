import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    // Home Page
    index("routes/home.tsx"),
    
    // Static Pages
    route("about", "routes/about.tsx"),
    route("contact", "routes/contact.tsx"),
    
    // Auth & Profile
    route("authentication", "routes/authentication.tsx"),
    route("profile", "routes/profile.tsx"),
    
    // Product Management
    route("productUpload", "routes/productUpload.tsx"),
] satisfies RouteConfig;