import userRouter from './users-routes.js';
import eventRoutes from './eventRoutes.js';
import housingRoutes from './housing-routes.js';
import blogRoutes from './blogs-routes.js';

export default (app) => {
    app.use("/users", userRouter);
    app.use('/events', eventRoutes);
    app.use('/housing', housingRoutes);
    app.use('/blogs', blogRoutes);

}