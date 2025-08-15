import mongoose from 'mongoose'
import express, {Request, Response} from 'express'
import { BadRequestError, NotFoundError, OrderStatus, requireAuth, validateRequest } from '@rallycoding/common'
import { body } from 'express-validator'
import { Ticket } from '../models/tickets'
import { Order } from '../models/orders'
const router = express.Router()

router.post('/api/orders',
    requireAuth,
    [
    body('ticketId')
        .not()
        .isEmpty()
        .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
        .withMessage('TicketId must be provided')
],validateRequest,async( req: Request, res: Response) => {

    const { ticketId} = req.body
    // Find the ticket the user is trying to order in the database 

    const ticket = await Ticket.findById(ticketId)

    if(!ticket) {
        throw new NotFoundError()
    }


    // Make sure that this ticket is not already reserved 
    // Run query to look at all orders. find an order where the client
    //  is the ticket we just found and the orders status is &not* cancelled 
    //  if we find an order from that means the ticket *is* reserved
    const isReserved = await ticket.isReserved()

    if(isReserved) {
        throw new BadRequestError('Ticket is already reserved')
    }

    // Calculate an expiration date for this order 
    const expiration = new Date()
    expiration.setSeconds(expiration.getSeconds() + 15 * 60)


    // Build the order and save it to the database
    const order = Order.build({
        userId: req.currentUser!.id,
        status: OrderStatus.Created,
        expiresAt: expiration,
        ticket
    })
    await order.save()


    // Publish an event saying that an order was created    

    res.status(201).send(order)
})

export { router as newOrderRouter}