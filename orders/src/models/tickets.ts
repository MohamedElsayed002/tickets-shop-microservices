import mongoose from "mongoose";
import { Order } from "./orders";
import { OrderStatus } from "@rallycoding/common";

interface TicketsAttrs {
    title: string;
    price: number
}


export interface TicketDoc extends mongoose.Document {
    title: string;
    price: number;
    isReserved(): Promise<boolean>
}


interface TicketModal extends mongoose.Model<TicketDoc> {
    build(attrs: TicketsAttrs): TicketDoc
}

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },

}, {
    toJSON: {
        transform(doc, ret: any) {
            ret.id = ret._id
            delete ret._id
        }
    }
})

ticketSchema.statics.build = (attrs: TicketsAttrs) => {
    return new Ticket(attrs)
}

ticketSchema.methods.isReserved = async function () {
    // this === the ticket document that we just called 'isReserved' on
    const existingOrder = await Order.findOne({
        ticket: this,
        status: {
            $in: [
                OrderStatus.Created,
                OrderStatus.AwaitingPayment,
                OrderStatus.Complete
            ]
        }
    })

    return !!existingOrder
}

const Ticket = mongoose.model<TicketDoc, TicketModal>('Ticket', ticketSchema)

export { Ticket }