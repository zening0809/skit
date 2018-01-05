
export default {
    // indexRoute: {
    //    onEnter: () => {},
    //    component: require('../container/home/index')
    // },
    childRoutes: [
        // not found router must at last
        require('./home'),
        {
            path: '/',
            component: require('../page/login/')
        }
    ]
};
