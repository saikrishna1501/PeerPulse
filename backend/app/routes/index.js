import userRouter from './users-routes.js';
import eventRoutes from './eventRoutes.js';

export default (app) => {
    app.use("/users", userRouter);
    app.use('/events', eventRoutes);
}