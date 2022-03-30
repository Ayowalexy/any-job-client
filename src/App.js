import PaymentOption from './component/payment-option/payment-option.component';
import { Switch, Route, useLocation } from 'react-router-dom';
import PaymentBreakdown from './component/payment-breakdown/payment-breakdown.component';
import { AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';

function App() {
  const location = useLocation();
  return (
    <div>
      <AnimatePresence
        exitBeforeEnter
      >
          <Switch 
            location={location}
            key={location.pathname}  
          >
              <Route exact path="/" component={PaymentOption} />
              <Route exact path="/payment-breakdown" component={PaymentBreakdown} />
          </Switch>
        </AnimatePresence>
        <Helmet>
          <script type="text/jsx" scr="./component/payment-option/index.js"></script>
        </Helmet>
      </div>

  );
}

export default App;
