import { Route, Routes } from "react-router-dom";
import Invoice from "./Pages/Invoice";
import Login from "./Pages/Login";
import Product from "./Pages/Product";
import Register from "./Pages/Register";
import Layout from "./Layout";
import { QueryClient, QueryClientProvider } from "react-query";

// all routes
const protectedRoutes = [
  {
    link: "/",
    element: <Product />,
  },
  {
    link: "/invoice/:_id",
    element: <Invoice />,
  },
];

const publicRoutes = [
  {
    link: "/signup",
    element: <Register />,
  },
  {
    link: "/login",
    element: <Login />,
  }
];

export default function App() {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <Routes>
        {publicRoutes.map((route) => (
          <Route
            key={route.link}
            path={route.link}
            element={route.element}
          />
        ))}
        <Route element={<Layout />}>
          {protectedRoutes.map((route) => (
            <Route
              key={route.link}
              path={route.link}
              element={route.element}
            />
          ))}
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}
