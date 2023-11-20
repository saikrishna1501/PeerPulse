import eventRoutes from './eventRoutes.js'

export default (app) =>{
    app.use('/api/events', eventRoutes);
}

