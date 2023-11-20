import userRouter from './users-routes.js';
export default (app) => {
    app.use("/users", userRouter);
}