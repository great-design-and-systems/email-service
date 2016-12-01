import express from 'express';
import { GDSServer, GDSServices, GDSUtil } from 'gds-config';
const app = express();
const PORT = process.env.PORT || 5000;

import EmailResource from './boundary/email-resource';

new GDSServices().initServices((serviceError, result) => {
    // no connection to database for now
    //new GDSDatabase().connect((errDB) => {
    //    if (errDB) {
    //        console.error(errDB);
    //    } else {
            new GDSServer(app);
            new GDSUtil().getLogger(() => {
                app.listen(PORT, () => {
                    global.gdsLogger.logInfo('Express is listening to port ' + PORT);
                    new EmailResource(app);
                });
            })
     //   }
    //});

});

export default app;



