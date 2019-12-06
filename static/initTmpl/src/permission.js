/**
 * about usf permission
 * @author songchunrui
 * date: 2019.9.19
 */
import router from '@/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import _ from 'lodash'

NProgress.configure({ showSpinner: false });

router.beforeEach(async(to, from, next) => {
    NProgress.start();
    document.title = _.result(to.meta, 'moduleName', 'USF');
    // todo...
    next();
    NProgress.done();
});

router.afterEach(() => {
    NProgress.done();
});
