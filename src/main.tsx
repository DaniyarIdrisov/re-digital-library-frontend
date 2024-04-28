import ReactDOM from "react-dom/client";
import {RouterProvider} from "react-router-dom";
import router from "./router/router.tsx";
import {Theme} from "@radix-ui/themes";
import "./styles/style.css"

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
        },
    },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
        <Theme>
            <RouterProvider router={router}/>
        </Theme>
    </QueryClientProvider>
);
