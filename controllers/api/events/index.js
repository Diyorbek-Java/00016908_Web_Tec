const events_service = require('../../../services/events')

// mention the service's needed actions (methods)
const event_controller = {
    getAll(req, res) {
        res.json(events_service.getAll())
    },
    create(req, res) {
        res.status(201).json(
            events_service.create(req, res)
        )
    },

    update(req, res) {
        const event = events_service.update(req.params.id, req.body)
        
        if (event) {
            res.json(event)
        } else {
            res.status(404).send('Event not found')
        }
    },

    delete(req, res) {
        const event = events_service.getById(req.params.id)

        if (event) {
            events_service.delete(req.params.id)
            res.status(204).send('Event deleted successfully')
        } else {
            res.status(404).send('Event not found')
        }
    }

}

module.exports = event_controller


