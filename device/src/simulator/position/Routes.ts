import { sample } from 'lodash';

import * as route1 from '../../../routes/route_1.json';
import * as route2 from '../../../routes/route_2.json';
import * as route3 from '../../../routes/route_3.json';
import * as route4 from '../../../routes/route_4.json';
import * as route5 from '../../../routes/route_4.json';
import * as route6 from '../../../routes/route_4.json';

const ROUTES = [ route1, route2, route3, route4, route5, route6 ];

class Routes {

  public static getRandom(): { lat: number; lng: number; timestamp: number }[] {
    return sample(ROUTES);
  }

}

export default Routes;