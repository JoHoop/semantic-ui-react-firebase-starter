import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles/App.css";
import { ErrorBoundary } from "./components/Loading/ErrorBoundary";
import { LoadingError } from "./components/Loading/LoadingError";
import { Navbar } from "./components/Navbar/Navbar";
import { WipWarning } from "./components/WipWarning";
import { Footer } from "./components/Footer/Footer";
import { UserProvider } from "./helpers/UserProvider";
import { PrivateRoute } from "./components/PrivateRoute";
import { Progress } from "./components/Loading/Progress";

const Home = lazy(() => import("./pages/Home"));
const Account = lazy(() => import("./pages/Account"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Reset = lazy(() => import("./pages/ResetPassword"));
const Contact = lazy(() => import("./pages/Contact"));
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Impressum = lazy(() => import("./pages/Impressum"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

export const App = () => {
    return (
        <UserProvider>
            <Router>
                <div className="Site">
                    <Navbar />
                    <div className="SiteContent">
                        <ErrorBoundary fallback={<LoadingError />}>
                            <Suspense
                                fallback={<Progress isAnimating={true} />}
                            >
                                <WipWarning />
                                <Switch>
                                    <Route path="/" exact component={Home} />
                                    <Route path="/signin" component={SignIn} />
                                    <Route path="/signup" component={SignUp} />
                                    <Route path="/reset" component={Reset} />
                                    <PrivateRoute
                                        path="/account"
                                        component={Account}
                                    />
                                    <Route
                                        path="/contact"
                                        component={Contact}
                                    />
                                    <Route path="/terms" component={Terms} />
                                    <Route
                                        path="/privacy"
                                        component={Privacy}
                                    />
                                    <Route
                                        path="/impressum"
                                        component={Impressum}
                                    />
                                    <Route path="*" component={PageNotFound} />
                                </Switch>
                            </Suspense>
                        </ErrorBoundary>
                    </div>
                    <Footer />
                </div>
            </Router>
        </UserProvider>
    );
};
