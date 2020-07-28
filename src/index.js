import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { ErrorBoundary } from "./components/Loading/ErrorBoundary";
import { LoadingError } from "./components/Loading/LoadingError";
import { Progress } from "./components/Loading/Progress";
import "semantic-ui-css/semantic.min.css";
import { App } from "./App";
import "./i18n";

ReactDOM.render(
    <ErrorBoundary fallback={<LoadingError />}>
        <Suspense fallback={<Progress isAnimating={true} />}>
            <App />
        </Suspense>
    </ErrorBoundary>,
    document.getElementById("root")
);
