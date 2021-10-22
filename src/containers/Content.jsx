/** ****************************** Import libs *********************************** */
import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { CContainer, CFade } from "@coreui/react";

/** ****************************** Import routes *********************************** */
import routes from "../constants/routes";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse" />
  </div>
);

const Content = ({ handle }) => (
  <CContainer fluid>
    <Suspense fallback={ loading }>
      <Switch>
        {routes.map(
          (route, idx) => route.component && (
              <Route
                key={ idx }
                path={ route.path }
                exact={ route.exact }
                name={ route.name }
                render={ (props) => (
                  <CFade>
                    <route.component { ...props } handle={ handle } />
                  </CFade>
                ) }
              />
          ),
        )}
      </Switch>
    </Suspense>
  </CContainer>
);

export default React.memo(Content);
