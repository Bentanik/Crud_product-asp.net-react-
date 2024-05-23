import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { public_routes } from "./Configs/routes";
import Home from "./Pages/Home";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {public_routes.map((route, index) => {
            const Page = route.component;
            let Layout = route.layout;

            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            return (
              <Route
                key={index}
                path={"/"}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
