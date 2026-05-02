import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/globals.css";
import "./i18n";

import posthog from "posthog-js";
import { PostHogErrorBoundary, PostHogProvider } from "@posthog/react";

posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN, {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  defaults: "2026-01-30",
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <PostHogProvider client={posthog}>
    <PostHogErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PostHogErrorBoundary>
  </PostHogProvider>
);
