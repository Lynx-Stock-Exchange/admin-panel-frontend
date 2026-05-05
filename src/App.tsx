import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./features/auth/store/AuthContext";
import { router } from "./app/router";

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
