import React from "react";
import { Switch, Route } from "react-router-dom";
import routes from "./routes";

const EntryScreen = () => {
  return (
    <div>
        {routes.map((route) => (
          <Route
            exact={route.exact}
            key={route.key}
            path={route.path}
            component={(props) => (
              <div id={route.key} className="col py-3">
                <route.component {...props} />
              </div>
            )}
          />
        ))}
        <Route
          path="*"
          component={(props) => (
            <div className="col py-3">
            </div>
          )}
        />
      </div>
  );
}

export default EntryScreen;
